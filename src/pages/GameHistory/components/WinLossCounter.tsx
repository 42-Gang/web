interface WinLossCounterProps {
  wins: number
  losses: number
}

const WinLossCounter: React.FC<WinLossCounterProps> = ({ wins, losses }) => {
  const CounterTextClass = "w-[80px] text-center"
  const ScoreClass = "w-[80px] flex justify-center"
  const formattedWins = Math.min(wins, 999)
  const formattedLosses = Math.min(losses, 999)

  return (
    <div className="text-white font-['Sixtyfour'] text-[40px] flex flex-col items-center mt-5">
      <div className="flex justify-center gap-[190px] ml-[-70px]">
        <h2 className={CounterTextClass}>WIN</h2>
        <h2 className={CounterTextClass}>LOSE</h2>
      </div>
      <div className="text-yellow-300 absolute flex -left-[15px] gap-[210px] top-[160px]">
        <div className={ScoreClass}>
          <p>{formattedWins}</p>
        </div>
        <div className={ScoreClass}>
          <p>{formattedLosses}</p>
        </div>
      </div>
    </div>
  )
}

export default WinLossCounter