// mock_server/data/users.js
const users = [
  {
    id: "1",
    email: 'test@gmail.com',
    password: '0311',
    nickname: 'testuser',
    avatar: null,
    gameData1vs1: {
      wins: 135,
      losses: 15,
      history: [
        { player: "Jungslee", opponent: "PONG", result: "WIN" },
        { player: "Inryu", opponent: "PONG", result: "WIN" },
        { player: "Yeeunpar", opponent: "PONG", result: "LOSE" },
        { player: "Hyehan", opponent: "PONG", result: "WIN" },
        { player: "Wooshin", opponent: "PONG", result: "LOSE" },
        { player: "Wooshin", opponent: "PONG", result: "WIN" },
        { player: "Wooshin", opponent: "PONG", result: "LOSE" },
        { player: "Yeeunpar", opponent: "PONG", result: "WIN" }
      ]
    },
    gameDataTournament: {
      totalWins: 112,
      history: [
        { gameMode: "ROUND 4", team: ["Jungslee", "Ping", "Pong", "Inryu"], result: "WIN" },
        { gameMode: "ROUND 4", team: ["Jungslee", "Ping", "Pong", "Inryu"], result: "LOSE" },
        { gameMode: "ROUND 4", team: ["Jungslee", "Ping", "Pong", "Inryu"], result: "LOSE" },
        { gameMode: "ROUND 4", team: ["Jungslee", "Ping", "Pong", "Inryu"], result: "LOSE" }
      ]
    }
  }
];

let pendingVerifications = [];

module.exports = { users, pendingVerifications };
