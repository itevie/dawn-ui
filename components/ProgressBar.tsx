import { useEffect, useRef } from "react";

interface ProgressBarProps {
  max: number;
  current: number;
  size: number;
  height?: number;
}

export default function ProgressBar(props: ProgressBarProps) {
  const ref = useRef<HTMLCanvasElement>(null);
  const height = props.height || 2;
  const amount = parseInt(props.current.toFixed(0));

  useEffect(() => {
    const target = ref.current;
    if (!target) return;

    const ctx = target.getContext("2d") as CanvasRenderingContext2D;
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, target.width, target.height);
    let x = 0;

    for (let i = 0; i != amount; i++) {
      ctx.fillStyle = "#FFB6C1";
      ctx.fillRect(x, (i % height) * props.size, props.size, props.size);
      if (i % height === height - 1) x += props.size;
    }
  }, [props.current]);

  return (
    <canvas
      style={{ borderRadius: "10px" }}
      ref={ref}
      width={(props.max / height) * props.size}
      height={props.size * height}
    />
  );
}
