import { useMemo } from "react";

/**
 * UI-only performance cost breakdown
 * Derived from performance score
 */

const COLORS = {
  JS: "bg-blue-500",
  CSS: "bg-purple-500",
  Images: "bg-green-500",
  Fonts: "bg-yellow-500",
  Other: "bg-red-500",
};

function generateBreakdown(performanceScore) {
  // Worse score → heavier JS & Images
  const base = Math.max(40, 100 - performanceScore);

  return {
    JS: Math.round(base * 0.35),
    Images: Math.round(base * 0.25),
    CSS: Math.round(base * 0.15),
    Fonts: Math.round(base * 0.1),
    Other: Math.round(base * 0.15),
  };
}

const PerformanceBreakdown = ({ performanceScore }) => {
  const data = useMemo(
    () => generateBreakdown(performanceScore),
    [performanceScore]
  );

  const total = Object.values(data).reduce((a, b) => a + b, 0);

  return (
    <section className="mt-12">
      <h3 className="text-xl font-semibold text-gray-800 mb-2">
        Performance Breakdown
      </h3>
      <p className="text-sm text-gray-500 mb-6">
        Estimated contribution of resource types to performance impact.
      </p>

      {/* Bar */}
      <div className="w-full h-6 flex rounded overflow-hidden mb-6">
        {Object.entries(data).map(([key, value]) => (
          <div
            key={key}
            className={`${COLORS[key]} h-full`}
            style={{ width: `${(value / total) * 100}%` }}
          />
        ))}
      </div>

      {/* Legend */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
        {Object.entries(data).map(([key, value]) => (
          <div key={key} className="flex items-center gap-2">
            <span className={`w-3 h-3 rounded ${COLORS[key]}`} />
            <span className="text-gray-700">
              {key}: {value}%
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PerformanceBreakdown;
