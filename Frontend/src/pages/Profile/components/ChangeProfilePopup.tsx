import { useRef } from "react"
import { toast } from "react-toastify"
import authFetch from "../../../utils/authFetch"

interface ChangeProfileImgPopupProps {
  onClose: () => void
  onChangeProfileImg: (newImg: File | null) => void
}

const SelectButton: React.FC<{ onClick: () => void; children: React.ReactNode }> = ({ onClick, children }) => (
  <button
    className="font-['Sixtyfour'] text-black text-2xl w-[550px] h-[80px]
      border-4 rounded-3xl cursor-pointer hover:border-red-500"
    onClick={onClick}
  >
    {children}
  </button>
)

const ChangeProfilePopup: React.FC<ChangeProfileImgPopupProps> = ({ onClose, onChangeProfileImg }) => {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const isProcessing = useRef(false) // 여러 번 호출 방지
  
  const EditProfileImg = () => {
    fileInputRef.current?.click()
  }

  const ChangeProfileImg = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (isProcessing.current) return
    isProcessing.current = true

    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0]
      const formData = new FormData()
      formData.append("avatar", file)

      try {
        const response = await authFetch(`${import.meta.env.VITE_API_URL}/api/v1/users/me`, {
          method: 'PATCH',
          body: formData
        })

        if (!response) {
          console.log("❌ No response from server.")
          isProcessing.current = false
          return
        }

        const result = await response.json()

        if (response.ok) {
          toast.success("Profile avatar update!")
          onChangeProfileImg(file)
          onClose()
        } else {
          toast.error(result.message || "Profile avatar update failed.")
        }
      } catch (error) {
        console.error("❌ No response from server:", error)
      } finally {
        isProcessing.current = false
      }
    } else {
      isProcessing.current = false
    }
  }

  const DeleteProfileImg = async () => {
    if (isProcessing.current) return
    isProcessing.current = true

    try {
      const response = await authFetch(`${import.meta.env.VITE_API_URL}/api/v1/users/me`, {
        method: 'PATCH',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          avatar: null
        })
      })

      if (!response) {
        console.log("❌ No response from server.")
        isProcessing.current = false
        return
      }
      const result = await response.json()

      if (response.ok) {
        toast.success("Profile avatar deleted!", {
          position: "top-center",
          autoClose: 2000,
          style: {
            width: "350px",
            textAlign: "center"
          }
        })
        onChangeProfileImg(null)
        onClose()
      } else {
        toast.error(result.message || "Profile avatar update failed.", {
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
    } finally {
      isProcessing.current = false
    }
  }



  return (
    <div className="bg-white w-[602px] h-[346px] rounded-lg fixed top-1/2 left-1/2 -translate-x-1/2 \
        -translate-y-1/2 flex flex-col justify-center items-center gap-6 z-20">
      <SelectButton onClick={DeleteProfileImg}>Delete</SelectButton>
      <SelectButton onClick={EditProfileImg}>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={ChangeProfileImg}
        />
        Edit
      </SelectButton>
      <SelectButton onClick={onClose}>Cancel</SelectButton>
    </div>
  )
}

export default ChangeProfilePopup