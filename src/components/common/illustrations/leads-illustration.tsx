export function LeadsIllustration() {
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

        {/* Person in center */}
        <circle cx="100" cy="60" r="15" fill="#6366F1" />
        <rect x="85" y="80" width="30" height="30" rx="5" fill="#6366F1" />

        {/* Add button */}
        <circle
          cx="130"
          cy="75"
          r="15"
          fill="white"
          stroke="#6366F1"
          strokeWidth="2"
        />
        <line
          x1="123"
          y1="75"
          x2="137"
          y2="75"
          stroke="#6366F1"
          strokeWidth="2"
        />
        <line
          x1="130"
          y1="68"
          x2="130"
          y2="82"
          stroke="#6366F1"
          strokeWidth="2"
        />

        {/* Document icons floating around */}
        <rect
          x="60"
          y="50"
          width="15"
          height="20"
          rx="2"
          fill="white"
          stroke="#6366F1"
          strokeWidth="1.5"
        />
        <line
          x1="65"
          y1="55"
          x2="70"
          y2="55"
          stroke="#6366F1"
          strokeWidth="1.5"
        />
        <line
          x1="65"
          y1="60"
          x2="70"
          y2="60"
          stroke="#6366F1"
          strokeWidth="1.5"
        />

        <rect
          x="50"
          y="85"
          width="15"
          height="20"
          rx="2"
          fill="white"
          stroke="#6366F1"
          strokeWidth="1.5"
        />
        <line
          x1="55"
          y1="90"
          x2="60"
          y2="90"
          stroke="#6366F1"
          strokeWidth="1.5"
        />
        <line
          x1="55"
          y1="95"
          x2="60"
          y2="95"
          stroke="#6366F1"
          strokeWidth="1.5"
        />

        <rect
          x="135"
          y="45"
          width="15"
          height="20"
          rx="2"
          fill="white"
          stroke="#6366F1"
          strokeWidth="1.5"
        />
        <line
          x1="140"
          y1="50"
          x2="145"
          y2="50"
          stroke="#6366F1"
          strokeWidth="1.5"
        />
        <line
          x1="140"
          y1="55"
          x2="145"
          y2="55"
          stroke="#6366F1"
          strokeWidth="1.5"
        />

        <rect
          x="140"
          y="100"
          width="15"
          height="20"
          rx="2"
          fill="white"
          stroke="#6366F1"
          strokeWidth="1.5"
        />
        <line
          x1="145"
          y1="105"
          x2="150"
          y2="105"
          stroke="#6366F1"
          strokeWidth="1.5"
        />
        <line
          x1="145"
          y1="110"
          x2="150"
          y2="110"
          stroke="#6366F1"
          strokeWidth="1.5"
        />
      </svg>
    </div>
  );
}
