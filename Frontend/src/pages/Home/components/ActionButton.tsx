import { useNavigate } from "react-router-dom"
import authFetch from "../../../utils/authFetch" // authFetch 경로 맞춰주세요!
import SelectHighlight from '../../../assets/image/SelectHighlight.svg'

const ActionButton = () => {
  const navigate = useNavigate()

  const buttons = [
    { label: "START GAME", onClick: () => handleNavigation('/GameOptionSelect') },
    { label: "GAME HISTORY", onClick: () => handleNavigation('/GameHistory') },
    { label: "FRIEND", onClick: () => handleNavigation('/FriendList') },
    { label: "Profile", onClick: () => handleNavigation('/Setting') },
  ]

  const buttonClass = "cursor-pointer flex gap-[10px] -ml-[30px] group"
  const imgClass = "opacity-0 group-hover:opacity-100 transition-opacity duration-300"

  const handleNavigation = async (path: string) => {
    // authFetch 호출하여 세션 상태를 처리
    const res = await authFetch(`${import.meta.env.VITE_API_URL}/v1/auth/ping`)

    // authFetch가 정상적으로 처리되면 해당 페이지로 이동
    if (res) {
      navigate(path)
    }
  }

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
