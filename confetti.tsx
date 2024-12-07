import { randomRange } from "./util";

interface ConfettiFragment {
  position: { x: number; y: number };
  angle: number;
  life: number;
  maxLife: number;
  speed: number;
  color: string;
}

const colors = [
  "green",
  "red",
  "yellow",
  "orange",
  "pink",
  "purple",
  "blue",
  "lightblue",
];

export function spawnConfetti(x: number, y: number) {
  const size = 200;

  const canvas = document.createElement("canvas");
  canvas.style.position = "absolute";
  canvas.style.top = `${y - size / 2}px`;
  canvas.style.left = `${x - size / 2}px`;
  canvas.width = size;
  canvas.height = size;

  const center = { x: canvas.width / 2, y: canvas.height / 2 };

  const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
  let confetti: (ConfettiFragment | null)[] = [];

  let amount = randomRange(50, 100);
  for (let i = 0; i !== amount; i++) {
    confetti.push({
      position: { ...center },
      angle: randomRange(0, 360),
      life: 0,
      maxLife: randomRange(15, 40),
      speed: randomRange(1, 5),
      color: colors[Math.floor(Math.random() * colors.length)],
    });
  }

  let interval = setInterval(() => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (const fragment of confetti as ConfettiFragment[]) {
      ctx.fillStyle = fragment.color;
      ctx.fillRect(fragment.position.x, fragment.position.y, 5, 5);

      const rad = (fragment.angle * Math.PI) / 180;
      fragment.position.x += Math.cos(rad) * fragment.speed;
      fragment.position.y += Math.sin(rad) * fragment.speed;
      fragment.life++;

      fragment.life++;
      if (fragment.life > fragment.maxLife)
        confetti[confetti.indexOf(fragment)] = null;
    }

    confetti = confetti.filter((x) => x !== null);

    if (confetti.length === 0) {
      clearInterval(interval);
      document.body.removeChild(canvas);
    }
  }, 1000 / 60);

  document.body.appendChild(canvas);
}
