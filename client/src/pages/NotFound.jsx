import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="container" style={{ padding: "120px 32px", textAlign: "center" }}>
      <span className="eyebrow eyebrow--center">
        <span className="eyebrow-line" />
        404
        <span className="eyebrow-line" />
      </span>
      <h1 style={{ marginTop: 22, fontSize: 40 }}>This room doesn't exist.</h1>
      <p style={{ marginTop: 16, color: "var(--text-body)" }}>
        The page you're looking for may have moved.
      </p>
      <Link to="/" className="btn btn-primary" style={{ marginTop: 30, display: "inline-flex" }}>
        Back Home
      </Link>
    </section>
  );
}
