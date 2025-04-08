import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

interface GameOverPopupProps {
	isPlayerWinner: boolean
}

const GameOverPopup: React.FC<GameOverPopupProps> = ({ isPlayerWinner }) => {
	const navigate = useNavigate()

	useEffect(() => {
		const timeout = setTimeout(() => {
			navigate("/SoloMatch", { state: { winner: isPlayerWinner ? "player" : "opponent" } })
		}, 5000)

		return () => clearTimeout(timeout)
	}, [navigate, isPlayerWinner])

	return (
		<div className="bg-black w-[630px] h-[161px] flex items-center justify-center rounded-xl shadow-xl">
			<p className="font-['Sixtyfour'] text-white text-xl text-center leading-[50px]">
				<span className={isPlayerWinner ? "text-green-400" : "text-red-400"}>
					{isPlayerWinner ? "You" : "Opponent"}
				</span> won the game!
				<br />
				Back to the lobby in 5 sec!
			</p>
		</div>
	)
}

export default GameOverPopup