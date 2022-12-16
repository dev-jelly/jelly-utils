export const invertMoveTo = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, x: number, y: number) => {
  ctx.moveTo(x, canvas.height - y);
}


export const waveFill = (canvas: HTMLCanvasElement,
                         ctx: CanvasRenderingContext2D,
                         positions: { x: number[], y: number[] },
                         fillStyle: string | CanvasGradient | CanvasPattern = "rgba(0, 0, 0, 0.5)",
                         ignoreNegative = true) => {
  const canvasHeight = canvas.height;
  ctx.beginPath();
  ctx.fillStyle = fillStyle

  ctx.moveTo(0, Math.floor(canvasHeight / 2));
  for (let i = 0; i < positions.x.length; i++) {
    const x = positions.x[i];
    let y = positions.y[i];
    if (ignoreNegative && y < 0) {
      y = 0;
    }
    ctx.lineTo(x, Math.floor((canvasHeight / 2) - (y / 2)));
  }

  for (let i = positions.x.length - 1; i >= 0; i--) {
    const x = positions.x[i];
    let y = positions.y[i];
    if (ignoreNegative && y < 0) {
      y = 0;
    }
    ctx.lineTo(x, Math.floor(canvasHeight / 2) + (y / 2));
  }
  ctx.fill();
}