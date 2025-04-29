import Container from "./components/Container.tsx"
import MainTitle from "./components/MainTitle.tsx"
import Cancel from "./components/Cancel.tsx"
import InputField from "./components/InputField.tsx"
import Verify from "./components/Verify.tsx"
import Confirm from "./components/Confirm.tsx"

const RegisterWithGoogle = () => {
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

export default RegisterWithGoogle