import Container from "./components/Container"
import MainTitle from "./components/MainTitle"
import Cancel from "./components/Cancel"
import SelectMode from "./components/SelectMode"

const AutoGameModeSelect = () => {
  return (
    <Container>
      <Cancel/>
			<div className="absolute right-1/2 translate-x-1/2 top-[60px]">
				<MainTitle/>
			</div>
      <div className="absolute right-1/2 translate-x-1/2 bottom-[50px]">
        <SelectMode/>
      </div>
    </Container>
  )
}

export default AutoGameModeSelect