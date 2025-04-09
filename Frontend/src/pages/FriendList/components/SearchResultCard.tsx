import { useState } from 'react'
import AvailableAddFriend from '../../../assets/image/AvailableAddFriend.svg'
import CompletedAddFriend from '../../../assets/image/CompletedAddFriend.svg'

interface User {
	id: number
	name: string
	avatarUrl: string
}

const SearchResultCard = ({ user }: { user: User }) => {
	const [isAdded, setIsAdded] = useState(false)

	const handleAddFriend = () => {
		if (!isAdded) {
			setIsAdded(true)
			alert(`You asked ${user.name} to add a friend!`)
		}
	}

	return (
		<div className="flex items-center justify-between p-3 border-[2px]
			border-white rounded-xl mt-1 hover:bg-blue-400 transition duration-300">
			<div className="flex items-center gap-3">
				<img src={user.avatarUrl} className="w-[45px] h-[45px] rounded-full" />
				<span className="text-[18px] font-['Galmuri7'] text-white">{user.name}</span>
			</div>
			<button onClick={handleAddFriend} className="cursor-pointer">
				<img
					src={isAdded? CompletedAddFriend: AvailableAddFriend}
					alt="AvailableAdd"
					className="w-[30px] h-[30px]"
				/>
			</button>
		</div>
	)
}

export default SearchResultCard
