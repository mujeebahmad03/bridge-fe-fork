export function TopographicBackground() {
  return (
    <div className="absolute inset-0 opacity-20">
      <svg
        className="h-full w-full"
        viewBox="0 0 1200 800"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <pattern
            id="topographic"
            x="0"
            y="0"
            width="200"
            height="200"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M20,20 Q50,10 80,20 T140,20 T200,20"
              fill="none"
              stroke="rgba(59, 130, 246, 0.3)"
              strokeWidth="1"
            />
            <path
              d="M10,50 Q40,40 70,50 T130,50 T190,50"
              fill="none"
              stroke="rgba(59, 130, 246, 0.2)"
              strokeWidth="1"
            />
            <path
              d="M30,80 Q60,70 90,80 T150,80 T210,80"
              fill="none"
              stroke="rgba(59, 130, 246, 0.25)"
              strokeWidth="1"
            />
            <path
              d="M5,110 Q35,100 65,110 T125,110 T185,110"
              fill="none"
              stroke="rgba(59, 130, 246, 0.15)"
              strokeWidth="1"
            />
            <path
              d="M25,140 Q55,130 85,140 T145,140 T205,140"
              fill="none"
              stroke="rgba(59, 130, 246, 0.3)"
              strokeWidth="1"
            />
            <path
              d="M15,170 Q45,160 75,170 T135,170 T195,170"
              fill="none"
              stroke="rgba(59, 130, 246, 0.2)"
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#topographic)" />
      </svg>
    </div>
  );
}
