import React, { useRef, useEffect } from "react";

interface CanvasProps {
  children?: React.ReactNode;
}

type Vector2 = {
  x: number;
  y: number;
};

const BackgroundCanvas: React.FC<CanvasProps> = ({ children }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const width = window.innerWidth;
  const height = window.innerHeight;
  const res = 20;
  const offset = 0;
  const circleRadiusAndFont = 0;

  // We'll store grid as a simple array.
  // For a more reactive UI, consider using useState.
  let grid: number[][];

  const CreateGrid = async (): Promise<{ rows: number; cols: number; grid: number[][] }> => {
    const cols = Math.ceil(width / res);
    const rows = Math.ceil(height / res);
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

  const drawBackgroundGrid = (ctx: CanvasRenderingContext2D, canvasWidth: number, canvasHeight: number) => {
    ctx.strokeStyle = "rgba(0, 255, 255, 0.1)";
    for (let c = 0; c < grid.length; c++) {
      for (let r = 0; r < grid[c].length; r++) {
        // Determine circle color based on grid value (for example)
        const color = grid[c][r] === 0 ? "white" : "black";
        const x = c * res + offset;
        const y = r * res + offset;
        drawCircle(ctx, x, y, circleRadiusAndFont, color);
        ctx.fillStyle = "white";
        ctx.font = `${circleRadiusAndFont}px sans-serif`;
        ctx.fillText(grid[c][r].toString(), x - 5, y + 5, 100);
      }
    }
  };

  const getState = (a: number, b: number, c: number, d: number): number => {
    return a * 8 + b * 4 + c * 2 + d * 1;
  }

  const drawContours = (ctx: CanvasRenderingContext2D, canvasWidth: number, canvasHeight: number) => {
    ctx.strokeStyle = "rgba(0, 255, 255, 1)";
    ctx.lineWidth = 1;

    for (let c = 0; c < grid.length - 1; c++) {
      for (let r = 0; r < grid[c].length - 1; r++) {
        let x = c * res;
        let y = r * res;

        let A = { x: x + res / 2 + offset, y: y + offset } as Vector2;
        let B = { x: x + res + offset, y: y + res / 2 + offset } as Vector2;
        let C = { x: x + res / 2 + offset, y: y + res + offset } as Vector2;
        let D = { x: x + offset, y: y + res / 2 + offset } as Vector2;


        let state = getState(grid[c][r], grid[c + 1][r], grid[c + 1][r + 1], grid[c][r + 1]);
        console.log("b: " + grid[c][r], grid[c + 1][r], grid[c + 1][r + 1], grid[c][r + 1]);
        console.log("State:" + state);

        drawState(state, ctx, A, B, C, D);
      }
    }
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
      case 14:
        drawLine(ctx, D, C);
        break;
      case 2:
      case 13:
        drawLine(ctx, B, C);
        break;
      case 3:
      case 12:
        drawLine(ctx, D, B);
        break;
      case 11:
      case 4:
        drawLine(ctx, A, B);
        break;
      case 5:
        drawLine(ctx, D, A);
        drawLine(ctx, C, B);
        break;
      case 6:
      case 9:
        drawLine(ctx, C, A);
        break;
      case 7:
      case 8:
        drawLine(ctx, D, A);
        break;
      case 10:
        drawLine(ctx, A, B);
        drawLine(ctx, C, D);
        break;
      default:
        break;
    }
  };

  // A function to redraw the canvas
  const redraw = (ctx: CanvasRenderingContext2D, canvasWidth: number, canvasHeight: number) => {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    drawBackgroundGrid(ctx, canvasWidth, canvasHeight);
    drawContours(ctx, canvasWidth, canvasHeight);
  };

  // Setup canvas size and initial drawing
  const handleResize = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    await CreateGrid();
    redraw(ctx, canvas.width, canvas.height);
  };

  // Add a single event listener for clicks on the canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Ensure the canvas is set up initially
    handleResize();

    const handleClick = (ev: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = ev.clientX - rect.left;
      const mouseY = ev.clientY - rect.top;

      // Check each circle in the grid
      for (let c = 0; c < grid.length; c++) {
        for (let r = 0; r < grid[c].length; r++) {
          const circleX = c * res + offset;
          const circleY = r * res + offset;
          const radius = 20;
          // Calculate distance from click to circle center
          const dist = Math.sqrt((mouseX - circleX) ** 2 + (mouseY - circleY) ** 2);
          if (dist <= radius) {
            console.log(`Circle at grid position [${c}, ${r}] clicked!`);
            // For example, toggle the grid value
            grid[c][r] = grid[c][r] === 0 ? 1 : 0;

            // Redraw the canvas with updated grid state
            const ctx = canvas.getContext("2d");
            if (ctx) {
              redraw(ctx, canvas.width, canvas.height);
            }
          }
        }
      }
    };

    canvas.addEventListener("mousedown", handleClick);
    window.addEventListener("resize", handleResize);

    return () => {
      canvas.removeEventListener("mousedown", handleClick);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 0,
          width: "100%",
          height: "100%",
        }}
      />
      {children}
    </>
  );
};

export default BackgroundCanvas;
