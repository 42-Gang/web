const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController.cjs')

router.get('/ping', authController.ping) // GET /v1/auth/ping
router.post('/login', authController.login) // POST /v1/auth/login
router.post('/mail', authController.mail) // POST /v1/auth/mail
router.post('/refresh-token', authController.refreshToken) // POST /v1/auth/refresh-token
router.post('/logout', authController.logout) // POST /v1/auth/logout

module.exports = router

// get: 데이터 요청(조회)
// post: 데이터 전송(등록, 제출)