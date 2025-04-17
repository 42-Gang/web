import { useEffect, useState } from "react"
import Completed from "../../../assets/image/Completed.svg"

type Props = {
  label: string
  value: string
  email?: string
  rePassword?: string
  password?: string
}

type User = {
  email: string
  verifyCode: string
  nickname?: string
  password?: string
}

const CheckInvalid = ({ label, value, email, password, rePassword }: Props) => {
  const [isValid, setIsValid] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (label === "VERIFY CODE" && email && value) {
        fetch("http://localhost:3001/v1/auth/mail", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, verifyCode: value })
        })
          .then(res => res.json())
          .then(data => {
            setIsValid(data.status === "success")
          })
          .catch(() => setIsValid(false))

      } else if ((label === "PASSWORD" || label === "RE-PASSWORD") && password && rePassword) {
        setIsValid(password === rePassword && password !== "")
      } else if (label === "NICKNAME" && value) {
        fetch("http://localhost:3001/users")
          .then(res => res.json())
          .then((data: User[]) => {
            const isTaken = data.some(u => u.nickname === value)
            setIsValid(!isTaken)
          })
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