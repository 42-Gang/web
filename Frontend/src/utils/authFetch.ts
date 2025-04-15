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
  const apiUrl = import.meta.env.VITE_API_URL
  const refreshRes = await fetch(`${apiUrl}/v1/auth/refresh-token`, {
    method: "POST",
    credentials: "include",
  })

  // 2.1 refreshRes가 성공적인지 확인
  if (!refreshRes.ok) {
    toast.warn("세션 만료. 다시 로그인 해주세요.", {
      position: "top-center",
    })
    console.error("❌ refresh-token 요청 실패")
    localStorage.removeItem("accessToken")

    // 1.5초 후 로그인 페이지로 리다이렉트
    setTimeout(() => {
      window.location.href = "/"
    }, 1500)

    return null
  }

  const refreshData = await refreshRes.json()

  // 3. refreshToken이 유효하고 새로운 accessToken과 refreshToken을 발급받은 경우
  if (refreshData.data?.accessToken && refreshData.data?.refreshToken) {
    const newAccessToken = refreshData.data.accessToken
    const newRefreshToken = refreshData.data.refreshToken

    // 새로운 accessToken과 refreshToken을 저장
    localStorage.setItem("accessToken", newAccessToken)
    document.cookie = `refreshToken=${newRefreshToken}; path=/; HttpOnly; secure; SameSite=Strict;` // 쿠키에 refreshToken 저장

    console.log("✅ accessToken 및 refreshToken 재발급 성공")

    return makeRequest(newAccessToken)
  }

  // 4. refreshToken도 만료 → 로그인 페이지로 이동
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
