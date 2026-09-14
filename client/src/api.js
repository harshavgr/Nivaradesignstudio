// In dev, Vite proxies /api to the Express server (see vite.config.js).
// In production, set VITE_API_URL to your deployed API's base URL
// (e.g. https://api.nivaradesignstudio.com) in a client/.env file.
const API_BASE = import.meta.env.VITE_API_URL || "";

export async function submitEnquiry(payload) {
  let res;

  try {
    res = await fetch(`${API_BASE}/api/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch (networkErr) {
    // No backend reachable at all (not deployed yet, or offline).
    const err = new Error(
      "Online enquiries aren't connected yet \u2014 please reach out by phone, email, or Instagram for now."
    );
    err.dbUnavailable = true;
    throw err;
  }

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    // A 404 here usually means no backend is deployed yet at all (e.g. a
    // frontend-only deploy), not a real server error — treat it the same
    // as "database not connected" so the person sees contact alternatives.
    const likelyNoBackend = res.status === 404 && !data.error;
    const err = new Error(
      data.error ||
        (likelyNoBackend
          ? "Online enquiries aren't connected yet \u2014 please reach out by phone, email, or Instagram for now."
          : "Something went wrong. Please try again.")
    );
    err.dbUnavailable = Boolean(data.dbUnavailable) || likelyNoBackend;
    throw err;
  }

  return data;
}

export async function fetchPortfolio(category) {
  const query = category && category !== "All" ? `?category=${encodeURIComponent(category)}` : "";
  const res = await fetch(`${API_BASE}/api/portfolio${query}`);

  if (!res.ok) {
    throw new Error("Could not load portfolio right now.");
  }

  return res.json();
}
