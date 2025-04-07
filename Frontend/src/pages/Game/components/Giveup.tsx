import { useState } from "react"
import { AnimatePresence } from "framer-motion"
import GiveupButtonOn from '../../../assets/image/GiveupButtonOn.png'
import GiveupPopup from "./GiveupPopup"
import { FadeOverlay, PopupWrapper } from "./Animation"

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
							<FadeOverlay/>
							<PopupWrapper>
								<GiveupPopup onClose={togglePopup}/>
							</PopupWrapper>
					</>
				)}
			</AnimatePresence>
		</div>
	)
}

export default Giveup