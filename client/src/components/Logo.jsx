import React from "react";
import "./Logo.css";

/**
 * Renders the studio's actual logo file exactly as provided — no
 * recreation, no cropping, no recoloring. Two sizes only: a compact
 * navbar mark and a larger hero mark.
 */
export default function Logo({ size = "nav", className = "" }) {
  return (
    <img
      src="/logo.jpg"
      alt="Nivara Design Studio — Interior Design, Spaces That Inspire"
      className={`logo logo--${size} ${className}`}
    />
  );
}
