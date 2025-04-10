const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')

const app = express()

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
    password: 'password0311',
    accessToken: 'jwt_access_token',
    refreshToken: 'jwt_refresh_token'
  }
]

app.post('/api/login', (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({
      status: 'error',
      code: 400,
      message: 'Missing email or password.'
    })
  }

  const user = users.find(u => u.email === email && u.password === password) // 일치하는 유저가 있는지 탐색

  if (user) {
    res.cookie('refreshToken', user.refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      path: '/auth/refresh-token',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7일
    })

    return res.status(200).json({
      status: 'success',
      code: 200,
      message: 'Login success',
      data: {
        accessToken: user.accessToken
      }
    })
  }

  return res.status(401).json({
    status: 'error',
    code: 401,
    message: 'Invalid email or password.'
  })
})

app.listen(3001, () => {
  console.log('✅ Mock server running at http://localhost:3001')
})