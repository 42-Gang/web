import CancelButton from "../../../assets/image/CancelButton2.svg"

interface AlarmPopupProps {
	onClose: () => void
}

const AlarmPopup = ({ onClose }: AlarmPopupProps) => {
	return (
		<div className="relative w-[723px] h-[385px] bg-black rounded-lg">
			<button
        onClick={onClose}
        className="cursor-pointer absolute top-[10px] right-[10px]"
      >
        <img src={CancelButton} alt="Cancel" />
      </button>
		</div>
	)
}

export default AlarmPopup