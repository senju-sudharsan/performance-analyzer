const VITAL_THRESHOLDS = {
  LCP: { good: 2.5, ni: 4.0 },
  CLS: { good: 0.1, ni: 0.25 },
  INP: { good: 200, ni: 500 },
};

const STATUS_COLORS = {
  good: "text-green-600",
  "needs-improvement": "text-yellow-500",
  poor: "text-red-600",
};

const STATUS_LABELS = {
  good: "Good",
  "needs-improvement": "Needs Improvement",
  poor: "Poor",
};

function getStatus(metric, value) {
  const t = VITAL_THRESHOLDS[metric];
  if (value <= t.good) return "good";
  if (value <= t.ni) return "needs-improvement";
  return "poor";
}

function rand(min, max, decimals = 2) {
  return +(Math.random() * (max - min) + min).toFixed(decimals);
}

function generateVitals(performanceScore) {
  if (performanceScore >= 83) {
    return {
      LCP: rand(1.8, 2.5),
      CLS: rand(0.01, 0.1, 3),
      INP: rand(120, 200, 0),
    };
  }

  if (performanceScore >= 60) {
    return {
      LCP: rand(2.6, 4.0),
      CLS: rand(0.1, 0.25, 3),
      INP: rand(200, 500, 0),
    };
  }

  return {
    LCP: rand(4.1, 6.0),
    CLS: rand(0.25, 0.4, 3),
    INP: rand(500, 900, 0),
  };
}

const VitalCard = ({ label, metric, value, unit, description }) => {
  const status = getStatus(metric, value);
  const color = STATUS_COLORS[status];

  return (
    <div className="bg-gray-50 rounded-lg p-5 shadow-sm border">
      <div className="flex justify-between items-center">
        <h4 className="text-sm font-medium text-gray-600">{label}</h4>
        <span className={`text-xs font-semibold ${color}`}>
          {STATUS_LABELS[status]}
        </span>
      </div>

      <div className={`text-3xl font-bold mt-2 ${color}`}>
        {value}
        {unit}
      </div>

      <p className="text-xs text-gray-500 mt-3 leading-relaxed">
        {description}
      </p>
    </div>
  );
};

const CoreWebVitals = ({ performanceScore }) => {
  const vitals = generateVitals(performanceScore);

  return (
    <section className="mt-12">
      <h3 className="text-xl font-semibold text-gray-800 mb-1">
        Core Web Vitals (Mobile)
      </h3>
      <p className="text-sm text-gray-500 mb-6 max-w-2xl">
        Core Web Vitals measure real-world user experience focusing on loading
        speed, visual stability, and interactivity.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <VitalCard
          label="Largest Contentful Paint (LCP)"
          metric="LCP"
          value={vitals.LCP}
          unit="s"
          description="Measures loading performance. LCP should occur within 2.5 seconds for a good user experience."
        />

        <VitalCard
          label="Cumulative Layout Shift (CLS)"
          metric="CLS"
          value={vitals.CLS}
          unit=""
          description="Measures visual stability. Lower values mean fewer unexpected layout shifts."
        />

        <VitalCard
          label="Interaction to Next Paint (INP)"
          metric="INP"
          value={vitals.INP}
          unit="ms"
          description="Measures responsiveness. Lower INP means faster reaction to user interactions."
        />
      </div>
    </section>
  );
};

export default CoreWebVitals;
