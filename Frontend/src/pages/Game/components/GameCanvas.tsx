import { useEffect, useRef } from 'react'
import Field from './Field'
import Paddle from './Paddle'

const GameCanvas = ({ ballImg }: { ballImg: string }) => {
	const canvasRef = useRef<HTMLCanvasElement>(null)
	const animationFrameId = useRef<number | null>(null)
	// 성능저하 막기 위해 useState 대신 useRef 사용
	const leftPaddle = useRef({ x: 6, y: 30 })
	const rightPaddle = useRef({ x: 789, y: 275})
	const paddleSpeed = 5
	const pressedKey = useRef<{ [key:string]: boolean }>({})
	// 키 입력 이벤트 처리
	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			pressedKey.current[event.key] = true
		}
		const handleKeyUp = (event: KeyboardEvent) => {
			pressedKey.current[event.key] = false
		}
		
		window.addEventListener("keydown", handleKeyDown)
		window.addEventListener("keyup", handleKeyUp)

		return () => {
			window.removeEventListener("keydown", handleKeyDown)
			window.removeEventListener("keyup", handleKeyUp)
		}
	}, [])
	// 게임 업데이트 + 캔버스 렌더링
	useEffect(() => {
		const canvas = canvasRef.current
		if (!canvas) return
		const ctx = canvas.getContext("2d")
		if (!ctx) return

		const updatePaddles = () => {
			if (pressedKey.current["w"]) leftPaddle.current.y = Math.max(leftPaddle.current.y - paddleSpeed, 0);
      if (pressedKey.current["s"]) leftPaddle.current.y = Math.min(leftPaddle.current.y + paddleSpeed, 350);
      if (pressedKey.current["ArrowUp"]) rightPaddle.current.y = Math.max(rightPaddle.current.y - paddleSpeed, 0);
      if (pressedKey.current["ArrowDown"]) rightPaddle.current.y = Math.min(rightPaddle.current.y + paddleSpeed, 350);
		}

		const draw = () => {
			ctx.clearRect(0, 0, canvas.width, canvas.height)
			Field(ctx)

			updatePaddles()

			Paddle({ ctx, x: leftPaddle.current.x, y: leftPaddle.current.y})
			Paddle({ ctx, x: rightPaddle.current.x, y: rightPaddle.current.y})

			animationFrameId.current = requestAnimationFrame(draw)
		}

		draw()

		return () => {
			if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current)
		}
	}, [])

	return (
		<canvas ref={canvasRef} width={800} height={430} className="border-4 border-white"/>
	)
}

export default GameCanvas