import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

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

  const OkClick = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken")
      if (!accessToken) {
        toast.error("You are not logged in.")
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
				localStorage.removeItem("accessToken")
				toast.success(result.message || "Log out Success!")
				navigate("/")
			} else {	
        toast.error("Logout failed: " + result.message)
      }
    } catch (err) {
      console.error("Logout error", err)
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