import { useNavigate } from "react-router-dom"
import SelectHighlight from "../../../assets/image/SelectHighlight.svg"

interface ConfirmProps {
  email: string
  verifyCode: string
  password: string
	rePassword: string
  nickname: string
}

interface User {
  id: string
  email: string
  verifyCode: string
  password: string
  nickname: string
}

const Confirm = ({ email, verifyCode, password, rePassword, nickname }: ConfirmProps) => {
  const navigate = useNavigate()

  const handleRegister = async () => {
		try {
			// 비밀번호 불일치 검사
			if (password !== rePassword) {
				alert("비밀번호가 일치하지 않습니다!")
				return
			}

			// 이미 존재하는 유저인지 검사
			const checkRes = await fetch(`http://localhost:3001/users`)
			const users: User[] = await checkRes.json()
			
			const isEmailTaken = users.some((user) => user.email === email)
			const isNicknameTaken = users.some((user) => user.nickname === nickname)

      if (isEmailTaken) {
        alert("이미 사용 중인 이메일입니다.")
        return
      }

      if (isNicknameTaken) {
        alert("이미 사용 중인 닉네임입니다.")
        return
      }

			// 회원가입 요청
			const res = await fetch("http://localhost:3001/users", {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					email: email,
					verifyCode: verifyCode,
					password: password,
					nickname: nickname
				})
			})
	
      if (!res.ok) {
        throw new Error("회원가입 실패")
      }

      const newUser = await res.json()
			alert("회원가입 성공!")
      console.log("회원가입 성공:", newUser)
      navigate("/")

    } catch (err) {
      console.error("에러:", err)
      alert("회원가입 중 문제가 발생했습니다.")
    }
  }

  return (
    <div className="text-white font-['QuinqueFive'] text-[15px] flex flex-col space-y-[10px]">
      <button onClick={handleRegister} className="cursor-pointer flex gap-[10px] -ml-[30px] group">
        <img
          src={SelectHighlight}
          alt="SelectHighlight"
          className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        />
        Register
      </button>
    </div>
  )
}

export default Confirm
