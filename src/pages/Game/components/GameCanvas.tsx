import { useEffect, useRef, useState } from 'react'
import Field from './Field.tsx'
import Paddle from './Paddle.tsx'

const GameCanvas = ({ ballImg }: { ballImg: string }) => {
	const canvasRef = useRef<HTMLCanvasElement>(null)
	const animationFrameId = useRef<number | null>(null)
	const leftPaddle = useRef({ x: 6, y: 30 })
	const rightPaddle = useRef({ x: 789, y: 275 })
	const pressedKey = useRef<{ [key: string]: boolean }>({})
	const paddleSpeed = 5
	const BALL_WIDTH = 40
	const BALL_HEIGHT = 20
	const [ballX, setBallX] = useState(800 / 2 - BALL_WIDTH / 2)
	const [ballY, setBallY] = useState(430 / 2 - BALL_HEIGHT / 2)	

	const [countdown, setCountdown] = useState(3)
	const [gameStarted, setGameStarted] = useState(false)
	const [showStartText, setShowStartText] = useState(false)
	
	const ballImageRef = useRef<HTMLImageElement | null>(null)

	// 캔버스와 컨텍스트 가져오기
	const getCanvasAndContext = () => {
		const canvas = canvasRef.current
		const ctx = canvas?.getContext("2d")
		return { canvas, ctx }
	}

	// 키 입력 처리
	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			pressedKey.current[e.key] = true
		}
		const handleKeyUp = (e: KeyboardEvent) => {
			pressedKey.current[e.key] = false
		}
		window.addEventListener("keydown", handleKeyDown)
		window.addEventListener("keyup", handleKeyUp)

		return () => {
			window.removeEventListener("keydown", handleKeyDown)
			window.removeEventListener("keyup", handleKeyUp)
		}
	}, [])

	// 카운트다운 로직
	useEffect(() => {
		let timer: ReturnType<typeof setTimeout>
		if (countdown > 0) {
			timer = setTimeout(() => setCountdown((prev) => prev - 1), 1000)
		} else if (countdown === 0) {
			setShowStartText(true)
			timer = setTimeout(() => {
				setShowStartText(false)
				setGameStarted(true)
			}, 1000)
		}
		return () => clearTimeout(timer)
	}, [countdown])

	// 공 이미지 로딩
  useEffect(() => {
    const img = new Image()
    img.src = ballImg
    img.onload = () => {
      ballImageRef.current = img
    }
  }, [ballImg])

	// 게임 루프
	useEffect(() => {
		if (!gameStarted) return
		const { canvas, ctx } = getCanvasAndContext()
		if (!canvas || !ctx) return

		const updatePaddles = () => {
			if (pressedKey.current["w"]) leftPaddle.current.y = Math.max(leftPaddle.current.y - paddleSpeed, 0)
			if (pressedKey.current["s"]) leftPaddle.current.y = Math.min(leftPaddle.current.y + paddleSpeed, 350)
			if (pressedKey.current["ArrowUp"]) rightPaddle.current.y = Math.max(rightPaddle.current.y - paddleSpeed, 0)
			if (pressedKey.current["ArrowDown"]) rightPaddle.current.y = Math.min(rightPaddle.current.y + paddleSpeed, 350)
		}

		const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      Field(ctx)
      updatePaddles()
      Paddle({ ctx, x: leftPaddle.current.x, y: leftPaddle.current.y })
      Paddle({ ctx, x: rightPaddle.current.x, y: rightPaddle.current.y })

      // 공 그리기
      const ballImgEl = ballImageRef.current
			if (ballImgEl) {
				ctx.imageSmoothingEnabled = true
				ctx.drawImage(ballImgEl, ballX, ballY, BALL_WIDTH, BALL_HEIGHT)
			}
			

      animationFrameId.current = requestAnimationFrame(draw)
    }

    draw()
    return () => {
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current)
    }
  }, [gameStarted, ballX, ballY])

	// 카운트다운 및 텍스트 렌더링
	useEffect(() => {
		const { canvas, ctx } = getCanvasAndContext()
		if (!canvas || !ctx) return
	
		const draw = () => {
			ctx.clearRect(0, 0, canvas.width, canvas.height)
			Field(ctx)
			Paddle({ ctx, x: leftPaddle.current.x, y: leftPaddle.current.y })
			Paddle({ ctx, x: rightPaddle.current.x, y: rightPaddle.current.y })
	
			if (countdown > 0 || showStartText) {
				ctx.fillStyle = "rgba(0, 0, 0, 0.5)"
				ctx.fillRect(0, 0, canvas.width, canvas.height)
	
				ctx.fillStyle = "white"
				ctx.font = "40px Sixtyfour"
				ctx.textAlign = "center"
				ctx.textBaseline = "middle"
				ctx.fillText(
					showStartText ? "Start!" : countdown.toString(),
					canvas.width / 2,
					canvas.height / 2
				)
			}
		}
	
		const timer = setTimeout(draw, 50) // 50~100ms 지연
	
		return () => clearTimeout(timer)
	}, [countdown, showStartText])

	return (
		<canvas
			ref={canvasRef}
			width={800}
			height={430}
			className="border-4 border-white"
		/>
	)
}

export default GameCanvas
