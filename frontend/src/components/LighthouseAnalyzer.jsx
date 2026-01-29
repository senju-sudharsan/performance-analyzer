import { useState } from "react";
import { useForm } from "react-hook-form";
import ScoreGauge from "./ScoreGauge";
import CoreWebVitals from "./CoreWebVitals";

const LighthouseAnalyzer = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [scores, setScores] = useState(null);
  const [error, setError] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const analyzeUrl = async ({ url }) => {
    setIsLoading(true);
    setScores(null);
    setError(null);

    try {
      const response = await fetch(
  `http://localhost:3001/analyze?url=${encodeURIComponent(url)}`
);


      if (!response.ok) {
        throw new Error("Analysis failed");
      }

      const data = await response.json();

      // ✅ Normalize once, always numbers
      const normalizedScores = {
        performance: Number(data.performance ?? 0),
        accessibility: Number(data.accessibility ?? 0),
        bestPractices: Number(data.bestPractices ?? 0),
        seo: Number(data.seo ?? 0),
      };

      setScores(normalizedScores);
    } catch (err) {
      console.error(err);
      setError("Failed to analyze URL. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center px-4 pt-24">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        PageSpeed Insights Analyzer
      </h1>

      {/* FORM */}
      <form
        onSubmit={handleSubmit(analyzeUrl)}
        className="w-full max-w-4xl flex flex-col items-center space-y-4"
      >
        <div className="w-full flex">
          <input
            type="url"
            placeholder="https://example.com"
            {...register("url", {
              required: "URL is required",
              pattern: {
                value: /^(https?):\/\/[^\s/$.?#].[^\s]*$/,
                message: "Enter a valid URL",
              },
            })}
            disabled={isLoading}
            className="flex-grow px-4 py-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-r-lg hover:bg-blue-600 disabled:opacity-50"
          >
            {isLoading ? "Analyzing…" : "Analyze"}
          </button>
        </div>

        {errors.url && (
          <p className="text-red-500 text-sm">{errors.url.message}</p>
        )}
      </form>

      {error && (
        <p className="mt-6 text-red-600 font-medium">{error}</p>
      )}

      {isLoading && (
        <p className="mt-6 text-gray-600">Running Lighthouse analysis…</p>
      )}

      {/* RESULTS */}
      {scores && (
        <div className="mt-10 w-full max-w-4xl bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-6 text-gray-800">
            Analysis Results
          </h2>

          {/* Lighthouse category scores */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <ScoreGauge label="Performance" value={scores.performance} />
            <ScoreGauge label="Accessibility" value={scores.accessibility} />
            <ScoreGauge label="Best Practices" value={scores.bestPractices} />
            <ScoreGauge label="SEO" value={scores.seo} />
          </div>

          {/* Core Web Vitals */}
          <CoreWebVitals />

          {/* Opportunities */}
          <div className="mt-10">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Opportunities
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li>• Reduce unused JavaScript</li>
              <li>• Serve images in next-gen formats</li>
              <li>• Eliminate render-blocking resources</li>
            </ul>
          </div>

          {/* Diagnostics */}
          <div className="mt-10">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Diagnostics
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li>• Avoid large layout shifts</li>
              <li>• Minimize main-thread work</li>
              <li>• Reduce JavaScript execution time</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default LighthouseAnalyzer;
