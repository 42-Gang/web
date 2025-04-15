interface InputFieldProps {
	label: string
	type: string
	width: string
	value: string
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const InputField = ({ label, type, width, value, onChange }: InputFieldProps) => {
	return (
		<div className="text-white font-['QuinqueFive'] text-[15px] flex items-center gap-[8px]">
			<p className="flex-shrink-0 w-[220px] text-right">{label}:</p>
			<input
				style={{ width }}
				type={type}
				value={value}
				onChange={onChange}
				className="font-['Galmuri7'] text-[24px]"
				/>
		</div>
	)
}

export default InputField