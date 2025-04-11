import { useNavigate } from "react-router-dom"
import CancelButton from "../../../assets/image/CancelButton1.svg"

const Cancel = () => {
  const navigate = useNavigate()

  const handleGoBackPage = () => {
    navigate("/");
  }

  return (
    <div className="absolute left-[5px] top-[5px]">
      <button
        onClick={handleGoBackPage}
        className="cursor-pointer opacity-60 hover:opacity-100 transition-opacity duration-300"
      >
        <img
					src={CancelButton}
					alt="CancelButton"
				/>
      </button>
    </div>
  )
}

export default Cancel