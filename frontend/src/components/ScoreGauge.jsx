const ScoreGauge = ({ label, value }) => {
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const progress = Math.min(Math.max(value, 0), 100);
  const offset = circumference - (progress / 100) * circumference;

  const color =
    value >= 90 ? "#16a34a" : value >= 50 ? "#f59e0b" : "#dc2626";

  return (
    <div className="flex flex-col items-center">
      <svg width="120" height="120">
        {/* background */}
        <circle
          cx="60"
          cy="60"
          r={radius}
          stroke="#e5e7eb"
          strokeWidth="10"
          fill="none"
        />
        {/* progress */}
        <circle
          cx="60"
          cy="60"
          r={radius}
          stroke={color}
          strokeWidth="10"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform="rotate(-90 60 60)"
        />
        {/* value */}
        <text
          x="50%"
          y="50%"
          dominantBaseline="middle"
          textAnchor="middle"
          fontSize="22"
          fontWeight="bold"
          fill={color}
        >
          {value}
        </text>
      </svg>

      <div className="mt-2 text-gray-700 font-medium">{label}</div>
    </div>
  );
};

export default ScoreGauge;
