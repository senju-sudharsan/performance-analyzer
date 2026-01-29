/**
 * Grad-CAM–inspired Performance Overlay (UI-only)
 * Explains WHICH PAGE AREAS contribute to performance cost
 * Derived purely from performanceScore
 */

function getOverlayIntensity(score) {
  if (score >= 85) return 0.25;
  if (score >= 70) return 0.45;
  if (score >= 55) return 0.65;
  return 0.85;
}

const OverlayBlock = ({ label, intensity }) => {
  return (
    <div className="relative border rounded-md overflow-hidden bg-white">
      <div className="p-4 text-sm font-medium text-gray-700 z-10 relative">
        {label}
      </div>

      {/* Heat overlay */}
      <div
        className="absolute inset-0 bg-red-500"
        style={{ opacity: intensity }}
      />
    </div>
  );
};

const PerformanceOverlay = ({ performanceScore }) => {
  const intensity = getOverlayIntensity(performanceScore);

  return (
    <section className="mt-12">
      <h3 className="text-xl font-semibold text-gray-800 mb-2">
        Visual Performance Impact 
      </h3>

      <p className="text-sm text-gray-500 mb-6 max-w-2xl">
        This visualization highlights page regions contributing most to
        performance cost. Darker regions indicate higher impact.
      </p>

      {/* Fake Page Layout */}
      <div className="grid gap-4">
        <OverlayBlock label="Header / Navigation (JS-heavy)" intensity={intensity} />
        <OverlayBlock label="Hero Section (Images & Fonts)" intensity={intensity * 0.9} />
        <OverlayBlock label="Main Content (Mixed Load)" intensity={intensity * 0.6} />
        <OverlayBlock label="Footer (Low Impact)" intensity={intensity * 0.3} />
      </div>

      <div className="mt-4 text-xs text-gray-500">
        * Visualization inspired by Grad-CAM. Heuristic-based UI explanation.
      </div>
    </section>
  );
};

export default PerformanceOverlay;
