import {useNavigate} from "react-router-dom"
import SelectHighlight from "../../../assets/image/SelectHighlight.svg"
import {toast} from "react-toastify"

interface ConfirmProps {
  email: string
  verifyCode: string
  password: string
  rePassword: string
  nickname: string
}

const Confirm = ({email, verifyCode, password, rePassword, nickname}: ConfirmProps) => {
  const navigate = useNavigate()

  const handleRegister = async () => {
    try {
      if (!email || !verifyCode || !password || !rePassword || !nickname) {
        console.log("❌ Registration conditions not met.")
        toast.warn("Please enter all the information.", {
          position: "top-center",
          autoClose: 2000,
          style: {
            width: "350px",
            textAlign: "center"
          }
        })
        return
      }

      if (password !== rePassword) {
        console.log("❌ Password does not match.")
        toast.error("Password does not match!", {
          position: "top-center",
          autoClose: 2000,
          style: {
            width: "350px",
            textAlign: "center"
          }
        })
        return
      }

      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/auth`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email,
          password,
          nickname,
          mailVerificationCode: verifyCode
        })
      })

      const result = await res.json()

      if (!res.ok) {
        if (result.message) {
          console.log(`❌ ${result.message}`)
          toast.error(result.message, {
            position: "top-center",
            autoClose: 2000,
            style: {
              width: "350px",
              textAlign: "center"
            }
          })
        }
        return
      }

      console.log("✅ Successfully signed up!:", result)
      toast.success(result.message || "Successfully signed up!", {
        position: "top-center",
          autoClose: 2000,
          style: {
            width: "350px",
            textAlign: "center"
          }
      })
      navigate("/")

    } catch (error) {
      console.error("🚨 Unexpected error occurred: ", error)
      toast.error("Registration not possible.", {
        position: "top-center",
          autoClose: 2000,
          style: {
            width: "350px",
            textAlign: "center"
          }
      })
    }
  }

  return (
      <div className="text-white font-['QuinqueFive'] text-[15px] flex flex-col space-y-[10px]">
        <button onClick={handleRegister}
                className="cursor-pointer flex gap-[10px] -ml-[30px] group">
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