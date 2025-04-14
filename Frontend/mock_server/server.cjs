const express = require('express')
const cors = require('cors')
const jwt = require('jsonwebtoken')

const app = express()

// CORS 설정
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}))

app.use(express.json())
app.use((req, res, next) => {
  console.log('📥 요청 받음')
  console.log('🔗 Method:', req.method)
  console.log('📄 URL:', req.originalUrl)
  console.log('🧾 Headers:', req.headers)
  if (Object.keys(req.body).length) {
    console.log('📦 Body:', req.body)
  }
  console.log('🍪 Cookies:', req.headers.cookie)
	const authHeader = req.headers.authorization

  if (authHeader && authHeader.startsWith('Bearer ')) {
    const accessToken = authHeader.split(' ')[1]
    console.log('🔐 accessToken:', accessToken)
  } else {
    console.log('🔐 accessToken 없음 또는 형식이 잘못됨')
  }

  console.log('-----------------------------------')
  next()
})

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
		const accessToken = jwt.sign({ userId: user.id }, 'secretKey', { expiresIn: '5s' }) // 1시간
		const refreshToken = jwt.sign({ userId: user.id }, 'refreshSecretKey', { expiresIn: '10s' })
		user.refreshToken = refreshToken

    res.cookie('refreshToken', user.refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'strict',
      path: '/',
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

app.post('/v1/auth/refresh-token', (req, res) => {
  const refreshToken = req.cookies.refreshToken

  if (!refreshToken) {
    console.log("❌ 리프레시 토큰 없음");
    return res.status(401).json({
      status: 'error',
      code: 401,
      message: 'No refresh token provided'
    });
  }

  jwt.verify(refreshToken, 'refreshSecretKey', (err, decoded) => {
    if (err) {
      console.log("❌ 리프레시 토큰 검증 실패:", err.message)
      return res.status(403).json({
        status: 'error',
        code: 403,
        message: 'Invalid or expired refresh token'
      });
    }

    const userId = decoded.userId;
    const user = users.find(u => u.id === userId)

    if (!user) {
      console.log("❌ 유저 없음 (refreshToken으로)");
      return res.status(404).json({
        status: 'error',
        code: 404,
        message: 'User not found'
      });
    }

    // 새 엑세스 토큰 발급
    const newAccessToken = jwt.sign({ userId: user.id }, 'secretKey', { expiresIn: '5s' })
    user.accessToken = newAccessToken // 유저 객체 업데이트

    console.log("🔄 새 accessToken 발급:", newAccessToken)

    return res.status(200).json({
      status: 'success',
      code: 200,
      message: 'Access token refreshed',
      data: {
        accessToken: newAccessToken
      }
    });
  });
});


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

app.listen(3001, () => {
  console.log('✅ Mock server running at http://localhost:3001')
})

// 리프레쉬 토큰은 쿠키로 저장됨
// 리프레쉬 토큰 가져올 수 없게 함 (요청에 포함되도록 함-옵션이 따로 있다)