import { useState } from "react"

interface LinkStateProps {
	status: 'online' | 'gaming' | 'away' | 'offline'
}

const statusColorMap: Record<LinkStateProps['status'], string> = {
	online: 'bg-green-400',
	gaming: 'bg-red-400',
	away: 'bg-yellow-300',
	offline: 'bg-gray-400'
}

const statusLabelMap: Record<LinkStateProps['status'], string> = {
	online: 'online',
	gaming: 'gaming',
	away: 'away',
	offline: 'offline'
}

const LinkState = ({ status }: LinkStateProps) => {
	const [showTooltip, setShowTooltip] = useState(false)

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
				{statusLabelMap[status]}
			</div>
		</div>
	)
}

export default LinkState