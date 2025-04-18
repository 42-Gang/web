// mock_server/controllers/gameController.js
const { users } = require("../data/users.cjs");

exports.getHistory = (req, res) => {
  const { userId } = req.params;
  const { mode } = req.query;

  const user = users.find(u => String(u.id) === String(userId));
  if (!user) return res.status(404).json({ status: 'error', message: 'User not found' });

  // 초기값 보장
  if (!user.gameData1vs1) {
    user.gameData1vs1 = { wins: 0, losses: 0, history: [] };
  }
  if (!user.gameDataTournament) {
    user.gameDataTournament = { totalWins: 0, history: [] };
  }

  if (mode === '1vs1') {
    return res.json({ status: 'success', data: user.gameData1vs1 });
  } else if (mode === 'Tournament') {
    return res.json({ status: 'success', data: user.gameDataTournament });
  }
  return res.status(400).json({ status: 'error', message: 'Invalid mode' });
};
