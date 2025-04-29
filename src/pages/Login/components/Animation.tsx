import { motion } from "framer-motion"
import { ReactNode } from "react"

interface Props {
	children: ReactNode
}

export const ErrorMessageWrapper = ({ children }: Props) => (
	<motion.div
		initial={{ opacity: 0, scale: 0.6 }}
		animate={{ opacity: 1, scale: 1 }}
		exit={{ opacity: 0, scale: 0.6 }}
		transition={{ duration: 0.25, ease: "backOut" }}
	>
		{children}
	</motion.div>
)