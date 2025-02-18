import React, { useRef, useEffect } from "react";

interface CanvasProps {}

const BackgroundCanvas: React.FC<CanvasProps> = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const width = window.innerWidth;
  const height = window.innerHeight;

  const res = 50;

  const rows = Math.ceil(height / res);
  const cols = Math.ceil(width / res);

  console.log(rows, cols);

  const grid = Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => Math.floor(Math.random() * 2))
  );

  console.log(grid);

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
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    color: string = "rgba(255, 255, 255, 0.5)"
  ) => {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = color;
    ctx.stroke();
    ctx.closePath();
  };

  const drawBackgroundGrid = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number
  ) => {
    ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
    ctx.lineWidth = 1;

    for (let c = 0; c < cols; c++) {
      for (let r = 0; r < rows; r++) {
        ctx.strokeRect(c * res, r * res, res, res);

        if (grid[r][c] === 1)
          drawCircle(ctx, c * res, r * res, 5, "rgba(0, 255, 0, 0.5)");
        else drawCircle(ctx, c * res, r * res, 5);
      }
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
        let x = c * res;
        let y = r * res;

        let A = { x: x + res / 2, y: y };
        let B = { x: x + res, y: y + res / 2 };
        let C = { x: x + res / 2, y: y + res };
        let D = { x: x, y: y + res / 2 };

        console.log(A, B, C, D);

        // Temporarily draw the points
        drawCircle(ctx, A.x, A.y, 2, "rgba(255, 0, 0, 1)");
        drawCircle(ctx, B.x, B.y, 2, "rgba(0, 255, 255, 1)");
        drawCircle(ctx, C.x, C.y, 2, "rgba(255, 0, 255, 1)");
        drawCircle(ctx, D.x, D.y, 2, "rgba(255, 255, 0, 1)");

        if (grid[r][c] === 1) {
          drawLine(ctx, C.x, C.y, D.x, D.y, "rgba(0, 255, 255, 1)");
          drawLine(ctx, D.x, D.y, A.x, A.y, "rgba(0, 255, 0, 1)");
          drawLine(ctx, A.x, A.y, B.x, B.y, "rgba(255, 0, 255, 1)");
          drawLine(ctx, B.x, B.y, C.x, C.y, "rgba(255, 255, 0, 1)");
        }
      }
    }
  };

  const handleResize = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");

    if (!canvas || !ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

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
