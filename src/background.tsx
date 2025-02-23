import React, { useRef, useEffect } from "react";
import { createNoise3D } from "simplex-noise";

// Initialize Simplex noise 3D
const simplex = createNoise3D();

interface CanvasProps {
  children?: React.ReactNode;
}

type Vector2 = {
  x: number;
  y: number;
};

// Linear interpolation along an edge between p1 and p2,
// given noise values v1 and v2 and a threshold.
const interpolateEdge = (
  p1: Vector2,
  p2: Vector2,
  v1: number,
  v2: number,
  threshold: number
): Vector2 => {
  if (Math.abs(v2 - v1) < 0.0001) return p1;
  const t = (threshold - v1) / (v2 - v1);
  return {
    x: p1.x + t * (p2.x - p1.x),
    y: p1.y + t * (p2.y - p1.y),
  };
};

const BackgroundCanvas: React.FC<CanvasProps> = ({ children }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // Use a small resolution to create many cells
  const res = 5;
  const offset = 0;
  const circleRadiusAndFont = 0;
  // Grid will store continuous noise values.
  let grid: number[][] = [];
  // Threshold for contour (using 0 as isovalue)
  const threshold = 0;
  // A ref to track the current mouse position (or null if not available)
  const mousePosRef = useRef<{ x: number; y: number } | null>(null);
  // Radius (in pixels) around the mouse where lines are "destroyed"
  const destroyRadius = 10;

  const drawLine = (
    ctx: CanvasRenderingContext2D,
    v1: Vector2,
    v2: Vector2,
    color: string = "rgba(0, 255, 255, 1)"
  ) => {
    ctx.beginPath();
    ctx.moveTo(v1.x, v1.y);
    ctx.lineTo(v2.x, v2.y);
    ctx.strokeStyle = color;
    ctx.stroke();
    ctx.closePath();
  };

  // Draw a single cell with interpolated contour segments.
  const drawInterpolatedCell = (
    c: number,
    r: number,
    x: number,
    y: number,
    ctx: CanvasRenderingContext2D
  ) => {
    const tl = grid[c][r];       // top-left
    const tr = grid[c + 1][r];     // top-right
    const br = grid[c + 1][r + 1]; // bottom-right
    const bl = grid[c][r + 1];     // bottom-left

    // Determine binary values for marching squares.
    const a = tl >= threshold ? 1 : 0;
    const b = tr >= threshold ? 1 : 0;
    const cVal = br >= threshold ? 1 : 0; // renamed to avoid conflict with index r
    const d = bl >= threshold ? 1 : 0;
    const state = a * 8 + b * 4 + cVal * 2 + d;

    // Define corner positions.
    const topLeft: Vector2 = { x: x, y: y };
    const topRight: Vector2 = { x: x + res, y: y };
    const bottomRight: Vector2 = { x: x + res, y: y + res };
    const bottomLeft: Vector2 = { x: x, y: y + res };

    // Compute interpolated intersection points along each edge.
    const topPoint =
      a !== b ? interpolateEdge(topLeft, topRight, tl, tr, threshold) : null;
    const rightPoint =
      b !== cVal
        ? interpolateEdge(topRight, bottomRight, tr, br, threshold)
        : null;
    const bottomPoint =
      cVal !== d
        ? interpolateEdge(bottomRight, bottomLeft, br, bl, threshold)
        : null;
    const leftPoint =
      d !== a ? interpolateEdge(bottomLeft, topLeft, bl, tl, threshold) : null;

    const intersections: { [edge: string]: Vector2 } = {};
    if (topPoint) intersections["top"] = topPoint;
    if (rightPoint) intersections["right"] = rightPoint;
    if (bottomPoint) intersections["bottom"] = bottomPoint;
    if (leftPoint) intersections["left"] = leftPoint;

    // Marching squares lookup table mapping state to segments.
    const lookup: { [key: number]: string[][] } = {
      0: [],
      1: [["left", "bottom"]],
      2: [["bottom", "right"]],
      3: [["left", "right"]],
      4: [["top", "right"]],
      5: [["top", "left"], ["bottom", "right"]], // ambiguous
      6: [["top", "bottom"]],
      7: [["top", "left"]],
      8: [["top", "left"]],
      9: [["top", "bottom"]],
      10: [["top", "right"], ["bottom", "left"]], // ambiguous
      11: [["top", "right"]],
      12: [["left", "right"]],
      13: [["bottom", "right"]],
      14: [["left", "bottom"]],
      15: [],
    };

    const segments = lookup[state];
    segments.forEach((pair) => {
      const p1 = intersections[pair[0]];
      const p2 = intersections[pair[1]];
      if (p1 && p2) {
        drawLine(ctx, p1, p2);
      }
    });
  };

  // Draw contours for the entire grid using interpolation.
  const drawContours = (
    ctx: CanvasRenderingContext2D,
    canvasWidth: number,
    canvasHeight: number
  ) => {
    ctx.lineWidth = 1;
    for (let c = 0; c < grid.length - 1; c++) {
      for (let r = 0; r < grid[c].length - 1; r++) {
        const x = c * res + offset;
        const y = r * res + offset;
        drawInterpolatedCell(c, r, x, y, ctx);
      }
    }
  };

  // Optionally, you could draw a background grid here.
  const drawBackgroundGrid = (
    ctx: CanvasRenderingContext2D,
    canvasWidth: number,
    canvasHeight: number
  ) => {
    ctx.strokeStyle = "rgba(0, 255, 255, 0.1)";
    for (let c = 0; c < grid.length; c++) {
      for (let r = 0; r < grid[c].length; r++) {
        const color = grid[c][r] >= threshold ? "black" : "white";
        const x = c * res + offset;
        const y = r * res + offset;
        ctx.beginPath();
        ctx.arc(x, y, circleRadiusAndFont, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
      }
    }
  };

  const redraw = (
    ctx: CanvasRenderingContext2D,
    canvasWidth: number,
    canvasHeight: number
  ) => {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    // Optionally draw the background grid:
    // drawBackgroundGrid(ctx, canvasWidth, canvasHeight);
    drawContours(ctx, canvasWidth, canvasHeight);
  };

  // Handle canvas resize.
  const handleResize = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let animationFrameId: number;
    let time = 0;
    const noiseScale = 10;

    // Update grid: store continuous noise values.
    const updateGrid = () => {
      const cols = Math.ceil(window.innerWidth / res) + 1;
      const rows = Math.ceil(window.innerHeight / res) + 1;
      grid = Array.from({ length: cols }, (_, i) =>
        Array.from({ length: rows }, (_, j) => {
          let noiseValue = simplex(i / noiseScale, j / noiseScale, time);
          // If the cell is near the mouse, override noiseValue to "destroy" lines.
          if (mousePosRef.current) {
            const cellX = i * res;
            const cellY = j * res;
            const dx = cellX - mousePosRef.current.x;
            const dy = cellY - mousePosRef.current.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < destroyRadius) {
              noiseValue = 1; // Set uniformly above threshold.
            }
          }
          return noiseValue;
        })
      );
    };

    // Animation loop: update time, grid, and redraw.
    const animate = () => {
      time += 0.005;
      updateGrid();
      redraw(ctx, canvas.width, canvas.height);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // Remove mousedown; instead use mousemove to update mouse position.
    const handleMouseMove = (ev: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mousePosRef.current = {
        x: ev.clientX - rect.left,
        y: ev.clientY - rect.top,
      };
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      canvas.removeEventListener("mousemove", handleMouseMove);
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
