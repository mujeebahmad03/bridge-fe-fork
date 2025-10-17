export function ScheduleIllustration() {
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

        {/* Calendar */}
        <rect
          x="70"
          y="45"
          width="60"
          height="60"
          rx="4"
          fill="white"
          stroke="#6366F1"
          strokeWidth="2"
        />

        {/* Calendar header */}
        <rect x="70" y="45" width="60" height="15" rx="4" fill="#6366F1" />

        {/* Calendar grid */}
        <line
          x1="90"
          y1="60"
          x2="90"
          y2="105"
          stroke="#6366F1"
          strokeWidth="1"
        />
        <line
          x1="110"
          y1="60"
          x2="110"
          y2="105"
          stroke="#6366F1"
          strokeWidth="1"
        />
        <line
          x1="70"
          y1="75"
          x2="130"
          y2="75"
          stroke="#6366F1"
          strokeWidth="1"
        />
        <line
          x1="70"
          y1="90"
          x2="130"
          y2="90"
          stroke="#6366F1"
          strokeWidth="1"
        />

        {/* Selected date */}
        <rect
          x="90"
          y="75"
          width="20"
          height="15"
          fill="#6366F1"
          fillOpacity="0.3"
        />
        <circle cx="100" cy="82.5" r="5" fill="#6366F1" />

        {/* Clock */}
        <circle
          cx="150"
          cy="75"
          r="15"
          fill="white"
          stroke="#6366F1"
          strokeWidth="2"
        />
        <line
          x1="150"
          y1="75"
          x2="150"
          y2="65"
          stroke="#6366F1"
          strokeWidth="2"
        />
        <line
          x1="150"
          y1="75"
          x2="158"
          y2="80"
          stroke="#6366F1"
          strokeWidth="2"
        />

        {/* Time indicator */}
        <rect
          x="50"
          y="100"
          width="100"
          height="10"
          rx="5"
          fill="#6366F1"
          fillOpacity="0.2"
        />
        <circle cx="80" cy="105" r="6" fill="#6366F1" />
      </svg>
    </div>
  );
}
