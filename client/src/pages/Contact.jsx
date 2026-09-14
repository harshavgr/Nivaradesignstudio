import React, { useState } from "react";
import { motion } from "framer-motion";
import EnquiryModal from "../components/EnquiryModal.jsx";
import "./Contact.css";

const sitemap = [
  { href: "#home", title: "Home", desc: "Hero & introduction" },
  { href: "#about", title: "About Us", desc: "Story, team & services" },
  { href: "#portfolio", title: "Portfolio", desc: "Curated project gallery" },
  { href: "#contact", title: "Contact", desc: "Reach out & connect" },
];

function scrollToId(e, href) {
  e.preventDefault();
  document.getElementById(href.slice(1))?.scrollIntoView({ behavior: "smooth" });
}

export default function Contact() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <section id="contact" className="contact full-section">
      <div className="container contact__inner">
        <motion.span
          className="eyebrow eyebrow--on-dark"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="eyebrow-line" />
          Contact &amp; Sitemap
        </motion.span>

        <motion.h1
          className="contact__title"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.55, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
        >
          Let us design
          <br />
          <em>your story.</em>
        </motion.h1>

        <motion.div
          className="contact__grid"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="contact__col">
            <span className="contact__label">Get In Touch</span>

            <div className="contact-card">
              <h3>Harshavardha G R</h3>
              <span className="contact-card__role">Principal Designer</span>

              <ul className="contact-card__list">
                <li>
                  <span className="contact-card__icon" aria-hidden="true">
                    ☎
                  </span>
                  <a href="tel:+919014949327">+91 9014949327</a>
                </li>
                <li>
                  <span className="contact-card__icon" aria-hidden="true">
                    🌐
                  </span>
                  <a href="https://nivaradesignstudio.com" target="_blank" rel="noreferrer">
                    nivaradesignstudio.com
                  </a>
                </li>
                <li>
                  <span className="contact-card__icon" aria-hidden="true">
                    ✉
                  </span>
                  <a href="mailto:info@nivaradesignstudio.com">info@nivaradesignstudio.com</a>
                </li>
                <li>
                  <span className="contact-card__icon" aria-hidden="true">
                    📷
                  </span>
                  <a
                    href="https://instagram.com/nivara_design_studio"
                    target="_blank"
                    rel="noreferrer"
                  >
                    @nivara_design_studio
                  </a>
                </li>
              </ul>
            </div>

            <button className="btn btn-gold contact__cta" onClick={() => setModalOpen(true)}>
              Send An Enquiry <span aria-hidden="true">→</span>
            </button>
          </div>

          <div className="contact__col">
            <span className="contact__label">Sitemap</span>

            <ul className="sitemap-list">
              {sitemap.map((item) => (
                <li key={item.href}>
                  <a href={item.href} onClick={(e) => scrollToId(e, item.href)}>
                    <span className="sitemap-list__title">{item.title}</span>
                    <span className="sitemap-list__desc">{item.desc}</span>
                  </a>
                </li>
              ))}
            </ul>

            <div className="contact__divider" />

            <p className="contact__note">
              Follow our journey on Instagram for daily design inspiration and
              behind-the-scenes.
            </p>
          </div>
        </motion.div>

        <div className="contact__footer">
          <span>&copy; {new Date().getFullYear()} Nivara Design Studio. All rights reserved.</span>
        </div>
      </div>

      {modalOpen && <EnquiryModal onClose={() => setModalOpen(false)} />}
    </section>
  );
}
