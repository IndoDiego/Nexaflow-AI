"use client";

import { useEffect, useRef } from "react";

interface Orb {
  x: number;
  y: number;
  radius: number;
  vx: number;
  vy: number;
  purple: boolean;
  opacity: number;
}

export function GridBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let orbs: Orb[] = [];

    function resize() {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    function initOrbs() {
      if (!canvas) return;
      orbs = [
        { x: canvas.width * 0.2, y: canvas.height * 0.3, radius: 300, vx: 0.15, vy: 0.1, purple: true, opacity: 0.06 },
        { x: canvas.width * 0.7, y: canvas.height * 0.6, radius: 250, vx: -0.12, vy: 0.08, purple: true, opacity: 0.04 },
        { x: canvas.width * 0.8, y: canvas.height * 0.2, radius: 200, vx: -0.1, vy: -0.12, purple: false, opacity: 0.04 },
        { x: canvas.width * 0.3, y: canvas.height * 0.8, radius: 180, vx: 0.08, vy: -0.1, purple: false, opacity: 0.03 },
      ];
    }

    function animate() {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      orbs.forEach((orb) => {
        const gradient = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, orb.radius);
        const [r, g, b] = orb.purple ? [124, 58, 237] : [245, 158, 11];
        gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${orb.opacity})`);
        gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(orb.x, orb.y, orb.radius, 0, Math.PI * 2);
        ctx.fill();

        orb.x += orb.vx;
        orb.y += orb.vy;
        if (orb.x < -orb.radius) orb.x = canvas.width + orb.radius;
        if (orb.x > canvas.width + orb.radius) orb.x = -orb.radius;
        if (orb.y < -orb.radius) orb.y = canvas.height + orb.radius;
        if (orb.y > canvas.height + orb.radius) orb.y = -orb.radius;
      });

      animationId = requestAnimationFrame(animate);
    }

    resize();
    initOrbs();
    animate();

    const onResize = () => { resize(); initOrbs(); };
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0"
      aria-hidden="true"
    />
  );
}
