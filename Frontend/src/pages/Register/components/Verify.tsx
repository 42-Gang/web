import VerifyButtonOn from '../../../assets/image/VerifyButtonOn.png'

interface VerifyProps {
	email: string
}

const Verify = ({ email }: VerifyProps) => {
	const generateVerifyCode = () => {
		return Math.floor(100000 + Math.random() * 900000).toString()
	}

	const handleClick = async () => {
		if (!email) {
			alert("이메일을 입력해주세요.")
			return
		}
	
		const verifyCode = generateVerifyCode()
	
		try {
			// DB에 저장하는 로직을 삭제하고, 알람만 띄웁니다.
			alert(`임시 인증 코드가 ${email}에 전송되었습니다.`)
	
			// 이메일 전송 로직은 그냥 콘솔로 확인
			console.log(`인증 코드 ${verifyCode}가 ${email}로 전송되었습니다.`)
	
		} catch (err) {
			console.error("인증 에러:", err)
			alert("인증 중 에러 발생")
		}
	}

	const imgClass = "absolute inset-0 transition-opacity duration-300"

	return (
		<button onClick={handleClick} className="relative w-[116px] h-[41px] group cursor-pointer">
			<img
				src={VerifyButtonOn}
				alt="VerifyOn"
				className={`${imgClass} opacity-85 group-hover:opacity-100`}/>
			<span
				className="font-['QuinqueFive'] text-white
					text-[10px] absolute inset-0 right-[20px] top-[11px]">
				verify
			</span>
		</button>
	)
}

export default Verify