import { useNavigate } from 'react-router-dom'
import CancelButton from '../../../assets/image/CancelButton1.svg'

const Cancel = () => {
  const navigate = useNavigate()

  const CloseRegister = () => {
    navigate('/Home');
  }

  const buttonClass = "cursor-pointer opacity-60 hover:opacity-100 transition-opacity duration-300"

  return (
    <div>
      <button onClick={CloseRegister} className={buttonClass}>
        <img src={CancelButton} alt="CancelButton"/>
      </button>
    </div>
  )
}

export default Cancel