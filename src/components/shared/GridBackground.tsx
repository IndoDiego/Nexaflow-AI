"use client";

import { useEffect, useRef } from "react";

const CHARS = "01アイウエオカキクケコサシスセソ";

interface Particle {
  x: number;
  y: number;
  speed: number;
  char: string;
  opacity: number;
  size: number;
}

export function GridBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let particles: Particle[] = [];

    function resize() {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    function initParticles() {
      if (!canvas) return;
      const count = Math.floor((canvas.width * canvas.height) / 25000);
      particles = Array.from({ length: Math.min(count, 60) }, () => ({
        x: Math.random() * (canvas?.width ?? 0),
        y: Math.random() * (canvas?.height ?? 0),
        speed: 0.2 + Math.random() * 0.5,
        char: CHARS[Math.floor(Math.random() * CHARS.length)],
        opacity: 0.03 + Math.random() * 0.08,
        size: 10 + Math.random() * 4,
      }));
    }

    function drawGrid() {
      if (!canvas || !ctx) return;
      const gap = 40;
      ctx.strokeStyle = "rgba(37, 99, 235, 0.04)";
      ctx.lineWidth = 0.5;

      for (let x = 0; x < canvas.width; x += gap) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += gap) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
    }

    function animate() {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      drawGrid();

      // Draw floating characters
      particles.forEach((p) => {
        ctx.font = `${p.size}px "JetBrains Mono", monospace`;
        ctx.fillStyle = `rgba(37, 99, 235, ${p.opacity})`;
        ctx.fillText(p.char, p.x, p.y);

        p.y -= p.speed;
        if (p.y < -20) {
          p.y = canvas!.height + 20;
          p.x = Math.random() * canvas!.width;
          p.char = CHARS[Math.floor(Math.random() * CHARS.length)];
        }
      });

      animationId = requestAnimationFrame(animate);
    }

    resize();
    initParticles();
    animate();

    window.addEventListener("resize", () => {
      resize();
      initParticles();
    });

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0 opacity-60"
      aria-hidden="true"
    />
  );
}
