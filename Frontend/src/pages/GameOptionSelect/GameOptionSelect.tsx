import ActionButton from "./components/ActionButton"
import Container from "./components/Container"
import MainTitle from "./components/MainTitle"
import Credit from "./components/Credit"

const GameOptionSelect = () => {
  return (
    <Container>
			<div className="absolute right-1/2 translate-x-1/2 top-[60px]">
				<MainTitle/>
			</div>
      <div className="absolute left-1/2 -translate-x-1/2 top-[220px]">
        <ActionButton />
      </div>
      <div className="absolute right-1/2 w-[630px] translate-x-1/2 bottom-[35px]">
        <Credit />
      </div>
    </Container>
  )
}

export default GameOptionSelect