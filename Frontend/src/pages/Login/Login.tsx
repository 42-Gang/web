import { useState } from "react"
import Container from "./components/Container"
import MainTitle from "./components/MainTitle"
import Credit from "./components/Credit"
import ActionButton from "./components/ActionButton"
import ErrorMessage from "./components/ErrorMessage"

const Login = () => {
	const [error, setError] = useState("")

	return (
		<Container>
			<div className="absolute left-1/2 -translate-x-1/2 top-[85px]">
				<MainTitle/>
			</div>
			<div className="absolute left-1/2 -translate-x-1/2 top-[10px]">
				<ErrorMessage message={error} setError={setError}/>
			</div>
			<div className="absolute left-1/2 -translate-x-1/2 top-[320px]">
			<ActionButton setError={setError}/>
			</div>
			<div className="absolute left-1/2 -translate-x-1/2 w-[630px] bottom-[35px]">
				<Credit />
			</div>
		</Container>
	)
}

export default Login