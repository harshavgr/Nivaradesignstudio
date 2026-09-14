import React from "react";
import { motion } from "framer-motion";
import Logo from "../components/Logo.jsx";
import "./Home.css";

const container = {
  animate: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const item = {
  initial: { opacity: 0, y: 16 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

function scrollToPortfolio(e) {
  e.preventDefault();
  document.getElementById("portfolio")?.scrollIntoView({ behavior: "smooth" });
}

function scrollToContact(e) {
  e.preventDefault();
  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
}

export default function Home() {
  return (
    <section id="home" className="hero full-section">
      <div className="hero__blob" aria-hidden="true" />
      <motion.div
        className="container hero__inner"
        variants={container}
        initial="initial"
        animate="animate"
      >
        <motion.div variants={item}>
          <Logo size="hero" />
        </motion.div>

        <motion.span variants={item} className="eyebrow eyebrow--center hero__eyebrow">
          <span className="eyebrow-line" />
          Spaces That Inspire
          <span className="eyebrow-line" />
        </motion.span>

        <motion.h1 variants={item} className="hero__title">
          Where beauty
          <br />
          <em>meets</em> intention.
        </motion.h1>

        <motion.p variants={item} className="hero__subtitle">
          Thoughtful interiors crafted around the way you live — elegant,
          purposeful, and distinctly yours.
        </motion.p>

        <motion.div variants={item} className="hero__actions">
          <a href="#portfolio" className="btn btn-primary" onClick={scrollToPortfolio}>
            View Portfolio
          </a>
          <a href="#contact" className="btn btn-outline" onClick={scrollToContact}>
            Get In Touch
          </a>
        </motion.div>

        <motion.div variants={item} className="hero__scroll-hint" aria-hidden="true">
          <span />
          Scroll
        </motion.div>
      </motion.div>
    </section>
  );
}
