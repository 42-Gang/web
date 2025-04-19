import { useEffect, useState } from "react"
import Completed from "../../../assets/image/Completed.svg"

type Props = {
  label: string
  value: string
  email?: string
  rePassword?: string
  password?: string
}

const CheckInvalid = ({ label, value, email, password, rePassword }: Props) => {
  const [isValid, setIsValid] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => {
			if (label === "VERIFY CODE" && email && value.length === 6) { // 1, 인증 코드 확인
				fetch(`${import.meta.env.VITE_API_URL}/v1/auth/mail`, {
					method: "POST",
					headers: { "Content-Type": "application/json"},
					body: JSON.stringify({ email, verifyCode: value}) // 해당 값이 맞는지 확인 요청
				})
				.then(res => res.json())
				.then(data => {
					setIsValid(data.status?.toLowerCase() === "success")
				})
				.catch(() => setIsValid(false))
			} else if ((label === "PASSWORD" || label === "RE-PASSWORD") && password && rePassword) { // 2. 비밀번호 확인
				setIsValid(password === rePassword && password.length >= 6)
			} else if (label === "NICKNAME" && value.length >= 1) { // 3. 닉네임 중복 확인
				fetch(`${import.meta.env.VITE_API_URL}/api/users/check-nickname?nickname=${value}`)
				.then(res => res.json())
				.then((data) => { // data: res.json의 결과
					setIsValid(data.isAvailable === true)
				})
				.catch(() => setIsValid(false))
			} else {
				setIsValid(false)
			}
		}, 300)

		return () => clearTimeout(timeout)
  }, [label, value, email, password, rePassword])

  return (
    <img
      src={Completed}
      alt="Completed"
      className={`w-[24px] h-[24px] align-middle transition-all duration-300 ease-in-out ${
        isValid ? 'opacity-100 scale-100' : 'opacity-0 scale-90 pointer-events-none'
      }`}
    />
  )
}

export default CheckInvalid