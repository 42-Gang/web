// mock_server/controllers/friendController.cjs
const { users } = require('../data/users.cjs')

// controllers/friendController.cjs
exports.getMyFriends = (req, res) => {
  const currentUserId = req.user.userId
  const { status } = req.query // status는 문자열 또는 배열(string|string[])

  const currentUser = users.find(u => u.id === currentUserId)
  if (!currentUser) {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  const statusArray = Array.isArray(status) ? status : [status]

  const filtered = currentUser.friends.filter(friend =>
    statusArray.includes(friend.status)
  ).map(friend => {
    const friendUser = users.find(u => u.id === friend.friend_id)
    return {
      friend_id: friend.friend_id,
      nickname: friendUser?.nickname || 'Unknown',
      avatar_url: friendUser?.avatar || null,
      status: friendUser?.status || 'offline',
      relation_status: friend.status
    }
  })

  return res.status(200).json({
    status: 'success',
    message: 'Friend list filtered',
    data: { friends: filtered }
  })
}


// 닉네임 검색 (대소문자 구분 O, 시작 문자열 기준, 자기 자신/친구 제외)
exports.searchUsersByNickname = (req, res) => {
  const { nickname } = req.params
  const currentUserId = req.user?.userId

  console.log("🔐 [search] req.user:", req.user)
  console.log("🧍 currentUserId:", currentUserId)

  if (!nickname) {
    return res.status(400).json({
      status: 'error',
      message: 'Nickname query is required'
    })
  }

  const currentUser = users.find(u => String(u.id) === String(currentUserId))
  if (!currentUser) {
    console.log("❌ currentUser not found in users list.")
    return res.status(401).json({
      status: 'error',
      message: 'Invalid token user'
    })
  }

  const friendIds = currentUser.friends?.map(f => f.friend_id) || []

  // ✅ 디버깅용 로그
  console.log("🔍 검색어:", nickname)
  console.log("📋 모든 유저:", users.map(u => u.nickname))
  console.log("🙋 현재 유저:", currentUser.nickname)
  console.log("🙅 친구들:", friendIds)

  const matchedUsers = users
    .filter(user =>
      user.nickname.startsWith(nickname) &&  // ← 대소문자 구분 O
      user.id !== currentUserId &&
      !friendIds.includes(user.id)
    )
    .map(user => ({
      id: user.id,
      nickname: user.nickname,
      avatar: user.avatar,
      status: user.status
    }))

  // ✅ 최종 결과 로그
  console.log("✅ 최종 결과:", matchedUsers.map(u => u.nickname))

  return res.status(200).json({
    status: 'success',
    message: 'User search success',
    data: matchedUsers
  })
}
