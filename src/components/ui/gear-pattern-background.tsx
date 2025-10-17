"use client";

import { useEffect, useRef } from "react";

interface GearPatternBackgroundProps {
  className?: string;
  animate?: boolean;
}

export function GearPatternBackground({
  className = "",
  animate = true,
}: GearPatternBackgroundProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!animate || !svgRef.current) return;

    const svg = svgRef.current;
    const gears = svg.querySelectorAll(".gear");

    let animationId: number;

    const animateGears = () => {
      const time = Date.now() * 0.001;

      gears.forEach((gear, index) => {
        const speed = 0.5 + index * 0.2;
        const direction = index % 2 === 0 ? 1 : -1;
        const rotation = time * speed * direction * 10;

        gear.setAttribute("transform", `rotate(${rotation} 50 50)`);
      });

      animationId = requestAnimationFrame(animateGears);
    };

    animateGears();

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [animate]);

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      <svg
        ref={svgRef}
        className="absolute inset-0 h-full w-full opacity-20 dark:opacity-30"
        viewBox="0 0 400 200"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <pattern
            id="gear-pattern"
            x="0"
            y="0"
            width="100"
            height="100"
            patternUnits="userSpaceOnUse"
          >
            {/* Large Gear */}
            <g className="gear">
              <circle
                cx="50"
                cy="50"
                r="25"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                opacity="0.3"
              />
              <circle
                cx="50"
                cy="50"
                r="15"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                opacity="0.4"
              />
              <circle cx="50" cy="50" r="5" fill="currentColor" opacity="0.5" />
              {/* Gear teeth */}
              {Array.from({ length: 12 }).map((_, i) => {
                const angle = i * 30 * (Math.PI / 180);
                const x1 = 50 + Math.cos(angle) * 20;
                const y1 = 50 + Math.sin(angle) * 20;
                const x2 = 50 + Math.cos(angle) * 28;
                const y2 = 50 + Math.sin(angle) * 28;
                return (
                  <line
                    key={i}
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke="currentColor"
                    strokeWidth="2"
                    opacity="0.4"
                  />
                );
              })}
            </g>
          </pattern>

          <pattern
            id="small-gear-pattern"
            x="0"
            y="0"
            width="60"
            height="60"
            patternUnits="userSpaceOnUse"
          >
            {/* Small Gear */}
            <g className="gear">
              <circle
                cx="30"
                cy="30"
                r="15"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                opacity="0.25"
              />
              <circle
                cx="30"
                cy="30"
                r="8"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                opacity="0.3"
              />
              <circle cx="30" cy="30" r="3" fill="currentColor" opacity="0.4" />
              {/* Small gear teeth */}
              {Array.from({ length: 8 }).map((_, i) => {
                const angle = i * 45 * (Math.PI / 180);
                const x1 = 30 + Math.cos(angle) * 12;
                const y1 = 30 + Math.sin(angle) * 12;
                const x2 = 30 + Math.cos(angle) * 18;
                const y2 = 30 + Math.sin(angle) * 18;
                return (
                  <line
                    key={i}
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke="currentColor"
                    strokeWidth="1.5"
                    opacity="0.3"
                  />
                );
              })}
            </g>
          </pattern>
        </defs>

        <rect
          width="100%"
          height="100%"
          fill="url(#gear-pattern)"
          className="text-blue-400 dark:text-blue-300"
        />
        <rect
          width="100%"
          height="100%"
          fill="url(#small-gear-pattern)"
          className="text-blue-500 dark:text-blue-400"
          transform="translate(30, 20)"
        />
      </svg>
    </div>
  );
}
