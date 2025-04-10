import { useState } from "react"
import { useNavigate } from "react-router-dom"
import useLogin from "./useLogin"
import SelectHighlight from "../../../assets/image/SelectHighlight.svg"

interface ActionButtonProps {
	email: string
	password: string
	setError: (message: string) => void
}

const ActionButton = ({ email, password, setError }: ActionButtonProps) => {
	const navigate = useNavigate()
	const [mode, setMode] = useState<"default" | "signupOptions">("default")
	const login = useLogin(setError)

	const handleButtonClick = (action: "signIn" | "signUp") => {
		if (action === "signIn") {
			login(email, password)
		} else {
			setMode("signupOptions")
		}
	}

	const handleGoogleSignup = () => {
		navigate('/RegisterWithGoogle') // 임시(수정하려면 수정해도 됩니다)
	}

	const handleLocalSignup = () => {
		navigate('/RegisterWithEmail')
	}

	const buttonClass = "cursor-pointer flex gap-[10px] -ml-[40px] group justify-center items-center"
	const imgClass = "opacity-0 group-hover:opacity-100 transition-opacity duration-500"
	const textClass = "text-white font-['QuinqueFive'] text-[15px]"

	return (
		<div className="flex flex-col space-y-[10px]">
			{mode === "default" && (
				<>
					{["signIn", "signUp"].map((action) => (
						<button
							key={action}
							onClick={() => handleButtonClick(action as "signIn" | "signUp")}
							className={buttonClass}
						>
							<img src={SelectHighlight} alt="highlight" className={imgClass} />
							<span className={textClass}>
								{action === "signIn" ? "SIGN IN" : "SIGN UP"}
							</span>
						</button>
					))}
				</>
			)}

			{mode === "signupOptions" && (
				<>
					<button onClick={handleGoogleSignup} className={buttonClass}>
						<img src={SelectHighlight} alt="highlight" className={imgClass} />
						<span className={textClass}>CONTINUE WITH GOOGLE</span>
					</button>

					<button onClick={handleLocalSignup} className={buttonClass}>
						<img src={SelectHighlight} alt="highlight" className={imgClass} />
						<span className={textClass}>SIGN UP WITH EMAIL</span>
					</button>

					<button onClick={() => setMode("default")} className={buttonClass}>
						<img src={SelectHighlight} alt="highlight" className={imgClass} />
						<span className={textClass}>GO BACK</span>
					</button>
				</>
			)}
		</div>
	)
}

export default ActionButton
