import { useState, useEffect } from "react"
import { toast } from "react-toastify"
import Container from "./components/Container"
import Cancel from "./components/Cancel"
import ProfileSection from "./components/ProfileSection"
import UserInformation from "./components/UserInformation"
import ConfirmLogout from "./components/ConfirmLogout"
import authFetch from "../../utils/authFetch"

const Profile = () => {
	const [wins, setWins] = useState<number>(0)
	const [losses, setLosses] = useState<number>(0)
	const [tournamentWins, setTournamentWins] = useState<number>(0)
  const [nickname, setNickname] = useState<string>("")
	const [profileImg, setProfileImg] = useState<File | string | null>(null)

  useEffect(() => {
    if (typeof profileImg !== "string" && profileImg instanceof File) {
      const objectUrl = URL.createObjectURL(profileImg)

      return () => {
        URL.revokeObjectURL(objectUrl)
        console.log("🧹 Object URL revoked")
      }
    }
  }, [profileImg])

	useEffect(() => {
		const fetchUserData = async () => {
			try {
				const token = localStorage.getItem("accessToken")
				console.log("📦 Stored token:", token)

				const response = await authFetch(`${import.meta.env.VITE_API_URL}/api/v1/users/me`, {
          method: 'GET'
        })
	
				if (!response) {
          console.error("No Response from server.")
          return
        }
	
				console.log("🌐 Response status:", response.status)
				const result = await response.json()
				console.log("🌐 Response body:", result)
	
				if (response.ok && result.data) {
					const data = result.data
					setNickname(data.nickname)
					setWins(data.wins)
					setLosses(data.losses)
					setTournamentWins(data.tournamentWins)
          setProfileImg(result.data.avatar || data.avatar_url || null)
				} else {
					console.log("Failed to fetch user data:", result.message)
          toast.error("Unable to load your information.", {
            position: "top-center",
            autoClose: 2000,
            style: {
              width: "350px",
              textAlign: "center"
            }
          })
				}
			} catch (error) {
				console.error("🚨 Unexpected error occurred: ", error)
			}
		}
	
		fetchUserData()
	}, [])
	
  const ChangeNickname = (newNickname: string) => {
    setNickname(newNickname)
		toast.success("Nickname update!", {
      position: "top-center",
      autoClose: 2000,
      style: {
        width: "350px",
        textAlign: "center"
      }
    })
  }

  useEffect(() => {
    console.log("Nickname:", nickname)
  }, [nickname])
  useEffect(() => {
    console.log("Wins:", wins)
  }, [wins])
  useEffect(() => {
    console.log("Losses:", losses)
  }, [losses])
  useEffect(() => {
    console.log("Tournament Wins:", tournamentWins)
  }, [tournamentWins])
	useEffect(() => {
		if (profileImg) {
			console.log("Profile image changed:", profileImg)
		} else {
			console.log("Profile avatar is empty.")
		}
	}, [profileImg])
	
  return (
    <Container>
      <div className="absolute left-[5px] top-[5px]">
        <Cancel/>
      </div>
      <h1 className="font-['Sixtyfour'] text-white text-[40px]
        absolute left-1/2 -translate-x-1/2 top-[50px]">Profile</h1>
      <div className="absolute left-[60px] top-[180px]">
			<ProfileSection profileImg={profileImg} onChangeProfileImg={setProfileImg} />
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

export default Profile
