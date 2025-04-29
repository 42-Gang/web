import { useNavigate } from "react-router-dom" 
import SelectBullet from '../../../assets/image/SelectBullet.svg'

const ActionButton = () => {
  const navigate = useNavigate()

  const buttons = [
    { label: "AUTO", onClick: () => navigate('/AutoGameModeSelect') },
    { label: "CUSTOM", onClick: () => navigate('/CustomGameModeSelect') },
    { label: "BACK", onClick: () => navigate('/Home') }
  ]

  const buttonClass = "border-white w-[310px] h-[63px] border-4 rounded-3xl group \
      cursor-pointer hover:bg-gray-600 hover:text-yellow-300 transition-colors duration-300"
  const imgClass = "absolute -left-[120px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"

  return (
    <div className="text-white font-['StWinterPixel'] text-[35px] flex flex-col gap-[25px]">
      {buttons.map(({ label, onClick }) => (
        <button key={label} className={buttonClass} onClick={onClick}>
          <img src={SelectBullet} alt="SelectBullet" className={imgClass}/>
          {label}
        </button>
      ))}
    </div>
  )
}

export default ActionButton