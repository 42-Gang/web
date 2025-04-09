import { useState } from "react"
import BasicProfile1 from '../../../assets/image/BasicProfile1.png'
import BasicProfile2 from '../../../assets/image/BasicProfile2.png'
import CancelButton from '../../../assets/image/CancelButton2.svg'
import Magnifier from '../../../assets/image/MagnifierAddFriend.svg'
import SearchResultCard from "./SearchResultCard"

interface AddFriendPopupProps {
	onClose: () => void
}

const mockUsers = [
	{ id: 1, name: "woongbi", avatarUrl: BasicProfile1 },
	{ id: 2, name: "JSD", avatarUrl: BasicProfile2 },
	{ id: 3, name: "sz", avatarUrl: BasicProfile1 }
]

const AddFriendPopup: React.FC<AddFriendPopupProps> = ({ onClose }) => {
	const [searchTerm, setSearchTerm] = useState('')

	const filteredUsers = mockUsers.filter(user => user.name.toLowerCase().includes(searchTerm.toLowerCase()))

	return (
		<div className="relative w-[723px] h-[385px] bg-black rounded-lg">
			<button
				onClick={onClose}
				className="cursor-pointer absolute top-[10px] right-[10px]"
      >
				<img src={CancelButton} alt="Cancel"/>
			</button>
			<span className="font-['Sixtyfour'] text-[25px] text-white absolute top-[25px] left-1/2 -translate-x-1/2">
				Add Friend
			</span>
			<div className="font-['Galmuri7'] text-[20px] absolute top-[80px] left-1/2 -translate-x-1/2 space-y-[10px]">
				<input
					type="text"
					maxLength={8}
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
					placeholder="Enter the nickname"
					className="bg-black border-[2px] border-gray-700 rounded-lg w-[680px] h-[60px] text-center text-white"
				/>
				<img
					src={Magnifier}
					alt="Magnifier"
					className="absolute inset-0 top-[10px] left-[10px]"
				/>
				<div className="max-h-[230px] overflow-y-auto custom-scrollbar">
					{filteredUsers.length > 0 ? (
						filteredUsers.map(user => (
							<SearchResultCard key={user.id} user={user}/>
						))
					) : (
						<p>
							Nothing
						</p>
					)}
				</div>
			</div>
		</div>
	)
}

export default AddFriendPopup