import { useState } from "react"
import ContactList from "./ContactList.tsx"
import SearchFriend from "./SearchFriend.tsx"

interface FriendSectionProps {
  refreshContacts: number
}

const FriendSection = ({ refreshContacts }: FriendSectionProps) => {
	const [searchTerm, setSearchTerm] = useState("")
  
	return (
		<div>
			<div className="absolute left-1/2 -translate-x-1/2 top-[125px]">
				<SearchFriend searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
			</div>
			<div className="absolute top-[203px] w-full">
			<ContactList searchTerm={searchTerm} refreshTrigger={refreshContacts}/>
			</div>
		</div>
	)
}

export default FriendSection