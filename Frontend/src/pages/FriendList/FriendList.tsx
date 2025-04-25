import { useCallback, useState } from "react"
import Container from "./components/Container"
import Cancel from "./components/Cancel"
import AddFriend from "./components/AddFriend"
import Alarm from "./components/Alarm"
import FriendSection from "./components/FriendSection"

const FriendList = () => {
  const [refreshVersion, setRefreshVersion] = useState(0)

  const handleFriendAccepted = useCallback(() => {
    setRefreshVersion((prev) => prev + 1) // 매번 증가
  }, [])
  
  const handleRefreshEnd = useCallback(() => {}, []) // 이제 필요 없음
  

	return(
		<Container>
			<div className="absolute left-[5px] top-[5px]">
				<Cancel/>
			</div>
			<h1 className="font-['Sixtyfour'] text-white text-[30px]
				absolute left-1/2 -translate-x-1/2 top-[40px]">Friend List</h1>
				<div className="absolute left-[110px] top-[123px] z-20">
					<AddFriend/>
				</div>
				<div className="absolute right-[28px] top-[150px] z-30">
					<Alarm onFriendAccepted={handleFriendAccepted}/>
				</div>
				<div className="border-white border-[1px] absolute top-[200px] w-full z-10"/>
				<FriendSection refreshContacts={refreshVersion} onRefreshEnd={() => {}} />
		</Container>
	)
}

export default FriendList