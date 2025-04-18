const express = require('express')
const router = express.Router()
const gameController = require('../controllers/gameController.cjs')

// 유저 게임 기록 조회
router.get('/:userId/history', gameController.getHistory)

module.exports = router