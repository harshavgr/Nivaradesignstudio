import { useState, useEffect, useRef } from "react";
import logoFront from "@/imports/Logo_FrontSide.jpg";
import instagramLogo from "./imports/For_instagram-1.png";
import forInstagram from "./imports/For_instagram.png";

const SECTIONS = ["home", "about", "portfolio", "contact"] as const;
type Section = (typeof SECTIONS)[number];

const portfolioItems = [
  {
    id: 1,
    title: "Serene Living Suite",
    category: "Design",
    img: "https://images.unsplash.com/photo-1724582586529-62622e50c0b3?w=800&h=600&fit=crop&auto=format",
    alt: "Modern minimalist living room with large windows",
  },
  {
    id: 2,
    title: "Velvet Dusk Lounge",
    category: "Design",
    img: "https://images.unsplash.com/photo-1628744876497-eb30460be9f6?w=800&h=600&fit=crop&auto=format",
    alt: "Two grey velvet sofas in a bright living room",
  },
  {
    id: 3,
    title: "Golden Canopy Bedroom",
    category: "Residential",
    img: "https://images.unsplash.com/photo-1617098900591-3f90928e8c54?w=800&h=600&fit=crop&auto=format",
    alt: "Modern bedroom with crystal chandelier",
  },
  {
    id: 4,
    title: "Linen & Calm Retreat",
    category: "Residential",
    img: "https://images.unsplash.com/photo-1615529162924-f8605388461d?w=800&h=600&fit=crop&auto=format",
    alt: "White bed linen on wooden bed frame",
  },
  {
    id: 5,
    title: "Curated Dining Pavilion",
    category: "Commercial",
    img: "https://images.unsplash.com/photo-1635321350281-e2a91ecffd00?w=800&h=600&fit=crop&auto=format",
    alt: "Elegant dining room with table and chairs",
  },
  {
    id: 6,
    title: "Studio Collection",
    category: "Design",
    img: "https://images.unsplash.com/photo-1724582586495-d050726cf354?w=800&h=600&fit=crop&auto=format",
    alt: "Living room with sofa and artful arrangement",
  },
];

const services = [
  { name: "Residential Design", desc: "Complete home transformations tailored to your lifestyle." },
  { name: "Commercial Spaces", desc: "Offices, boutiques, and hospitality spaces with purpose." },
  { name: "Space Planning", desc: "Intelligent layouts that maximise flow and function." },
  { name: "Material Curation", desc: "Bespoke palette of textures, finishes, and furnishings." },
];

export default function App() {
  const [active, setActive] = useState<Section>("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [filter, setFilter] = useState<string>("All");
  const sectionRefs = useRef<Record<Section, HTMLElement | null>>({
    home: null,
    about: null,
    portfolio: null,
    contact: null,
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -60px 0px" }
    );
    const elements = document.querySelectorAll(".reveal, .reveal-left, .reveal-right, .reveal-scale");
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [filter]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
      const offsets = SECTIONS.map((id) => {
        const el = sectionRefs.current[id];
        return { id, top: el ? el.getBoundingClientRect().top : Infinity };
      });
      const current = offsets.reduce((best, s) =>
        Math.abs(s.top) < Math.abs(best.top) ? s : best
      );
      setActive(current.id);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: Section) => {
    sectionRefs.current[id]?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const categories = ["All", ...Array.from(new Set(portfolioItems.map((p) => p.category)))];
  const filtered = filter === "All" ? portfolioItems : portfolioItems.filter((p) => p.category === filter);

  return (
    <div className="relative">
      {/* ── STICKY NAV ── */}
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled ? "rgba(255,255,255,0.97)" : "transparent",
          borderBottom: scrolled ? "1px solid #ede7db" : "none",
          backdropFilter: scrolled ? "blur(8px)" : "none",
        }}
      >
        <nav className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => scrollTo("home")}
            className="flex items-center gap-3 group"
            aria-label="Go to home"
          >
            <img
              src={instagramLogo}
              alt="Nivara Design Studio logo"
              className="h-16 w-auto object-contain"
            />
          </button>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-10">
            {SECTIONS.map((s) => (
              <li key={s}>
                <button
                  onClick={() => scrollTo(s)}
                  className={`nav-link${active === s ? " active" : ""}`}
                >
                  {s === "home" ? "Home" : s === "about" ? "About Us" : s === "portfolio" ? "Portfolio" : "Contact"}
                </button>
              </li>
            ))}
          </ul>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span
              className="block w-6 h-px transition-all duration-300"
              style={{
                background: "var(--navy)",
                transform: menuOpen ? "rotate(45deg) translate(3px, 3px)" : "none",
              }}
            />
            <span
              className="block w-6 h-px transition-all duration-300"
              style={{
                background: "var(--navy)",
                opacity: menuOpen ? 0 : 1,
              }}
            />
            <span
              className="block w-6 h-px transition-all duration-300"
              style={{
                background: "var(--navy)",
                transform: menuOpen ? "rotate(-45deg) translate(3px, -3px)" : "none",
              }}
            />
          </button>
        </nav>

        {/* Mobile menu */}
        {menuOpen && (
          <div
            className="md:hidden px-6 pb-6 flex flex-col gap-6"
            style={{ background: "rgba(255,255,255,0.97)" }}
          >
            {SECTIONS.map((s) => (
              <button
                key={s}
                onClick={() => scrollTo(s)}
                className={`nav-link text-left${active === s ? " active" : ""}`}
              >
                {s === "home" ? "Home" : s === "about" ? "About Us" : s === "portfolio" ? "Portfolio" : "Contact"}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* ══════════════════════════════
          SECTION 1 — HOME / HERO
      ══════════════════════════════ */}
      <section
        ref={(el) => { sectionRefs.current.home = el; }}
        id="home"
        className="relative flex flex-col items-center justify-center text-center bg-white overflow-hidden"
        style={{ minHeight: "100vh" }}
      >

        <div className="relative z-10 flex flex-col items-center gap-8 px-6 pt-28 pb-20">
          {/* Logo centrepiece */}
          <img
            src={logoFront}
            alt="Nivara Design Studio"
            className="w-[26rem] md:w-[38rem] lg:w-[52rem] object-contain reveal"
          />

          {/* Divider */}
          <div className="flex items-center gap-4 reveal delay-100">
            <span className="hairline" />
            <span
              className="text-xs tracking-widest uppercase font-semibold"
              style={{ color: "var(--gold)", fontFamily: "'Raleway', sans-serif" }}
            >
              Spaces That Inspire
            </span>
            <span className="hairline" />
          </div>

          <p

            className="font-display text-3xl md:text-5xl lg:text-6xl max-w-2xl leading-tight reveal delay-200"
            style={{ color: "var(--navy)" }}
          >
            Where beauty<br />
            <em>meets</em> intention.
          </p>

          <p

            className="max-w-md text-base leading-relaxed reveal delay-300"
            style={{ color: "var(--text-muted)", fontWeight: 400 }}
          >
            Thoughtful interiors crafted around the way you live — elegant, purposeful, and distinctly yours.
          </p>

          <div className="flex gap-4 flex-wrap justify-center reveal delay-400">
            <button
              onClick={() => scrollTo("portfolio")}
              className="px-8 py-3 text-xs font-semibold tracking-widest uppercase transition-all duration-300 hover:opacity-80"
              style={{
                background: "var(--navy)",
                color: "#fff",
              }}
            >
              View Portfolio
            </button>
            <button
              onClick={() => scrollTo("contact")}
              className="px-8 py-3 text-xs font-semibold tracking-widest uppercase transition-all duration-300"
              style={{
                border: "1px solid var(--navy)",
                color: "var(--navy)",
                background: "transparent",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = "var(--navy)";
                (e.currentTarget as HTMLButtonElement).style.color = "#fff";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = "transparent";
                (e.currentTarget as HTMLButtonElement).style.color = "var(--navy)";
              }}
            >
              Get in Touch
            </button>
          </div>

        </div>
      </section>

      {/* ══════════════════════════════
          SECTION 2 — ABOUT US
      ══════════════════════════════ */}
      <section
        ref={(el) => { sectionRefs.current.about = el; }}
        id="about"
        className="relative"
        style={{ minHeight: "100vh", background: "var(--cream)" }}
      >
        <div className="max-w-6xl mx-auto px-6 py-24 lg:py-32">
          {/* Section label */}
          <div className="flex items-center gap-4 mb-4 reveal">
            <span className="hairline" />
            <span className="text-xs tracking-widest uppercase font-semibold" style={{ color: "var(--gold)" }}>
              About Us
            </span>
          </div>

          {/* Two-column layout */}
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div>
              <h2 className="font-display text-4xl md:text-5xl leading-tight mb-8 reveal delay-100" style={{ color: "var(--navy)" }}>
                Designing spaces<br />
                <em>you will love</em><br />
                coming home to.
              </h2>
              <p className="text-base leading-relaxed mb-6 reveal delay-200" style={{ color: "var(--text-muted)" }}>
                Nivara Design Studio was founded on a single belief — that great design is not a luxury, it is a language. Every room tells a story, and we are here to help you tell yours with intention, elegance, and craft.
              </p>
              <p className="text-base leading-relaxed mb-10 reveal delay-300" style={{ color: "var(--text-muted)" }}>
                Led by <strong style={{ color: "var(--navy)" }}>Harshavardhan G R and Sufi Nawaz</strong>, our studio blends classical sensibility with contemporary restraint. We listen deeply, curate carefully, and deliver spaces that feel both aspirational and profoundly livable.
              </p>

            </div>

            {/* Right — image + services */}
            <div className="flex flex-col gap-8 reveal-right">
              <div
                className="relative rounded-none overflow-hidden"
                style={{ aspectRatio: "4/3" }}
              >
                <img
                  src="https://images.unsplash.com/photo-1646987916641-1f3c8992daa2?w=800&h=600&fit=crop&auto=format"
                  alt="Elegant interior by Nivara Design Studio"
                  className="w-full h-full object-cover"
                />
                {/* Gold corner accent */}
                <div
                  className="absolute top-0 left-0 w-12 h-12 pointer-events-none"
                  style={{ borderTop: "2px solid var(--gold)", borderLeft: "2px solid var(--gold)" }}
                />
                <div
                  className="absolute bottom-0 right-0 w-12 h-12 pointer-events-none"
                  style={{ borderBottom: "2px solid var(--gold)", borderRight: "2px solid var(--gold)" }}
                />
              </div>

              {/* Services grid */}
              <div className="grid grid-cols-2 gap-4">
                {services.map((svc) => (
                  <div
                    key={svc.name}
                    className="p-4 transition-all duration-300 hover:shadow-sm"
                    style={{ background: "#fff", borderLeft: "2px solid var(--gold)" }}
                  >
                    <div className="text-xs font-bold tracking-wider uppercase mb-1" style={{ color: "var(--navy)" }}>
                      {svc.name}
                    </div>
                    <div className="text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>
                      {svc.desc}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════
          SECTION 3 — PORTFOLIO
      ══════════════════════════════ */}
      <section
        ref={(el) => { sectionRefs.current.portfolio = el; }}
        id="portfolio"
        style={{ minHeight: "100vh", background: "#fff" }}
      >
        <div className="max-w-6xl mx-auto px-6 py-24 lg:py-32">
          <div className="flex items-center gap-4 mb-4 reveal">
            <span className="hairline" />
            <span className="text-xs tracking-widest uppercase font-semibold" style={{ color: "var(--gold)" }}>
              Portfolio
            </span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
            <h2 className="font-display text-4xl md:text-5xl leading-tight reveal delay-100" style={{ color: "var(--navy)" }}>
              Curated works,<br />
              <em>crafted with care.</em>
            </h2>

            {/* Filter pills */}
            <div className="flex gap-2 flex-wrap reveal delay-200">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className="px-4 py-1.5 text-xs font-semibold tracking-wider uppercase transition-all duration-200"
                  style={{
                    background: filter === cat ? "var(--navy)" : "transparent",
                    color: filter === cat ? "#fff" : "var(--navy)",
                    border: "1px solid var(--navy)",
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Masonry-style grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((item, i) => (
              <div
                key={item.id}
                className={`portfolio-card relative group cursor-pointer reveal delay-${Math.min((i % 3) * 100 + 100, 600)}`}
                style={{ aspectRatio: i % 5 === 0 ? "3/4" : "4/3" }}
              >
                <img
                  src={item.img}
                  alt={item.alt}
                  className="w-full h-full object-cover"
                />
                {/* Hover overlay */}
                <div
                  className="overlay absolute inset-0 flex flex-col justify-end p-5"
                  style={{ background: "linear-gradient(to top, rgba(28,46,69,0.85) 0%, transparent 55%)" }}
                >
                  <span
                    className="text-xs tracking-widest uppercase font-semibold mb-1"
                    style={{ color: "var(--gold-light)" }}
                  >
                    {item.category}
                  </span>
                  <span className="font-display text-lg text-white">{item.title}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════
          SECTION 4 — CONTACT / SITEMAP
      ══════════════════════════════ */}
      <section
        ref={(el) => { sectionRefs.current.contact = el; }}
        id="contact"
        style={{ minHeight: "100vh", background: "var(--navy)" }}
        className="relative overflow-hidden"
      >
        {/* Decorative peacock motif */}
        <div
          className="absolute top-0 right-0 w-80 h-80 opacity-5 pointer-events-none"
          style={{ transform: "translate(30%, -20%)" }}
        >
          <img src={logoFront} alt="" className="w-full h-full object-contain" />
        </div>

        <div className="max-w-6xl mx-auto px-6 py-24 lg:py-32 relative z-10">
          <div className="flex items-center gap-4 mb-4 reveal">
            <span className="hairline" />
            <span className="text-xs tracking-widest uppercase font-semibold" style={{ color: "var(--gold)" }}>
              Contact & Sitemap
            </span>
          </div>

          <h2 className="font-display text-4xl md:text-5xl leading-tight text-white mb-16 reveal delay-100">
            Let us design<br />
            <em>your story.</em>
          </h2>

          <div className="grid lg:grid-cols-3 gap-12 lg:gap-16">

            {/* Contact details */}
            <div className="lg:col-span-2 reveal-left delay-200">
              <h3 className="text-xs font-bold tracking-widest uppercase mb-8" style={{ color: "var(--gold)" }}>
                Get in Touch
              </h3>

              {/* Designer card */}
              <div
                className="flex flex-col gap-3 p-6 mb-8"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(200,144,58,0.3)",
                  paddingRight: "398px",
                  boxShadow: "rgba(0,0,0,0.25) 0px 4px 4px 0px",
                }}
              >
                {[
                  { icon: "📞", label: "+91 9014949327 / +91 9491366858", href: "tel:+919014949327", phone: true },
                  { icon: "🌐", label: "nivaradesignstudio.com", href: "https://nivaradesignstudio.com" },
                  { icon: "✉️", label: "info@nivaradesignstudio.com", href: "mailto:info@nivaradesignstudio.com" },
                  { icon: "📷", label: "@nivara_design_studio", href: "https://instagram.com/nivara_design_studio" },
                ].map((c) => (
                  <a
                    key={c.label}
                    href={c.href}
                    target={c.href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 transition-colors duration-200 hover:opacity-80"
                    style={{ color: "rgba(255,255,255,0.85)", textDecoration: "none" }}
                  >
                    <span>{c.icon}</span>
                    <span
                      style={{
                        fontFamily: (c as { phone?: boolean }).phone ? "'Raleway', sans-serif" : undefined,
                        fontWeight: (c as { phone?: boolean }).phone ? 500 : undefined,
                        fontSize: (c as { phone?: boolean }).phone ? "0.9rem" : "0.875rem",
                        letterSpacing: (c as { phone?: boolean }).phone ? "0.04em" : undefined,
                      }}
                    >
                      {c.label}
                    </span>
                  </a>
                ))}
              </div>

              {/* Enquiry nudge */}
              <a
                href="mailto:info@nivaradesignstudio.com"
                className="inline-flex items-center gap-3 px-8 py-3 text-xs font-semibold tracking-widest uppercase transition-all duration-300 hover:opacity-80"
                style={{ background: "var(--gold)", color: "#fff" }}
              >
                Send an Enquiry
                <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
                  <path d="M1 5h12M8 1l5 4-5 4" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>

            {/* Sitemap */}
            <div className="reveal-right delay-300">
              <h3 className="text-xs font-bold tracking-widest uppercase mb-8" style={{ color: "var(--gold)" }}>
                Sitemap
              </h3>
              <nav className="flex flex-col gap-5">
                {[
                  { label: "Home", id: "home" as Section, desc: "Hero & introduction" },
                  { label: "About Us", id: "about" as Section, desc: "Story, team & services" },
                  { label: "Portfolio", id: "portfolio" as Section, desc: "Curated project gallery" },
                  { label: "Contact", id: "contact" as Section, desc: "Reach out & connect" },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollTo(item.id)}
                    className="text-left group"
                  >
                    <div
                      className="text-sm font-semibold tracking-wide group-hover:text-white transition-colors duration-200"
                      style={{ color: "rgba(255,255,255,0.7)" }}
                    >
                      {item.label}
                    </div>
                    <div className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.35)" }}>
                      {item.desc}
                    </div>
                  </button>
                ))}
              </nav>

              <div className="mt-12 pt-8" style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}>
                <div className="text-xs mb-4" style={{ color: "rgba(255,255,255,0.35)", lineHeight: 1.7 }}>
                  Follow our journey on Instagram for daily<br />
                  design inspiration and behind-the-scenes.
                </div>
                <a
                  href="https://instagram.com/nivara_design_studio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold tracking-wider uppercase transition-colors duration-200 hover:opacity-80"
                  style={{ color: "var(--gold)", textDecoration: "none" }}
                >
                  @nivara_design_studio →
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Footer bar */}
        <div
          className="relative z-10 mt-8"
          style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
        >
          <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
            <img src={forInstagram} alt="Nivara Design Studio" className="h-12 object-contain" />
            <p className="text-xs text-center" style={{ color: "rgba(255,255,255,0.3)" }}>
              © {new Date().getFullYear()} Nivara Design Studio. All rights reserved.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
