// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RecoilRoot } from "recoil";
import "./index.css";
import App from "./App.tsx";
import { WebSocketProvider } from "./contexts/WebSocketProvider.tsx";

// 웹 소켓으로 유저 상태 전역 관리
createRoot(document.getElementById("root")!).render(
  <RecoilRoot>
    <WebSocketProvider>
      <App />
    </WebSocketProvider>
  </RecoilRoot>
)

// mockServer.cjs에서 useEffect가 2번 실행되고 있어서 테스트 하는 동안 StrictMode 주석 처리
// createRoot(document.getElementById('root')!).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )

createRoot(document.getElementById("root")!).render(<App />);
