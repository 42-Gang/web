import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import GiveupButtonOn from '../../../assets/image/GiveupButtonOn.png'
import GiveupPopup from "./GiveupPopup"

const Giveup = () => {
	const [isOpenPopup, setIsOpenPopup] = useState(false)

	const togglePopup = () => setIsOpenPopup((prev) => !prev)

	return (
		<div>
			<button
				onClick={togglePopup}
				className="cursor-pointer opacity-80 hover:opacity-100 transition-opacity duration-300"
			>
				<img
					src={GiveupButtonOn}
					alt="GiveupButtonOn"
					className="w-[140px] h-[45px]"/>
					<span className="text-white font-['Sixtyfour'] absolute inset-0 right-[5px] top-[9px]">Give up</span>
			</button>
			{/* 기권하기 팝업 */}
			<AnimatePresence>
				{isOpenPopup && (
					<>
						<motion.div 
							className="fixed inset-0 bg-black opacity-50"
							initial={{ opacity: 0 }}
							animate={{ opacity: 0.5 }}
							exit={{ opacity: 0 }}
						/>
						<motion.div 
							className="fixed inset-0 flex justify-center items-center"
							initial={{ opacity: 0, scale: 0.8 }}
							animate={{ opacity: 1, scale: 1 }}
							exit={{ opacity: 0, scale: 0.8 }}
							transition={{ duration: 0.3, ease: "easeInOut" }}
						>
							<GiveupPopup onClose={togglePopup}/>
						</motion.div>
					</>
				)}
			</AnimatePresence>
		</div>
	)
}

export default Giveup