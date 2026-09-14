import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import "./Portfolio.css";

// Real spaces we design, matching Nivara's actual service categories —
// swap these imageUrls for real project photography whenever it's ready.
const slides = [
  {
    title: "Homes",
    tag: "Residential",
    desc: "Complete home interiors shaped around how a family actually lives.",
    imageUrl:
      "https://images.unsplash.com/photo-1758448755856-01d3add0177b?auto=format&fit=crop&w=1600&q=80",
  },
  {
    title: "Apartments",
    tag: "Residential",
    desc: "Smart, elegant layouts that make the most of every apartment's footprint.",
    imageUrl:
      "https://images.unsplash.com/photo-1737898415581-7dea57a1905b?auto=format&fit=crop&w=1600&q=80",
  },
  {
    title: "Villas",
    tag: "Residential",
    desc: "Expansive villa interiors with room to make a considered, lasting statement.",
    imageUrl:
      "https://images.unsplash.com/photo-1505843694770-3461f546bd8f?auto=format&fit=crop&w=1600&q=80",
  },
  {
    title: "Offices",
    tag: "Commercial",
    desc: "Workspaces designed for focus, collaboration, and a strong first impression.",
    imageUrl:
      "https://images.unsplash.com/photo-1531973576160-7125cd663d86?auto=format&fit=crop&w=1600&q=80",
  },
  {
    title: "Retail & More",
    tag: "Commercial",
    desc: "Boutiques and retail spaces designed to let the merchandise take center stage.",
    imageUrl:
      "https://images.unsplash.com/photo-1758025554726-50b7ed346394?auto=format&fit=crop&w=1600&q=80",
  },
];

const N = slides.length;
const f = 0.05; // fade width around each boundary, as a fraction of scroll progress

export default function Portfolio() {
  const trackRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const idx = Math.min(N - 1, Math.max(0, Math.floor(v * N)));
    setActiveIndex(idx);
  });

  // One useTransform per slide, unrolled (hooks can't be called in a loop).
  const op0 = useTransform(scrollYProgress, [0, 0.2 - f, 0.2 + f], [1, 1, 0]);
  const op1 = useTransform(scrollYProgress, [0.2 - f, 0.2 + f, 0.4 - f, 0.4 + f], [0, 1, 1, 0]);
  const op2 = useTransform(scrollYProgress, [0.4 - f, 0.4 + f, 0.6 - f, 0.6 + f], [0, 1, 1, 0]);
  const op3 = useTransform(scrollYProgress, [0.6 - f, 0.6 + f, 0.8 - f, 0.8 + f], [0, 1, 1, 0]);
  const op4 = useTransform(scrollYProgress, [0.8 - f, 0.8 + f, 1], [0, 1, 1]);
  const opacities = [op0, op1, op2, op3, op4];

  function jumpTo(i) {
    const track = trackRef.current;
    if (!track) return;
    const top = track.offsetTop;
    const height = track.offsetHeight;
    const target = top + (height * i) / N + 10;
    window.scrollTo({ top: target, behavior: "smooth" });
  }

  return (
    <section id="portfolio" className="portfolio-scroll" ref={trackRef}>
      <div className="portfolio-scroll__sticky">
        <div className="portfolio-scroll__header container">
          <span className="eyebrow">
            <span className="eyebrow-line" />
            Portfolio
          </span>
          <h2 className="portfolio-scroll__title">
            Curated works,
            <br />
            <em>crafted with care.</em>
          </h2>
        </div>

        <div className="portfolio-scroll__stage">
          {slides.map((slide, i) => (
            <motion.div className="portfolio-scroll__slide" style={{ opacity: opacities[i] }} key={slide.title}>
              <img src={slide.imageUrl} alt={`${slide.title} interior design by Nivara Design Studio`} />
              <div className="portfolio-scroll__scrim" />
              <div className="portfolio-scroll__caption container">
                <span className="portfolio-scroll__tag">{slide.tag}</span>
                <h3>{slide.title}</h3>
                <p>{slide.desc}</p>
              </div>
            </motion.div>
          ))}

          <div className="portfolio-scroll__dots" role="tablist" aria-label="Portfolio categories">
            {slides.map((slide, i) => (
              <button
                key={slide.title}
                role="tab"
                aria-selected={activeIndex === i}
                aria-label={slide.title}
                className={`portfolio-scroll__dot ${activeIndex === i ? "is-active" : ""}`}
                onClick={() => jumpTo(i)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
