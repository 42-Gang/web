import { useState } from "react"
import { useRecoilValue } from "recoil"
import { friendStatusAtom } from "./FriendStatusAtom"

interface LinkStateProps {
  friendId: number
}

const statusColorMap: Record<string, string> = {
  ONLINE: 'bg-green-400',
  GAME: 'bg-red-400',
  AWAY: 'bg-yellow-300',
  OFFLINE: 'bg-gray-400'
}

const statusLabelMap: Record<string, string> = {
  ONLINE: 'online',
  GAME: 'gaming',
  AWAY: 'away',
  OFFLINE: 'offline'
}


const LinkState = ({ friendId }: LinkStateProps) => {
	const [showTooltip, setShowTooltip] = useState(false)
  const friendStatusMap = useRecoilValue(friendStatusAtom) // 전체 친구 상태 가져옴
  const rawStatus = friendStatusMap[friendId] || 'OFFLINE'
  const status = rawStatus === 'LOBBY' ? 'ONLINE' : rawStatus

	return (
		<div className="relative flex items-center justify-center">
			<div
				className={`w-[10px] h-[10px] rounded-full ${statusColorMap[status]}`}
				onMouseEnter={() => setShowTooltip(true)}
				onMouseLeave={() => setShowTooltip(false)}
			>
			</div>
			<div
				className={`
					absolute bottom-full mb-1 px-2 py-1 text-[10px] bg-white text-black rounded shadow-sm whitespace-nowrap z-10
					transition-all duration-200 ease-out transform 
					${showTooltip ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}
				`}
			>
				{statusLabelMap[status] || 'offline'}
			</div>
		</div>
	)
}

export default LinkState