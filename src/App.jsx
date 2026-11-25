import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring } from "motion/react";
import {
  ArrowDown,
  ArrowUpRight,
  Check,
  Copy,
  Mail,
  Menu,
  MessageCircle,
  Plus,
  X,
} from "lucide-react";
import portrait from "./assets/hero.jpg";
import davidGold from "./assets/david-gold.png";
import gymFlow from "./assets/gymflow.png";
import francisHomes from "./assets/francis-homes.png";

const EMAIL = "ayobami.webdev@gmail.com";
const WHATSAPP = "https://wa.me/2348165323794";

const projects = [
  {
    number: "01",
    title: "David Gold",
    category: "Creative portfolio",
    year: "2026",
    summary:
      "A confident editorial portfolio for a visual designer, brand strategist and writer, built to put craft and personality first.",
    result: "Clear positioning with an immersive, responsive visual system.",
    tools: ["React", "JavaScript", "Responsive design"],
    image: davidGold,
    url: "https://davidgold.vercel.app/",
  },
  {
    number: "02",
    title: "GymFlow",
    category: "Fitness platform",
    year: "2026",
    summary:
      "A high-energy fitness experience that helps visitors discover classes, trainers and membership options without friction.",
    result: "A bold, conversion-focused landing experience for every screen.",
    tools: ["React", "Tailwind CSS", "UI interaction"],
    image: gymFlow,
    url: "https://gymflow-khaki.vercel.app/",
  },
  {
    number: "03",
    title: "Francis Homes",
    category: "Property experience",
    year: "2026",
    summary:
      "A premium property showcase designed around aspirational imagery, useful search patterns and a calm real-estate experience.",
    result: "Luxury presentation balanced with practical property discovery.",
    tools: ["React", "CSS", "Responsive design"],
    image: francisHomes,
    url: "https://francishomes.vercel.app/",
  },
];

const expertise = [
  ["01", "Interface development", "Responsive React interfaces built with clean, reusable components."],
  ["02", "Design implementation", "Thoughtful translation of visual direction into precise, functional pages."],
  ["03", "Responsive systems", "Layouts that remain clear and intentional from mobile through wide desktop."],
  ["04", "Interaction & motion", "Purposeful transitions and feedback that guide instead of distract."],
  ["05", "Frontend foundations", "Semantic HTML, maintainable CSS and modern JavaScript as the baseline."],
  ["06", "Delivery & refinement", "Testing, polishing and shipping useful digital experiences."],
];

const skills = [
  "HTML5",
  "CSS3",
  "JavaScript (ES6+)",
  "React",
  "Tailwind CSS",
  "Responsive Web Design",
  "Git",
  "GitHub",
];

const process = [
  {
    title: "Understand the real need",
    text: "I start with the purpose, audience and constraints, then define the simplest experience that solves the right problem.",
  },
  {
    title: "Build the interface carefully",
    text: "Structure, typography, responsiveness and interaction are developed together so the final page feels cohesive on every screen.",
  },
  {
    title: "Test, refine and ship",
    text: "I check real devices, interaction states, accessibility and performance, then polish the details before delivery.",
  },
];

function Reveal({ children, className = "", delay = 0 }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 28 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.85, delay, ease: [0.2, 0.8, 0.2, 1] }}
    >
      {children}
    </motion.div>
  );
}

function LocalTime() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => {
      setTime(
        new Intl.DateTimeFormat("en-GB", {
          timeZone: "Africa/Lagos",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }).format(new Date()),
      );
    };

    update();
    const timer = window.setInterval(update, 30000);
    return () => window.clearInterval(timer);
  }, []);

  return <span>Lagos {time || "--:--"} WAT</span>;
}

function CustomCursor() {
  const cursorRef = useRef(null);
  const labelRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const label = labelRef.current;
    if (!cursor || !label || window.matchMedia("(pointer: coarse)").matches) return undefined;

    const move = (event) => {
      cursor.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
    };
    const hover = (event) => {
      const target = event.target.closest("[data-cursor]");
      cursor.classList.toggle("is-active", Boolean(target));
      label.textContent = target?.dataset.cursor || "";
    };

    window.addEventListener("mousemove", move);
    document.addEventListener("mouseover", hover);
    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", hover);
    };
  }, []);

  return (
    <div className="custom-cursor" ref={cursorRef} aria-hidden="true">
      <span ref={labelRef} />
    </div>
  );
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navItems = [
    ["01", "Work", "#work"],
    ["02", "Expertise", "#expertise"],
    ["03", "Process", "#process"],
    ["04", "About", "#about"],
    ["05", "Contact", "#contact"],
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header className={`site-header ${scrolled || menuOpen ? "is-scrolled" : ""}`}>
      <div className="container-wide header-inner">
        <a className="brand" href="#home" aria-label="Joseph Ayobami Olaoye, home">
          <span className="brand-mark">JA</span>
          <span className="brand-name">Joseph Ayobami Olaoye</span>
          <sup>®</sup>
        </a>

        <nav className="desktop-nav" aria-label="Primary navigation">
          {navItems.map(([number, label, href]) => (
            <a href={href} key={href}>
              <span>{number}</span> {label}
            </a>
          ))}
        </nav>

        <div className="header-actions">
          <div className="local-time"><i /><LocalTime /></div>
          <a className="button button-primary header-cta" href={WHATSAPP} target="_blank" rel="noreferrer">
            Start a project <ArrowUpRight size={14} />
          </a>
          <button
            className="menu-toggle"
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            className="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <nav aria-label="Mobile navigation">
              {navItems.map(([number, label, href], index) => (
                <motion.a
                  href={href}
                  key={href}
                  onClick={() => setMenuOpen(false)}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.045 }}
                >
                  <span>{number}</span>{label}<ArrowUpRight />
                </motion.a>
              ))}
            </nav>
            <div className="mobile-menu-bottom">
              <a className="button button-primary" href={WHATSAPP} target="_blank" rel="noreferrer">Start a project <ArrowUpRight /></a>
              <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
              <p><LocalTime /> · Available for work</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function App() {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 130, damping: 30, restDelta: 0.001 });
  const [activeProcess, setActiveProcess] = useState(0);
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    await navigator.clipboard.writeText(EMAIL);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  const heroMotion = (delay) => ({
    initial: reduceMotion ? false : { y: "115%", opacity: 0 },
    animate: reduceMotion ? undefined : { y: 0, opacity: 1 },
    transition: { duration: 1.05, delay, ease: [0.16, 1, 0.3, 1] },
  });

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <motion.div className="scroll-progress" style={{ scaleX: progress }} />
      <div className="grain" aria-hidden="true" />
      <CustomCursor />
      <Header />

      <main id="main">
        <section className="hero" id="home">
          <div className="container-wide">
            <div className="hero-meta label">
              <span>(Portfolio 2026)</span>
              <span className="status"><i /> Available for work</span>
            </div>

            <div className="hero-grid">
              <div className="hero-copy">
                <div className="hero-intro">
                  <span className="label-accent">(01)</span>
                  <p>Frontend developer building useful, responsive experiences from Lagos, Nigeria.</p>
                </div>

                <h1 className="display-hero" aria-label="Frontend developer">
                  <span className="line-mask"><motion.span {...heroMotion(0.08)}>Frontend</motion.span></span>
                  <span className="line-mask outline"><motion.span {...heroMotion(0.18)}>developer</motion.span></span>
                </h1>

                <motion.p className="hero-specialties" {...heroMotion(0.28)}>
                  <i /> Building digital experiences with purpose and precision.
                </motion.p>
                <motion.p className="hero-lede" {...heroMotion(0.36)}>
                  I'm a frontend developer passionate about building modern, responsive and user-friendly digital experiences. I enjoy transforming ideas and designs into functional websites through clean code, thoughtful design and attention to detail.
                </motion.p>

                <motion.div className="hero-buttons" {...heroMotion(0.44)}>
                  <a className="button button-primary" href="#work">See selected work <ArrowUpRight /></a>
                  <a className="text-link" href={WHATSAPP} target="_blank" rel="noreferrer">Start a project <ArrowUpRight /></a>
                </motion.div>

                <motion.dl className="hero-details" {...heroMotion(0.5)}>
                  <div><dt>Based in</dt><dd>Lagos, Nigeria</dd></div>
                  <div><dt>Working with</dt><dd>Clients & teams</dd></div>
                  <div><dt>Status</dt><dd>Open to remote</dd></div>
                </motion.dl>
              </div>

              <motion.div
                className="portrait-column"
                initial={reduceMotion ? false : { opacity: 0, x: 42 }}
                animate={reduceMotion ? undefined : { opacity: 1, x: 0 }}
                transition={{ duration: 1.1, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="portrait-backdrop" />
                <figure className="portrait-frame" data-cursor="HELLO">
                  <img src={portrait} alt="Joseph Ayobami Olaoye, Frontend Developer" fetchPriority="high" />
                  <figcaption>
                    <strong>Joseph Ayobami Olaoye</strong>
                    <span>Lagos, Nigeria · GMT+1</span>
                  </figcaption>
                </figure>
                <span className="portrait-note">that's me</span>
                <div className="availability-card"><span>Currently</span><strong>Open for work</strong></div>
              </motion.div>
            </div>
          </div>

          <div className="ticker" aria-label="Technology toolkit">
            <div className="ticker-track">
              {[...skills, ...skills].map((skill, index) => <span key={`${skill}-${index}`}>{skill}<i /></span>)}
            </div>
          </div>
        </section>

        <section className="short-version section-small">
          <div className="container-wide split-grid">
            <Reveal className="section-index"><span className="label-accent">(02)</span><p className="label">The short version</p></Reveal>
            <div>
              <Reveal><h2 className="statement">I build the interface people see, then make every interaction feel clear, useful and intentional.</h2></Reveal>
              <div className="two-columns copy-columns">
                <Reveal delay={0.08}><p>I'm a frontend developer passionate about building modern, responsive and user-friendly digital experiences.</p></Reveal>
                <Reveal delay={0.15}><p>I enjoy transforming ideas and designs into functional websites through clean code, thoughtful design and attention to detail.</p></Reveal>
              </div>
            </div>
          </div>
        </section>

        <section className="work section-pad" id="work">
          <div className="container-wide">
            <div className="section-heading work-heading">
              <Reveal><p className="eyebrow"><span className="label-accent">(03)</span> Selected work</p><h2 className="display-2">Work that shipped.</h2></Reveal>
              <Reveal delay={0.1}><p>Three live products shaped around distinct audiences, goals and visual systems.</p><a className="text-link" href="#contact">Start something new <ArrowUpRight /></a></Reveal>
            </div>

            <div className="project-list">
              {projects.map((project, index) => (
                <article className={`project ${index % 2 ? "project-reverse" : ""}`} key={project.title}>
                  <Reveal className="project-copy">
                    <div className="project-meta label"><span>{project.number}</span><span>{project.category}</span><span>{project.year}</span></div>
                    <h3>{project.title}</h3>
                    <p className="project-summary">{project.summary}</p>
                    <ul>{project.tools.map((tool) => <li key={tool}>{tool}</li>)}</ul>
                    <div className="project-result"><span className="label">Result</span><p>{project.result}</p></div>
                    <a className="text-link" href={project.url} target="_blank" rel="noreferrer">Visit live site <ArrowUpRight /></a>
                  </Reveal>
                  <Reveal className="project-visual" delay={0.08}>
                    <a href={project.url} target="_blank" rel="noreferrer" data-cursor="VIEW">
                      <span className="project-number">{project.number}</span>
                      <div className="browser-bar"><i /><i /><i /><span>{project.url.replace("https://", "")}</span></div>
                      <img src={project.image} alt={`${project.title} website homepage`} loading="lazy" />
                      <div className="project-visual-caption"><span>{project.title}</span><ArrowUpRight /></div>
                    </a>
                  </Reveal>
                </article>
              ))}
            </div>
            <Reveal className="work-note"><span className="label">Public selection</span><p>Every project above is live. Open each site to explore the complete responsive experience.</p></Reveal>
          </div>
        </section>

        <section className="about dark-section section-pad" id="about">
          <div className="container-wide split-grid">
            <Reveal className="section-index"><span className="label-light">(04)</span><p className="label">About</p></Reveal>
            <div>
              <Reveal><p className="location-mark"><i /> Lagos, Nigeria</p><h2 className="display-2">The design people see.<br />The code that makes it work.</h2></Reveal>
              <div className="about-body">
                <p className="hand-note">purpose before decoration</p>
                <div className="two-columns copy-columns">
                  <Reveal delay={0.08}><p>I care about the complete experience: a clear visual hierarchy, responsive behavior and interactions that support what the user came to do.</p></Reveal>
                  <Reveal delay={0.15}><p>My work combines design awareness with frontend craft, turning an idea into a polished interface that is useful, maintainable and ready to ship.</p></Reveal>
                </div>
              </div>
              <Reveal className="metrics">
                <div><strong>03</strong><span>Live featured projects</span></div>
                <div><strong>08</strong><span>Core tools & skills</span></div>
                <div><strong>100%</strong><span>Responsive by default</span></div>
              </Reveal>
            </div>
          </div>
        </section>

        <section className="expertise section-pad" id="expertise">
          <div className="container-wide split-grid expertise-grid">
            <Reveal className="sticky-heading">
              <p className="eyebrow"><span className="label-accent">(05)</span> Expertise</p>
              <h2 className="display-3">What I actually do.</h2>
            </Reveal>
            <div>
              <div className="expertise-list">
                {expertise.map(([number, title, description], index) => (
                  <Reveal className="expertise-row" delay={index * 0.035} key={title}>
                    <span>{number}</span><h3>{title}</h3><p>{description}</p><ArrowDown />
                  </Reveal>
                ))}
              </div>
              <Reveal className="toolkit">
                <p className="label">Tools I work with</p>
                <div>{skills.map((skill) => <span key={skill}>{skill}</span>)}</div>
              </Reveal>
            </div>
          </div>
        </section>

        <section className="process section-pad" id="process">
          <div className="container-wide split-grid expertise-grid">
            <Reveal className="sticky-heading">
              <p className="eyebrow"><span className="label-accent">(06)</span> Process</p>
              <h2 className="display-3">How the work gets made.</h2>
            </Reveal>
            <div className="accordion">
              {process.map((item, index) => {
                const active = activeProcess === index;
                return (
                  <Reveal key={item.title} delay={index * 0.05}>
                    <div className={`accordion-item ${active ? "is-open" : ""}`}>
                      <button type="button" onClick={() => setActiveProcess(active ? -1 : index)} aria-expanded={active}>
                        <span>0{index + 1}</span><h3>{item.title}</h3><i><Plus /></i>
                      </button>
                      <div className="accordion-content"><div><p>{item.text}</p></div></div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        <section className="track-record section-pad">
          <div className="container-wide">
            <Reveal><p className="eyebrow"><span className="label-accent">(07)</span> Track record</p><h2 className="display-2">Where I've applied it.</h2></Reveal>
            <div className="timeline">
              <Reveal className="timeline-row"><span className="label">Selected work</span><h3>Frontend Developer</h3><p>David Gold · GymFlow · Francis Homes</p><span>Live projects</span></Reveal>
              <Reveal className="timeline-row" delay={0.08}><span className="label">Ongoing</span><h3>Modern frontend practice</h3><p>Responsive systems · UI development · Interaction</p><span>Continuous growth</span></Reveal>
            </div>
          </div>
        </section>

        <section className="contact-cta" id="contact">
          <div className="container-wide">
            <Reveal><p className="eyebrow"><span>(08)</span> Let's work together</p><h2>Have an idea?<br />Let's make it real.</h2></Reveal>
            <Reveal className="contact-actions" delay={0.1}>
              <p>Available for selected frontend projects, collaborations and remote opportunities.</p>
              <div>
                <a className="button button-dark" href={WHATSAPP} target="_blank" rel="noreferrer"><MessageCircle /> Start a conversation <ArrowUpRight /></a>
                <a className="button button-ghost" href={`mailto:${EMAIL}`}><Mail /> Email me</a>
              </div>
              <dl><div><dt>Based in</dt><dd>Lagos, Nigeria</dd></div><div><dt>Reply time</dt><dd>Within 24 hours</dd></div></dl>
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container-wide">
          <div className="footer-lead">
            <p className="eyebrow"><span>(Next)</span> Get in touch</p>
            <h2>Let's build something<br />worth using.</h2>
            <div className="footer-contact-row">
              <a href={`mailto:${EMAIL}`}>{EMAIL} <ArrowUpRight /></a>
              <button type="button" onClick={copyEmail}>{copied ? <Check /> : <Copy />} {copied ? "Copied" : "Copy email"}</button>
            </div>
          </div>

          <div className="footer-grid">
            <div><a className="brand footer-brand" href="#home"><span className="brand-mark">JA</span><span className="brand-name">Joseph Olaoye</span></a><p>Frontend developer building modern digital experiences with purpose and precision.</p></div>
            <div><p className="label">Navigate</p><a href="#work">Selected work</a><a href="#expertise">Expertise</a><a href="#process">Process</a><a href="#about">About</a></div>
            <div><p className="label">Connect</p><a href={`mailto:${EMAIL}`}>Email <ArrowUpRight /></a><a href={WHATSAPP} target="_blank" rel="noreferrer">WhatsApp <ArrowUpRight /></a></div>
            <div><p className="label">Availability</p><p className="available"><i /> Open for work</p><p>Lagos, Nigeria</p><p><LocalTime /></p></div>
          </div>

          <div className="footer-bottom"><span>© 2026 Joseph Ayobami Olaoye</span><span>Built with React, care & clean code</span></div>
          <p className="footer-wordmark" aria-hidden="true">Joseph Olaoye</p>
        </div>
      </footer>
    </>
  );
}

export default App;
