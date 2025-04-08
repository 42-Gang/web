import Container from "./components/Container"
import Giveup from "./components/Giveup"
import Score from "./components/Score"
import GameCanvas from "./components/GameCanvas"
import BallBullet from "../../assets/image/BallBullet.svg"

const GameScreen = () => {
	return (
		<Container>
			<div className="absolute left-[334px] top-[18px] z-40">
				<Giveup/>
			</div>
			<div className="absolute right-[238px] top-[120px] z-30">
				<Score/>
			</div>
			<div className="absolute top-[162px] z-20">
				<GameCanvas ballImg={BallBullet}/>
			</div>
		</Container>
	)
}

export default GameScreen;
