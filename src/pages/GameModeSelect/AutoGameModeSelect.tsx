import Container from "./components/Container.tsx"
import MainTitle from "./components/MainTitle.tsx"
import Cancel from "./components/Cancel.tsx"
import SelectMode from "./components/SelectMode.tsx"

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