import { useState } from "react"
import Container from "./components/Container"
import Cancel from "./components/Cancel"
import Profile from "./components/Profile"
import UserInformation from "./components/UserInformation"
import ConfirmLogout from "./components/ConfirmLogout"

const Setting = () => {
  const [nickname, setNickname] = useState("")

  const example1 = {
    nickname: "Jasalskd",
    wins: 919,
    losses: 20,
    tournamentWins: 545
  }

  const ChangeNickname = (newNickname: string) => {
    setNickname(newNickname)
  }

  return (
    <Container>
      <Cancel/>
      <h1 className="font-['Sixtyfour'] text-white text-[40px]
        absolute left-1/2 -translate-x-1/2 top-[50px]">Setting</h1>
      <div className="absolute left-[60px] top-[180px]">
        <Profile/>
      </div>
      <div className="absolute right-[60px] top-[225px]">
        <UserInformation
          nickname={nickname || example1.nickname}
          wins={example1.wins}
          losses={example1.losses}
          tournamentWins={example1.tournamentWins}
          onChangeNickname={ChangeNickname}/>
      </div>
      <div className="absolute left-[60px] bottom-[30px]">
        <ConfirmLogout/>
      </div>
    </Container>
  )
}

export default Setting