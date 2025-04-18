import { useEffect, useState } from "react"
import Container from "./components/Container"
import Cancel from "./components/Cancel"
import ModeSelector from "./components/ModeSelector"
import WinLossCounter from "./components/WinLossCounter"
import GameRecord from "./components/GameRecord"
import TotalWinsCounter from "./components/TotalWinsCounter"

type Game1vs1Data = {
  wins: number
  losses: number
  history: {
    player: string
    opponent: string
    result: "WIN" | "LOSE"
  }[]
}

type TournamentData = {
  totalWins: number
  history: {
    gameMode: string
    team: string[]
    result: "WIN" | "LOSE"
  }[]
}

const GameHistory = () => {
  const GameRecordClass = "absolute top-[240px] left-1/2 -translate-x-1/2"
  const [mode, setMode] = useState<"1vs1" | "Tournament">("1vs1")
  const [gameData, setGameData] = useState<Game1vs1Data | TournamentData | null>(null)

  useEffect(() => {
    const fetchGameData = async () => {
      const token = localStorage.getItem("accessToken")
      if (!token) return

      const payload = JSON.parse(atob(token.split('.')[1]))
      const userId = payload.userId

      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/users/${userId}/history?mode=${mode}`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        const result = await res.json()
        if (res.ok && result.status === "success") {
          setGameData(result.data)
        }
      } catch (err) {
        console.error("데이터 불러오기 실패", err)
      }
    }

    fetchGameData()
  }, [mode])

	return (
		<Container>
			<Cancel />
			<div className="absolute left-1/2 -translate-x-1/2 top-[60px]">
				<ModeSelector mode={mode} setMode={setMode} />
	
				{mode === "1vs1" && gameData && "wins" in gameData && "losses" in gameData ? (
					<>
						<WinLossCounter
							wins={gameData.wins ?? 0}
							losses={gameData.losses ?? 0}
						/>
						<div className={GameRecordClass}>
							<GameRecord history={gameData.history ?? []} />
						</div>
					</>
				) : mode === "Tournament" && gameData && "totalWins" in gameData ? (
					<>
						<TotalWinsCounter totalWins={gameData.totalWins ?? 0} />
						<div className={GameRecordClass}>
							<GameRecord history={gameData.history ?? []} />
						</div>
					</>
				) : null}
			</div>
		</Container>
	)
}

export default GameHistory
