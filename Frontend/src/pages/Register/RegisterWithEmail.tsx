import { useState } from "react"
import Container from "./components/Container"
import MainTitle from "./components/MainTitle"
import Cancel from "./components/Cancel"
import InputField from "./components/InputField"
import Verify from "./components/Verify"
import Confirm from "./components/Confirm"

const RegisterWithEmail = () => {
  const [email, setEmail] = useState("")
  const [verifyCode, setVerifyCode] = useState("")
  const [password, setPassword] = useState("")
  const [rePassword, setRePassword] = useState("")
  const [nickname, setNickname] = useState("")

  return (
    <Container>
      <Cancel />
      <div className="absolute left-1/2 -translate-x-1/2 top-[85px]">
        <MainTitle />
      </div>

      <div className="flex flex-col space-y-[13px] absolute left-[70px] top-[270px]">
        <InputField label="EMAIL" type="text" width="280px" value={email} onChange={e => setEmail(e.target.value)} />
        <InputField label="VERIFY CODE" type="text" width="280px" value={verifyCode} onChange={e => setVerifyCode(e.target.value)} />
        <InputField label="PASSWORD" type="password" width="280px" value={password} onChange={e => setPassword(e.target.value)} />
        <InputField label="RE-PASSWORD" type="password" width="280px" value={rePassword} onChange={e => setRePassword(e.target.value)} />
        <InputField label="NICKNAME" type="text" width="280px" value={nickname} onChange={e => setNickname(e.target.value)} />
      </div>

      <div className="absolute top-[265px] right-[80px]">
        <Verify email={email}/>
      </div>
      <div className="absolute right-1/2 translate-x-1/2 bottom-[50px]">
        <Confirm email={email} verifyCode={verifyCode} password={password} rePassword={rePassword} nickname={nickname}/>
      </div>
    </Container>
  )
}

export default RegisterWithEmail
