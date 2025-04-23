import {toast} from "react-toastify"

const authFetch = async (url: string, options: RequestInit = {}): Promise<Response | null> => {
  // localStorage에서 토큰 가져와 사용
  const token = localStorage.getItem("accessToken")

  // accessToken을 포함한 요청을 보내는 함수. Authorization 헤더를 사용해 인증된 사용자만 접근할 수 있는 API에 접근할 때 사용.
  const makeRequest = async (accessToken: string) => {
    return fetch(url, {
      ...options, // options 객체의 모든 속성들을 펼쳐서 포함
      // credentials: "include", // 쿠키를 포함하여 서버와의 세션 유지
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
        ...options.headers, // options 객체에 포함된 headers 펼쳐서 사용
      },
    })
  }

  try {
    // Access Token이 존재할 경우 우선 요청
    if (token) {
      const response = await makeRequest(token)
      // if (!response.ok) {
      //   throw new Error(`HTTP error: ${response.statusText}`)
      // }
      if (response.status != 401) { // 응답이 정상일 경우 즉시 반환
        return response
      }
      console.warn("Access Token expired. Attempted to refresh.")
    }

    // 401 Unauthorized일 경우 Refresh Token 요청
    const refreshResponse = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/auth/refresh-token`, {
      method: "POST",
      credentials: "include" // 쿠키 포함
    })

    if (!refreshResponse.ok) { // Refresh Token 이용하여 재발급 실패
      const toastId = toast.warn("Session expired. Please log in again.", {
        position: "top-center",
        autoClose: 2000, // 2초  자동으로 닫힘
        closeOnClick: false,
        draggable: false
      })

      console.error("❌ refresh-token request failed!")
      localStorage.removeItem("accessToken")

      // 서버에 로그아웃 요청
      await fetch(`${import.meta.env.VITE_API_URL}/v1/auth/logout`, {
        method: "POST",
        credentials: "include",
      })

      setTimeout(() => {
        toast.dismiss(toastId)
        window.location.href = "/"
      }, 3000)

      return null
    }

    const refreshData = await refreshResponse.json()

    // 새 Access Token 발급받은 후 그 token으로 다시 요청
    if (refreshData?.data?.accessToken) {
      const newAccessToken = refreshData.data.accessToken
      localStorage.setItem("accessToken", newAccessToken)
      console.log("✅ accessToken successful re-issuance.")

      return makeRequest(newAccessToken)
    }
  } catch (error) {
    // 네트워크 오류나 예기치 않은 오류
    console.error("❌ Network error: ", error)
    toast.error("Network error. Please try again later.")

    return null
  }

  return null
}

export default authFetch
