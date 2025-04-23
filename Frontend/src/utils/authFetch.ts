import { toast } from "react-toastify"

const authFetch = async (url: string, options: RequestInit = {}): Promise<Response | null>  => {
	// localStorage에서 토큰 가져와 사용
  const token = localStorage.getItem("accessToken")

	// accessToken을 넣고 API 요청을 보냄
  const makeRequest = async (accessToken: string) => {
    return fetch(url, {
      ...options,
      credentials: "include",
      headers: {
        ...options.headers,
        Authorization: `Bearer ${accessToken}`, // bearer token과 header는 중복될 수 없음 (둘 중 하나 빼기)
      },
    })
  }

	// 루트 경로에서 리프레쉬 토큰 있음 -> accessToken 유효 확인

  // 1. accessToken이 있을 경우 우선 요청
  if (token) {
    const res = await makeRequest(token)
    if (res.status !== 401) return res // 응답이 정상이라면 응답 반환
    console.warn("accessToken 만료됨, refresh 시도") // 401 Unauthorized이면 refresh-token을 요청
  }

  // 2. accessToken이 없거나 만료됐을 경우 → 서버에 refresh 요청
  const refreshRes = await fetch(`${import.meta.env.VITE_API_URL}/v1/auth/refresh-token`, {
    method: "POST",
    credentials: "include", // 쿠키 포함해서 보냄
  })

  // 2.1 refresh 실패 → 로그인으로 이동
  if (!refreshRes.ok) {
    const toastId = toast.warn("Session expired. Please log in again.", {
      position: "top-center",
      autoClose: 2000, // 2초 후 자동으로 닫힘
      closeOnClick: false, // 클릭으로 닫히지 않도록 설정
      draggable: false // 드래그로 이동하지 않도록 설정
    })
    console.error("❌ refresh-token request failed!")
    localStorage.removeItem("accessToken")

    // 서버에 로그아웃 요청 보내기
    await fetch(`${import.meta.env.VITE_API_URL}/v1/auth/logout`, {
      method: "POST",
      credentials: "include", // 쿠키 포함해서 보냄
    })

    // 충분한 시간 후 페이지 이동
    setTimeout(() => {
      toast.dismiss(toastId) // 토스트를 명시적으로 닫음
      window.location.href = "/" // 페이지 이동
    }, 3000) // 2초 기다린 후 페이지 이동
    return null
  }

  const refreshData = await refreshRes.json() // 백엔드에서 응답 받은 JSON 데이터를 객체로 변환

  // 3. 새 accessToken이 있다면 저장 후 다시 요청
  if (refreshData.data?.accessToken) {
    const newAccessToken = refreshData.data.accessToken
    localStorage.setItem("accessToken", newAccessToken)
    console.log("✅ accessToken successful re-issuance.")

    return makeRequest(newAccessToken)
  }

  // 4. 그 외 실패 처리
  const toastId = toast.warn("세션 만료. 다시 로그인 해주세요.", {
    position: "top-center",
    autoClose: 2000, // 2초 후 자동으로 닫힘
    closeOnClick: false, // 클릭으로 닫히지 않도록 설정
    draggable: false // 드래그로 이동하지 않도록 설정
  })
  console.error("❌ refreshToken 만료 → 로그인 이동")
  localStorage.removeItem("accessToken")

  // 서버에 로그아웃 요청 보내기
  await fetch(`${import.meta.env.VITE_API_URL}/v1/auth/logout`, {
    method: "POST",
    credentials: "include", // 쿠키 포함해서 보냄
  })

  // 충분한 시간 후 페이지 이동
  setTimeout(() => {
    toast.dismiss(toastId) // 토스트를 명시적으로 닫음
    window.location.href = "/" // 페이지 이동
  }, 3000) // 2초 기다린 후 페이지 이동

  return null
}

export default authFetch
