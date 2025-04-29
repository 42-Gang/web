import { useNavigate } from 'react-router-dom'
import VersusMatch from '../../../assets/image/VersusMatch.svg'
import TournamentMatch from '../../../assets/image/TournamentMatch.svg'

const SelectMode = () => {
	const navigate = useNavigate()

  const buttons = [
    { label: "1 VS 1", img: VersusMatch, path: "/SoloMatch" },
    { label: "TOURNAMENT", img: TournamentMatch, path: "/TournamentMain" }
  ]

    const buttonClass = "cursor-pointer w-[328px] h-[323px] border-white \
            border-4 rounded-3xl relative flex flex-col justify-end hover:bg-gray-400 \
            hover:text-yellow-300 hover:border-yellow-300 transition-colors duration-300"
    const imgClass = "w-[195px] h-[195px] absolute top-[45px] right-[63px]"
    
  return (
    <div className="text-white font-['StWinterPixel'] text-[35px] flex gap-[30px]">
      {buttons.map(({ label, img, path }) => (
        <button
					key={label}
					className={buttonClass}
					onClick={() => navigate(path)}
					>
          <img src={img} alt={label} className={imgClass}/>
          {label}
        </button>
      ))}
    </div>
  )
}

export default SelectMode