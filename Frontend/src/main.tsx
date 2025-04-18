// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

// mockServer.cjs에서 useEffect가 2번 실행되고 있어서 테스트 하는 동안 StrictMode 주석 처리
// createRoot(document.getElementById('root')!).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )

createRoot(document.getElementById("root")!).render(<App />);
