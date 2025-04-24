import { useEffect, useState } from 'react'
import { toast } from "react-toastify"
import BasicProfile1 from '../../../assets/image/BasicProfile1.png'
import LinkState from './LinkState'
import Message from './Message'
import authFetch from '../../../utils/authFetch'

interface Contact {
	friend_id: string
	nickname: string
	avatar_url: string | null
	status: 'online' | 'gaming' | 'away' | 'offline'
}

interface ContactListProps {
	searchTerm: string
}

const ContactList = ({ searchTerm }: ContactListProps) => {
	const [contacts, setContacts] = useState<Contact[]>([])

	useEffect(() => {
		const fetchFriends = async () => {
			try {
				const query = new URLSearchParams([ // URL 뒤에 붙는 key?={value}의 추가 조건을 전달 status=ACCEPTED&status=BLOCKED
					['status', 'ACCEPTED'],
					['status', 'BLOCKED']
				])
				const res = await authFetch(`${import.meta.env.VITE_API_URL}/api/v1/friends/me?${query.toString()}`, { // query에 해당하는 데이터 요청
					method: "GET",
				})
				if (!res) {
					toast.error("Request failed: No Request from server.")
					return
				}

				const result = await res.json()
				if (res.ok && result.data?.friends) {
					setContacts(result.data.friends)
				} else {
					toast.error(result.message || "Failed to load friend list.")
				}
			} catch (err) {
				console.error("Failed to load friend list", err)
				toast.error("Error requesting friend list.")
			}
		}
		fetchFriends()
	}, [])

	const filteredContacts = contacts.filter(contact =>
		contact.nickname.startsWith(searchTerm)
	)	

	return (
		<div className="font-['Galmuri7'] bg-black w-full text-white max-h-[397px] overflow-y-auto custom-scrollbar">
			{filteredContacts.map((contact) => (
				<div
					key={contact.friend_id}
					className="flex items-center justify-between p-[17px] border-b-[2px] border-white"
				>
					{/* 프로필 + 닉네임 + 상태 표시 */}
					<div className="flex items-center space-x-[20px]">
						<img
							src={contact.avatar_url || BasicProfile1}
							alt={contact.nickname}
							className="w-[65px] h-[65px] rounded-full"
						/>

						<div className="flex items-center w-[150px] justify-between">
							<span className="text-[20px]">{contact.nickname}</span>
							<LinkState status={contact.status} />
						</div>
					</div>
					<Message />
				</div>
			))}
		</div>
	)
}

export default ContactList
