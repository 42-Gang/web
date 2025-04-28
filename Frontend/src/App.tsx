import "./index.css";
import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GlobalStyle from "./styles/GlobalStyles";
import { socket } from "./socket/socket";
import { getAccessToken } from "./utils/getAccessToken";
import { decodeToken } from "./utils/decodeToken";

import Login from "./pages/Login/Login.tsx";
import RegisterWithEmail from "./pages/Register/RegisterWithEmail.tsx";
import RegisterWithGoggle from "./pages/Register/RegisterWithGoggle.tsx";
import Home from "./pages/Home/Home.tsx";
import GameOptionSelect from "./pages/GameOptionSelect/GameOptionSelect.tsx";
import AutoGameModeSelect from "./pages/GameModeSelect/AutoGameModeSelect.tsx";
import CustomGameModeSelect from "./pages/GameModeSelect/CustomGameModeSelect.tsx";
import GameHistory from "./pages/GameHistory/GameHistory.tsx";
import Setting from "./pages/Profile/Setting.tsx";
import FriendList from "./pages/FriendList/FriendList.tsx";
import FriendChatRoom from "./pages/FriendList/FriendChatRoom.tsx";
import GameScreen from "./pages/Game/GameScreen.tsx";
import Tournament from "./pages/Tournament/Tournament.tsx";
import Invitation from "./pages/Tournament/Invitation.tsx";
import Matching from "./pages/Tournament/Matching.tsx";
import SemiFinalWaiting from "./pages/Tournament/SemiFinalWaiting.tsx";
import SoloMatch from "./pages/SoloMatch/SoloMatch.tsx";

const AppContent = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/RegisterWithEmail" element={<RegisterWithEmail />} />
      <Route path="/RegisterWithGoogle" element={<RegisterWithGoggle />} />
      <Route path="/Home" element={<Home />} />
      <Route path="/GameOptionSelect" element={<GameOptionSelect />} />
      <Route path="/AutoGameModeSelect" element={<AutoGameModeSelect />} />
      <Route path="/CustomGameModeSelect" element={<CustomGameModeSelect />} />
      <Route path="/GameHistory" element={<GameHistory />} />
      <Route path="/FriendList" element={<FriendList />} />
      <Route path="/FriendChatRoom" element={<FriendChatRoom />} />
      <Route path="/FriendChatRoom/:roomId" element={<FriendChatRoom />} />
      <Route path="/Setting" element={<Setting />} />
      <Route path="/GameScreen" element={<GameScreen />} />
      <Route path="/Tournament" element={<Tournament />} />
      <Route path="/Invitation" element={<Invitation />} />
      <Route path="/TournamentMain" element={<Matching />} />
      <Route path="/SemiFinalWaiting" element={<SemiFinalWaiting />} />
      <Route path="/SoloMatch" element={<SoloMatch />} />
    </Routes>
  );
};

const App = () => {
  useEffect(() => {
    const handleMessage = (msg: any) => {
      const data = msg?.data ?? msg;
      const { nickname, contents, senderId } = data;

      const isChatPage = window.location.pathname.includes("/FriendChatRoom");
      const myId = decodeToken(getAccessToken())?.userId?.toString();

      if (!isChatPage && nickname && contents && senderId !== myId) {
        toast.info(`💬 ${nickname}: ${contents}`, {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          pauseOnHover: true,
        });
      }
    };

    socket.off("message", handleMessage);
    socket.on("message", handleMessage);

    return () => {
      socket.off("message", handleMessage);
    };
  }, []);

  return (
    <>
      <GlobalStyle />
      <Router>
        <ToastContainer />
        <AppContent />
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
          <Route path="/FriendChatRoom/:roomId" element={<FriendChatRoom />} />
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
