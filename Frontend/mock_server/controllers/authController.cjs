// mock_server/controllers/authController.js
const jwt = require("jsonwebtoken")
const { generateAccessToken, generateRefreshToken, verifyToken, SECRET_KEY, REFRESH_SECRET_KEY } = require("../utils/jwtUtils.cjs")
const { users, pendingVerifications } = require("../data/users.cjs")

exports.ping = (req, res) => {
  res.status(200).json({ status: 'success', message: 'Auth service is alive!' })
}

exports.login = (req, res) => {
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
    const accessToken = generateAccessToken(user.id)
    const refreshToken = generateRefreshToken(user.id)

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7days
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
}

exports.mail = (req, res) => {
  const { email, verifyCode } = req.body
  if (!email) return res.status(400).json({ status: 'ERROR', message: 'Missing email' })

  if (verifyCode) {
    const pending = pendingVerifications.find(v => v.email === email)
    if (!pending) return res.status(404).json({ status: 'ERROR', message: 'No request found.' })
    if (pending.verifyCode !== verifyCode) return res.status(401).json({ status: 'ERROR', message: 'Code mismatch.' })
    return res.status(200).json({ status: 'SUCCESS', data: { verifyCode: pending.verifyCode } })
  }

  const newCode = Math.floor(100000 + Math.random() * 900000).toString()
  // 최신 pendingVerifications로 교체
  const index = pendingVerifications.findIndex(v => v.email === email)
  if (index !== -1) pendingVerifications.splice(index, 1)
  pendingVerifications.push({ email, verifyCode: newCode })
  console.log(`📨 Auth code for ${email}: ${newCode}`)

  return res.status(200).json({ status: 'SUCCESS', data: { verifyCode: newCode } })
}

exports.refreshToken = (req, res) => {
  const refreshToken = req.cookies.refreshToken
  if (!refreshToken) return res.status(401).json({ status: 'error', message: 'No refresh token' })

  try {
    const decoded = verifyToken(refreshToken, 'refresh')
    const user = users.find(u => String(u.id) === String(decoded.userId))
    if (!user) return res.status(401).json({ status: 'error', message: 'Invalid refresh token' })

    const newAccessToken = generateAccessToken(user.id)
    const newRefreshToken = generateRefreshToken(user.id)

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
}

exports.logout = (req, res) => {
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
}
