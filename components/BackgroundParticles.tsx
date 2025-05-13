import "./backgroundParticles.css";
import { createElement, useEffect, useRef, useState } from "react";
import { randomRangeDecimal } from "../util";
import { spawnConfetti } from "../confetti";

export default function BackgroundParticles() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setInterval(() => {
      const target = ref.current;
      if (!target) return;

      const x = randomRangeDecimal(0, 100);
      const size = randomRangeDecimal(10, 100);
      const opacity = randomRangeDecimal(10, 50);

      const element = document.createElement("img");
      element.src = "https://dawn.rest/images/spiral.svg";
      element.className = "dawn-background-particle";
      element.style.width = `${size}px`;
      element.style.height = `${size}px`;
      element.style.left = `${x}vw`;
      element.style.opacity = `${opacity}%`;

      element.addEventListener("animationend", () => {
        element.remove();
      });

      document.addEventListener("click", (e) => {
        const eRect = element.getBoundingClientRect();
        const x = e.clientX;
        const y = e.clientY;
        const withinY = x >= eRect.left && x <= eRect.right;
        const withinX = y >= eRect.top && y <= eRect.bottom;

        if (withinY && withinX) {
          const centerX = eRect.left + eRect.width / 2;
          const centerY = eRect.top + eRect.height / 2;
          spawnConfetti(centerX, centerY, { "z-index": -5 });
          element.remove();
        }
      });

      target.appendChild(element);
    }, 250);
  }, []);

  return (
    <div
      ref={ref}
      className="dawn-full-page dawn-background-particles-container"
    ></div>
  );
}
