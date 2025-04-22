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
      const check = async () => {
        try {
          if (label === "VERIFY CODE" && email && value.length === 6) {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/v1/auth/mail`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ email, verifyCode: value })
            })

            if (!res.ok) {
							return setIsValid(false)
						}
            const data = await res.json()
            setIsValid(data.status?.toLowerCase() === "success")
          } else if ((label === "PASSWORD" || label === "RE-PASSWORD") && password && rePassword) {
            setIsValid(password === rePassword && password.length >= 6)
          } else if (label === "NICKNAME" && value.length >= 1) {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/users/search/${value}`)
            if (!res.ok)	{
							return setIsValid(false)
						}
            const data = await res.json()
						const alreadyExists = Array.isArray(data.users) && data.users.some((u: { nickname: string }) => u.nickname === value)

						setIsValid(!alreadyExists)
          } else {
            setIsValid(false)
          }
        } catch {
          setIsValid(false)
        }
      }
      check()
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