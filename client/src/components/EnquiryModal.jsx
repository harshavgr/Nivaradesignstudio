import React, { useState } from "react";
import { submitEnquiry } from "../api.js";
import "./EnquiryModal.css";

const initialForm = {
  name: "",
  email: "",
  phone: "",
  projectType: "Residential",
  message: "",
};

export default function EnquiryModal({ onClose }) {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error
  const [errorMsg, setErrorMsg] = useState("");
  const [dbUnavailable, setDbUnavailable] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg("");
    setDbUnavailable(false);

    try {
      await submitEnquiry(form);
      setStatus("success");
      setForm(initialForm);
    } catch (err) {
      setStatus("error");
      setErrorMsg(err.message || "Something went wrong. Please try again.");
      setDbUnavailable(Boolean(err.dbUnavailable));
    }
  }

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="enquiry-title" onClick={onClose}>
      <div className="modal-panel" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close">
          &times;
        </button>

        {status === "success" ? (
          <div className="modal-success">
            <span className="eyebrow">
              <span className="eyebrow-line" />
              Enquiry sent
            </span>
            <h3>Thank you.</h3>
            <p>
              We've received your message and will get back to you within one to two
              business days.
            </p>
            <button className="btn btn-primary" onClick={onClose}>
              Close
            </button>
          </div>
        ) : (
          <>
            <span className="eyebrow">
              <span className="eyebrow-line" />
              Get in touch
            </span>
            <h3 id="enquiry-title">Send an enquiry</h3>
            <p className="modal-subtitle">
              Tell us a little about your space and we'll respond personally.
            </p>

            <form className="enquiry-form" onSubmit={handleSubmit}>
              <div className="field-row">
                <label className="field">
                  <span>Name</span>
                  <input
                    type="text"
                    name="name"
                    required
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your full name"
                  />
                </label>
                <label className="field">
                  <span>Email</span>
                  <input
                    type="email"
                    name="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                  />
                </label>
              </div>

              <div className="field-row">
                <label className="field">
                  <span>Phone (optional)</span>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+91 00000 00000"
                  />
                </label>
                <label className="field">
                  <span>Project type</span>
                  <select name="projectType" value={form.projectType} onChange={handleChange}>
                    <option>Residential</option>
                    <option>Commercial</option>
                    <option>Space Planning</option>
                    <option>Material Curation</option>
                    <option>Other</option>
                  </select>
                </label>
              </div>

              <label className="field">
                <span>Message</span>
                <textarea
                  name="message"
                  required
                  rows={4}
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell us about your space, timeline, and what you're hoping for."
                />
              </label>

              {status === "error" && (
                <div className="form-error-block">
                  <p className="form-error">{errorMsg}</p>
                  {dbUnavailable && (
                    <ul className="form-error-alt">
                      <li>
                        Call: <a href="tel:+919014949327">+91 9014949327</a>
                      </li>
                      <li>
                        Email:{" "}
                        <a href="mailto:info@nivaradesignstudio.com">
                          info@nivaradesignstudio.com
                        </a>
                      </li>
                      <li>
                        Instagram:{" "}
                        <a href="https://instagram.com/nivara_design_studio" target="_blank" rel="noreferrer">
                          @nivara_design_studio
                        </a>
                      </li>
                    </ul>
                  )}
                </div>
              )}

              <button className="btn btn-gold" type="submit" disabled={status === "submitting"}>
                {status === "submitting" ? "Sending\u2026" : "Send an enquiry"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
