import { useState, useEffect } from "react"
import CancelButton from "../../../assets/image/CancelButton2.svg"
import Magnifier from "../../../assets/image/MagnifierAddFriend.svg"
import SearchResultCard from "./SearchResultCard"

interface AddFriendPopupProps {
  onClose: () => void
}

interface User {
  id: string
  nickname: string
  avatar: string | null
  status: "online" | "offline" | "gaming" | "away"
}

const AddFriendPopup: React.FC<AddFriendPopupProps> = ({ onClose }) => {
  const [searchTerm, setSearchTerm] = useState("")
  const [searchResults, setSearchResults] = useState<User[]>([])

  useEffect(() => {
    if (searchTerm.length === 0) {
      setSearchResults([])
      return
    }

    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("accessToken")
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/api/friends/search/${searchTerm}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )

        const result = await res.json()
        if (res.ok) {
          console.log("📦 서버 응답:", result.data)
          const exact = result.data?.find(
            (user: User) => user.nickname === searchTerm
          )
          console.log("🎯 exact match:", exact)
          setSearchResults(result.data || [])
        } else {
          console.warn("❌ 검색 실패 응답:", result)
        }
      } catch (err) {
        console.error("유저 검색 실패:", err)
      }
    }

    fetchUsers()
  }, [searchTerm])

  return (
    <div className="relative w-[723px] h-[385px] bg-black rounded-lg">
      <button
        onClick={onClose}
        className="cursor-pointer absolute top-[10px] right-[10px]"
      >
        <img src={CancelButton} alt="Cancel" />
      </button>
      <span className="font-['Sixtyfour'] text-[25px] text-white absolute top-[25px] left-1/2 -translate-x-1/2">
        Add Friend
      </span>
      <div className="font-['Galmuri7'] text-[20px] absolute top-[80px] left-1/2 -translate-x-1/2 space-y-[10px]">
        <input
          type="text"
          maxLength={8}
          value={searchTerm}
          onChange={(e) => {
            const value = e.target.value
            console.log("🔎 검색어 입력:", value)
            setSearchTerm(value)
          }}
          placeholder="Enter the nickname"
          className="bg-black border-[2px] border-gray-700 rounded-lg w-[680px] h-[60px] text-center text-white"
        />
        <img
          src={Magnifier}
          alt="Magnifier"
          className="absolute inset-0 top-[10px] left-[10px]"
        />
        <div className="max-h-[230px] overflow-y-auto custom-scrollbar">
          {searchResults.length > 0 ? (
            searchResults.map((user) => (
              <SearchResultCard key={user.id} user={user} />
            ))
          ) : (
            <p className="text-white text-center mt-2">Nothing</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default AddFriendPopup
