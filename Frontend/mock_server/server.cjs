const express = require('express')
const cors = require('cors')
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
    password: 'password0311',
    accessToken: 'jwt_access_token',
    refreshToken: 'jwt_refresh_token'
  }
]

// 로그인 테스트
app.post('/v1/auth/login', (req, res) => {
  const { email, password } = req.body

// 콘솔에 입력값 로그 출력
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

  const user = users.find(u => u.email === email && u.password === password) // 일치하는 유저가 있는지 탐색

  if (user) {
    res.cookie('refreshToken', user.refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      path: '/v1/auth/refresh-token',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7일
    })
		
		console.log("로그인 성공!")

    return res.status(200).json({
      status: 'success',
      code: 200,
      message: 'Login success',
      data: {
        accessToken: user.accessToken
      }
    })
  }

		console.log("로그인 실패!")

  return res.status(401).json({
    status: 'error',
    code: 401,
    message: 'Invalid email or password.'
  })
})

app.listen(3001, () => {
  console.log('✅ Mock server running at http://localhost:3001')
})