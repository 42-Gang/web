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
				setError("이메일 또는 비밀번호를 확인해주세요.")
				return
			}

			if (response.status === 401) {
				setError("이메일 또는 비밀번호가 틀렸어요.")
				return
			}

			if (response.status === 500) {
				setError("서버 오류가 발생했어요. 잠시 후 다시 시도해주세요.")
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
