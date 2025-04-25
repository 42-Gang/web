import { useState, useEffect } from "react"
import authFetch from "../../../utils/authFetch"

interface Friend {
  friend_id: string
  nickname: string
  avatar_url: string | null
  status: 'online' | 'offline' | 'gaming' | 'away'
}

const useFriendIds = () => {
  const [friendIds, setFriendIds] = useState<string[]>([])

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const query = new URLSearchParams([
          ['status', 'ACCEPTED'],
          ['status', 'BLOCKED']
        ])

        const res = await authFetch(`${import.meta.env.VITE_API_URL}/api/v1/friends/me?${query.toString()}`)

        if (res && res.ok) {
          const result = await res.json()
          const ids = result.data.friends.map((friend: Friend) => friend.friend_id)
          setFriendIds(ids)
        }
      } catch (err) {
        console.error("❌ 친구 목록 불러오기 실패:", err)
      }
    }

    fetchFriends()
  }, [])

  return friendIds
}

export default useFriendIds
