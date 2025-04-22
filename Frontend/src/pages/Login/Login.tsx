import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Container from "./components/Container"
import MainTitle from "./components/MainTitle"
import Credit from "./components/Credit"
import ActionButton from "./components/ActionButton"
import ErrorMessage from "./components/ErrorMessage"

const Login = () => {
	const [error, setError] = useState("")
	const navigate = useNavigate()

	useEffect(() => {
		const accessToken = localStorage.getItem("accessToken")
	
		const checkRefresh = async () => {
			try {
				const res = await fetch(`${import.meta.env.VITE_API_URL}/v1/auth/refresh-token`, { // 로그인 상태인지 확인하기 위함 -> fetch를 사용
					method: "POST",
					credentials: "include" // refresh token 쿠키로 인증 시도
				})
				
				if (!res.ok) {
					throw new Error("refresh token expired")
				}
				// 서버가 새 accessToken을 줬으면 저장
				const data = await res.json()
				localStorage.setItem("accessToken", data.data.accessToken)
				navigate("/Home", { replace: true })
			} catch { // 토큰 만료
				await fetch(`${import.meta.env.VITE_API_URL}/v1/auth/logout`, {
					method: "POST",
					credentials: "include"
				})
			}
		}
	
		if (accessToken) {
			checkRefresh()
		}
	})	

	return (
		<Container>
			<div className="absolute left-1/2 -translate-x-1/2 top-[85px]">
				<MainTitle/>
			</div>
			<div className="absolute left-1/2 -translate-x-1/2 top-[10px]">
				<ErrorMessage message={error} setError={setError}/>
			</div>
			<div className="absolute left-1/2 -translate-x-1/2 top-[320px]">
			<ActionButton setError={setError}/>
			</div>
			<div className="absolute left-1/2 -translate-x-1/2 w-[630px] bottom-[35px]">
				<Credit />
			</div>
		</Container>
	)
}

export default Login