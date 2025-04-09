import Magnifier from '../../../assets/image/Magnifier.svg'

const SearchFriend = () => {
	return (
		<div className="font-['Galmuri7'] text-[20px]">
			<input
				type="text"
				placeholder="Searching Friend"
				maxLength={8}
				className="bg-white rounded-md w-[450px] h-[43px] text-center"
			/>
			<img
				src={Magnifier}
				className="absolute inset-0 top-[10px] left-[10px]"
			/>
		</div>
	)
}

export default SearchFriend