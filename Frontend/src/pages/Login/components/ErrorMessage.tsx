import { useEffect, useState } from "react";

const ErrorMessage = ({ message, setError }: { 
	message: string; setError: (msg: string) => void; 
}) => {
	const [visible, setVisible] = useState(false);

	useEffect(() => {
		if (message) {
			setVisible(true); // 메시지를 나타나게 함

			const hideTimer = setTimeout(() => setVisible(false), 2500); // 2.5초 후 서서히 사라짐
			const removeTimer = setTimeout(() => setError(""), 3000); // 애니메이션 끝난 후 메시지 삭제

			return () => {
				clearTimeout(hideTimer);
				clearTimeout(removeTimer);
			};
		}
	}, [message, setError]);

	return message ? (
		<div
			className={`text-red-500 w-[415px] font-['Galmuri7'] absolute left-1/2 -translate-x-1/2
				text-[20px] top-[10px] text-center transition-opacity duration-500
				${visible ? "opacity-100" : "opacity-0"}`}
		>
			{message}
		</div>
	) : null;
};

export default ErrorMessage;
