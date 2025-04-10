import Container from "./components/Container"
import MainTitle from "./components/MainTitle"
import Cancel from "./components/Cancel"
import InputField from "./components/InputField"
import Verify from "./components/Verify"
import Confirm from "./components/Confirm"

const RegisterWithEmail = () => {
  return (
    <Container>
      <Cancel/>
			<div className="absolute left-1/2 -translate-x-1/2 top-[85px]">
				<MainTitle/>
			</div>
      <div className="flex flex-col space-y-[26px] absolute left-[70px] top-[270px]">
        <InputField label="EMAIL" type="text" width="280px"/>
        <InputField label="VERIFY CODE" type="text" width="280px"/>
        <InputField label="PW" type="password" width="280px"/>
        <InputField label="RE PW" type="password" width="280px"/>
        <InputField label="NICKNAME" type="text" width="280px"/>
      </div>
      <div className="absolute top-[265px] right-[80px]">
        <Verify/>
      </div>
      <div className="absolute right-1/2 translate-x-1/2 bottom-[50px]">
        <Confirm />
      </div>
    </Container>
  )
}

export default RegisterWithEmail