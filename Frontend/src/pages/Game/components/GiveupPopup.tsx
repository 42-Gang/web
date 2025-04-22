import { useNavigate } from "react-router-dom"

interface GiveupPopupProps {
  onClose: () => void
}

const GiveupPopup: React.FC<GiveupPopupProps> = ({ onClose }) => {
  const navigate = useNavigate();

  const YesClick = () => {
    localStorage.removeItem("accessToken")
    navigate('/')
  }

  return (
    <div className="bg-black w-[630px] h-[161px]">
      <div className="font-['Sixtyfour'] text-white text-center relative">
        <p className="mt-[30px]">
          You will lose the game if you leave.
          Are you sure you want to leave?
        </p>
        <div className="absolute left-1/2 -translate-x-1/2 top-[70px] space-x-40">
          <button onClick={YesClick} className="cursor-pointer">
            Yes
          </button>
          <button onClick={onClose} className="cursor-pointer">
            No
          </button>
        </div>
      </div>
    </div>
  );
}

export default GiveupPopup