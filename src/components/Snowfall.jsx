import React, { useMemo } from 'react';

export default function Snowfall() {
  const snowflakes = useMemo(() => {
    const flakes = ['❄', '❅', '❆', '•', '❄️'];
    return Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      char: flakes[i % flakes.length],
      left: `${(i * 3.4 + (i % 7) * 2.1) % 100}%`,
      size: `${0.7 + (i % 5) * 0.3}rem`,
      duration: `${6 + (i % 8) * 1.5}s`,
      delay: `${-(i % 12) * 1.2}s`,
      opacity: 0.3 + (i % 5) * 0.15,
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-20 overflow-hidden" aria-hidden="true">
      {snowflakes.map((flake) => (
        <span
          key={flake.id}
          className="snowflake"
          style={{
            left: flake.left,
            fontSize: flake.size,
            animationDuration: flake.duration,
            animationDelay: flake.delay,
            opacity: flake.opacity,
          }}
        >
          {flake.char}
        </span>
      ))}
    </div>
  );
}
