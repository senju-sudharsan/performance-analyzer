require("dotenv").config();

const express = require("express");
const cors = require("cors");

// node-fetch v3 compatibility for CommonJS
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const app = express();
app.use(cors());
app.use(express.json());

const API_KEY = process.env.PAGESPEED_API_KEY;
const PORT = process.env.PORT || 4000;

/* -------------------- MOCK FALLBACK -------------------- */
function mockPageSpeed(url) {
  return {
    mocked: true,
    url,
    performance: 92,
    accessibility: 88,
    bestPractices: 95,
    seo: 90,
  };
}

/* -------------------- ANALYZE ENDPOINT -------------------- */
app.get("/analyze", async (req, res) => {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: "URL is required" });
  }

  try {
    const apiUrl =
      "https://www.googleapis.com/pagespeedonline/v5/runPagespeed" +
      `?url=${encodeURIComponent(url)}` +
      "&strategy=mobile" +
      "&category=PERFORMANCE" +
      "&category=ACCESSIBILITY" +
      "&category=BEST_PRACTICES" +
      "&category=SEO" +
      `&key=${API_KEY}`;

    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.error) {
      throw new Error(data.error.message);
    }

    // ✅ NORMALIZED RESPONSE (frontend-safe)
    const result = {
      mocked: false,
      url,
      performance: Math.round(
        data.lighthouseResult.categories.performance.score * 100
      ),
      accessibility: Math.round(
        data.lighthouseResult.categories.accessibility.score * 100
      ),
      bestPractices: Math.round(
        data.lighthouseResult.categories["best-practices"].score * 100
      ),
      seo: Math.round(
        data.lighthouseResult.categories.seo.score * 100
      ),
    };

    return res.json(result);
  } catch (err) {
    console.warn("⚠ PageSpeed API failed, using mock fallback");
    return res.json(mockPageSpeed(url));
  }
});

/* -------------------- START SERVER -------------------- */
app.listen(PORT, () => {
  console.log(`✅ Backend running at http://localhost:${PORT}`);
});
