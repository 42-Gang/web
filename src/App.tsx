import "./index.css"
import { useEffect, useContext } from "react"
import { BrowserRouter as Router} from "react-router-dom"
import { WebSocketContext } from "./contexts/WebSocketContext.tsx"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import GlobalStyle from "./styles/GlobalStyles.ts"
import { socket } from "./socket/socket.ts"
import { getAccessToken } from "./utils/getAccessToken.ts"
import { decodeToken } from "./utils/decodeToken.ts"
import AppRoutes from "./AppRoutes.tsx"

const App = () => {
  const webSocketContext = useContext(WebSocketContext)
  const connect = webSocketContext?.connect

  useEffect(() => {
    const handleMessage = (msg: any) => {
      const data = msg?.data ?? msg
      const { nickname, contents, senderId } = data

      const isChatPage = window.location.pathname.includes("/FriendChatRoom")
      const myId = decodeToken(getAccessToken())?.userId?.toString()

      if (!isChatPage && nickname && contents && senderId !== myId) {
        toast.info(`💬 ${nickname}: ${contents}`, {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          pauseOnHover: true,
        })
      }
    }

    socket.off("message", handleMessage)
    socket.on("message", handleMessage)

    return () => {
      socket.off("message", handleMessage)
    }
  }, [])

  // localStorage의 accessToken을 확인하고 reconnect 시도
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken")
    if (accessToken && connect) {
      console.log("🔄 Auto reconnecting WebSocket after reload...")
      connect(accessToken)
    }
  }, [connect])

  return (
    <>
        <GlobalStyle />
        <ToastContainer/>
        <Router>
          <AppRoutes/>
        </Router>
    </>
  )
}

export default App
