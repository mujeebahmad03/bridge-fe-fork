export function NewCampaignIllustration() {
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
        <path
          d="M100 40C80.67 40 65 55.67 65 75C65 94.33 80.67 110 100 110C119.33 110 135 94.33 135 75C135 55.67 119.33 40 100 40ZM100 100C86.19 100 75 88.81 75 75C75 61.19 86.19 50 100 50C113.81 50 125 61.19 125 75C125 88.81 113.81 100 100 100Z"
          fill="currentColor"
          className="text-primary"
          fillOpacity="0.6"
        />
        <circle
          cx="140"
          cy="50"
          r="15"
          fill="currentColor"
          fillOpacity="0.2"
          className="text-primary"
        />
        <circle
          cx="60"
          cy="100"
          r="10"
          fill="currentColor"
          fillOpacity="0.3"
          className="text-primary"
        />
        <circle
          cx="150"
          cy="90"
          r="8"
          fill="currentColor"
          fillOpacity="0.4"
          className="text-primary"
        />
        <circle
          cx="50"
          cy="60"
          r="12"
          fill="currentColor"
          fillOpacity="0.2"
          className="text-primary"
        />

        {/* Simplified people */}
        <circle cx="85" cy="85" r="8" fill="#6366F1" />
        <rect x="81" y="95" width="8" height="15" rx="2" fill="#6366F1" />
        <rect x="75" y="100" width="20" height="2" rx="1" fill="#6366F1" />

        <circle cx="115" cy="85" r="8" fill="#6366F1" />
        <rect x="111" y="95" width="8" height="15" rx="2" fill="#6366F1" />
        <rect x="105" y="100" width="20" height="2" rx="1" fill="#6366F1" />

        {/* Document/campaign */}
        <rect
          x="90"
          y="60"
          width="20"
          height="25"
          rx="2"
          fill="white"
          stroke="#6366F1"
          strokeWidth="2"
        />
        <line
          x1="95"
          y1="65"
          x2="105"
          y2="65"
          stroke="#6366F1"
          strokeWidth="2"
        />
        <line
          x1="95"
          y1="70"
          x2="105"
          y2="70"
          stroke="#6366F1"
          strokeWidth="2"
        />
        <line
          x1="95"
          y1="75"
          x2="100"
          y2="75"
          stroke="#6366F1"
          strokeWidth="2"
        />
      </svg>
    </div>
  );
}
