import React, { useRef, useEffect } from "react";

interface CanvasProps {}

type Vector2 = {
  x: number;
  y: number;
};

const BackgroundCanvas: React.FC<CanvasProps> = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const width = window.innerWidth;
  const height = window.innerHeight;
  const res = 50;

  let rows = Math.ceil(height / res);
  let cols = Math.ceil(width / res);
  let grid = Array.from({ length: cols }, () =>
    Array.from({ length: rows }, () => Math.floor(Math.random() * 2))
  );

  const CreateGrid = async (
    rows: number,
    height: number,
    res: number,
    cols: number,
    width: number,
    grid: number[][]
  ) => {
    rows = Math.ceil(height / res);
    cols = Math.ceil(width / res);
    grid = Array.from({ length: cols }, () =>
      Array.from({ length: rows }, () => Math.floor(Math.random() * 2))
    );
    return { rows, cols, grid };
  };

  const drawCircle = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    radius: number,
    color: string = "rgba(255, 0, 0, 0.5)"
  ) => {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
  };

  const drawLine = (
    ctx: CanvasRenderingContext2D,
    v1: Vector2,
    v2: Vector2,
    color: string = "rgba(255, 255, 255, 0.5)"
  ) => {
    ctx.beginPath();
    ctx.moveTo(v1.x, v1.y);
    ctx.lineTo(v2.x, v2.y);
    ctx.strokeStyle = color;
    ctx.stroke();
    ctx.closePath();
  };

  const drawBackgroundGrid = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number
  ) => {
    ctx.strokeStyle = "rgba(0, 255, 255, 0.1)";
    ctx.lineWidth = 1;

    for (let c = 0; c < cols; c++) {
      for (let r = 0; r < rows; r++) {
        // ctx.strokeRect(c * res, r * res, res, res);

        if (grid[c][r] == 1) {
          drawCircle(ctx, c * res, r * res, 2, "rgba(0, 255, 0, 1)");
          // ctx.fillStyle = "yellow";
          // ctx.fillText(`${grid[c][r]}`, c * res, r * res, 50);
        } else if (grid[c][r] === 0) {
          // ctx.fillStyle = "purple";
          // ctx.fillText(`${grid[c][r]}`, c * res, r * res, 50);
          drawCircle(ctx, c * res, r * res, 2, "rgba(255, 0, 0, 1)");
        }
      }
    }
  };

  const getState = (a: number, b: number, c: number, d: number): number => {
    return a * 8 + b * 4 + c * 2 * d + 1;
  };

  const drawState = (
    state: number,
    ctx: CanvasRenderingContext2D,
    A: Vector2,
    B: Vector2,
    C: Vector2,
    D: Vector2
  ) => {
    switch (state) {
      case 1:
        drawLine(ctx, C, D);
        break;
      case 2:
        drawLine(ctx, B, C);
        break;
      case 3:
        drawLine(ctx, B, D);
        break;
      case 4:
        drawLine(ctx, A, B);
        break;
      case 5:
        drawLine(ctx, A, D);
        drawLine(ctx, B, D);
        break;
      case 6:
        drawLine(ctx, A, C);
        break;
      case 7:
        drawLine(ctx, A, D);
        break;
      case 8:
        drawLine(ctx, A, D);
        break;
      case 9:
        drawLine(ctx, A, C);
        break;
      case 10:
        drawLine(ctx, A, B);
        drawLine(ctx, C, D);
        break;
      case 11:
        drawLine(ctx, A, B);
        break;
      case 12:
        drawLine(ctx, B, D);
        break;
      case 13:
        drawLine(ctx, B, C);
        break;
      case 14:
        drawLine(ctx, D, C);
        break;
      default:
        break;
    }
  };

  const drawContours = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number
  ) => {
    ctx.strokeStyle = "rgba(0, 255, 255, 1)";
    ctx.lineWidth = 1;

    for (let c = 0; c < cols; c++) {
      for (let r = 0; r < rows; r++) {
        let state = getState(
          grid[c][r],
          grid[c + 1][r],
          grid[c][r + 1],
          grid[c + 1][r + 1]
        );
        console.log("state: " + state);

        let x = c * res;
        let y = r * res;

        let A = { x: x + res / 2, y: y } as Vector2;
        let B = { x: x + res, y: y + res / 2 } as Vector2;
        let C = { x: x + res / 2, y: y + res } as Vector2;
        let D = { x: x, y: y + res / 2 } as Vector2;

        drawState(state, ctx, A, B, C, D);
      }
    }
  };

  const handleResize = async () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");

    if (!canvas || !ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    ({ rows, cols, grid } = await CreateGrid(
      rows,
      height,
      res,
      cols,
      width,
      grid
    ));

    drawBackgroundGrid(ctx, canvas.width, canvas.height);
    drawContours(ctx, canvas.width, canvas.height);
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: -5,
        width: "100%",
        height: "100%",
      }}
    />
  );
};

export default BackgroundCanvas;
