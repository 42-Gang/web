const express = require('express')
const cors = require('cors')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const app = express()

app.use(cors({
	origin: 'http://localhost:5173',
	credentials: true
}))
app.use(express.json())
app.use(cookieParser())

// 🔥 유저 메모리 저장소 (시작 시 비어 있음)
const users = []
let pendingVerifications = []

const SECRET_KEY = 'yourSecretKey'
const REFRESH_SECRET_KEY = 'yourRefreshSecretKey'

// ✅ 로그인
app.post('/v1/auth/login', (req, res) => {
	const { email, password } = req.body

	if (!email || !password) {
		return res.status(400).json({
			status: 'error',
			code: 400,
			message: "Missing email or password."
		})
	}

	const user = users.find(u => u.email === email && u.password === password)

	if (user) {
		const accessToken = jwt.sign({ userId: user.id }, SECRET_KEY, { expiresIn: '1h' })
		const refreshToken = jwt.sign({ userId: user.id }, REFRESH_SECRET_KEY, { expiresIn: '7d' })

		res.cookie('refreshToken', refreshToken, {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			sameSite: 'strict',
			path: '/',
			maxAge: 7 * 24 * 60 * 60 * 1000
		})

		return res.status(200).json({
			status: 'success',
			code: 200,
			message: 'Login success',
			data: { accessToken }
		})
	}

	return res.status(401).json({
		status: 'error',
		code: 401,
		message: 'Invalid credentials.'
	})
})

// ✅ 회원가입
app.post('/users', (req, res) => {
	const { email, password, repassword, nickname, verifyCode } = req.body

	if (!email || !password || !repassword || !nickname || !verifyCode) {
		return res.status(400).json({
			status: 'ERROR',
			message: 'Missing required fields.',
			errors: [{ field: 'form', message: 'Please enter all the information.' }],
			data: null
		})
	}

	if (password !== repassword) {
		return res.status(400).json({
			status: 'ERROR',
			message: 'Password mismatch.',
			errors: [{ field: 'repassword', message: 'Password does not match!' }],
			data: null
		})
	}

	const emailTaken = users.find(u => u.email === email)
	if (emailTaken) {
		return res.status(409).json({
			status: 'ERROR',
			message: 'Validation failed.',
			errors: [{ field: 'email', message: 'This email is already in use.' }],
			data: null
		})
	}

	const nicknameTaken = users.find(u => u.nickname === nickname)
	if (nicknameTaken) {
		return res.status(400).json({
			status: 'ERROR',
			message: 'Validation failed.',
			errors: [{ field: 'nickname', message: 'Nickname is already in use.' }],
			data: null
		})
	}

	const pending = pendingVerifications.find(v => v.email === email)
	if (!pending || pending.verifyCode !== verifyCode) {
		return res.status(401).json({
			status: 'ERROR',
			message: 'Invalid verify code.',
			errors: [{ field: 'verifyCode', message: 'The authentication code does not match.' }],
			data: null
		})
	}

	pendingVerifications = pendingVerifications.filter(v => v.email !== email)

	const newUser = {
		id: String(Date.now()),
		email,
		password,
		nickname,
		verifyCode,
		avatar: null
	}
	

	users.push(newUser)

	return res.status(201).json({
		status: 'SUCCESS',
		message: 'Membership registration completed.',
		errors: [],
		data: {
			id: newUser.id,
			email: newUser.email,
			nickname: newUser.nickname
		}
	})
})

// ✅ 이메일 인증 코드 발급/검증
app.post('/v1/auth/mail', (req, res) => {
	const { email, verifyCode } = req.body

	if (!email) {
		return res.status(400).json({
			status: 'ERROR',
			message: 'Missing required field.',
			errors: [{ field: 'email', message: 'Please enter your email.' }],
			data: null
		})
	}

	if (verifyCode) {
		const pending = pendingVerifications.find(v => v.email === email)
		if (!pending) {
			return res.status(404).json({
				status: 'ERROR',
				message: 'No authentication request found.',
				errors: [{ field: 'verifyCode', message: 'There is no history of authentication requests.' }],
				data: null
			})
		}

		if (pending.verifyCode !== verifyCode) {
			return res.status(401).json({
				status: 'ERROR',
				message: 'Authentication failed.',
				errors: [{ field: 'verifyCode', message: 'The authentication code does not match.' }],
				data: null
			})
		}

		return res.status(200).json({
			status: 'SUCCESS',
			message: 'Authentication successful.',
			errors: [],
			data: { verifyCode: pending.verifyCode }
		})
	}

	const newCode = Math.floor(100000 + Math.random() * 900000).toString()
	pendingVerifications = pendingVerifications.filter(v => v.email !== email)
	pendingVerifications.push({ email, verifyCode: newCode })

	console.log(`📨 Issuance of authentication code: ${email} → ${newCode}`)

	return res.status(200).json({
		status: 'SUCCESS',
		message: 'Authorization Code Is Issued.',
		errors: [],
		data: { verifyCode: newCode }
	})
})

// ✅ 전체 유저 목록 (비밀번호, 인증코드 제외)
app.get('/users', (req, res) => {
	const usersWithoutPasswords = users.map(({ password, verifyCode, ...rest }) => rest)
	res.status(200).json(usersWithoutPasswords)
})

// ✅ 사용자 정보 가져오기 (권한 체크 포함)
app.get('/users/:id', (req, res) => {
	const authHeader = req.headers.authorization
	if (!authHeader || !authHeader.startsWith('Bearer')) {
		return res.status(401).json({
			status: 'error',
			code: 401,
			message: 'Missing or invalid Authorization header'
		})
	}

	const token = authHeader.split(' ')[1]
	let decoded

	try {
		decoded = jwt.verify(token, SECRET_KEY)
	} catch (err) {
		return res.status(403).json({
			status: 'error',
			code: 403,
			message: 'Invalid or expired token'
		})
	}

	const user = users.find(u => u.id == decoded.userId)
	const requestedId = req.params.id

	if (!user || user.id != requestedId) {
		return res.status(403).json({
			status: 'error',
			code: 403,
			message: 'Unauthorized access to user data'
		})
	}

	return res.status(200).json({
		status: 'success',
		code: 200,
		message: 'User data retrieved',
		data: {
			id: user.id,
			email: user.email,
			nickname: user.nickname,
			avatar: user.avatar,
			wins: 0,
			losses: 0,
			tournamentWins: 0
		}
	})
	
})

// ✅ 닉네임 수정 API
app.patch('/users/:id/nickname', (req, res) => {
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  const token = authHeader.split(' ')[1]
  let decoded
  try {
    decoded = jwt.verify(token, SECRET_KEY)
  } catch (err) {
    return res.status(403).json({ message: 'Invalid or expired token' })
  }

  const userId = req.params.id
  if (userId !== decoded.userId) {
    return res.status(403).json({ message: 'Forbidden' })
  }

  const { nickname } = req.body
  if (!nickname || nickname.length > 8) {
    return res.status(400).json({ message: 'Invalid nickname' })
  }

  const user = users.find(u => u.id === userId)
  if (!user) {
    return res.status(404).json({ message: 'User not found' })
  }

  user.nickname = nickname

  return res.status(200).json({
    message: 'Nickname updated successfully',
    data: { nickname: user.nickname }
  })
})

// ✅ 프로필 사진 수정 API
const multer = require('multer')
const fs = require('fs')

const upload = multer({
	dest: 'uploads/',
	limits: { fileSize: 5 * 1024 * 1024 } // 5MB 제한
})

// 업로드 폴더가 없다면 생성
if (!fs.existsSync('uploads')) {
	fs.mkdirSync('uploads')
}

// ✅ 프로필 이미지 수정 API
app.post('/users/:id/avatar', upload.single('avatar'), (req, res) => {
	const authHeader = req.headers.authorization
	if (!authHeader || !authHeader.startsWith('Bearer ')) {
		return res.status(401).json({ message: 'Unauthorized' })
	}

	let decoded
	try {
		decoded = jwt.verify(authHeader.split(' ')[1], SECRET_KEY)
	} catch (err) {
		return res.status(403).json({ message: 'Invalid or expired token' })
	}

	const userId = req.params.id
	if (userId !== decoded.userId) {
		return res.status(403).json({ message: 'Forbidden' })
	}

	const user = users.find(u => u.id === userId)
	if (!user) {
		return res.status(404).json({ message: 'User not found' })
	}

	if (req.body.delete === 'true') {
		console.log(`🗑️ [avatar delete] user=${user.email}`)
		user.avatar = null
		return res.status(200).json({
			message: 'Avatar deleted successfully',
			data: { avatar: null }
		})
	}
	
	if (req.file) {
		const filename = req.file.filename
		user.avatar = `http://localhost:3001/uploads/${filename}`
	
		console.log(`📤 [avatar upload] user=${user.email} filename=${filename} size=${req.file.size}B`)
	
		return res.status(200).json({
			message: 'Avatar updated successfully',
			data: { avatar: user.avatar }
		})
	}	

	return res.status(400).json({ message: 'No file uploaded' })
})


// ✅ 업로드된 이미지 제공
app.use('/uploads', express.static('uploads'))


// ✅ 리프레시 토큰 발급
app.post('/v1/auth/refresh-token', (req, res) => {
	const refreshToken = req.cookies.refreshToken

	if (!refreshToken) {
		return res.status(401).json({
			status: 'error',
			code: 401,
			message: 'No refresh token provided.'
		})
	}

	try {
		const decoded = jwt.verify(refreshToken, REFRESH_SECRET_KEY)
		const user = users.find(u => u.id === decoded.userId)

		if (!user) {
			return res.status(401).json({
				status: 'error',
				code: 401,
				message: 'Invalid refresh token.'
			})
		}

		const newAccessToken = jwt.sign({ userId: user.id }, SECRET_KEY, { expiresIn: '1h' })
		const newRefreshToken = jwt.sign({ userId: user.id }, REFRESH_SECRET_KEY, { expiresIn: '7d' })

		res.cookie('refreshToken', newRefreshToken, {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			sameSite: 'strict',
			path: '/',
			maxAge: 7 * 24 * 60 * 60 * 1000
		})

		return res.status(200).json({
			status: 'success',
			code: 200,
			message: 'Access token refreshed',
			data: { accessToken: newAccessToken }
		})
	} catch (err) {
		return res.status(401).json({
			status: 'error',
			code: 401,
			message: 'Invalid or expired refresh token.'
		})
	}
})

// ✅ 로그아웃
app.post('/v1/auth/logout', (req, res) => {
	try {
		res.clearCookie('refreshToken', {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			sameSite: 'strict',
			path: '/'
		})

		return res.status(200).json({
			status: 'success',
			code: 200,
			message: 'Logout successful. Refresh token cleared.'
		})
	} catch (error) {
		return res.status(500).json({ message: 'Logout error' })
	}
})

app.listen(3001, () => {
	console.log("✅ Mock server running at http://localhost:3001")
})
