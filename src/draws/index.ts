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
  ctx.fillStyle = fillStyle;

  ctx.moveTo(0, Math.floor(canvasHeight / 2));
  for (let i = 0; i < positions.x.length; i++) {
    const x = positions.x[i];
    const y = (ignoreNegative && positions.y[i] < 0) ? 0 : positions.y[i];
    ctx.lineTo(x, Math.floor((canvasHeight / 2) - (y / 2)));
  }

  for (let i = positions.x.length - 1; i >= 0; i--) {
    const x = positions.x[i];
    const y = (ignoreNegative && positions.y[i] < 0) ? 0 : positions.y[i];
    ctx.lineTo(x, Math.floor(canvasHeight / 2) + (y / 2));
  }
  ctx.fill();
}

export const basisFill = (canvas: HTMLCanvasElement,
                          ctx: CanvasRenderingContext2D,
                          positions: { x: number[], y: number[] },
                          fillStyle: string | CanvasGradient | CanvasPattern = "rgba(0, 0, 0, 0.5)",
                          wave = false,
                          ignoreNegative = true
) => {
  const basis = new Basis(ctx);
  let x = 0;
  let y = 0;
  const canvasHeight = canvas.height;
  ctx.strokeStyle = fillStyle;
  if (wave) {
    basis.ctx.moveTo(0, canvasHeight / 2);
    basis.lineStart(0, canvasHeight / 2);
    for (let i = 0; i < positions.x.length; i++) {
      x = positions.x[i];
      y = (ignoreNegative && positions.y[i] < 0) ? 0 : positions.y[i];
      basis.point(x, Math.floor((canvasHeight / 2) - (y / 2)));
    }

    basis.point(canvas.width, Math.floor((canvasHeight / 2) - (y / 2)));
    basis.point(canvas.width, Math.floor((canvasHeight / 2) + (y / 2)));

    for (let i = positions.x.length - 1; i >= 0; i--) {
      x = positions.x[i];
      y = (ignoreNegative && positions.y[i] < 0) ? 0 : positions.y[i];
      basis.point(x, Math.floor(canvasHeight / 2) + (y / 2));
    }
    basis.point(x, y);
    basis.point(0, canvasHeight / 2);
    basis.ctx.lineTo(0, canvasHeight / 2);
    // basis.lineEnd()

  } else {
    basis.ctx.moveTo(0, canvasHeight);
    basis.lineStart(0, canvasHeight);
    for (let i = 0; i < positions.x.length; i++) {
      x = positions.x[i];
      y = (ignoreNegative && positions.y[i] < 0) ? 0 : positions.y[i];
      basis.point(x, y);
    }

    basis.point(x, y);
    basis.point(canvas.width, y);
    basis.ctx.lineTo(canvas.width, canvasHeight);
    basis.ctx.lineTo(0, canvasHeight);
  }


  ctx.fillStyle = fillStyle;
  ctx.stroke();
  ctx.fill();
}


// Based On D3.js
// https://github.com/d3/d3-shape/blob/main/src/curve/basis.js
class Basis {
  _line: number = 0;
  ctx: CanvasRenderingContext2D;
  _point = 0;
  _x0: number = NaN;
  _x1: number = NaN;
  _y0: number = NaN;
  _y1: number = NaN;

  constructor(context: CanvasRenderingContext2D) {
    this.ctx = context;
  }

  lineStart(x: number, y: number) {
    this._x0 = this._x1 = x;
    this._y0 = this._y1 = y;

    this._point = 0;
  }

  lineEnd() {
    switch (this._point) {
      case 3:
        point(this, this._x1, this._y1); // proceed
      case 2:
        this.ctx.lineTo(this._x1, this._y1);
        break;
    }
    if (this._line || (this._line !== 0 && this._point === 1))
      this.ctx.closePath();
    this._line = 1 - this._line;
  }

  point(x: number, y: number) {
    (x = +x), (y = +y);
    switch (this._point) {
      case 0:
        this._point = 1;
        this._line ? this.ctx.lineTo(x, y) : this.ctx.moveTo(x, y);
        break;
      case 1:
        this._point = 2;
        break;
      case 2:
        this._point = 3;
        this.ctx.lineTo(
          (5 * this._x0 + this._x1) / 6,
          (5 * this._y0 + this._y1) / 6
        ); // proceed
      default:
        point(this, x, y);
        break;
    }
    (this._x0 = this._x1), (this._x1 = x);
    (this._y0 = this._y1), (this._y1 = y);
  }
}

export function point(that: Basis, x: number, y: number) {
  that.ctx.bezierCurveTo(
    (2 * that._x0 + that._x1) / 3,
    (2 * that._y0 + that._y1) / 3,
    (that._x0 + 2 * that._x1) / 3,
    (that._y0 + 2 * that._y1) / 3,
    (that._x0 + 4 * that._x1 + x) / 6,
    (that._y0 + 4 * that._y1 + y) / 6
  );
}
