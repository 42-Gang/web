import { useNavigate } from "react-router-dom"
import SelectHighlight from '../../../assets/image/SelectHighlight.svg'

const ActionButton = () => {
  const navigate = useNavigate()

  const buttons = [
    { label: "START GAME", onClick: () => navigate('/GameOptionSelect') },
    { label: "GAME HISTORY", onClick: () => navigate('/GameHistory') },
    { label: "FRIEND", onClick: () => navigate('/FriendList') },
    { label: "Profile", onClick: () => navigate('/Setting') },
  ]

  const buttonClass = "cursor-pointer flex gap-[10px] -ml-[30px] group"
  const imgClass = "opacity-0 group-hover:opacity-100 transition-opacity duration-300"

  return (
    <div className="text-white font-['StWinterPixel'] text-[28px] flex flex-col">
      {buttons.map(({ label, onClick }) => (
        <button key={label} className={buttonClass} onClick={onClick}>
          <img src={SelectHighlight} alt="SelectHighlight" className={imgClass} />
          {label}
        </button>
      ))}
    </div>
  )
}

export default ActionButton
