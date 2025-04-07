import Container from "./components/Container"
import Giveup from "./components/Giveup"
import Score from "./components/Score"
import GameCanvas from "./components/GameCanvas"
import BallBullet from "../../assets/image/BallBullet.svg"

const GameScreen = () => {
	// const navigate = useNavigate();

	// 게임이 끝났다고 가정하고 ping 승리로 이동
	// useEffect(() => {
	//   const timeout = setTimeout(() => {
	//     const winnerId = 2; // Ping이 이겼다고 가정
	//     navigate("/SoloMatch", { state: { winnerId } })
	//   }, 3000)

	//   return () => clearTimeout(timeout);
	// }, [navigate])
	return (
		<Container>
			<div className="absolute right-[10px] top-[18px] z-30">
				<Giveup/>
			</div>
			<div className="absolute right-[278px] top-[100px] z-20">
				<Score/>
			</div>
			<div className="absolute top-[155px] z-10">
				<GameCanvas ballImg={BallBullet}/>
			</div>
		</Container>
	)
}

export default GameScreen;
