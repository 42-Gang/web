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
  refreshTrigger: number
}

const ContactList = ({ searchTerm , refreshTrigger }: ContactListProps) => {
	const [contacts, setContacts] = useState<Contact[]>([])

  // 처음 mount 되면 무조건 한 번 실행 됨 -> 최초 렌더링 Ok
  // 이후 부터는 친구 승인 될 때마다 친구 목록 업데이트
  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const query = new URLSearchParams([
          ['status', 'ACCEPTED'],
          ['status', 'BLOCKED']
        ])

        const response = await authFetch(`${import.meta.env.VITE_API_URL}/api/v1/friends/me?${query.toString()}`, {
          method: 'GET'
        })

        if (!response) return

        const result = await response.json()

      if (response.ok && result.data?.friends) {
        console.log("✅ Import friend list successful.")
        setContacts(result.data.friends)
      } else {
        toast.error(result.message || "Failed to load friend list.", {
          position: "top-center",
          autoClose: 2000,
          style: {
            width: "350px",
            textAlign: "center"
          }
        })
      }

    }

    fetchFriends()
    
  }, [refreshTrigger])

  const filteredContacts = searchTerm.trim()
  ? contacts.filter(contact => contact.nickname.startsWith(searchTerm))
  : contacts

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
