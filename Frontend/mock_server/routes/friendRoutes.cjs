const express = require('express')
const router = express.Router()
const friendController = require('../controllers/friendController.cjs')
const authenticateToken = require('../middlewares/authMiddleware.cjs')

// ✅ 친구 목록 조회 (내 친구 중 상태별로 필터링)
router.get('/me', authenticateToken, friendController.getMyFriends)
// 닉네임으로 친구 검색
router.get('/search/:nickname', authenticateToken, friendController.searchUsersByNickname)


module.exports = router
