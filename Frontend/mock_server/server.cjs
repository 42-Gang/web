// express기반 mocking 서버
const express = require('express') // 웹 프레임워크
const cors = require('cors') // 다른 도메인에서 요청을 허용하는 미들웨어
const cookieParser = require('cookie-parser') // 요청 쿠키를 읽게 도와주는 미들웨어
const fs = require('fs') // 디렉토리 파일을 만들거나 읽는 모듈

const app = express()

app.use(cors({
	origin: 'http://localhost:5173',
	credentials: true // 쿠키 등을 포함한 인증 정보 허용
}))

app.use(express.json())
app.use(cookieParser())

// 정적 파일(uploads 폴더) 제공
if (!fs.existsSync('uploads')) {
	fs.mkdirSync('uploads')
}

app.use('/uploads', express.static('uploads'))

// 라우트 등록
const authRoutes = require('./routes/authRoutes.cjs')
const userRoutes = require('./routes/userRoutes.cjs')
const friendRoutes = require('./routes/friendRoutes.cjs')

// const gameRoutes = require('./routes/gameRoutes.cjs')

app.use('/v1/auth', authRoutes)
app.use('/users', userRoutes)
app.use('/api/friends', friendRoutes)
// app.use('/users', gameRoutes)

app.listen(3001, () => {
	console.log("✅ Mock server running at http://localhost:3001")
})