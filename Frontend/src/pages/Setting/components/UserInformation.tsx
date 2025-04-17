import { useState } from 'react'
import { AnimatePresence } from "framer-motion"
import ChangeNicknameButton from '../../../assets/image/ChangeNicknameButton.svg'
import ChangeNicknamePopup from './ChangeNicknamePopup'
import { FadeOverlay, PopupWrapper } from './Animation'

interface UserInformationProps {
  nickname: string
  wins: number
  losses: number
  tournamentWins: number
  onChangeNickname: (newNickname: string) => void
}

const UserInformation: React.FC<UserInformationProps> =
({
  nickname,
  wins,
  losses,
  tournamentWins,
  onChangeNickname
}) => {
  const [isOpenNicknamePopup, setIsOpenNicknamePopup] = useState(false)
  
  const stats = [
    { label: 'win', value: wins},
    { label: 'Lose', value: losses},
    { label: 'Tournament Wins', value: tournamentWins}
  ]

  const formattedValue = (value: number) => Math.min(value, 999)
  const togglePopup = () => setIsOpenNicknamePopup((prev) => !prev)

  return (
    <div className="font-['Sixtyfour'] text-white text-[19px] flex flex-col gap-y-[15px] z-0">
      <div className="relative flex items-center gap-x-2">
        <span>Nickname:{nickname}</span>
        <button
          onClick={togglePopup}
          className="cursor-pointer opacity-60 hover:opacity-100
            absolute -right-[40px] -top-[2px] transition-opacity duration-300"
        >
          <img src={ChangeNicknameButton} alt="ChangeNicknameButton"/>
        </button>
      </div>
      {stats.map(({ label, value }) => (
        <div key={label}>
          <span>{label}:{formattedValue(value)}</span>
        </div>
      ))}
      <AnimatePresence>
        {isOpenNicknamePopup && (
					<>
						<FadeOverlay/>
						<PopupWrapper>
							<ChangeNicknamePopup onClose={togglePopup} onChangeNickname={onChangeNickname}/>
						</PopupWrapper>
					</>
				)}
      </AnimatePresence>
    </div>
  )
}

export default UserInformation