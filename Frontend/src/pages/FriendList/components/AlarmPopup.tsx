import {useState, useEffect} from "react"
import CancelButton from "../../../assets/image/CancelButton2.svg"
import BasicProfile1 from "../../../assets/image/BasicProfile1.png"
import {toast} from "react-toastify"
import authFetch from "../../../utils/authFetch.ts";

interface AlarmPopupProps {
  onClose: () => void
}

interface Request {
  userId: string
  nickname: string
  avatarUrl: string | null
}

const AlarmPopup = ({onClose}: AlarmPopupProps) => {
  const [request, setRequest] = useState<Request[]>([])

  // 서버에서 친구 요청 데이터 가져오기
  useEffect(() => {
    const fetchFriendRequests = async () => {
      try {
        const res = await authFetch(`${import.meta.env.VITE_API_URL}/api/v1/friends/requests`, {
          method: "GET",
        })

        if (!res) {
          return
        }

        // 응답이 HTML로 오지 않도록 JSON 응답만 처리하도록 해야 합니다.
        const result = await res.json()
        if (res.ok) {
          setRequest(result.data?.requests || [])
        } else {
          console.error("❌ Failed to call friend request:", result.message)
        }
      } catch (err) {
        console.error("🚨 Error retrieving friend requests:", err)
      }
    }

    fetchFriendRequests()
  }, [])


  // 친구 요청 수락
  const handleAcceptRequest = async (friendId: string) => {
    try {
      const response = await authFetch(`${import.meta.env.VITE_API_URL}/api/v1/friends/requests/${friendId}/accept`, {
        method: "PATCH",
        body: "{}"
      })

      if (!response) {
        toast.error("Request failed: No Request from server.")
        return
      }

      const result = await response.json()

      console.log(result)
      if (!response.ok) {
        console.error("❌ Failed to accept:", result.message)
        toast.error(`${result.message}`)
        return
      }

      setRequest(prevRequest => prevRequest.filter(req => req.userId !== friendId))
      toast.success(result.message)
    } catch (err) {
      console.error("🚨 Error requesting acceptance:", err)
    }
  }

  // 친구 요청 거절
  const handleRejectRequest = async (friendId: string) => {
    try {
      const response = await authFetch(`${import.meta.env.VITE_API_URL}/api/v1/friends/requests/${friendId}/reject`, {
        method: "PATCH",
        body: "{}"
      })

      if (!response) {
        toast.error("Request failed: No Request from server.")
        return
      }

      const result = await response.json()
      if (!response.ok) {
        toast.error(`${result.message}`)
        return
      }

      setRequest(prevRequest => prevRequest.filter(req => req.userId !== friendId))
      toast.success(result.message)
    } catch (err) {
      console.error("🚨 Error requesting acceptance:", err)
    }
  }

  return (
      <div className="relative w-[723px] h-[385px] bg-black rounded-lg p-6 ">
        <button
            onClick={onClose}
            className="cursor-pointer absolute top-[10px] right-[10px]"
        >
          <img src={CancelButton} alt="Cancel"/>
        </button>

        <span
            className="font-['Sixtyfour'] text-[25px] text-white absolute top-[25px] left-1/2 -translate-x-1/2">
        Friend Request
      </span>

        <div className="mt-[80px] space-y-4 max-h-[250px] overflow-y-auto custom-scrollbar">
          {request.map((req) => (
              <div
                  key={req.userId}
                  className="flex items-center justify-between px-4 py-3 border-b border-white"
              >
                <div className="flex items-center gap-4">
                  <img
                      src={req.avatarUrl || BasicProfile1}
                      alt="avatar"
                      className="w-[45px] h-[45px] rounded-full"
                  />
                  <span className="text-white text-[18px] font-['Galmuri7']">
                {req.nickname}
              </span>
                </div>
                <div className="flex gap-2">
                  <button
                      className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
                      onClick={() => handleAcceptRequest(req.userId)}
                  >
                    Accept
                  </button>
                  <button
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                      onClick={() => handleRejectRequest(req.userId)}
                  >
                    Reject
                  </button>
                </div>
              </div>
          ))}
        </div>
      </div>
  )
}

export default AlarmPopup
