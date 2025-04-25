import VerifyButtonOn from '../../../assets/image/VerifyButtonOn.png'
import { toast } from "react-toastify"

interface VerifyProps {
  email: string
}

const Verify = ({ email }: VerifyProps) => {
  const handleClick = async () => {
    if (!email) {
      console.log("❌ Email field is empty.")
      toast.warn("Please enter the email.", {
        position: "top-center",
          autoClose: 2000,
          style: {
            width: "350px",
            textAlign: "center"
          }
      })
      return
    }

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/auth/mail`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email })
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

      toast.success(result.message || "Verify code sent.", {
        position: "top-center",
          autoClose: 2000,
          style: {
            width: "350px",
            textAlign: "center"
          }
      })
    } catch (error) {
      console.error("🚨 Unexpected error occurred: ", error)
      toast.error("An error occurred during authentication request.", {
        position: "top-center",
          autoClose: 2000,
          style: {
            width: "350px",
            textAlign: "center"
          }
      })
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