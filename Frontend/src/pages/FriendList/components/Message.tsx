import { useNavigate } from 'react-router-dom'
import MessageIcon from '../../../assets/image/MessageIcon.svg'

const Message = () => {
	const navigate = useNavigate()

	const handleClickMessage = () => {
		navigate('/FriendChatRoom')
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