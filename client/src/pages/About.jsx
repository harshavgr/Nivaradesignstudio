import React from "react";
import { motion } from "framer-motion";
import "./About.css";

const categoryGroups = [
  {
    title: "Residential Interiors",
    items: ["Homes", "Apartments", "Villas"],
  },
  {
    title: "Commercial Interiors",
    items: ["Offices", "Workspaces", "Retail & More"],
  },
];

const values = [
  { title: "Bespoke Designs" },
  { title: "Functional Solutions" },
  { title: "Quality Craftsmanship" },
  { title: "Timeless Aesthetics" },
];

const stats = [
  { value: "8+", label: "Years of Practice" },
  { value: "120+", label: "Projects Delivered" },
  { value: "15+", label: "Cities Served" },
];

export default function About() {
  return (
    <section id="about" className="about full-section">
      <div className="container about__grid">
        <motion.div
          className="about__text"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="eyebrow">
            <span className="eyebrow-line" />
            About Us
          </span>

          <h1 className="about__title">
            Designing spaces
            <br />
            <em>you will love</em>
            <br />
            coming home to.
          </h1>

          <p className="about__para">
            Nivara Design Studio was founded on a single belief — that great
            design is not a luxury, it is a language. Every room tells a
            story, and we are here to help you tell yours with intention,
            elegance, and craft.
          </p>

          <p className="about__para">
            Led by Principal Designer <strong>Harshavardhan</strong>, our
            studio blends classical sensibility with contemporary restraint.
            We listen deeply, curate carefully, and deliver spaces that feel
            both aspirational and profoundly livable.
          </p>

          <div className="about__stats">
            {stats.map((s) => (
              <div className="about__stat" key={s.label}>
                <span className="about__stat-value">{s.value}</span>
                <span className="about__stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="about__side"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="about__side-lead">
            From the rooms you live in every day to the spaces where
            business happens, we design for how they'll actually be used.
          </p>

          <div className="about__categories">
            {categoryGroups.map((group, i) => (
              <motion.div
                className={`category-card ${i === 1 ? "category-card--dark" : ""}`}
                key={group.title}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.45, delay: 0.25 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              >
                <h3>{group.title}</h3>
                <ul>
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          <div className="about__values">
            {values.map((v, i) => (
              <motion.div
                className="value-pill"
                key={v.title}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.4, delay: 0.5 + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
              >
                {v.title}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
