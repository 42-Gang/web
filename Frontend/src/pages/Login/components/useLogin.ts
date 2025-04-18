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
			const res = await fetch(`${import.meta.env.VITE_API_URL}/v1/auth/login`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				credentials: "include",
				body: JSON.stringify({ email, password })
			})

			const result: LoginResponse = await res.json()

			if (result.code === 200) {
				// 로그인 성공 시 accessToken 저장
				localStorage.setItem("accessToken", result.data?.accessToken || "")

				// 바로 Home 페이지로 이동
				navigate("/Home")
			} else {
				setError(result.message)
			}
		} catch (error) {
			console.error("Login error:", error)
			setError("An unexpected error occurred. Please try again.")
		}
	}

	return login
}

export default useLogin
