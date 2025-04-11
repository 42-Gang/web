import { useNavigate } from "react-router-dom" 
import SelectHighlight from "../../../assets/image/SelectHighlight.svg"

const Confirm = () => {
  const navigate = useNavigate()

  const handleRegister = () => {
    navigate("/")
  }

  return (
    <div className="text-white font-['QuinqueFive'] text-[15px] flex flex-col space-y-[10px]">
      <button onClick={handleRegister} className="cursor-pointer flex gap-[10px] -ml-[30px] group">
        <img
          src={SelectHighlight}
          alt="SelectHighlight"
          className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        />
        Register
      </button>
    </div>
  )
}

export default Confirm