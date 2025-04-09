import BasicProfile1 from '../../../assets/image/BasicProfile1.png'
import BasicProfile2 from '../../../assets/image/BasicProfile2.png'
import LinkState from './LinkState'
import Message from './Message'

interface Contact {
	id: number
	name: string
	avatarUrl: string
	status: 'online' | 'gaming' | 'away' | 'offline'
}

interface ContactListProps {
	searchTerm: string
}

const contacts: Contact[] = [
	{ id: 1, name: "PONG", avatarUrl: BasicProfile1, status: 'gaming' },
	{ id: 2, name: "JACK", avatarUrl: BasicProfile2, status: 'offline' },
	{ id: 3, name: "PING", avatarUrl: BasicProfile1, status: 'online' },
	{ id: 4, name: "Seou", avatarUrl: BasicProfile2, status: 'away' },
	{ id: 5, name: "Hyehan", avatarUrl: BasicProfile2, status: 'offline' },
	{ id: 6, name: "jungslee", avatarUrl: BasicProfile1, status: 'gaming' },
	{ id: 7, name: "JD", avatarUrl: BasicProfile2, status: 'online' },
]


const ContactList = ({ searchTerm }: ContactListProps) => {
	const filteredContacts = contacts.filter(contact => contact.name.toLowerCase().includes(searchTerm.toLowerCase()))

	return (
		<div className="font-['Galmuri7'] bg-black w-full text-white max-h-[397px] overflow-y-auto custom-scrollbar">
			{filteredContacts.map((contact) => (
				<div
					key={contact.id}
					className="flex items-center justify-between p-[17px] border-b-[2px] border-white"
				>
					{/* 프로필 + 닉네임 + 상태 표시 */}
					<div className="flex items-center space-x-[20px]">
						<img
							src={contact.avatarUrl}
							alt={contact.name}
							className="w-[65px] h-[65px] rounded-full"
						/>
						
						<div className="flex items-center w-[150px] justify-between">
							<span className="text-[20px]">{contact.name}</span>
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