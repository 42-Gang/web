import { useState } from "react"
import { AnimatePresence } from "framer-motion"
import ConfirmLogoutPopup from "./ConfirmLogoutPopup.tsx"
import { FadeOverlay, PopupWrapper } from "./Animation.tsx"

const ConfirmLogout = () => {
  const [isOpenConfirmLogout, setIsOpenConfirmLogout] = useState(false)

  const togglePopup = () => setIsOpenConfirmLogout((prev) => !prev)

  return (
    <div className="text-red-600 font-['Sixtyfour'] text-[22px] flex justify-center mt-[80px] z-30">
    <button
      onClick={togglePopup}
      className="cursor-pointer border-white border-4
        rounded-3xl w-[691px] h-[53px] hover:bg-gray-700 duration-300"
    >
      Log out
    </button>
    <AnimatePresence>
        {isOpenConfirmLogout && (
					<>
						<FadeOverlay/>
						<PopupWrapper>
						<ConfirmLogoutPopup onClose={togglePopup}/>
						</PopupWrapper>
					</>
        )}
      </AnimatePresence>
  </div>
  )
}

export default ConfirmLogout