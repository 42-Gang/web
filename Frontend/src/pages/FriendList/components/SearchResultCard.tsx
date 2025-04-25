import { useState } from 'react'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import AvailableAddFriend from '../../../assets/image/AvailableAddFriend.svg'
import Completed from '../../../assets/image/Completed.svg'
import BasicProfile1 from '../../../assets/image/BasicProfile1.png'
import authFetch from '../../../utils/authFetch'

const SearchResultCard = ({ user }: {
  user: {
    id: string
    nickname: string
    avatar: string | null
    status: "online" | "offline" | "gaming" | "away"
  }}) => {
    const [isRequested, setIsRequested] = useState(false) // 친구 요청 중복 클릭 방지

    const sendFriendRequest = async () => {
      if (isRequested) return

      try {
        const response = await authFetch(`${import.meta.env.VITE_API_URL}/api/v1/friends/requests`, {
          method: 'POST',
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            targetId: user.id
          })
        })

        if (!response) {
          
          return
        }

        const result = await response.json()

        if (response.ok) {
          console.log("✅ Friend request success.")
          toast.success(`You send a friend request to ${user.nickname}!`, {
            position: "bottom-center",
            autoClose: 2000,
            style: {
              width: "350px"
            }
          })
          setIsRequested(true)
        } else {
            toast.error(result.message || "Friend request failed!")
        }
      } catch (error) {
        console.error("❌ No response from server:", error)
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
			<button
        onClick={sendFriendRequest}
        disabled={isRequested}
        className="cursor-pointer"
        >
				<img
					src={isRequested ? Completed : AvailableAddFriend}
					alt={isRequested ? "Request completed Icon" : "Friend request Icon"}
					className="w-[30px] h-[30px]"
				/>
			</button>
		</div>
	)
}

export default SearchResultCard
