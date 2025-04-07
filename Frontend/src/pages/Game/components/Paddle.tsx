interface PaddleProps {
	ctx: CanvasRenderingContext2D
	x: number
	y: number
}

const Paddle = ({ ctx, x, y }: PaddleProps) => {
	const paddleWidth = 5
	const paddleHeight = 80

	ctx.fillStyle = "white"
	ctx.fillRect(x, y, paddleWidth, paddleHeight)
}

export default Paddle