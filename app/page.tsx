"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, Check, Code2, Mail, Menu, X } from "lucide-react";

const courses = [
  { name: "Scratch", code: "when green flag clicked", color: "gold", desc: "Create games, stories, and animations while learning the foundations of computational thinking." },
  { name: "Python I", code: "for idea in curiosity:", color: "blue", desc: "Build a strong programming foundation with variables, loops, functions, and problem solving." },
  { name: "Python II", code: "class StudentBuilder:", color: "blue", desc: "Go deeper with data structures, object-oriented design, and real-world projects." },
  { name: "Python III", code: "return build(impact)", color: "blue", desc: "Master advanced programming concepts through ambitious, collaborative applications." },
  { name: "Java I", code: "public static void main", color: "violet", desc: "Learn the fundamentals of Java through hands-on exercises and structured projects." },
  { name: "Java II", code: "extends ComputerScience", color: "violet", desc: "Practice object-oriented programming, inheritance, interfaces, and clean design." },
  { name: "Java III", code: "System.out.println", color: "violet", desc: "Tackle advanced data structures, algorithms, and interview-style challenges." },
  { name: "SAT Math Prep", code: "solve(problem, confidence)", color: "green", desc: "Build strategies and confidence for the math portion of the SAT." },
];

const testimonials = [
  ["William", "Winter Session 2022", "The instructors are super knowledgeable and friendly! We will definitely come back for the summer camp!"],
  ["Grace", "Winter Session 2022", "AICS classes are very organized and practical. Thank you for helping the next generation!"],
  ["Vani", "Winter Session 2022", "A great experience for anyone interested in computer science. The instructors are very nice, and the classes are fun!"],
  ["Albert", "Summer Session 2020", "The teachers explain everything thoroughly while allowing students to demonstrate and exercise their knowledge."],
  ["Sofia", "Summer Session 2021", "AICS gave me the confidence to keep learning and the tools to build projects I am proud of."],
  ["Ethan", "Summer Session 2022", "Every class felt welcoming. I learned a lot and met people who were just as excited about technology."],
  ["Maya", "Winter Session 2023", "The projects made computer science feel accessible, creative, and genuinely fun."],
  ["Noah", "Summer Session 2023", "I came in curious and left with a new way to think about every problem."],
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [status, setStatus] = useState("");
  const [testimonialPage, setTestimonialPage] = useState(0);
  const [raised, setRaised] = useState(3260);
  const [selectedCourse, setSelectedCourse] = useState<(typeof courses)[number] | null>(null);

  useEffect(() => {
    const timer = window.setInterval(() => setTestimonialPage((page) => (page + 1) % 2), 6000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    function handleDonorboxMessage(event: MessageEvent) {
      if (!event.origin.endsWith("donorbox.org")) return;

      const payload = typeof event.data === "string" ? (() => {
        try { return JSON.parse(event.data); } catch { return null; }
      })() : event.data;
      if (!payload || typeof payload !== "object") return;

      const eventName = String(payload.type ?? payload.event ?? payload.name ?? "").toLowerCase();
      const amount = Number(payload.amount ?? payload.donation?.amount ?? payload.data?.amount);
      if (/(donat|success|complete|thank)/.test(eventName) && Number.isFinite(amount) && amount > 0) {
        setRaised((current) => current + amount);
      }
    }

    window.addEventListener("message", handleDonorboxMessage);
    return () => window.removeEventListener("message", handleDonorboxMessage);
  }, []);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    const response = await fetch("/api/inquiry", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
    setStatus(response.ok ? "Thanks — we’ll be in touch." : "Something went wrong. Please email us directly.");
    if (response.ok) form.reset();
  }

  const navItems = [["Home", "#top"], ["Staff", "#team"], ["Our Work", "#courses"], ["Registration", "#signup"], ["Donations", "#donations"], ["Testimonials", "#testimonials"], ["Contact", "#join"]];

  return <main>
    <nav className="nav" aria-label="Primary navigation">
      <a href="#top" className="brand"><span className="brand-mark">&lt;/&gt;</span><span>Acton Institute of<br />Computer Science</span></a>
      <div className={menuOpen ? "nav-links open" : "nav-links"}>{navItems.map(([label, href]) => <a key={label} href={href} onClick={() => setMenuOpen(false)}>{label}</a>)}</div>
      <button className="menu" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation">{menuOpen ? <X /> : <Menu />}</button>
    </nav>

    <section className="hero" id="top"><div className="grid-glow" /><div className="hero-copy"><p className="eyebrow"><span className="pulse" /> SUMMER 2026 / REGISTRATION OPEN</p><h1>Learn to build.<br />Learn to create.<br /><span>Learn computer science.</span></h1><p className="hero-sub">Free computer science classes for students everywhere.</p><div className="hero-actions"><a href="#signup" className="button primary">Apply for Summer 2026 <ArrowUpRight size={18} /></a><a href="#about" className="text-link">Discover AICS <span>↓</span></a></div></div><div className="code-card"><div className="code-top"><span><i /><i /><i /></span><small>summer_2026.py</small><Code2 size={15} /></div><pre><code><span className="pink">def</span> <span className="blue">build_your_future</span>():{`\n`}  <span className="pink">for</span> idea <span className="pink">in</span> curiosity:{`\n`}    <span className="pink">if</span> idea.<span className="blue">is_bold</span>():{`\n`}      <span className="pink">return</span> <span className="green">"build it"</span>{`\n`}  <span className="pink">return</span> <span className="green">"keep learning"</span></code></pre><div className="code-status"><span><Check size={12} /> executed in 0.04s</span><span>Python 3.12</span></div></div><div className="hero-scroll">SCROLL TO EXPLORE <span>↓</span></div></section>

    <section className="stats" id="impact"><div><strong>2,000<span>+</span></strong><p>students taught</p></div><div><strong>34</strong><p>states reached</p></div><div><strong>13</strong><p>countries connected</p></div><div className="sponsor"><p>SUPPORTED BY</p><div><b>Wolfram</b><b>AOPS</b><b>replit</b></div></div></section>

    <section className="about section" id="about"><div className="section-label">01 / THE MISSION</div><div><h2>Computer Science<br /><span>Shouldn&apos;t Have Limits.</span></h2><p className="lead">AICS is a 501(c)(3) nonprofit organization committed to providing an affordable computer science education to students around the world. Through our free classes and philanthropy, we aim to address the significant inequity present in the tech industry and prepare all students for an increasingly tech-driven future.</p><a className="text-link" href="#team">Meet the team <ArrowUpRight size={16} /></a></div></section>

    <section className="team-banner" id="team"><div className="team-art"><div className="orb orb-one" /><div className="orb orb-two" /><div className="team-grid" /></div><div><p className="eyebrow">THE PEOPLE BEHIND THE PROGRAM</p><h2>Students teaching<br /><em>students.</em></h2><p>Meet the engineers, educators, and dreamers building a more equitable future for technology.</p><a href="#join" className="button outline">Meet our team <ArrowUpRight size={17} /></a></div></section>

    <section className="courses section" id="courses"><div className="section-head"><div><div className="section-label">02 / OUR WORK</div><h2>Find your <span>language.</span></h2></div><p>Live classes meet Monday through Thursday, July 13–23, 2026. Open a window and find where you want to start.</p></div><div className="course-grid">{courses.map((course) => <article className={`course-window ${course.color}`} key={course.name}><div className="window-bar"><span><i /><i /><i /></span><small>{course.name.toLowerCase().replaceAll(" ", "-")}.code</small><Code2 size={14} /></div><div className="course-body"><div><p className="course-level">OPEN COURSE</p><h3>{course.name}</h3><p>{course.desc}</p></div><code>{course.code}</code><button className="text-link course-view" type="button" onClick={() => setSelectedCourse(course)}>View course <ArrowUpRight size={15} /></button></div></article>)}</div></section>

    <section className="donate section" id="donations"><div className="donate-copy"><div className="section-label">03 / DONATIONS</div><h2>Give access.<br /><span>Multiply impact.</span></h2><p>Our present campaign is the AICS Tech Access Initiative, where we seek to help provide education programs around the world with the technological equipment they require to bolster their students&apos; education.</p><p>Track the live campaign total and make a secure gift through the Donorbox window.</p><div className="progress-label live-total"><span>${raised.toLocaleString()} raised</span><span>$15,000 goal</span></div><p className="small">In addition, we have raised close to $10,000 in charitable donations for organizations including Doctors Without Borders, Cambridge Health Alliance, Boston Racial Equity Fund, and Beth Israel Deaconess Medical Center.</p></div><div className="donorbox"><h3>Support the initiative</h3><p>Your gift equips the next generation of builders.</p><script src="https://donorbox.org/widget.js" data-paypal-express="false" /><iframe title="Donate to the AICS Tech Access Initiative" allowPaymentRequest="" frameBorder="0" height="900" name="donorbox" scrolling="no" src="https://donorbox.org/embed/technology-access-initiative" style={{ maxWidth: "500px", minWidth: "250px", maxHeight: "none" }} width="100%" /><small>Secure donation processing</small></div></section>

    <section className="testimonials section" id="testimonials"><div className="section-label">04 / TESTIMONIALS</div><h2>Proof is in the <span>process.</span></h2><div className="quote-grid">{testimonials.slice(testimonialPage * 4, testimonialPage * 4 + 4).map(([name, session, quote]) => <blockquote key={name}><div className="quote-mark">“</div><p>{quote}</p><footer><strong>{name}</strong><span>{session}</span></footer></blockquote>)}</div><div className="slide-controls" aria-label="Testimonial pages">{[0, 1].map((page) => <button key={page} className={testimonialPage === page ? "active" : ""} onClick={() => setTestimonialPage(page)} aria-label={`Show testimonial page ${page + 1}`} />)}</div></section>

    {selectedCourse && <div className="course-modal-backdrop" role="presentation" onClick={() => setSelectedCourse(null)}><section className={`course-modal ${selectedCourse.color}`} role="dialog" aria-modal="true" aria-labelledby="course-modal-title" onClick={(event) => event.stopPropagation()}><div className="window-bar"><span><i /><i /><i /></span><small>{selectedCourse.name.toLowerCase().replaceAll(" ", "-")}.code</small><button type="button" aria-label="Close course details" onClick={() => setSelectedCourse(null)}><X /></button></div><div className="course-modal-content"><p className="course-level">SUMMER 2026 / LIVE COURSE</p><h2 id="course-modal-title">{selectedCourse.name}</h2><p>{selectedCourse.desc}</p><pre><code>{selectedCourse.code}{`\n`}// Build projects. Ask questions. Ship ideas.</code></pre><p>Classes meet Monday through Thursday, July 13–23, 2026. Apply now to join the next cohort.</p><a className="button primary" href="#signup" onClick={() => setSelectedCourse(null)}>Apply for Summer 2026 <ArrowUpRight size={17} /></a></div></section></div>}

    <section className="join" id="join"><div><p className="eyebrow">OPEN CALL / 2026</p><h2>Interested in joining<br /><em>our team?</em></h2><p>Help us make computer science education more accessible. We&apos;re always looking for thoughtful teachers, builders, and believers.</p></div><form onSubmit={submit}><label>Name<input required name="name" placeholder="Your name" /></label><label>Email<input required type="email" name="email" placeholder="you@example.com" /></label><label>Message<textarea required name="message" placeholder="Tell us a little about yourself" rows={3} /></label><button className="button primary" type="submit">Send inquiry <ArrowUpRight size={17} /></button>{status && <p className="form-status">{status}</p>}</form></section>

    <footer className="footer"><div className="brand"><span className="brand-mark">&lt;/&gt;</span> AICS</div><p>A 501(c)(3) nonprofit organization.<br />Making the future more equitable, one line at a time.</p><div className="footer-links"><a href="mailto:actoninstituteofcs@gmail.com"><Mail size={16} /> actoninstituteofcs@gmail.com</a><a href="https://instagram.com" target="_blank" rel="noreferrer"><span aria-hidden="true">◎</span> Instagram</a><a href="#top">Back to top ↑</a></div><small>© 2026 Acton Institute of Computer Science</small></footer>
  </main>;
}
