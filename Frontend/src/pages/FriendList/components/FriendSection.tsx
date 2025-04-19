import { useState, useEffect } from "react"
import ContactList from "./ContactList"
import SearchFriend from "./SearchFriend"

const FriendSection = () => {
	const [searchTerm, setSearchTerm] = useState("")
	const [userId, setUserId] = useState("")
	
	useEffect(() => {
		const token = localStorage.getItem("accessToken")
		if (!token) return

		try {
			const payload = JSON.parse(atob(token.split('.')[1]))
			setUserId(payload.userId)
		} catch(err) {
			console.error("Failed to parse userId", err)
		}
	}, [])

	return (
		<div>
			<div className="absolute left-1/2 -translate-x-1/2 top-[125px]">
				<SearchFriend searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
			</div>
			<div className="absolute top-[203px] w-full">
			<ContactList searchTerm={searchTerm} userId={userId} />
			</div>
		</div>
	)
}

export default FriendSection