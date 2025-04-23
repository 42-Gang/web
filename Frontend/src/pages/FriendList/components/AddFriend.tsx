import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { createPortal } from 'react-dom'
import AddFriendIcon from '../../../assets/image/AddFriendIcon.svg'
import AddFriendPopup from './AddFriendPopup'
import { FadeOverlay, PopupWrapper } from "./Animation"

const AddFriend = () => {
  const [isOpenPopup, setIsOpenPopup] = useState(false)
  const togglePopup = () => setIsOpenPopup(prev => !prev)

  return (
    <div>
      <button
        onClick={togglePopup}
        className="cursor-pointer border-[2px] border-white rounded-2xl opacity-60
        hover:opacity-100 transition-opacity duration-300"
      >
        <img src={AddFriendIcon} alt="AddFriendIcon" />
      </button>

      {createPortal(
        <AnimatePresence>
          {isOpenPopup && (
            <>
              <FadeOverlay />
              <PopupWrapper>
                <AddFriendPopup onClose={togglePopup} />
              </PopupWrapper>
            </>
          )}
        </AnimatePresence>,
        document.body
      )}
    </div>
  )
}

export default AddFriend
