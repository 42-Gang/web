import { Routes, Route } from "react-router-dom"
import Login from "./pages/Login/Login.tsx"
import RegisterWithEmail from "./pages/Register/RegisterWithEmail.tsx"
import RegisterWithGoggle from "./pages/Register/RegisterWithGoggle.tsx"
import Home from "./pages/Home/Home.tsx"
import GameOptionSelect from "./pages/GameOptionSelect/GameOptionSelect.tsx"
import AutoGameModeSelect from "./pages/GameModeSelect/AutoGameModeSelect.tsx"
import CustomGameModeSelect from "./pages/GameModeSelect/CustomGameModeSelect.tsx"
import GameHistory from "./pages/GameHistory/GameHistory.tsx"
import Profile from "./pages/Profile/Profile.tsx"
import FriendList from "./pages/FriendList/FriendList.tsx"
import FriendChatRoom from "./pages/FriendList/FriendChatRoom.tsx"
import GameScreen from "./pages/Game/GameScreen.tsx"
import Tournament from "./pages/Tournament/Tournament.tsx"
import Invitation from "./pages/Tournament/Invitation.tsx"
import Matching from "./pages/Tournament/Matching.tsx"
import SemiFinalWaiting from "./pages/Tournament/SemiFinalWaiting.tsx"
import SoloMatch from "./pages/SoloMatch/SoloMatch.tsx"

const AppRoutes = () => {
  return (
    <Routes>
      {/* 로그인 */}
      <Route path="/" element={<Login/>}/>
      {/* 자체 회원 가입 */}
      <Route path="/RegisterWithEmail" element={<RegisterWithEmail/>}/>
      {/* 구글 회원 가입 */}
      <Route path="/RegisterWithGoogle" element={<RegisterWithGoggle/>}/>
      {/* 홈페이지 */}
      <Route path="/Home" element={<Home/>}/>
      {/* 게임 옵션 선택 */}
      <Route path="/GameOptionSelect" element={<GameOptionSelect/>}/>
      {/* 매칭 게임 모드 */}
      <Route path="/AutoGameModeSelect" element={<AutoGameModeSelect/>}/>
      {/* 커스텀 게임 모드 */}
      <Route path="/CustomGameModeSelect" element={<CustomGameModeSelect/>}/>
      {/* 히스토리 */}
      <Route path="/GameHistory" element={<GameHistory/>}/>
      {/* 친구 목록 */}
      <Route path="/FriendList" element={<FriendList/>}/>
      {/* 채팅창 */}
      <Route path="/FriendChatRoom/:roomId" element={<FriendChatRoom/>}/>
      {/* 프로필 */}
      <Route path="/Profile" element={<Profile/>}/>
      {/* 게임 화면 */}
      <Route path="/GameScreen" element={<GameScreen/>}/>
      {/* 토너먼트 */}
      <Route path="/Tournament" element={<Tournament/>}/>
      <Route path="/Invitation" element={<Invitation/>}/>
      <Route path="/TournamentMain" element={<Matching/>}/>
      <Route path="/SemiFinalWaiting" element={<SemiFinalWaiting/>}/>
      {/* 개인전 */}
      <Route path="/SoloMatch" element={<SoloMatch/>}/>
    </Routes>
  )
}

export default AppRoutes