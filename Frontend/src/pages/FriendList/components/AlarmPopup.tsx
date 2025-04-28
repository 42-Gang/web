import {useState, useEffect} from "react"
import {toast} from "react-toastify"
import CancelButton from "../../../assets/image/CancelButton2.svg"
import BasicProfile1 from "../../../assets/image/BasicProfile1.png"
import Accept from '../../../assets/image/Accept.svg'
import Reject from '../../../assets/image/Reject.svg'
import authFetch from "../../../utils/authFetch.ts";

interface AlarmPopupProps {
  onClose: () => void
  onFriendAccepted: () => void
}

interface Request {
  friendId: string
  nickname: string
  avatarUrl: string | null
}

const AlarmPopup = ({ onClose, onFriendAccepted }: AlarmPopupProps) => {
  const [request, setRequest] = useState<Request[]>([])

  // 서버에서 친구 요청 데이터 가져오기
  useEffect(() => {
    const fetchFriendRequests = async () => {
      try {
        const response = await authFetch(`${import.meta.env.VITE_API_URL}/api/v1/friends/requests`, {
          method: 'GET',
        })

        if (!response) return

        // 응답이 HTML로 오지 않도록 JSON 응답만 처리하도록 해야 합니다.
        const result = await response.json()

        if (response.ok) {
          console.log("✅ Import friend request list successful.")
          setRequest(result.data?.requests || [])
        } else {
          console.error("❌ Import list failure: ", result.message)
        }
      } catch (error) {
        console.error("🚨 Unexpected error occurred: ", error)
      }
    }

    fetchFriendRequests()
  }, [])


  // 친구 요청 수락
  const handleAcceptRequest = async (friendId: string) => {
    try {
      const response = await authFetch(`${import.meta.env.VITE_API_URL}/api/v1/friends/requests/${friendId}/accept`, {
        method: 'PATCH',
        body: '{}'
      })

      if (!response) return

      const result = await response.json()

      if (!response.ok) {
        console.error("❌ Request approval failed: ", result.message)
        return
      }

      setRequest(prevRequest => prevRequest.filter(req => req.friendId !== friendId))
      toast.success(result.message, {
        position: "top-center",
        autoClose: 2000,
        style: {
          width: "350px",
          textAlign: "center"
        }
      })

      onFriendAccepted() // call back 호출
    } catch (error) {
      console.error("🚨 Unexpected error occurred: ", error)
    }
  }

  // 친구 요청 거절
  const handleRejectRequest = async (friendId: string) => {
    try {
      const response = await authFetch(`${import.meta.env.VITE_API_URL}/api/v1/friends/requests/${friendId}/reject`, {
        method: 'PATCH',
        body: '{}'
      })

      if (!response) return

      const result = await response.json()

      if (!response.ok) {
        console.error("❌ Request reject failed: ", result.message)
        return
      }

      setRequest(prevRequest => prevRequest.filter(req => req.friendId !== friendId))
      toast.success(result.message, {
        position: "top-center",
        autoClose: 2000,
        style: {
          width: "350px",
          textAlign: "center"
        }
      })
    } catch (error) {
      console.error("🚨 Unexpected error occurred: ", error)
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
                  key={req.friendId}
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
                      className="cursor-pointer opacity-60 hover:opacity-100"
                      onClick={() => handleAcceptRequest(req.friendId)} // 수락하면 함수 호출
                  >
                    <img src={Accept} alt="accept"/>
                  </button>
                  <button
                      className="cursor-pointer opacity-60 hover:opacity-100"
                      onClick={() => handleRejectRequest(req.friendId)} // 수락하면 함수 호출
                  >
                    <img src={Reject} alt="reject"/>
                  </button>
                </div>
              </div>
          ))}
        </div>
      </div>
  )
}

export default AlarmPopup
