import Container from "./components/Container.tsx"
import MainTitle from "./components/MainTitle.tsx"
import Credit from "./components/Credit.tsx"
import ActionButton from "./components/ActionButton.tsx"

const Home = () => {
  return (
    <Container>
      <div className="absolute left-1/2 -translate-x-1/2 top-[85px]">
        <MainTitle />
      </div>
      <div className="absolute left-1/2 -translate-x-1/2 top-[270px]">
        <ActionButton />
      </div>
      <div className="absolute right-1/2 w-[630px] translate-x-1/2 bottom-[35px]">
        <Credit />
      </div>
    </Container>
  )
}

export default Home