import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import AlarmIcon from '../../../assets/image/AlarmIcon.svg'
import { FadeOverlay, PopupWrapper } from "./Animation.tsx"
import AlarmPopup from './AlarmPopup.tsx'

interface AlarmProps {
  onFriendAccepted: () => void
}

const Alarm = ({onFriendAccepted}: AlarmProps) => {
	const [isOpenPopup, setIsOpenPopup] = useState(false)

	const togglePopup = () => setIsOpenPopup((prev) => !prev)

	return (
		<div>
			<button onClick={togglePopup} className="cursor-pointer">
				<img
					src={AlarmIcon}
				/>
			</button>
			<AnimatePresence>
				{isOpenPopup && (
					<>
						<FadeOverlay/>
						<PopupWrapper>
							<AlarmPopup onClose={togglePopup} onFriendAccepted={onFriendAccepted}/>
						</PopupWrapper>
					</>
				)}
			</AnimatePresence>
		</div>

	)
}

export default Alarm