import "./index.css";
import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation} from "react-router-dom";
import { toast, ToastContainer } from "react-toastify"
import GlobalStyle from "./styles/GlobalStyles";
import Login from "./pages/Login/Login.tsx";
import RegisterWithEmail from "./pages/Register/RegisterWithEmail.tsx";
import RegisterWithGoggle from "./pages/Register/RegisterWithGoggle.tsx";
import Home from "./pages/Home/Home.tsx";
import GameOptionSelect from "./pages/GameOptionSelect/GameOptionSelect.tsx";
import AutoGameModeSelect from "./pages/GameModeSelect/AutoGameModeSelect.tsx";
import CustomGameModeSelect from "./pages/GameModeSelect/CustomGameModeSelect.tsx";
import GameHistory from "./pages/GameHistory/GameHistory.tsx";
import Setting from "./pages/Setting/Setting.tsx";
import FriendList from "./pages/FriendList/FriendList.tsx";
import FriendChatRoom from "./pages/FriendList/FriendChatRoom.tsx";
import GameScreen from "./pages/Game/GameScreen.tsx";
import Tournament from "./pages/Tournament/Tournament.tsx";
import Invitation from "./pages/Tournament/Invitation.tsx";
import Matching from "./pages/Tournament/Matching.tsx";
import SemiFinalWaiting from "./pages/Tournament/SemiFinalWaiting.tsx";
import SoloMatch from "./pages/SoloMatch/SoloMatch.tsx";

const SessionChecker = () => {
	const location = useLocation()

	useEffect(() => {
		const excludedPaths = ["/", "/RegisterWithEmail", "/RegisterWithGoogle"]

		if (excludedPaths.includes(location.pathname)) return

		const checkSession = () => {
			const token = localStorage.getItem("accessToken")
			const apiUrl = process.env.REACT_APP_API_URL
			
			if (!token) {
				toast.warn("세션 만료. 다시 로그인 해주세요.", {
					position: "top-center",
					onClose: () => {
						setTimeout(() => {
							fetch(`${apiUrl}/v1/auth/logout`, {
								method: "POST",
								credentials: "include"
							}).then(() => {
								localStorage.removeItem("accessToken")
								window.location.href = "/"
							})
						}, 1000)
					}
				})
			}
		}

		const interval = setInterval(checkSession, 60000)

		return () => clearInterval(interval)
	}, [location.pathname])

	return null
}

const App = () => {
  useEffect(() => {
    const lockWindowSize = () => {
      window.resizeTo(800, 600);
    };

    window.addEventListener("resize", lockWindowSize);
    lockWindowSize(); // 실행 시 즉시 크기 고정

    return () => {
      window.removeEventListener("resize", lockWindowSize);
    };
  }, []);



  return (
    <>
      <GlobalStyle />
			<ToastContainer/>
      <Router>
				<SessionChecker/>
        <Routes>
          {/* 로그인 페이지 */}
          <Route path="/" element={<Login />} />
          {/* 회원가입 페이지 */}
          <Route path="/RegisterWithEmail" element={<RegisterWithEmail />} />
          <Route path="/RegisterWithGoogle" element={<RegisterWithGoggle />} />
          {/* 메인 홈페이지 */}
          <Route path="/Home" element={<Home />} />
          {/* 게임 옵션 선택 페이지 */}
          <Route path="/GameOptionSelect" element={<GameOptionSelect />} />
          {/* 오토 게임 모드 선택 페이지 */}
          <Route path="/AutoGameModeSelect" element={<AutoGameModeSelect />} />
          {/* 커스텀 게임 모드 선택 페이지 */}
          <Route
            path="/CustomGameModeSelect"
            element={<CustomGameModeSelect />}
          />
          {/* 히스토리 페이지 */}
          <Route path="/GameHistory" element={<GameHistory />} />
          {/* 친구 목록 */}
          <Route path="/FriendList" element={<FriendList />} />
          <Route path="/FriendChatRoom" element={<FriendChatRoom />} />
          {/* 세팅 페이지 */}
          <Route path="/Setting" element={<Setting />} />
          {/* 게임 페이지 */}
          <Route path="/GameScreen" element={<GameScreen />} />
          {/* 토너먼트 */}
          <Route path="/Tournament" element={<Tournament />} />
          <Route path="/Invitation" element={<Invitation />} />
          <Route path="/TournamentMain" element={<Matching />} />
          <Route path="/SemiFinalWaiting" element={<SemiFinalWaiting />} />
          {/* 개인전 */}
          <Route path="/SoloMatch" element={<SoloMatch />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
