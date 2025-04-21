import { useState } from "react"
import CancelButton from '../../../assets/image/CancelButton2.svg'
import authFetch from "../../../utils/authFetch"
import {toast} from "react-toastify"

interface ChangeNicknamePopupProps {
	onClose: () => void
	onChangeNickname: (newNickname: string) => void
}

const ChangeNicknamePopup: React.FC<ChangeNicknamePopupProps> = ({ onClose, onChangeNickname }) => {
	const [inputValue, setInputValue] = useState("");

	const ChangeNickname = async () => {
		if (inputValue.trim().length === 0) return 
	
		const token = localStorage.getItem("accessToken")
		if (!token) return
	
		const payload = JSON.parse(atob(token.split('.')[1]))
		const userId = payload.userId
	
		try {
			const res = await authFetch(`${import.meta.env.VITE_API_URL}/api/users/${userId}`, {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}` // 서버에 이 사용자가 로그인했음을 증명. 토큰이 없으면 401 unauthorized 발생
				},
				body: JSON.stringify({ nickname: inputValue })
			})

			if (!res) {
						toast.error("Request failed: No Request from server.")
						return
					}

			const result = await res.json()
	
			if (res.ok) {
				onChangeNickname(result.data.nickname)
				onClose()
			} else {
				alert(result.message || "Nickname update failed")
			}
		} catch (err) {
			console.error("Nickname change error:", err)
			alert("Error occurred while updating nickname.")
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