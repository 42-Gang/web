import VerifyButtonOn from '../../../assets/image/VerifyButtonOn.png'
import { toast } from "react-toastify"
import authFetch from '../../../utils/authFetch'

interface VerifyProps {
	email: string
}

const Verify = ({ email }: VerifyProps) => {
	const handleClick = async () => {
		if (!email) {
			toast.warn("Please enter the email.")
			return
		}

		try {
			const res = await authFetch(`${import.meta.env.VITE_API_URL}/api/v1/auth/mail`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({ email })
			})

			if (!res) {
				toast.error("Request failed: No Request from server.")
				return
			}

			const result = await res.json()

			if (!res.ok) {
				if (result.message) toast.error(result.message)
				if (Array.isArray(result.errors)) {
					result.errors.forEach((err: { field: string, message: string }) => {
						toast.error(`[${err.field}] ${err.message}`, { autoClose: 2000 })
					})
				}
				return
			}

			toast.success(result.message || "Verify code sent.")
			console.log(`📩 ${email} → verify code: ${result.data?.verifyCode}`)

		} catch (err) {
			console.error("Authentication request error:", err)
			toast.error("An error occurred during authentication request.", { autoClose: 2000})
		}
	}

	const imgClass = "absolute inset-0 transition-opacity duration-300"

	return (
		<button onClick={handleClick} className="relative w-[116px] h-[41px] group cursor-pointer">
			<img
				src={VerifyButtonOn}
				alt="VerifyOn"
				className={`${imgClass} opacity-85 group-hover:opacity-100`}
			/>
			<span
				className="font-['QuinqueFive'] text-white
					text-[10px] absolute inset-0 right-[20px] top-[11px]">
				verify
			</span>
		</button>
	)
}

export default Verify
