import Gun from '../../../assets/image/Gun.svg'

const MainTitle = () => {
  return (
		<div className="w-[416px]">
			<p className="ColorC96565 font-['SuperPixel'] text-[60px] text-center leading-[72px]">
				PING PONG<br/>
				GANG
			</p>
      <img src={Gun} alt="Gun" className="absolute top-[20px] -left-[160px]"/>
      <img src={Gun} alt="Gun" className="flip-image absolute top-[20px] left-[310px]"/>
    </div>
  )
}

export default MainTitle