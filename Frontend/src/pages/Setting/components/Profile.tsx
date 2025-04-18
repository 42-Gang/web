import { useState, useEffect, useRef } from "react"
import { AnimatePresence } from "framer-motion"
import ChangeProfileImg from '../../../assets/image/ChangeProfileImg.svg'
import { FadeOverlay, PopupWrapper } from "./Animation"
import ChangeProfilePopup from "./ChangeProfilePopup"

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

      const payload = JSON.parse(atob(token.split('.')[1]))
      const userId = payload.userId

      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/users/${userId}`, {
          headers: { Authorization: `Bearer ${token}` }
        })
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
      if (img === null) {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/users/${userId}/avatar`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({ delete: "true" })
        })
        const result = await res.json()
        if (res.ok) {
          setBothProfileImg(null)
        } else {
          alert(result.message || "이미지 삭제 실패")
        }
      } else {
        const formData = new FormData()
        formData.append("avatar", img)

        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/users/${userId}/avatar`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`
          },
          body: formData
        })

        const result = await res.json()
        if (res.ok) {
          setBothProfileImg(result.data.avatar)
        } else {
          alert(result.message || "이미지 업로드 실패")
        }
      }
    } catch (err) {
      console.error("프로필 이미지 변경 오류", err)
      alert("프로필 이미지 변경 중 오류 발생")
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