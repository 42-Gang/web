import { toast } from "react-toastify"

const authFetch = async (url: string, options: RequestInit = {}) => {
  const token = localStorage.getItem("accessToken")

  // 토큰 포함 요청 함수
  const makeRequest = async (accessToken: string) => {
    return fetch(url, {
      ...options,
      credentials: "include",
      headers: {
        ...options.headers,
        Authorization: `Bearer ${accessToken}`,
      },
    })
  }

  // 1. accessToken이 있을 경우 우선 요청
  if (token) {
    const res = await makeRequest(token)
    if (res.status !== 401) return res; // 유효하면 바로 반환
    console.warn("accessToken 만료됨, refresh 시도")
  }

  // 2. accessToken이 없거나 만료됐을 경우 → refresh-token 요청
	const apiUrl = process.env.REACT_APP_API_URL
  const refreshRes = await fetch(`${apiUrl}/v1/auth/refresh-token`, {
    method: "POST",
    credentials: "include",
  })

  const refreshData = await refreshRes.json()

  if (refreshRes.ok && refreshData.data?.accessToken) {
    const newAccessToken = refreshData.data.accessToken
    localStorage.setItem("accessToken", newAccessToken)
    console.log("✅ accessToken 재발급 성공")

    return makeRequest(newAccessToken)
  }

  // 3. refreshToken도 만료 → 로그인 페이지로 이동
  toast.warn("세션 만료. 다시 로그인 해주세요.", {
    position: "top-center",
  })
  console.error("❌ refreshToken 만료 → 로그인 이동")
  localStorage.removeItem("accessToken")

  // 1.5초 후 로그인 페이지로 리다이렉트
  setTimeout(() => {
    window.location.href = "/"
  }, 1500)

  return null
}

export default authFetch