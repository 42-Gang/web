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
				{[
					{ label: "EMAIL", type: "text", value: email, setter: setEmail },
					{ label: "VERIFY CODE", type: "text", value: verifyCode, setter: setVerifyCode },
					{ label: "PASSWORD", type: "password", value: password, setter: setPassword },
					{ label: "RE-PASSWORD", type: "password", value: rePassword, setter: setRePassword },
					{ label: "NICKNAME", type: "text", value: nickname, setter: setNickname },
				].map(({ label, type, value, setter }, idx) => (
					<div key={idx} className="flex items-center">
						<InputField
							label={label}
							type={type}
							width="280px"
							value={value}
							onChange={e => setter(e.target.value)}
						/>
					</div>
				))}
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
