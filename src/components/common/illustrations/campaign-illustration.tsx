export function CampaignIllustration() {
  return (
    <div className="relative h-[150px] max-h-[150px] w-[300px]">
      <svg
        viewBox="0 0 300 150"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-full"
      >
        <rect width="300" height="150" rx="8" fill="transparent" />
        <circle
          cx="150"
          cy="75"
          r="50"
          fill="currentColor"
          fillOpacity="0.1"
          className="text-primary"
        />
        <path
          d="M150 40C130.67 40 115 55.67 115 75C115 94.33 130.67 110 150 110C169.33 110 185 94.33 185 75C185 55.67 169.33 40 150 40ZM150 100C136.19 100 125 88.81 125 75C125 61.19 136.19 50 150 50C163.81 50 175 61.19 175 75C175 88.81 163.81 100 150 100Z"
          fill="currentColor"
          className="text-primary"
          fillOpacity="0.6"
        />
        <circle
          cx="190"
          cy="50"
          r="15"
          fill="currentColor"
          fillOpacity="0.2"
          className="text-primary"
        />
        <circle
          cx="110"
          cy="100"
          r="10"
          fill="currentColor"
          fillOpacity="0.3"
          className="text-primary"
        />
        <circle
          cx="210"
          cy="90"
          r="8"
          fill="currentColor"
          fillOpacity="0.4"
          className="text-primary"
        />
        <circle
          cx="90"
          cy="60"
          r="12"
          fill="currentColor"
          fillOpacity="0.2"
          className="text-primary"
        />
      </svg>
    </div>
  );
}
