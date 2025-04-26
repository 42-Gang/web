import { useState } from 'react'
import { toast } from 'react-toastify'
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
  const [isRequested, setIsRequested] = useState(false)

  const handleSendRequest = async () => {
    if (isRequested) return

    try {
      const response = await authFetch(`${import.meta.env.VITE_API_URL}/api/v1/friends/requests`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          targetId: user.id
        })
      })

      if (!response) return

      const result = await response.json()

      if (response.ok) {
        toast.success(`You send a friend request to ${user.nickname}!`, {
          position: "bottom-center",
          autoClose: 2000,
          style: {
            width: "350px",
            textAlign: "center"
          }
        })
        setIsRequested(true)
      } else {
        toast.error(result.message || "Friend request failed!", {
          position: "bottom-center",
          autoClose: 2000,
          style: {
            width: "350px",
            textAlign: "center"
          }
        })
      }
    } catch (error) {
      console.error("🚨 Unexpected error occurred: ", error)
    }
  }

  return (
    <div className="flex items-center justify-between p-3 border-[2px] border-white rounded-xl mt-1 hover:bg-blue-400 transition duration-300">
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
        onClick={handleSendRequest}
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
