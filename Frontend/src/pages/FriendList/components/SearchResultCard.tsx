import { useState, useRef } from 'react'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import AvailableAddFriend from '../../../assets/image/AvailableAddFriend.svg'
import Completed from '../../../assets/image/Completed.svg'
import BasicProfile1 from '../../../assets/image/BasicProfile1.png'
import authFetch from '../../../utils/authFetch'

interface User {
	id: string
	nickname: string
	avatar: string | null
	status: "online" | "offline" | "gaming" | "away"
}

const SearchResultCard = ({ user }: { user: User }) => {
	const [isAdded, setIsAdded] = useState(false)
	const isProcessing = useRef(false)

	const handleAddFriend = async () => {
		if (isProcessing.current || isAdded) return
		isProcessing.current = true
	
		try {
			const res = await authFetch(`${import.meta.env.VITE_API_URL}/api/v1/friends/requests`, {
				method: "POST",
				body: JSON.stringify({ friendId: Number(user.id) })
			})
	
			if (!res) {
				toast.error("Request failed: No Request from server.")
				return
			}

			const result = await res.json()
			if (!res.ok) {
				console.error(result.data)
				return
			}

			setIsAdded(true)
			toast.success(result.message)
	
			// if (res.ok) {
			// 	setIsAdded(true)
			// 	console.log(`✅ 친구 요청 성공: ${user.nickname} (id: ${user.id})`)
			// 	toast.success(`You sent a friend request to ${user.nickname}!`, {
			// 		position: "bottom-center",
			// 		autoClose: 2000,
			// 		style: {
			// 			fontSize: "17px",
			// 			padding: "20px",
			// 			minHeight: "80px",
			// 			width: "400px"
			// 		}
			// 	})
			// } else {
			// 	toast.error(result.message || "Failed to send friend request!", {
			// 		position: "bottom-center",
			// 		autoClose: 2000,
			// 		style: {
			// 			fontSize: "17px",
			// 			padding: "20px",
			// 			minHeight: "80px",
			// 			width: "400px"
			// 		}
			// 	})
			// }
		} catch (err) {
			console.error("Error in friend request.", err)
			toast.error("Error requesting friend request")
		} finally {
			setTimeout(() => {
				isProcessing.current = false
			}, 500)
		}
	}
	
	return (
		<div className="flex items-center justify-between p-3 border-[2px]
			border-white rounded-xl mt-1 hover:bg-blue-400 transition duration-300">
			<div className="flex items-center gap-3">
				<img
					src={user.avatar || BasicProfile1}
					className="w-[45px] h-[45px] rounded-full"
					alt="avatar"
				/>
				<span className="text-[18px] font-['Galmuri7'] text-white">
					{user.nickname}
				</span>
			</div>
			<button onClick={handleAddFriend} className="cursor-pointer">
				<img
					src={isAdded ? Completed : AvailableAddFriend}
					alt="AvailableAdd"
					className="w-[30px] h-[30px]"
				/>
			</button>
		</div>
	)
}

export default SearchResultCard
