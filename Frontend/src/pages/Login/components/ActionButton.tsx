import { useNavigate } from "react-router-dom" 
import SelectHighlight from '../../../assets/image/SelectHighlight.svg'

// 임시 유저 mock
const mockUser = {
	email: "test@gmail.com",
	password: "password0311"
}

const ActionButton = ({ email, password, setError}: {
	email: string, password: string, setError: (message: string) => void
}) => {
	const navigate = useNavigate()

	const handleButtonClick = (type: 'signIn' | 'signUp') => {
		if (type === 'signIn') {
			if (!email || !password) {
				setError("Please enter your email or password.")
				return
			} else if (email !== mockUser.email || password !== mockUser.password) {
				setError("The email or password does not match.")
			} else {
				setError("")
				navigate('/Home')
			}
		} else {
			navigate('/Register')
		}
	}

	const buttonClass = "cursor-pointer flex gap-[10px] -ml-[30px] group"
	const imgClass = "opacity-0 group-hover:opacity-100 transition-opacity duration-300"

	return (
		<div className="text-white font-['QuinqueFive'] text-[15px] flex flex-col space-y-[10px]">
			{['signIn', 'signUp'].map((action) => (
				<button
					key={action}
					onClick={() => handleButtonClick(action as 'signIn' | 'signUp')}
					className={buttonClass}
				>
					<img
						src={SelectHighlight}
						alt="SelectHighlight"
						className={imgClass}
					/>
						{action === 'signIn' ? 'SIGN IN' : 'SIGN UP'}
				</button>
			))}
		</div>
	)
}

export default ActionButton