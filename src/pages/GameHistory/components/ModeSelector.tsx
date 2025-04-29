import HistoryButtonOff from '../../../assets/image/HistoryButtonOff.png'
import HistoryButtonOn from '../../../assets/image/HistoryButtonOn.png'

interface ModeSelectorProps {
  mode: "1vs1" | "Tournament"
  setMode: (mode: "1vs1" | "Tournament") => void
}

const ModeSelector: React.FC<ModeSelectorProps> = ({ mode, setMode }) => {
  const fontClass = "text-white font-['Sixtyfour'] text-[12px] absolute top-[10px]"
  const buttonClass = "cursor-pointer relative group w-[149px] h-[37px]"
  const imgClass = "absolute inset-0 transition-opacity duration-300"
  const hoverOn = "opacity-100 group-hover:opacity-100"
  const hoverOff = "opacity-100 group-hover:opacity-0"
  const is1vs1 = mode === "1vs1"
  const isTournament = mode === "Tournament"

  return (
    <div className="text-white font-['Sixtyfour'] text-[16px]">
      <h2>Please select the mode</h2>
      <div className="flex justify-center gap-[50px] mt-[10px]">
        <button
          onClick={() => setMode("1vs1")}
          className={buttonClass}>
          <img
            src={HistoryButtonOn}
            alt="Button On"
            className={`${imgClass} ${
              is1vs1 ? "opacity-100" : hoverOn}`}
          />
          <img
            src={HistoryButtonOff}
            alt="Button Off"
            className={`${imgClass} opacity-0 ${
              is1vs1 ? "opacity-0" : hoverOff}`}
          />
          <span className={`${fontClass} right-[50px]`}>1vs1</span>
        </button>
        <button
          onClick={() => setMode("Tournament")}
          className={buttonClass}
        >
          <img
            src={HistoryButtonOn}
            alt="Button off"
            className={`${imgClass} ${
              isTournament ? "opacity-100" : hoverOn}`}
          />
          <img
            src={HistoryButtonOff}
            alt="Button on"
            className={`${imgClass} opacity-0 ${
              isTournament ? "opacity-0" : hoverOff}`}
          />
          <span className={`${fontClass} right-[16px]`}>Tournament</span>
        </button>
      </div>
    </div>
  )
}

export default ModeSelector
