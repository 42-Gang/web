import {toast} from "react-toastify"

const authFetch = async (url: string, options: RequestInit = {}): Promise<Response | null> => {
  // localStorage에서 토큰 가져와 사용
  const token = localStorage.getItem("accessToken")

  // accessToken을 포함한 요청을 보내는 함수. Authorization 헤더를 사용해 인증된 사용자만 접근할 수 있는 API에 접근할 때 사용.
  const makeRequest = async (accessToken: string) => {
    // FormData인지 여부 확인
    // FormData는 브라우저가 자동으로 설정해야 되는 부분이라 따로 설정
    const isFormData = options.body instanceof FormData

    const baseHeaders: Record<string, string> = {
      Authorization: `Bearer ${accessToken}`,
      ...(options.headers as Record<string, string>)
    }    

    // JSON 요청일 때만 Content-Type 명시
    // body가 FormData가 아니라면 일반적인 JSON 요청이라 Content-type을 직접 명시해줘야 함
    // FormData는 절대 명시 X 브라우저가 자동 생성
    if (!isFormData && options.body !== undefined) { // body가 없을 때 Content-Type 붙이기 않기
      baseHeaders["Content-Type"] = 'application/json'
    }

    return fetch(url, {
      ...options,
      headers: baseHeaders
    })
  }

  try {
    // Access Token이 존재할 경우 우선 요청
    if (token) {
      const response = await makeRequest(token)
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

      // HttpOnly 쿠키는 js에서 직접 삭제 불가능 -> 서버에 삭제 요청
      // 쿠키에 refresh token이 남아 있기만 하면 삭제 가능
      try {
        await fetch(`${import.meta.env.VITE_API_URL}/api/v1/auth/logout`, {
        method: 'GET',
          credentials: "include", // 쿠키 포함 (refreshToken 전송)
        })
      } catch(error) {
        console.log("⚠️ Logout request failed: ", error)
      }
      
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
    console.log("❌ No response from server: ", error)

    return null
  }

  return null
}

export default authFetch