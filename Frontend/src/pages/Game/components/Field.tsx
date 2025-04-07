const Field = (ctx: CanvasRenderingContext2D) => {
  // 배경 색상
  ctx.fillStyle = "gray";
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  // 중앙선 (점선)
  ctx.setLineDash([10, 10]);
  ctx.strokeStyle = "white";
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(ctx.canvas.width / 2, 0);
  ctx.lineTo(ctx.canvas.width / 2, ctx.canvas.height);
  ctx.stroke();

  // 테두리 (굵은 하얀색)
  ctx.setLineDash([]);
  ctx.lineWidth = 8;
  ctx.strokeStyle = "white";
  ctx.strokeRect(0, 0, ctx.canvas.width, ctx.canvas.height);
};

export default Field;
