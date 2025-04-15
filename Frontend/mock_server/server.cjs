require('dotenv').config()
const express = require('express')
const cors = require('cors')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const app = express()

// CORS 설정
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}))

app.use(express.json())
app.use(cookieParser())

// Mock user DB
const users = [
  {
    id: 1,
    email: 'test@gmail.com',
    password: '0311'
  },
  {
    id: 2,
    email: 'hyehan@gmail.com',
    password: '517624'
  }
]

// 로그인 테스트
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
    const accessToken = jwt.sign({ userId: user.id }, 'secretKey', { expiresIn: '1h' })
    const refreshToken = jwt.sign({ userId: user.id }, 'refreshSecretKey', { expiresIn: '7d' })

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7일
    })

    console.log("Login Success!");

    return res.status(200).json({
      status: 'success',
      code: 200,
      message: 'Login success',
      data: {
        accessToken
      }
    });
  }

  console.log("Login Failure!");

  return res.status(401).json({
    status: 'error',
    code: 401,
    message: 'Invalid credentials.'
  })
})

// 리프레시 토큰을 통한 accessToken 재발급
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
    const decoded = jwt.verify(refreshToken, 'refreshSecretKey')
    const user = users.find(u => u.id === decoded.userId)

    if (!user) {
      console.log("❌ 유저 없음")
      return res.status(401).json({
        status: 'error',
        code: 401,
        message: 'Invalid refresh token.'
      })
    }

    const newAccessToken = jwt.sign({ userId: user.id }, 'secretKey', { expiresIn: '1h' })
    console.log("🔄 새 accessToken 발급:", newAccessToken)

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

// 로그아웃 처리
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

// 유저 프로필 조회 테스트
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
  const user = users.find(u => u.accessToken === token)

  if (!user) {
    return res.status(403).json({
      status: 'error',
      code: 403,
      message: 'Invalid or expired token'
    })
  }

  // id 매칭 확인
  const requestedId = parseInt(req.params.id, 10)
  if (user.id !== requestedId) {
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
      nickname: 'hyehan', // 예시 데이터
      wins: 99,
      losses: 5,
      tournamentWins: 12
    }
  })
})

const apiUrl = process.env.API_URL

app.listen(3001, () => {
  console.log(`✅ Mock server running at ${apiUrl}`)
})