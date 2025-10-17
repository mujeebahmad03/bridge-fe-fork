export function AnalyticsIllustration() {
  return (
    <div className="relative h-[150px] w-[200px]">
      <svg
        viewBox="0 0 200 150"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-full"
      >
        <circle
          cx="100"
          cy="75"
          r="50"
          fill="currentColor"
          fillOpacity="0.1"
          className="text-primary"
        />

        {/* Bar chart */}
        <rect x="60" y="80" width="10" height="30" fill="#6366F1" />
        <rect x="80" y="60" width="10" height="50" fill="#6366F1" />
        <rect x="100" y="70" width="10" height="40" fill="#6366F1" />
        <rect x="120" y="50" width="10" height="60" fill="#6366F1" />
        <line
          x1="50"
          y1="110"
          x2="140"
          y2="110"
          stroke="#6366F1"
          strokeWidth="2"
        />
        <line
          x1="50"
          y1="110"
          x2="50"
          y2="40"
          stroke="#6366F1"
          strokeWidth="2"
        />

        {/* Line chart overlay */}
        <path
          d="M60 70 L80 50 L100 60 L120 40 L140 55"
          stroke="#FFA500"
          strokeWidth="2"
          fill="none"
        />
        <circle cx="60" cy="70" r="3" fill="#FFA500" />
        <circle cx="80" cy="50" r="3" fill="#FFA500" />
        <circle cx="100" cy="60" r="3" fill="#FFA500" />
        <circle cx="120" cy="40" r="3" fill="#FFA500" />
        <circle cx="140" cy="55" r="3" fill="#FFA500" />

        {/* Pie chart */}
        <path d="M160 75 L160 50 A25 25 0 0 1 180 85 Z" fill="#6366F1" />
        <path d="M160 75 L180 85 A25 25 0 0 1 145 90 Z" fill="#FFA500" />
        <path d="M160 75 L145 90 A25 25 0 0 1 160 50 Z" fill="#4ADE80" />
      </svg>
    </div>
  );
}
