import VerifyButtonOn from '../../../assets/image/VerifyButtonOn.png'

interface VerifyProps {
	email: string
}

const Verify = ({ email }: VerifyProps) => {
	const handleClick = async () => {
		if (!email) {
			alert("이메일을 입력해주세요.")
			return
		}
	
		try {
			// 1️⃣ 이메일 중복 여부 확인
			const userRes = await fetch("http://localhost:3001/users")
			const userList = await userRes.json()
	
			const isTaken = userList.some((u: { email: string }) => u.email === email)
			if (isTaken) {
				alert("이미 가입된 이메일입니다. 다른 이메일을 입력해주세요.")
				return
			}
	
			// 2️⃣ 인증 코드 요청
			const res = await fetch("http://localhost:3001/v1/auth/mail", {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({ email })
			})
	
			const result = await res.json()
	
			if (res.status !== 200) {
				alert(result.message || "인증 코드 전송 실패")
				return
			}
			console.log(`📩 ${email} → 인증 코드: ${result.data?.verifyCode}`)
		} catch (err) {
			console.error("인증 요청 에러:", err)
			alert("인증 요청 중 오류가 발생했습니다.")
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