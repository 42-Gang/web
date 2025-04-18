import { useState, useEffect } from "react"
import Container from "./components/Container"
import Cancel from "./components/Cancel"
import Profile from "./components/Profile"
import UserInformation from "./components/UserInformation"
import ConfirmLogout from "./components/ConfirmLogout"
import authFetch from "../../utils/authFetch"

const Setting = () => {
	const [wins, setWins] = useState<number>(0)
	const [losses, setLosses] = useState<number>(0)
	const [tournamentWins, setTournamentwins] = useState<number>(0)
  const [nickname, setNickname] = useState<string>("")
	const [profileImg, setProfileImg] = useState<File | string | null>(null)

	useEffect(() => {
		const fetchUserData = async () => {
			try {
				const token = localStorage.getItem("accessToken")
				console.log("📦 Stored token:", token)
	
				if (!token) {
					console.error("No access token found")
					return
				}
	
				// 🧠 토큰에서 userId 꺼내기
				const payload = JSON.parse(atob(token.split('.')[1]))
				const userId = payload.userId
				console.log("🧠 Decoded userId:", userId)
	
				const res = await authFetch(`${import.meta.env.VITE_API_URL}/users/${userId}`, {
					headers: {
						Authorization: `Bearer ${token}`
					}
				})
	
				if (!res) return
	
				console.log("🌐 Response status:", res.status)
				const result = await res.json()
				console.log("🌐 Response body:", result)
	
				if (res.ok && result.data) {
					const data = result.data
					setNickname(data.nickname)
					setWins(data.wins)
					setLosses(data.losses)
					setTournamentwins(data.tournamentWins)
				} else {
					console.error("Failed to fetch user data:", result.message)
				}
			} catch (err) {
				console.error("Error fetching user data:", err)
			}
		}
	
		fetchUserData()
	}, [])
	
  const ChangeNickname = (newNickname: string) => {
    setNickname(newNickname)
  }

  useEffect(() => {
    console.log("Nickname changed:", nickname)
  }, [nickname])
  useEffect(() => {
    console.log("Wins changed:", wins)
  }, [wins])
  useEffect(() => {
    console.log("Losses changed:", losses)
  }, [losses])
  useEffect(() => {
    console.log("Tournament wins changed:", tournamentWins)
  }, [tournamentWins])
	useEffect(() => {
		if (profileImg) {
			console.log("Profile image changed (from Setting):", profileImg)
		} else {
			console.log("Profile image removed (from Setting)")
		}
	}, [profileImg])
	
  return (
    <Container>
      <Cancel/>
      <h1 className="font-['Sixtyfour'] text-white text-[40px]
        absolute left-1/2 -translate-x-1/2 top-[50px]">Profile</h1>
      <div className="absolute left-[60px] top-[180px]">
			<Profile onChangeProfileImg={setProfileImg} />
      </div>
      <div className="absolute right-[60px] top-[225px]">
        <UserInformation
          nickname={nickname}
          wins={wins}
          losses={losses}
          tournamentWins={tournamentWins}
          onChangeNickname={ChangeNickname}/>
      </div>
      <div className="absolute left-[60px] bottom-[30px]">
        <ConfirmLogout/>
      </div>
    </Container>
  )
}

export default Setting
