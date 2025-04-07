import { useState } from 'react'

const Score = () => {
  const [playerScore, setPlayerScore] = useState(0);
  const [opponentScore, setOpponentScore] = useState(0); 

  return (
    <div className="font-['Sixtyfour'] font-[15px] text-white">
      <span>You {playerScore} : {opponentScore} NAME</span>
    </div>
  )
}

export default Score