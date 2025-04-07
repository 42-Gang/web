import { motion } from "framer-motion"
import { ReactNode } from "react"

export const FadeOverlay = () => (
	<motion.div
		className="fixed inset-0 bg-black opacity-50"
		initial={{ opacity: 0 }}
		animate={{ opacity: 0.5 }}
		exit={{ opacity: 0 }}
	/>
)

export const PopupWrapper = ({ children }: { children: ReactNode }) => (
	<motion.div
		className="fixed inset-0 flex justify-center items-center"
		initial={{ opacity: 0, scale: 0.8 }}
		animate={{ opacity: 1, scale: 1 }}
		exit={{ opacity: 0, scale: 0.8 }}
		transition={{ duration: 0.3, ease: "easeInOut" }}
	>
		{children}
	</motion.div>
)
