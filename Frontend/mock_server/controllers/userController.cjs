// mock_server/controllers/userController.js
const { users, pendingVerifications } = require("../data/users.cjs");

exports.register = (req, res) => {
  const { email, password, repassword, nickname, verifyCode } = req.body;

  if (!email || !password || !repassword || !nickname || !verifyCode) {
    return res.status(400).json({ status: 'ERROR', message: 'Missing required fields.' });
  }
  if (password !== repassword) {
    return res.status(400).json({ status: 'ERROR', message: 'Password mismatch.' });
  }
  if (users.find(u => u.email === email)) {
    return res.status(409).json({ status: 'ERROR', message: 'This email is already in use.' });
  }
  if (users.find(u => u.nickname === nickname)) {
    return res.status(400).json({ status: 'ERROR', message: 'Nickname is already in use.' });
  }

  const pending = pendingVerifications.find(v => v.email === email);
  if (!pending || pending.verifyCode !== verifyCode) {
    return res.status(401).json({ status: 'ERROR', message: 'Invalid verify code.' });
  }
  // pendingVerifications에서 제거
  const index = pendingVerifications.findIndex(v => v.email === email);
  if (index !== -1) pendingVerifications.splice(index, 1);

  const newUser = {
    id: String(Date.now()),
    email,
    password,
    nickname,
    verifyCode,
    avatar: null,
    gameData1vs1: { wins: 0, losses: 0, history: [] },
    gameDataTournament: { totalWins: 0, history: [] }
  };

  users.push(newUser);

  return res.status(201).json({
    status: 'SUCCESS',
    data: { id: newUser.id, email: newUser.email, nickname: newUser.nickname }
  });
};

exports.getUsers = (req, res) => {
  const usersWithoutSensitive = users.map(({ password, verifyCode, ...rest }) => rest);
  return res.status(200).json(usersWithoutSensitive);
};

exports.getUserById = (req, res) => {
  // 이미 인증 미들웨어로 검증된 req.user 사용
  const requestedId = req.params.id;
  const user = users.find(u => String(u.id) === String(req.user.userId));
  if (!user || String(user.id) !== String(requestedId)) {
    return res.status(403).json({ status: 'error', message: 'Unauthorized access' });
  }
  return res.status(200).json({
    status: 'success',
    data: {
      id: user.id,
      email: user.email,
      nickname: user.nickname,
      avatar: user.avatar
    }
  });
};

exports.updateNickname = (req, res) => {
  const userId = req.params.id;
  if (String(userId) !== String(req.user.userId)) {
    return res.status(403).json({ message: 'Forbidden' });
  }

  const { nickname } = req.body;
  if (!nickname || nickname.length > 8) {
    return res.status(400).json({ message: 'Invalid nickname' });
  }
  const user = users.find(u => String(u.id) === String(userId));
  if (!user) return res.status(404).json({ message: 'User not found' });

  user.nickname = nickname;
  return res.status(200).json({ message: 'Nickname updated', data: { nickname } });
};

exports.updateAvatar = (req, res) => {
  const userId = req.params.id;
  if (String(userId) !== String(req.user.userId)) {
    return res.status(403).json({ message: 'Forbidden' });
  }
  const user = users.find(u => String(u.id) === String(userId));
  if (!user) return res.status(404).json({ message: 'User not found' });

  // 삭제 요청 처리
  if (req.body.delete === 'true') {
    user.avatar = null;
    return res.status(200).json({ message: 'Avatar deleted', data: { avatar: null } });
  }
  if (req.file) {
    user.avatar = `http://localhost:3001/uploads/${req.file.filename}`;
    return res.status(200).json({ message: 'Avatar updated', data: { avatar: user.avatar } });
  }
  return res.status(400).json({ message: 'No file uploaded' });
};
