import { useNavigate } from "react-router-dom"
import SelectHighlight from "../../../assets/image/SelectHighlight.svg"

interface ConfirmProps {
  email: string
  verifyCode: string
  password: string
  rePassword: string
  nickname: string
}

const Confirm = ({ email, verifyCode, password, rePassword, nickname }: ConfirmProps) => {
  const navigate = useNavigate()

  const handleRegister = async () => {
    try {
      // 1. 필수 항목 누락 확인
      if (!email || !verifyCode || !password || !rePassword || !nickname) {
        alert("모든 항목을 입력해 주세요.")
        return
      }

      // 2. 비밀번호 일치 확인
      if (password !== rePassword) {
        alert("비밀번호가 일치하지 않습니다!")
        return
      }

      // 3. 서버에 회원가입 요청
      const res = await fetch("http://localhost:3001/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          password,
          repassword: rePassword,
          nickname,
          verifyCode
        })
      })

      if (!res.ok) {
        const error = await res.json()
        alert(error.message || "회원가입 실패")
        return
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
