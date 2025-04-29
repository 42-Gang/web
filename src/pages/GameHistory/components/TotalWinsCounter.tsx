interface TotalWinsProps {
  totalWins: number
}

const TotalWins: React.FC<TotalWinsProps> = ({ totalWins }) => {
  const formattedTotalWins = Math.min(totalWins, 999)

  return (
    <div className="text-white font-['Sixtyfour'] text-[40px] flex flex-col items-center mt-5">
      <div className="flex justify-center gap-[190px] ml-[-10px]">
        <h2 className="absolute w-[400px] text-center">Total Wins</h2>
      </div>
      <div className="flex justify-center text-yellow-300">
        <div className="w-[80px] relative">
            <p className="absolute left-1/2 transform -translate-x-1/2 top-[60px]">
              {formattedTotalWins}
            </p>
        </div>
      </div>
    </div>
  )
}

export default TotalWins