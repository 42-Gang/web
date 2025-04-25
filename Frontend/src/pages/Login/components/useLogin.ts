// src/hooks/useLogin.ts
import { useNavigate } from "react-router-dom"

interface LoginResponse {
  code: number
  message: string
  data: {
    accessToken: string
  }
}

const useLogin = (setError: (msg: string) => void) => {
  const navigate = useNavigate()

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({ email, password })
      })

      const body: LoginResponse = await response.json()

      // 로그인 성공
      if (response.status === 200) {
        console.log ("Login successful: ", body)
        // Access Token 저장
        localStorage.setItem("accessToken", body.data?.accessToken || "")
        // Home 페이지로 이동
        navigate('/Home')
        return
      }

      // 서버에서 넘겨주는 에러 메세지 그대로 출력
      if (body.message) {
        setError(body.message)
      } else {
        setError("An unexpected error occurred. Please try again.")
      }
    } catch (error) {
      console.error("🚨 Unexpected error occurred: ", error)
      setError("An unexpected error occurred. Please try again.")
    }
  }

  return login
}

export default useLogin