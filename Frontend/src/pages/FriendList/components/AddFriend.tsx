import AddFriendIcon from '../../../assets/image/AddFriendIcon.svg'

const AddFriend = () => {
	return (
		<button className="cursor-pointer border-[2px] border-white rounded-2xl opacity-60 hover:opacity-100 transition-opacity duration-300">
			<img
				src={AddFriendIcon}
			/>
		</button>
	)
}

export default AddFriend