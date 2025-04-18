import { useNavigate } from "react-router-dom"
import SelectHighlight from "../../../assets/image/SelectHighlight.svg"
import { toast } from "react-toastify"

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
      if (!email || !verifyCode || !password || !rePassword || !nickname) {
        toast.warn("Please enter all the information.", { autoClose: 2000 })
        return
      }

      if (password !== rePassword) {
        toast.error("Password does not match!", { autoClose: 2000 })
        return
      }

      const res = await fetch(`${import.meta.env.VITE_API_URL}/users`, {
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

      const result = await res.json()

      if (!res.ok) {
				if (Array.isArray(result.errors) && result.errors.length > 0) {
					result.errors.forEach((err: { field: string, message: string }) => {
						toast.error(err.message, { autoClose: 2000 })
					})
				} else if (result.message) {
					toast.error(result.message, { autoClose: 2000 })
				}
			
				return
			}			

      toast.success(result.message || "Successfully signed up for membership!", { autoClose: 2000 })
      console.log("Successfully signed up for membership:", result)
      navigate("/")

    } catch (err) {
      console.error("Error:", err)
      toast.error("There was a problem signing up for membership.", { autoClose: 2000 })
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
