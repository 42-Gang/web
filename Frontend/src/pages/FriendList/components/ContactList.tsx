import { useEffect, useState } from 'react'
import BasicProfile1 from '../../../assets/image/BasicProfile1.png'
import LinkState from './LinkState'
import Message from './Message'

interface Contact {
	friend_id: string
	nickname: string
	avatar_url: string | null
	status: 'online' | 'gaming' | 'away' | 'offline'
}

interface ContactListProps {
	searchTerm: string
	userId: string // 현재 로그인한 유저 ID 필요
}

const ContactList = ({ searchTerm, userId }: ContactListProps) => {
	const [contacts, setContacts] = useState<Contact[]>([])

	useEffect(() => {
		const fetchFriends = async () => {
			try {
				const token = localStorage.getItem('accessToken')
				const query = new URLSearchParams([
					['status', 'ACCEPTED'],
					['status', 'BLOCKED']
				])
				const res = await fetch(`${import.meta.env.VITE_API_URL}/api/friends/me?${query.toString()}`, {
					headers: {
						Authorization: `Bearer ${token}`
					}
				})
				const result = await res.json()
				if (res.ok && result.data?.friends) {
					setContacts(result.data.friends)
				}
			} catch (err) {
				console.error('친구 목록 불러오기 실패:', err)
			}
		}
		fetchFriends()
	}, [userId])

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
