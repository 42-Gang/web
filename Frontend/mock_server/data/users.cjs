const users = [
  {
    id: "1",
    email: 'test@gmail.com',
    password: '0311',
    nickname: 'testuser',
    avatar: null,
		status: 'online',
    friends: [
      {
        friend_id: "2",
        status: "ACCEPTED"
      },
      {
        friend_id: "3",
        status: "BLOCKED"
      }
    ],
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
      totalWins: 4,
      history: [
        { gameMode: "ROUND 4", team: ["Jungslee", "Ping", "Pong", "Inryu"], result: "WIN" },
        { gameMode: "ROUND 4", team: ["Jungslee", "Ping", "Pong", "Inryu"], result: "LOSE" },
        { gameMode: "ROUND 4", team: ["Jungslee", "Ping", "Pong", "Inryu"], result: "LOSE" },
        { gameMode: "ROUND 4", team: ["Jungslee", "Ping", "Pong", "Inryu"], result: "LOSE" }
      ]
    }
  },
  {
    id: "2",
    email: 'john@example.com',
    password: '1234',
    nickname: 'hyehan',
    avatar: null,
		status: 'gaming',
    friends: [
      {
        friend_id: "1",
        status: "ACCEPTED"
      }
    ],
    gameData1vs1: { wins: 0, losses: 0, history: [] },
    gameDataTournament: { totalWins: 0, history: [] }
  },
  {
    id: "3",
    email: 'jane@example.com',
    password: '1234',
    nickname: 'JaneDoe',
    avatar: null,
		status: 'offline',
    friends: [
      {
        friend_id: "1",
        status: "BLOCKED"
      }
    ],
    gameData1vs1: { wins: 0, losses: 0, history: [] },
    gameDataTournament: { totalWins: 0, history: [] }
  },
	{
    id: "4",
    email: 'noFriend1@example.com',
    password: '1234',
    nickname: 'soloplayer',
    avatar: null,
    status: 'online',
    friends: [],
    gameData1vs1: { wins: 10, losses: 3, history: [] },
    gameDataTournament: { totalWins: 5, history: [] }
  },
  {
    id: "5",
    email: 'noFriend2@example.com',
    password: '1234',
    nickname: 'ghost',
    avatar: null,
    status: 'offline',
    friends: [],
    gameData1vs1: { wins: 0, losses: 0, history: [] },
    gameDataTournament: { totalWins: 0, history: [] }
  },
  {
    id: "6",
    email: 'noFriend3@example.com',
    password: '1234',
    nickname: 'addMePlz',
    avatar: null,
    status: 'away',
    friends: [],
    gameData1vs1: { wins: 2, losses: 6, history: [] },
    gameDataTournament: { totalWins: 1, history: [] }
  },
	{
		id: "7",
		email: "addicted@example.com",
		password: "1234",
		nickname: "addicted",
		avatar: null,
		status: "online",
		friends: [],
		gameData1vs1: { wins: 4, losses: 1, history: [] },
		gameDataTournament: { totalWins: 2, history: [] }
	},
	{
		id: "8",
		email: "addy@example.com",
		password: "1234",
		nickname: "addy",
		avatar: null,
		status: "offline",
		friends: [],
		gameData1vs1: { wins: 0, losses: 0, history: [] },
		gameDataTournament: { totalWins: 0, history: [] }
	},
	{
		id: "9",
		email: "addams@example.com",
		password: "1234",
		nickname: "addams",
		avatar: null,
		status: "gaming",
		friends: [],
		gameData1vs1: { wins: 2, losses: 2, history: [] },
		gameDataTournament: { totalWins: 1, history: [] }
	}
	
]

let pendingVerifications = []

module.exports = { users, pendingVerifications }
