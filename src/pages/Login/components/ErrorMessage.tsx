import { useEffect } from "react"
import { AnimatePresence } from "framer-motion"
import { ErrorMessageWrapper } from "./Animation.tsx"

interface ErrorMessageProps {
	message: string
	setError: (message: string) => void
}

const ErrorMessage = ({ message, setError }: ErrorMessageProps) => {
	useEffect(() => {
		if (!message) return

		const timer = setTimeout(() => setError(""), 3000)
		return () => clearTimeout(timer)
	}, [message, setError])

	const className = "text-red-500 w-[600px] font-['Galmuri7'] text-[20px] text-center"

	return (
		<AnimatePresence>
			{message && (
				<ErrorMessageWrapper>
					<div className={className}>{message}</div>
				</ErrorMessageWrapper>
			)}
		</AnimatePresence>
	)
}

export default ErrorMessage
