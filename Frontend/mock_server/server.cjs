// server.cjs
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

const users = [
  {
    id: 1,
    email: 'test@gmail.com',
    password: '0311',
    verifyCode: '123456',
    nickname: 'testuser'
  },
  {
    id: 2,
    email: 'hyehan@gmail.com',
    password: '517624',
    verifyCode: '654321',
    nickname: 'hyehan'
  }
]

const SECRET_KEY = 'yourSecretKey'
const REFRESH_SECRET_KEY = 'yourRefreshSecretKey'

app.get('/users', (req, res) => {
  const usersWithoutPasswords = users.map(({ password, verifyCode, ...rest }) => rest)
  res.status(200).json(usersWithoutPasswords)
})

app.post('/v1/auth/login', (req, res) => {
  const { email, password } = req.body

  console.log("로그인 요청 받음:")
  console.log("이메일:", email)
  console.log("비밀번호:", password)

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

    console.log("Login Success!")

    return res.status(200).json({
      status: 'success',
      code: 200,
      message: 'Login success',
      data: {
        accessToken
      }
    });
  }

  console.log("Login Failure!")

  return res.status(401).json({
    status: 'error',
    code: 401,
    message: 'Invalid credentials.'
  })
})

// 회원가입 테스트
app.post('/users', (req, res) => {
  const { email, password, repassword, nickname, verifyCode } = req.body;

  // 1. 필드 확인
  if (!email || !password || !repassword || !nickname || !verifyCode) {
    return res.status(400).json({
      status: 'error',
      message: '모든 항목을 입력해 주세요.'
    });
  }

  // 2. 비밀번호 일치
  if (password !== repassword) {
    return res.status(400).json({
      status: 'error',
      message: '비밀번호가 일치하지 않습니다.'
    });
  }

  // 3. 이메일 중복
  const emailTaken = users.find(u => u.email === email);
  if (emailTaken) {
    return res.status(409).json({
      status: 'error',
      message: '이미 사용 중인 이메일입니다.'
    });
  }

  // 4. 닉네임 중복
  const nicknameTaken = users.find(u => u.nickname === nickname);
  if (nicknameTaken) {
    return res.status(400).json({
      status: 'error',
      message: '이미 사용 중인 닉네임입니다.'
    });
  }

  // 5. 인증 코드 확인 (pendingVerifications에서 검증)
  const pending = pendingVerifications.find(v => v.email === email);

  if (!pending || pending.verifyCode !== verifyCode) {
    return res.status(401).json({
      status: 'error',
      message: '잘못된 인증 코드입니다.'
    });
  }

  // ✅ 검증 통과 후, 해당 인증 기록 제거 (1회성 사용)
  pendingVerifications = pendingVerifications.filter(v => v.email !== email)

  // 6. 유저 등록
  const newUser = {
    id: String(Date.now()),
    email,
    password,
    nickname,
    verifyCode
  };

  users.push(newUser)

  return res.status(201).json({
    status: 'success',
    message: '회원가입 완료',
    data: {
      id: newUser.id,
      email: newUser.email,
      nickname: newUser.nickname
    }
  })
})

// 메일 인증 테스트
let pendingVerifications = []

app.post('/v1/auth/mail', (req, res) => {
  const { email, verifyCode } = req.body

  if (!email) {
    return res.status(400).json({
      status: 'error',
      message: '이메일이 필요합니다.'
    })
  }

  // 🔍 인증 코드 확인 요청
  if (verifyCode) {
    const pending = pendingVerifications.find(v => v.email === email)

    if (!pending) {
      return res.status(404).json({
        status: 'error',
        message: '인증 요청 기록이 없습니다.'
      })
    }

    if (pending.verifyCode !== verifyCode) {
      return res.status(401).json({
        status: 'error',
        message: '인증 코드가 일치하지 않습니다.'
      })
    }

    return res.status(200).json({
      status: 'success',
      message: '인증 성공'
    })
  }

  // ✅ 인증 코드 발급 요청
  const newCode = Math.floor(100000 + Math.random() * 900000).toString()

  // 같은 이메일 있으면 제거
  pendingVerifications = pendingVerifications.filter(v => v.email !== email)

  // 새 코드 저장
  pendingVerifications.push({ email, verifyCode: newCode })

  console.log(`📨 인증 코드 발급: ${email} → ${newCode}`)

  return res.status(200).json({
    status: 'success',
    message: '인증 코드 발급 완료',
    data: {
      verifyCode: newCode // 테스트용 반환
    }
  })
})

// 리프레쉬 토큰 테스트
app.post('/v1/auth/refresh-token', (req, res) => {
  const refreshToken = req.cookies.refreshToken

  if (!refreshToken) {
    console.log("❌ 리프레시 토큰 없음")
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
      console.log("❌ 유저 없음")
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

    console.log("🔄 새 accessToken 및 refreshToken 발급:", newAccessToken)

    return res.status(200).json({
      status: 'success',
      code: 200,
      message: 'Access token refreshed',
      data: {
        accessToken: newAccessToken
      }
    })
  } catch (err) {
    console.log("❌ 리프레시 토큰 만료 또는 오류:", err.message);
    return res.status(401).json({
      status: 'error',
      code: 401,
      message: 'Invalid or expired refresh token.'
    })
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

    console.log("로그아웃 처리됨: refreshToken 삭제됨")

    return res.status(200).json({
      status: 'success',
      code: 200,
      message: 'Logout successful. Refresh token cleared.'
    })
  } catch (error) {
    console.error('로그아웃 처리 중 에러:', error);
    return res.status(500).json({ message: 'Logout error' })
  }
})

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

  const requestedId = parseInt(req.params.id, 10)
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
      wins: 99,
      losses: 5,
      tournamentWins: 12
    }
  })
})

app.listen(3001, () => {
  console.log("✅ Mock server running at http://localhost:3001")
})
