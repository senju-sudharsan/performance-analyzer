/**
 * Top well-known sites with high score variance (83–100)
 */
const TOP_SITES = [
  "google",
  "youtube.com",
  "facebook.com",
  "instagram.com",
  "twitter.com",
  "x.com",
  "amazon",
  "flipkart",
  "netflix.com",
  "linkedin.com",
  "wikipedia.org",
  "apple.com",
  "microsoft.com",
  "github.com",
  "reddit.com",
  "stackoverflow.com",
  "openai.com",
  "whatsapp.com",
  "spotify.com",
  "zoom.us",
  "paypal.com",
];


function random(min, max) {
  return Math.round(min + Math.random() * (max - min));
}

function getDomain(url) {
  try {
    const host = new URL(url).hostname
      .replace(/^www\./, "")
      .replace(/^m\./, "");

    // normalize known variants
    if (host.endsWith("amazon.in") || host.endsWith("amazon.com")) return "amazon";
    if (host.endsWith("flipkart.in") || host.endsWith("flipkart.com")) return "flipkart";
    if (host.endsWith("google.com") || host.endsWith("google.co.in")) return "google";

    return host;
  } catch {
    return "";
  }
}


function generateScores(domain) {
  const isTopSite = TOP_SITES.includes(domain);

  if (isTopSite) {
    return {
      performance: random(83, 100),
      accessibility: random(85, 100),
      bestPractices: random(88, 100),
      seo: random(85, 100),
    };
  }

  // Controlled realistic distribution for normal sites
  const roll = Math.random();

  if (roll < 0.2) {
    // 20% poor
    return {
      performance: random(40, 60),
      accessibility: random(45, 65),
      bestPractices: random(45, 65),
      seo: random(45, 70),
    };
  }

  if (roll < 0.7) {
    // 50% average
    return {
      performance: random(60, 80),
      accessibility: random(60, 85),
      bestPractices: random(60, 85),
      seo: random(60, 85),
    };
  }

  // 30% good
  return {
    performance: random(80, 90),
    accessibility: random(75, 90),
    bestPractices: random(75, 90),
    seo: random(75, 90),
  };
}

/**
 * MAIN EXPORT
 * Persistent score resolver
 */
export function getPersistentScores(url) {
  const domain = getDomain(url);
  if (!domain) return null;

  const key = `psi-score-${domain}`;
  const cached = localStorage.getItem(key);

  if (cached) {
    return JSON.parse(cached);
  }

  const scores = generateScores(domain);
  localStorage.setItem(key, JSON.stringify(scores));
  return scores;
}
