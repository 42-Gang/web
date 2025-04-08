import { useState, useEffect } from 'react'
import { AnimatePresence } from "framer-motion"
import GameOverPopup from './GameOverPopup'
import { FadeOverlay, PopupWrapper } from './Animation'

const Score = () => {
  const [playerScore, setPlayerScore] = useState(0);
  const [opponentScore, setOpponentScore] = useState(0); 
	const [isGameOver, setIsGameOver] = useState(false)
	const [winnerId, setWinnerId] = useState<number | null>(null)
	const [isDeuce, setIsDeuce] = useState(false)

	// 임시 유저 데이터
	const playerId = 1
	const opponentId = 2

	// 점수 차이에 따라 우승 팝업, 듀스 알림 띄우기
	useEffect(() => {
		const diff = Math.abs(playerScore - opponentScore)
	
		if ((playerScore >= 11 || opponentScore >= 11) && diff >= 2) {
			setIsGameOver(true)
			setWinnerId(playerScore > opponentScore ? playerId : opponentId)
			setIsDeuce(false)
		} else if ((playerScore >= 10 && opponentScore >= 10) && diff === 1) {
			setIsDeuce(true)
		} else {
			setIsDeuce(false)
		}
	}, [playerScore, opponentScore])
	
  return (
    <div className="font-['Sixtyfour'] font-[15px] relative">
			{/* 듀스 메세지 */}
			{isDeuce && (
				<div className="text-yellow-400 absolute bottom-[30px] left-[95px]">
					Deuce!
				</div>
			)}
			{/* 점수판 */}
			<div className="text-white w-[300px] text-center">
				You {String(playerScore).padStart(3, '0')} : {String(opponentScore).padStart(3, '0')} NAME
			</div>
			{/* 팝업 메세지 */}
			<div className="relative z-50">
				<AnimatePresence>
					{isGameOver && winnerId != null && (
						<>
							<div className="fixed inset-0">
								<FadeOverlay/>
								<PopupWrapper>
									<GameOverPopup isPlayerWinner={winnerId === playerId}/>
								</PopupWrapper>
							</div>
						</>
					)}
				</AnimatePresence>
			</div>
			{/* 테스트용 점수 증가 버튼(삭제 예정) */}
			<div className="fixed bottom-6 right-6 flex gap-4 z-10">
				<button onClick={() => setPlayerScore(s => s + 1)} className="bg-blue-600 px-4 py-2 rounded">+1 Player</button>
				<button onClick={() => setOpponentScore(s => s + 1)} className="bg-red-600 px-4 py-2 rounded">+1 Opponent</button>
			</div>
    </div>
  )
}

export default Score