import React, { useEffect, useRef } from 'react';

export default function Sparkle({ trigger }) {
  const containerRef = useRef();

  useEffect(() => {
    if (!trigger || !containerRef.current) return;

    const count = 12;
    for (let i = 0; i < count; i++) {
      const spark = document.createElement('div');
      spark.className = 'spark';
      const angle = Math.random() * 2 * Math.PI;
      const radius = Math.random() * 30;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;

      spark.style.transform = `translate(${x}px, ${y}px)`;
      spark.style.animationDelay = (Math.random() * 0.2).toFixed(2) + 's';
      containerRef.current.appendChild(spark);
      setTimeout(() => spark.remove(), 600);
    }
  }, [trigger]);

  return (
    <>
      <style>{`
        .sparkle-container {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          overflow: visible;
          z-index: 5;
        }

        .spark {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 8px;
          height: 8px;
          background: radial-gradient(circle, #ffeb3b 0%, transparent 70%);
          border-radius: 50%;
          animation: sparkle-burst 0.6s ease-out forwards;
        }

        @keyframes sparkle-burst {
          0% {
            opacity: 1;
            transform: scale(0.3) translate(0, 0);
          }
          100% {
            opacity: 0;
            transform: scale(1.5) translate(0, 0);
          }
        }
      `}</style>
      <div ref={containerRef} className="sparkle-container" />
    </>
  );
}
