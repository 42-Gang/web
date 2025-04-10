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
			const res = await fetch("http://localhost:3001/api/login", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				credentials: "include",
				body: JSON.stringify({ email, password }),
			}) // POST 요청을 백엔드로 보냄

			const result: LoginResponse = await res.json() // 백엔드가 응답으로 JSON을 내려주면 받아서 저장

			if (result.code === 200) {
				localStorage.setItem("accessToken", result.data?.accessToken || "")
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
