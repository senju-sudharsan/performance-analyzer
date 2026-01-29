import { useMemo } from "react";

const COLORS = {
  HTML: "bg-gray-500",
  JS: "bg-blue-500",
  CSS: "bg-purple-500",
  Image: "bg-green-500",
  Font: "bg-yellow-500",
};

function generateWaterfall(performanceScore) {
  // Worse performance → slower & more blocking
  const baseDelay = Math.max(50, 200 - performanceScore);

  return [
    { name: "HTML", type: "HTML", start: 0, duration: baseDelay + 80 },
    { name: "CSS", type: "CSS", start: 40, duration: baseDelay + 120 },
    { name: "JS Bundle", type: "JS", start: 120, duration: baseDelay + 200 },
    { name: "Image Assets", type: "Image", start: 180, duration: baseDelay + 160 },
    { name: "Fonts", type: "Font", start: 220, duration: baseDelay + 90 },
  ];
}

const NetworkWaterfall = ({ performanceScore }) => {
  const requests = useMemo(
    () => generateWaterfall(performanceScore),
    [performanceScore]
  );

  const maxTime = Math.max(
    ...requests.map((r) => r.start + r.duration)
  );

  return (
    <section className="mt-12">
      <h3 className="text-xl font-semibold text-gray-800 mb-2">
        Network Waterfall
      </h3>
      <p className="text-sm text-gray-500 mb-6">
        Simulated request timeline showing load order and blocking behavior.
      </p>

      <div className="space-y-3">
        {requests.map((req) => (
          <div key={req.name} className="flex items-center gap-4">
            <div className="w-28 text-sm text-gray-600">{req.name}</div>

            <div className="relative flex-1 h-5 bg-gray-200 rounded">
              <div
                className={`absolute h-5 rounded ${COLORS[req.type]}`}
                style={{
                  left: `${(req.start / maxTime) * 100}%`,
                  width: `${(req.duration / maxTime) * 100}%`,
                }}
              />
            </div>

            <div className="w-20 text-xs text-gray-500">
              {req.duration} ms
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default NetworkWaterfall;
