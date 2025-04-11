import { useState } from "react"
import Container from "./components/Container"
import MainTitle from "./components/MainTitle"
import InputField from "./components/InputField"
import ActionButton from "./components/ActionButton"
import Credit from "./components/Credit"
import ErrorMessage from "./components/ErrorMessage"

const Login = () => {
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [error, setError] = useState("")

	return (
		<Container>
			<div className="absolute left-1/2 -translate-x-1/2 top-[85px]">
				<MainTitle/>
			</div>
			<div className="absolute left-1/2 -translate-x-1/2 top-[10px]">
				<ErrorMessage message={error} setError={setError}/>
			</div>
			<div className="flex flex-col items-center justify-center space-y-[26px] absolute left-[200px] top-[270px]">
				<InputField
					label="EMAIL"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					type="text"
					width="250px"
				/>
				<InputField
					label="PW"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					type="password"
					width="250px"
				/>
			</div>
			<div className="absolute left-1/2 -translate-x-1/2 top-[370px]">
				<ActionButton email={email} password={password} setError={setError}/>
			</div>
			<div className="absolute left-1/2 -translate-x-1/2 w-[630px] bottom-[35px]">
				<Credit />
			</div>
		</Container>
	)
}

export default Login