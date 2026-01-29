import { useMemo } from "react";

/**
 * Cyberpunk-inspired dependency matrix
 * UI-only, deterministic, safe for demos
 */

const RESOURCES = ["JS", "CSS", "Images", "Fonts"];

// Cyberpunk neon colors (blocks only)
const COLORS = {
  low: "bg-cyan-300",
  medium: "bg-purple-400",
  high: "bg-pink-500",
  none: "bg-gray-100",
};

// Deterministic severity based on performance score
function getSeverity(from, to, performanceScore) {
  if (from === to) return "none";

  // Better performance → lower blocking
  if (performanceScore >= 85) {
    if (from === "JS" && to === "Images") return "medium";
    if (from === "JS" && to === "Fonts") return "medium";
    return "low";
  }

  if (performanceScore >= 60) {
    if (from === "JS" && to !== "JS") return "high";
    if (from === "CSS" && to === "Fonts") return "medium";
    return "low";
  }

  // Poor performance
  if (from === "JS" && to !== "JS") return "high";
  if (from === "CSS") return "medium";
  return "low";
}

const RequestDependencyMatrix = ({ performanceScore }) => {
  const matrix = useMemo(() => {
    return RESOURCES.map((row) =>
      RESOURCES.map((col) =>
        getSeverity(row, col, performanceScore)
      )
    );
  }, [performanceScore]);

  return (
    <section className="mt-12">
      <h3 className="text-xl font-semibold text-gray-800 mb-2">
        Resource Dependency Matrix
      </h3>
      <p className="text-sm text-gray-500 mb-6 max-w-2xl">
        Visualizes how different resource types block or delay others during page load.
        Brighter colors indicate stronger blocking relationships.
      </p>

      {/* Matrix */}
      <div className="overflow-x-auto">
        <div className="inline-grid grid-cols-5 gap-2">
          {/* Header row */}
          <div />
          {RESOURCES.map((res) => (
            <div
              key={res}
              className="text-sm font-medium text-gray-600 text-center"
            >
              {res}
            </div>
          ))}

          {/* Rows */}
          {RESOURCES.map((row, i) => (
            <>
              <div
                key={row}
                className="text-sm font-medium text-gray-600 flex items-center"
              >
                {row}
              </div>

              {matrix[i].map((severity, j) => (
                <div
                  key={`${i}-${j}`}
                  className={`w-14 h-10 rounded-md ${COLORS[severity]} 
                    border border-gray-200`}
                  title={`${row} → ${RESOURCES[j]}: ${severity}`}
                />
              ))}
            </>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="flex gap-4 mt-6 text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <span className="w-4 h-4 rounded bg-pink-500" /> High blocking
        </div>
        <div className="flex items-center gap-2">
          <span className="w-4 h-4 rounded bg-purple-400" /> Medium
        </div>
        <div className="flex items-center gap-2">
          <span className="w-4 h-4 rounded bg-cyan-300" /> Low
        </div>
      </div>
    </section>
  );
};

export default RequestDependencyMatrix;
