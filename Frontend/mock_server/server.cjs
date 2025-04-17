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

// 로그인
app.get('/users', (req, res) => {
  const usersWithoutPasswords = users.map(({ password, verifyCode, ...rest }) => rest)
  res.status(200).json(usersWithoutPasswords)
})

app.post('/v1/auth/login', (req, res) => {
  const { email, password } = req.body

  console.log("Receive a login request:")
  console.log("Email:", email)
  console.log("Password:", password)

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
// 회원가입
app.post('/users', (req, res) => {
  const { email, password, repassword, nickname, verifyCode } = req.body;

  if (!email || !password || !repassword || !nickname || !verifyCode) {
    return res.status(400).json({
      status: 'ERROR',
      message: 'Missing required fields.',
      errors: [
        { field: 'form', message: 'Please enter all the information.' }
      ],
      data: null
    })
  }

  if (password !== repassword) {
    return res.status(400).json({
      status: 'ERROR',
      message: 'Password mismatch.',
      errors: [
        { field: 'repassword', message: 'Password does not match!' }
      ],
      data: null
    })
  }

  const emailTaken = users.find(u => u.email === email)
  if (emailTaken) {
    return res.status(409).json({
      status: 'ERROR',
      message: 'Validation failed.',
      errors: [
        { field: 'email', message: 'This email is already in use.' }
      ],
      data: null
    })
  }

  const nicknameTaken = users.find(u => u.nickname === nickname)
  if (nicknameTaken) {
    return res.status(400).json({
      status: 'ERROR',
      message: 'Validation failed.',
      errors: [
        { field: 'nickname', message: 'Nickname is already in use.' }
      ],
      data: null
    })
  }

  const pending = pendingVerifications.find(v => v.email === email)
  if (!pending || pending.verifyCode !== verifyCode) {
    return res.status(401).json({
      status: 'ERROR',
      message: 'Invalid verify code.',
      errors: [
        { field: 'verifyCode', message: 'The authentication code does not match.' }
      ],
      data: null
    })
  }

  pendingVerifications = pendingVerifications.filter(v => v.email !== email)

  const newUser = {
    id: String(Date.now()),
    email,
    password,
    nickname,
    verifyCode
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

// 메일 인증 테스트
let pendingVerifications = []

app.post('/v1/auth/mail', (req, res) => {
  const { email, verifyCode } = req.body

  if (!email) {
    return res.status(400).json({
      status: 'ERROR',
      message: 'Missing required field.',
      errors: [
        { field: 'email', message: 'Please enter your email.' }
      ],
      data: null
    })
  }

  if (verifyCode) {
    const pending = pendingVerifications.find(v => v.email === email)

    if (!pending) {
      return res.status(404).json({
        status: 'ERROR',
        message: 'No authentication request found.',
        errors: [
          { field: 'verifyCode', message: 'There is no history of authentication requests.' }
        ],
        data: null
      })
    }

    if (pending.verifyCode !== verifyCode) {
      return res.status(401).json({
        status: 'ERROR',
        message: 'Authentication failed.',
        errors: [
          { field: 'verifyCode', message: 'The authentication code does not match.' }
        ],
        data: null
      })
    }

    return res.status(200).json({
      status: 'SUCCESS',
      message: 'Authentication successful.',
      errors: [],
      data: {
        verifyCode: pending.verifyCode
      }
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
    data: {
      verifyCode: newCode
    }
  })
})

// 리프레쉬 토큰 테스트
app.post('/v1/auth/refresh-token', (req, res) => {
  const refreshToken = req.cookies.refreshToken

  if (!refreshToken) {
    console.log("❌ No refresh token")
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
      console.log("❌ No User")
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

    console.log("🔄 Issue new access tokens and refresh tokens:", newAccessToken)

    return res.status(200).json({
      status: 'success',
      code: 200,
      message: 'Access token refreshed',
      data: {
        accessToken: newAccessToken
      }
    })
  } catch (err) {
    console.log("❌ Refresh token expiration or error:", err.message);
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

    console.log("Logout processed: refresh token deleted")

    return res.status(200).json({
      status: 'success',
      code: 200,
      message: 'Logout successful. Refresh token cleared.'
    })
  } catch (error) {
    console.error('Error processing logout:', error);
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
