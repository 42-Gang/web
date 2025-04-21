import { useState, useEffect, useRef } from "react"
import { toast } from "react-toastify"
import { AnimatePresence } from "framer-motion"
import ChangeProfileImg from '../../../assets/image/ChangeProfileImg.svg'
import { FadeOverlay, PopupWrapper } from "./Animation"
import ChangeProfilePopup from "./ChangeProfilePopup"
import authFetch from "../../../utils/authFetch"

interface ProfileProps {
  onChangeProfileImg?: (img: File | string | null) => void
}

const Profile: React.FC<ProfileProps> = ({ onChangeProfileImg }) => {
  const [profileImg, setProfileImg] = useState<File | string | null>(null)
  const [isOpenProfilePopup, setIsOpenProfilePopup] = useState(false)
  const isProcessing = useRef(false)

  const togglePopup = () => setIsOpenProfilePopup(prev => !prev)

  const setBothProfileImg = (img: File | string | null) => {
    setProfileImg(img)
    onChangeProfileImg?.(img)
  }

  useEffect(() => {
    const fetchAvatar = async () => {
      const token = localStorage.getItem("accessToken")
      if (!token) return

      try {
        const res = await authFetch(`${import.meta.env.VITE_API_URL}/api/users/me`, {
          headers: { Authorization: `Bearer ${token}` }
        })

				if (!res) {
					toast.error("Request failed: No Request from server.")
					return
				}
				
        const result = await res.json()
        if (res.ok && result.data?.avatar) {
          setBothProfileImg(result.data.avatar)
        }
      } catch (err) {
        console.error("프로필 이미지 불러오기 실패", err)
      }
    }

    fetchAvatar()
  }, [])

  const handleChangeProfileImg = async (img: File | null) => {
    if (isProcessing.current) return
    isProcessing.current = true

    const token = localStorage.getItem("accessToken")
    if (!token) {
      isProcessing.current = false
      return
    }

    const payload = JSON.parse(atob(token.split('.')[1]))
    const userId = payload.userId

    try {
      if (img === null) { // 프로필 이미지 삭제
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/users/${userId}`, {
          method: "PATCH", // 수정
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({ avatar: null })
        })
        const result = await res.json()
        if (res.ok) {
          setBothProfileImg(null)
					toast.success("Your avatar image has been deleted.")
        } else {
          toast.error(result.message || "Failed to delete avatar image.")
        }
      } else { // 프로필 이미지 업로드
        const formData = new FormData()
        formData.append("avatar", img)

        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/users/${userId}`, {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`
          },
          body: formData
        })

        const result = await res.json()
        if (res.ok) {
          setBothProfileImg(result.data.avatar)
					toast.success("Your avatar image has been updated.")
        } else {
          toast.error(result.message || "Image upload failed.")
        }
      }
    } catch (err) {
      console.error("Avatar image Change Error", err)
      toast.error("Error changing avatar image.")
    } finally {
      setTimeout(() => {
        isProcessing.current = false
      }, 500)
    }
  }

  return (
    <div className="relative">
      {profileImg ? (
        typeof profileImg === "string" ? (
          <img
            src={profileImg}
            alt="Profile Img"
            className="w-[249px] h-[249px] rounded-full object-cover"
          />
        ) : (
          <img
            src={URL.createObjectURL(profileImg)}
            alt="Profile Img"
            className="w-[249px] h-[249px] rounded-full object-cover"
          />
        )
      ) : (
        <div className="w-[249px] h-[249px] rounded-full bg-white" />
      )}
      <button
        onClick={togglePopup}
        className="absolute bottom-[1px] left-[160px] cursor-pointer
          opacity-80 hover:opacity-100 transition-opacity duration-300"
      >
        <img src={ChangeProfileImg} alt="ChangeProfileImg" />
      </button>
      <AnimatePresence>
        {isOpenProfilePopup && (
          <div className="absolute z-40">
            <FadeOverlay />
            <PopupWrapper>
              <ChangeProfilePopup
                onClose={togglePopup}
                onChangeProfileImg={handleChangeProfileImg}
              />
            </PopupWrapper>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Profile