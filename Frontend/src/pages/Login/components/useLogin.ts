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
			if (response.status === 200) {
				console.log("Login successful:", body)
				// 로그인 성공 시 accessToken 저장
				localStorage.setItem("accessToken", body.data?.accessToken || "")

				// 바로 Home 페이지로 이동
				navigate("/Home")
				return
			}

			if (response.status === 400) {
				setError("Please Check your email or password.")
				return
			}

			if (response.status === 401) {
				setError("The email or password is incorrect,")
				return
			}

			if (response.status === 500) {
				setError("There was a server error, please try again in a moment.")
				return
			}
		} catch (error) {
			console.error("Login error:", error)
			setError("An unexpected error occurred. Please try again.")
		}
	}

	return login
}

export default useLogin
