import BasicProfile1 from '../../../assets/image/BasicProfile1.png'
import BasicProfile2 from '../../../assets/image/BasicProfile2.png'
import LinkState from './LinkState'
import Message from './Message'

interface Contact {
	id: number
	name: string
	avatarUrl: string
	isOnline: boolean
}

const contacts: Contact[] = [
	{ id: 1, name: "PONG", avatarUrl: BasicProfile1, isOnline: true },
	{ id: 2, name: "JACK", avatarUrl: BasicProfile2, isOnline: false },
	{ id: 3, name: "PING", avatarUrl: BasicProfile1, isOnline: true },
	{ id: 4, name: "Seou", avatarUrl: BasicProfile2, isOnline: false },
	{ id: 5, name: "Hyehan", avatarUrl: BasicProfile2, isOnline: false },
	{ id: 6, name: "jungslee", avatarUrl: BasicProfile1, isOnline: false },
	{ id: 7, name: "JD", avatarUrl: BasicProfile2, isOnline: false },
]


const ContactList = () => {
	return (
		<div className="font-['Galmuri7'] bg-black w-full text-white max-h-[397px] overflow-y-auto custom-scrollbar">
			{contacts.map((contact) => (
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
							<LinkState isOnline={contact.isOnline} />
						</div>
					</div>
					<Message />
				</div>
			))}
		</div>
	)
}


export default ContactList