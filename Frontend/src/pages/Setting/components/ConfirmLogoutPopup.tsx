import { useNavigate } from "react-router-dom"

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
      const res = await fetch("http://localhost:3001/v1/auth/logout", {
        method: "POST",
        credentials: "include"
      })

      const result = await res.json()
      if (res.ok) {
        console.log("🚪 Logout success:", result.message)
        localStorage.removeItem("accessToken")
        navigate("/")
      } else {
        alert("Logout failed: " + result.message)
      }
    } catch (err) {
      console.error("Logout error", err)
      alert("Logout request failed")
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