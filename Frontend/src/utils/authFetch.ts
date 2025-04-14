import { toast } from "react-toastify"

const authFetch = async (url: string, options: RequestInit = {}) => {
	const token = localStorage.getItem("accessToken")

	const fetchWithAuth = async () => {
		const res = await fetch(url, {
			...options,
			credentials: "include", // 리프레시 토큰을 보내기 위해 필요
			headers: {
				...options.headers,
				Authorization: `Bearer ${token}`
			}
		})

		// accessToken이 만료 됐을 때
		if (res.status == 401) {
			console.warn("accessToken 만료됨, refresh 시도")

			const refreshRes = await fetch("http://localhost:3001/v1/auth/refresh-token", {
				method: "POST",
				credentials: "include", // 쿠키 포함해서 보냄
			})

			const refreshData = await refreshRes.json()

			if (refreshRes.ok && refreshData.data?.accessToken) {
				console.log("accessToken 재발급 성공")
				// accessToken 저장 하고 다시 원래 요청 시도
				localStorage.setItem("accessToken", refreshData.data.accessToken)

				return await fetch(url, {
					...options,
					credentials: "include",
					headers: {
						...options.headers,
						Authorization: `Bearer ${refreshData.data.accessToken}`
					}
				})
			} else {
					toast.warn("세션이 만료되었습니다. 다시 로그인해주세요."), {
						position: "top-center"
					}
					console.error("refreshToken도 만료됨 -> 로그인 페이지로 이동")
					localStorage.removeItem("accessToken")
					setTimeout(() => {
						window.location.href = "/login" // ✅ 로그인 페이지로 이동
					}, 1500)
					return null
			}
		}
		return res
	}
	return await fetchWithAuth()
}

export default authFetch