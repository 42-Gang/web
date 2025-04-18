const express = require('express')
const cors = require('cors')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const multer = require('multer')
const fs = require('fs')

const app = express()
app.use(cors({
	origin: 'http://localhost:5173',
	credentials: true
}))
app.use(express.json())
app.use(cookieParser())

const users = [
  {
    id: "1",
    email: 'test@gmail.com',
    password: '0311',
    nickname: 'testuser',
    avatar: null,
    gameData1vs1: {
      wins: 135,
      losses: 15,
      history: [
        { player: "Jungslee", opponent: "PONG", result: "WIN" },
        { player: "Inryu", opponent: "PONG", result: "WIN" },
        { player: "Yeeunpar", opponent: "PONG", result: "LOSE" },
        { player: "Hyehan", opponent: "PONG", result: "WIN" },
        { player: "Wooshin", opponent: "PONG", result: "LOSE" },
        { player: "Wooshin", opponent: "PONG", result: "WIN" },
        { player: "Wooshin", opponent: "PONG", result: "LOSE" },
        { player: "Yeeunpar", opponent: "PONG", result: "WIN" }
      ]
    },
    gameDataTournament: {
      totalWins: 112,
      history: [
        { gameMode: "ROUND 4", team: ["Jungslee", "Ping", "Pong", "Inryu"], result: "WIN" },
        { gameMode: "ROUND 4", team: ["Jungslee", "Ping", "Pong", "Inryu"], result: "LOSE" },
        { gameMode: "ROUND 4", team: ["Jungslee", "Ping", "Pong", "Inryu"], result: "LOSE" },
        { gameMode: "ROUND 4", team: ["Jungslee", "Ping", "Pong", "Inryu"], result: "LOSE" }
      ]
    }
  }
]
let pendingVerifications = []

const SECRET_KEY = 'yourSecretKey'
const REFRESH_SECRET_KEY = 'yourRefreshSecretKey'

app.get('/v1/auth/ping', (req, res) => {
	res.status(200).json({
		status: 'success',
		message: 'Auth service is alive!'
	})
})

app.post('/v1/auth/login', (req, res) => {
	const { email, password } = req.body

	if (!email || !password) {
		return res.status(400).json({ status: 'error', code: 400, message: "Missing email or password." })
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

app.post('/users', (req, res) => {
	const { email, password, repassword, nickname, verifyCode } = req.body

	if (!email || !password || !repassword || !nickname || !verifyCode) {
		return res.status(400).json({ status: 'ERROR', message: 'Missing required fields.' })
	}

	if (password !== repassword) {
		return res.status(400).json({ status: 'ERROR', message: 'Password mismatch.' })
	}

	if (users.find(u => u.email === email)) {
		return res.status(409).json({ status: 'ERROR', message: 'This email is already in use.' })
	}

	if (users.find(u => u.nickname === nickname)) {
		return res.status(400).json({ status: 'ERROR', message: 'Nickname is already in use.' })
	}

	const pending = pendingVerifications.find(v => v.email === email)
	if (!pending || pending.verifyCode !== verifyCode) {
		return res.status(401).json({ status: 'ERROR', message: 'Invalid verify code.' })
	}

	pendingVerifications = pendingVerifications.filter(v => v.email !== email)

	const newUser = {
		id: String(Date.now()),
		email,
		password,
		nickname,
		verifyCode,
		avatar: null,
		gameData1vs1: { wins: 0, losses: 0, history: [] },
		gameDataTournament: { totalWins: 0, history: [] }
	}

	users.push(newUser)

	return res.status(201).json({
		status: 'SUCCESS',
		data: { id: newUser.id, email: newUser.email, nickname: newUser.nickname }
	})
})

app.post('/v1/auth/mail', (req, res) => {
	const { email, verifyCode } = req.body
	if (!email) return res.status(400).json({ status: 'ERROR', message: 'Missing email' })

	if (verifyCode) {
		const pending = pendingVerifications.find(v => v.email === email)
		if (!pending) return res.status(404).json({ status: 'ERROR', message: 'No request found.' })
		if (pending.verifyCode !== verifyCode) return res.status(401).json({ status: 'ERROR', message: 'Code mismatch.' })
		return res.status(200).json({ status: 'SUCCESS', data: { verifyCode: pending.verifyCode } })
	}

	const newCode = Math.floor(100000 + Math.random() * 900000).toString()
	pendingVerifications = pendingVerifications.filter(v => v.email !== email)
	pendingVerifications.push({ email, verifyCode: newCode })
	console.log(`📨 Auth code for ${email}: ${newCode}`)

	return res.status(200).json({ status: 'SUCCESS', data: { verifyCode: newCode } })
})

app.get('/users', (req, res) => {
	const usersWithoutSensitive = users.map(({ password, verifyCode, ...rest }) => rest)
	res.status(200).json(usersWithoutSensitive)
})

app.get('/users/:id', (req, res) => {
	const authHeader = req.headers.authorization
	if (!authHeader || !authHeader.startsWith('Bearer ')) {
		return res.status(401).json({ status: 'error', message: 'Missing or invalid Authorization header' })
	}

	let decoded
	try {
		decoded = jwt.verify(authHeader.split(' ')[1], SECRET_KEY)
	} catch {
		return res.status(403).json({ status: 'error', message: 'Invalid or expired token' })
	}

	const requestedId = req.params.id
	const user = users.find(u => String(u.id) === String(decoded.userId))
	if (!user || String(user.id) !== String(requestedId)) {
		return res.status(403).json({ status: 'error', message: 'Unauthorized access' })
	}

	return res.status(200).json({
		status: 'success',
		data: {
			id: user.id,
			email: user.email,
			nickname: user.nickname,
			avatar: user.avatar
		}
	})
})

app.patch('/users/:id/nickname', (req, res) => {
	const authHeader = req.headers.authorization
	if (!authHeader || !authHeader.startsWith('Bearer ')) {
		return res.status(401).json({ message: 'Unauthorized' })
	}

	let decoded
	try {
		decoded = jwt.verify(authHeader.split(' ')[1], SECRET_KEY)
	} catch {
		return res.status(403).json({ message: 'Invalid or expired token' })
	}

	const userId = req.params.id
	if (String(userId) !== String(decoded.userId)) {
		return res.status(403).json({ message: 'Forbidden' })
	}

	const { nickname } = req.body
	if (!nickname || nickname.length > 8) {
		return res.status(400).json({ message: 'Invalid nickname' })
	}

	const user = users.find(u => String(u.id) === String(userId))
	if (!user) return res.status(404).json({ message: 'User not found' })

	user.nickname = nickname
	return res.status(200).json({ message: 'Nickname updated', data: { nickname } })
})

const upload = multer({ dest: 'uploads/', limits: { fileSize: 5 * 1024 * 1024 } })
if (!fs.existsSync('uploads')) fs.mkdirSync('uploads')

app.post('/users/:id/avatar', upload.single('avatar'), (req, res) => {
	const authHeader = req.headers.authorization
	if (!authHeader || !authHeader.startsWith('Bearer ')) {
		return res.status(401).json({ message: 'Unauthorized' })
	}

	let decoded
	try {
		decoded = jwt.verify(authHeader.split(' ')[1], SECRET_KEY)
	} catch {
		return res.status(403).json({ message: 'Invalid or expired token' })
	}

	const userId = req.params.id
	if (String(userId) !== String(decoded.userId)) {
		return res.status(403).json({ message: 'Forbidden' })
	}

	const user = users.find(u => String(u.id) === String(userId))
	if (!user) return res.status(404).json({ message: 'User not found' })

	if (req.body.delete === 'true') {
		user.avatar = null
		return res.status(200).json({ message: 'Avatar deleted', data: { avatar: null } })
	}

	if (req.file) {
		user.avatar = `http://localhost:3001/uploads/${req.file.filename}`
		return res.status(200).json({ message: 'Avatar updated', data: { avatar: user.avatar } })
	}

	return res.status(400).json({ message: 'No file uploaded' })
})

app.use('/uploads', express.static('uploads'))

app.get('/users/:userId/history', (req, res) => {
	const { userId } = req.params
	const { mode } = req.query

	const user = users.find(u => String(u.id) === String(userId))
	if (!user) return res.status(404).json({ status: 'error', message: 'User not found' })

	// 초기값 보장
	if (!user.gameData1vs1) {
		user.gameData1vs1 = { wins: 0, losses: 0, history: [] }
	}
	if (!user.gameDataTournament) {
		user.gameDataTournament = { totalWins: 0, history: [] }
	}

	if (mode === '1vs1') {
		return res.json({ status: 'success', data: user.gameData1vs1 })
	} else if (mode === 'Tournament') {
		return res.json({ status: 'success', data: user.gameDataTournament })
	}

	return res.status(400).json({ status: 'error', message: 'Invalid mode' })
})

app.post('/v1/auth/refresh-token', (req, res) => {
	const refreshToken = req.cookies.refreshToken
	if (!refreshToken) return res.status(401).json({ status: 'error', message: 'No refresh token' })

	try {
		const decoded = jwt.verify(refreshToken, REFRESH_SECRET_KEY)
		const user = users.find(u => String(u.id) === String(decoded.userId))
		if (!user) return res.status(401).json({ status: 'error', message: 'Invalid refresh token' })

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
			message: 'Access token refreshed',
			data: { accessToken: newAccessToken }
		})
	} catch {
		return res.status(401).json({ status: 'error', message: 'Invalid or expired refresh token' })
	}
})

app.post('/v1/auth/logout', (req, res) => {
	try {
		res.clearCookie('refreshToken', {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			sameSite: 'strict',
			path: '/'
		})
		return res.status(200).json({ status: 'success', message: 'Logout successful' })
	} catch {
		return res.status(500).json({ message: 'Logout error' })
	}
})

app.listen(3001, () => {
	console.log("✅ Mock server running at http://localhost:3001")
})
