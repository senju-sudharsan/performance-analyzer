const VitalCard = ({ label, value, unit, status }) => {
  const color =
    status === "good"
      ? "text-green-600"
      : status === "needs-improvement"
      ? "text-yellow-500"
      : "text-red-600";

  return (
    <div className="bg-gray-50 rounded-lg p-4 shadow-sm">
      <div className="text-sm text-gray-500">{label}</div>
      <div className={`text-2xl font-bold mt-1 ${color}`}>
        {value}
        {unit}
      </div>
    </div>
  );
};

const CoreWebVitals = () => {
  // realistic, stable values (mock-safe)
  return (
    <div className="mt-10">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Core Web Vitals (Mobile)
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <VitalCard
          label="Largest Contentful Paint (LCP)"
          value={2.4}
          unit="s"
          status="good"
        />
        <VitalCard
          label="Cumulative Layout Shift (CLS)"
          value={0.09}
          unit=""
          status="good"
        />
        <VitalCard
          label="Interaction to Next Paint (INP)"
          value={180}
          unit="ms"
          status="needs-improvement"
        />
      </div>
    </div>
  );
};

export default CoreWebVitals;
