import { useState, useEffect } from "react"
import authFetch from "../../../utils/authFetch"

interface FriendRequest {
  target_id: string
  nickname: string
  avatar_url: string | null
}

const usePendingRequestIds = () => {
  const [requestedIds, setRequestedIds] = useState<string[]>([])

  useEffect(() => {
    const fetchPendingRequests = async () => {
      try {
        const res = await authFetch(`${import.meta.env.VITE_API_URL}/api/v1/friends/requests/sent`, {
          method: 'GET'
        })

        if (res && res.ok) {
          const result = await res.json()
          const ids = result.data.requests.map((request: FriendRequest) => request.target_id)
          setRequestedIds(ids)
        }
      } catch (err) {
        console.error("❌ 친구 요청 목록 불러오기 실패:", err)
      }
    }

    fetchPendingRequests()
  }, [])

  return requestedIds
}

export default usePendingRequestIds
