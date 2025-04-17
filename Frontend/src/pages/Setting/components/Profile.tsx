import { useState, useEffect } from "react"
import { AnimatePresence } from "framer-motion"
import ChangeProfileImg from '../../../assets/image/ChangeProfileImg.svg'
import ChangeProfilePopup from "./ChangeProfilePopup"
import { FadeOverlay, PopupWrapper } from "./Animation"

const Profile = () => {
  const [profileImg, setProfileImg] = useState<File | null>(null)
  const [isOpenProfilePopup, setIsOpenProfilePopup] = useState(false)

  const togglePopup = () => setIsOpenProfilePopup((prev) => !prev)
  
	useEffect(() => {
		if (profileImg) {
			console.log("프로필 사진 업데이트", profileImg.name)
		} else {
			console.log("프로필 사진 선택되지 않음")
		}
	}, [profileImg])

  return (
    <div className="relative">
      {profileImg ? (
        <img
          src={URL.createObjectURL(profileImg)}
          alt="Profile Img"
          className="w-[249px] h-[249px] rounded-full object-cover"
        />
      ) : (
        <img className="w-[249px] h-[249px] rounded-full bg-white"/>
      )}
      <button
        onClick={togglePopup}
        className="absolute bottom-[1px] left-[160px] cursor-pointer
          opacity-80 hover:opacity-100 transition-opacity duration-300"
      >
        <img src={ChangeProfileImg} alt="ChangeProfileImg"/>
      </button>
      <AnimatePresence>
        {isOpenProfilePopup && (
					<div className="absolute z-40">
					<FadeOverlay/>
					<PopupWrapper>
						<ChangeProfilePopup onClose={togglePopup} onChangeProfileImg={setProfileImg}/>
					</PopupWrapper>
				</div>          
        )}
      </AnimatePresence>
    </div>
  )
}

export default Profile