interface InputFieldProps {
	label: string
	value: string
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
	type: string
	width: string
}

const InputField = ({ label, value, onChange, type, width }: InputFieldProps) => {
	return (
		<div className="text-white flex gap-[8px]">
			<p className="font-['QuinqueFive'] text-[15px] flex-shrink-0 w-[110px] text-right">
				{label}:
			</p>
			<input
				className="font-['Galmuri7'] text-[24px] h-[25px] focus:outline-none focus:border-b focus:border-white"
				style={{ width }}
				type={type}
				value={value}
				onChange={onChange}/>
		</div>
	)
}

export default InputField