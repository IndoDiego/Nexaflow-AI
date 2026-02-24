"use client";

import { useEffect, useState } from "react";

interface TypingTextProps {
  text: string;
  speed?: number;
  className?: string;
  delay?: number;
}

export function TypingText({ text, speed = 50, className, delay = 0 }: TypingTextProps) {
  const [displayed, setDisplayed] = useState("");
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    if (displayed.length >= text.length) return;

    const timer = setTimeout(() => {
      setDisplayed(text.slice(0, displayed.length + 1));
    }, speed);

    return () => clearTimeout(timer);
  }, [displayed, text, speed, started]);

  return (
    <span className={className}>
      {displayed}
      <span className="terminal-cursor inline-block w-[2px] h-[1em] bg-[var(--color-primary)] ml-0.5 align-middle" />
    </span>
  );
}
