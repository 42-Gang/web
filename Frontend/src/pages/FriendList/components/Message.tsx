import MessageIcon from '../../../assets/image/MessageIcon.svg'

const Message = () => {
	return (
		<button className="cursor-pointer opacity-60 hover:opacity-100 transition-opacity duration-300">
			<img 
				src={MessageIcon}
			/>
		</button>
	)
}

export default Message