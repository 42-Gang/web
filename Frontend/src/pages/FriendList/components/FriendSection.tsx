import { useState } from "react"
import ContactList from "./ContactList"
import SearchFriend from "./SearchFriend"

interface FriendSectionProps {
  refreshContacts: number
  onRefreshEnd: () => void
}

const FriendSection = ({ refreshContacts, onRefreshEnd }: FriendSectionProps) => {
	const [searchTerm, setSearchTerm] = useState("")
  
	return (
		<div>
			<div className="absolute left-1/2 -translate-x-1/2 top-[125px]">
				<SearchFriend searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
			</div>
			<div className="absolute top-[203px] w-full">
			<ContactList searchTerm={searchTerm} refreshTrigger={refreshContacts} onRefreshEnd={onRefreshEnd}/>
			</div>
		</div>
	)
}

export default FriendSection