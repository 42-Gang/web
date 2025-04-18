import { useState } from 'react'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import AvailableAddFriend from '../../../assets/image/AvailableAddFriend.svg'
import Completed from '../../../assets/image/Completed.svg'
import BasicProfile1 from '../../../assets/image/BasicProfile1.png'

interface User {
	id: string
	nickname: string
	avatar: string | null
	status: "online" | "offline" | "gaming" | "away"
}

const SearchResultCard = ({ user }: { user: User }) => {
	console.log("👤 받은 user:", user)
	const [isAdded, setIsAdded] = useState(false)

	const handleAddFriend = () => {
		if (!isAdded) {
			setIsAdded(true)
			toast.success(`You sent a friend request to ${user.nickname}!`, {
				position: "bottom-center",
				autoClose: 2000,
				style: {
					fontSize: "17px",
					padding: "20px",
					minHeight: "80px",
					width: "400px"
				}
			})
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
