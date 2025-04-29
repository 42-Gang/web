interface GameRecordProps {
  history: Array<
    | { player: string; opponent: string; result: string } // 1vs1 모드
    | { gameMode: string; team: string[], result: string } // Tournament 모드
  >;
}

const GameRecord: React.FC<GameRecordProps> = ({ history }) => {
  const getResultClass = (result: string) => {
    return result === "WIN" ? "text-blue-500" : "text-red-500"
  }

  return (
    <div className="font-['Sixtyfour'] font-bold w-[452px] h-[47px]">
      <div className="max-h-[260px] overflow-y-auto custom-scrollbar">
        {history.map(( game, index ) => (
          <div
            key={index}
            className="bg-gray-300 text-black rounded-md p-3 my-1 flex justify-between"
          >
            {"player" in game ? (
              <>
                <span className="text-[14px] flex items-center">
                  {game.player} VS {game.opponent}
                </span>
                <span className={`${getResultClass(game.result)}`}>
                  {game.result}!
                </span>
              </>
            ) : (
              <>
                <span>{game.gameMode}</span>
                <div>
                  {game.team.map(( member, i) => (
                    <div
                      key={i}
                      className="text-[14px] flex justify-center">
                        {member}
                    </div>
                  ))}
                </div>
                <span className={`${getResultClass(game.result)}`}>
                  {game.result}!
                </span>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default GameRecord