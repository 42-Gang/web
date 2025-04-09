import Container from "./components/Container"
import Cancel from "./components/Cancel"
import SearchFriend from "./components/SearchFriend"
import AddFriend from "./components/AddFriend"
import Alarm from "./components/Alarm"
import ContactList from "./components/ContactList"

const FriendList = () => {
	return(
		<Container>
			<Cancel/>
			<h1 className="font-['Sixtyfour'] text-white text-[30px]
				absolute left-1/2 -translate-x-1/2 top-[40px]">Friend List</h1>
				<div className="absolute left-1/2 -translate-x-1/2 top-[125px]">
					<SearchFriend/>
				</div>
				<div className="absolute left-[110px] top-[123px]">
					<AddFriend/>
				</div>
				<div className="absolute right-[28px] top-[150px]">
					<Alarm/>
				</div>
				<div className="border-white border-[1px] absolute top-[200px] w-full"/>
				<div className="absolute top-[203px] w-full">
					<ContactList/>
				</div>
		</Container>
	)
}

export default FriendList