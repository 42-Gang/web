import { useState } from "react"
import CancelButton from '../../../assets/image/CancelButton2.svg'
import authFetch from "../../../utils/authFetch"
import {toast} from "react-toastify"

interface ChangeNicknamePopupProps {
  onClose: () => void
  onChangeNickname: (newNickname: string) => void
}

const ChangeNicknamePopup: React.FC<ChangeNicknamePopupProps> = ({ onClose, onChangeNickname }) => {
  const [inputValue, setInputValue] = useState("")

  const ChangeNickname = async () => {
    if (inputValue.trim().length === 0) return 
  
    try {
      const response = await authFetch(`${import.meta.env.VITE_API_URL}/api/v1/users/me`, {
        method: 'PATCH',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nickname: inputValue
        })
      })

      if (!response) {
        console.error("❌ No response from server.")
        return
      }

      const result = await response.json()
  
      if (response.ok) { // 200 ~ 299 응답 성공
        onChangeNickname(result.data?.nickname?? inputValue)
        onClose()
      } else {
        console.error(result.message)
        toast.error(result.message || "Nickname update failed.")
      }
    } catch (error) {
      console.error("❌ No response from server:", error)
    }
  }	

  return (
    <div
      className="bg-white w-[602px] h-[256px] rounded-lg fixed
        top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center items-center"
    >
      <button
        onClick={onClose}
        className="cursor-pointer absolute top-[6px] right-[6px]"
      >
        <img src={CancelButton} alt="Cancel"/>
      </button>
      <span className="font-['Sixtyfour'] text-[25px] text-black absolute top-[40px]">
        Change Nickname
      </span>
      <input
        className="text-black font-['Inter'] border-3
          rounded-xl w-[567px] h-[62px] text-xl text-center"
        placeholder="Maximum 8 characters allowed."
        maxLength={8}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button
        className="cursor-pointer absolute top-[175px]
          rounded-2xl bg-[var(--827E7C)] text-white w-[232px] h-[63px]
          opacity-70 hover:opacity-100"
        onClick={ChangeNickname}
      >
        Change
      </button>
    </div>
  )
}

export default ChangeNicknamePopup