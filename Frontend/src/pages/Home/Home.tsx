import Container from "./components/Container"
import MainTitle from "./components/MainTitle"
import Credit from "./components/Credit"
import ActionButton from "./components/ActionButton"

const Home = () => {
  return (
    <Container>
      <MainTitle/>
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