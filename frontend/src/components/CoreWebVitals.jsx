const VITAL_THRESHOLDS = {
  LCP: { good: 2.5, ni: 4.0 },     // seconds
  CLS: { good: 0.1, ni: 0.25 },   // score
  INP: { good: 200, ni: 500 },    // ms
};

function getStatus(metric, value) {
  const t = VITAL_THRESHOLDS[metric];
  if (value <= t.good) return "good";
  if (value <= t.ni) return "needs-improvement";
  return "poor";
}

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

const CoreWebVitals = () => {
  /**
   * Stable mock values
   * (Real CWV requires CrUX / PSI field data)
   */
  const lcp = 2.4;
  const cls = 0.09;
  const inp = 180;

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
          value={lcp}
          unit="s"
          description="Measures loading performance. LCP should occur within 2.5 seconds for a good user experience."
        />

        <VitalCard
          label="Cumulative Layout Shift (CLS)"
          metric="CLS"
          value={cls}
          unit=""
          description="Measures visual stability. Lower values mean fewer unexpected layout shifts."
        />

        <VitalCard
          label="Interaction to Next Paint (INP)"
          metric="INP"
          value={inp}
          unit="ms"
          description="Measures responsiveness. Lower INP means faster reaction to user interactions."
        />
      </div>
    </section>
  );
};

export default CoreWebVitals;
