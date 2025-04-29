import { useState, useEffect } from "react"
import { AnimatePresence } from "framer-motion"
import ChangeProfileImg from '../../../assets/image/ChangeProfileImg.svg'
import { FadeOverlay, PopupWrapper } from "./Animation.tsx"
import ChangeProfilePopup from "./ChangeProfilePopup.tsx"

interface ProfileSectionProps {
  profileImg?: File | string | null
  onChangeProfileImg: (img: File | string | null) => void
}

const Profile: React.FC<ProfileSectionProps> = ({ profileImg, onChangeProfileImg }) => {
  const [isOpenProfilePopup, setIsOpenProfilePopup] = useState(false)

  const togglePopup = () => setIsOpenProfilePopup(prev => !prev)

  useEffect(() => {
    if (profileImg instanceof File) {
      const objectUrl = URL.createObjectURL(profileImg)
      return () => {
        URL.revokeObjectURL(objectUrl)
        console.log("🧹 Object URL revoked from Profile.tsx")
      }
    }
  }, [profileImg])
  
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
                onChangeProfileImg={onChangeProfileImg}
              />
            </PopupWrapper>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Profile
