const Container = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className="w-[800px] h-[600px] bg-black">
			{children}
		</div>
	)
}

export default Container