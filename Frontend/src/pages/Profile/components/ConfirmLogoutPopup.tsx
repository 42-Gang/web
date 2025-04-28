import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { useContext } from "react"
import { WebSocketContext } from "../../../contexts/WebSocketContext"

interface ConfirmLogoutPopupProps {
  onClose: () => void
}

const SelectButton: React.FC<{ onClick: () => void; children: React.ReactNode }> = ({ onClick, children }) => (
  <button
    className="font-['Sixtyfour'] text-black text-2xl
      w-[550px] h-[80px] border-4 rounded-3xl cursor-pointer hover:border-red-500"
    onClick={onClick}
  >
    {children}
  </button>
)

const ConfirmLogoutPopup: React.FC<ConfirmLogoutPopupProps> = ({ onClose }) => {
  const navigate = useNavigate()
  const webSocketContext = useContext(WebSocketContext)
  const disconnect = webSocketContext?.disconnect

  const OkClick = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken")
      if (!accessToken) {
        toast.error("You are not logged in.", {
          position: "top-center",
          autoClose: 2000,
          style: {
            width: "350px",
            textAlign: "center"
          }
        })
        return
      }
      
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/auth/logout`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        credentials: "include"
      })

      const result = await response.json()
      
      if (response.ok) {
        // 1. AccessToken 삭제
				localStorage.removeItem("accessToken")
        // 2. WebSocket 연결 끊기
        if (typeof disconnect === 'function') {
          disconnect()
        }
				toast.success(result.message || "Log out Success!", {
          position: "top-center",
          autoClose: 2000,
          style: {
            width: "350px",
            textAlign: "center"
          }
        })
				navigate("/")
			} else {	
        toast.error("Logout failed: " + result.message, {
          position: "top-center",
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
    <div className="bg-white w-[602px] h-[256px] rounded-lg fixed
          top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col
          justify-center items-center"
    >
      <p className="font-['Sixtyfour'] text-black text-[20px] absolute top-[20px]">
        Log Out?
      </p>
      <div className="absolute top-[70px] left-[25px] space-y-3">
        <SelectButton onClick={OkClick}>OK</SelectButton>
        <SelectButton onClick={onClose}>Cancel</SelectButton>
      </div>
    </div>
  )
}

export default ConfirmLogoutPopup