import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import ConfirmLogoutPopup from "./ConfirmLogoutPopup"

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
            <motion.div 
              className="fixed inset-0 bg-black opacity-50 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
            />
            <motion.div 
              className="fixed inset-0 flex justify-center items-center z-40"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <ConfirmLogoutPopup onClose={togglePopup}/>
            </motion.div>
          </>
        )}
      </AnimatePresence>
  </div>
  )
}

export default ConfirmLogout