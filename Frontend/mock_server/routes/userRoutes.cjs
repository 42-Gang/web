const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController.cjs')
const authenticateToken = require('../middlewares/authMiddleware.cjs')
const multer = require('multer')
const fs = require('fs')

// Multer 업로드 설정
const upload = multer({
	dest: 'uploads/',
	limits: {
		filesSize: 5 * 1024 * 1024
	}
})

if (!fs.existsSync('uploads')) {
	fs.mkdirSync('uploads')
}

// 회원 가입 (등록)
router.post('/', userController.register)
// 유저 전체 조회
router.get('/', userController.getUsers)
// 유저 정보 조회 (토큰 검증)
router.get('/:id', authenticateToken, userController.getUserById)
// 닉네임 변경
router.patch('/:id/nickname', authenticateToken, userController.updateNickname)
// 아바타 변경/삭제
router.post('/:id/avatar', authenticateToken, upload.single('avatar'), userController.updateAvatar)

module.exports = router