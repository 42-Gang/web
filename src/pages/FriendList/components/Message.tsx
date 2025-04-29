import { useNavigate } from 'react-router-dom'
import MessageIcon from '../../../assets/image/MessageIcon.svg'
import { Contact } from './ContactList.tsx'

interface MessageProps {
  contact: Contact
}

const Message = ({ contact }: MessageProps) => {
	const navigate = useNavigate()

	const handleClickMessage = () => {
		navigate('/FriendChatRoom', {
      state: { contact }
    })
	}
	return (
		<button
			onClick={handleClickMessage}
			className="cursor-pointer opacity-60 hover:opacity-100 transition-opacity duration-300">
			<img 
				src={MessageIcon}
			/>
		</button>
	)
}

export default Message