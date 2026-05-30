import { useState, useEffect } from "react";

// ── initial scores ────────────────────────────────────────────────
const INITIAL_SCORES = [
  { id: 1, player: "Alice",  score: 12400, time: "4:32", date: "2025-04-10" },
  { id: 2, player: "Bob",    score: 11850, time: "5:10", date: "2025-04-09" },
  { id: 3, player: "Carol",  score: 10300, time: "6:05", date: "2025-04-08" },
  { id: 4, player: "David",  score:  9750, time: "7:20", date: "2025-04-07" },
  { id: 5, player: "Eva",    score:  8900, time: "8:45", date: "2025-04-06" },
];

// ── CSS ──────────────────────────────────────────────────────────
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700;900&family=Lato:ital,wght@0,300;0,400;0,700;1,300&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --green-deep:   #0d2e1c;
    --green-felt:   #195c36;
    --green-mid:    #2d4a3e;
    --green-light:  #3a7d52;
    --olive:        #4c560b;
    --olive-light:  #6b7a10;
    --gold:         #c9a84c;
    --gold-light:   #e2c97e;
    --cream:        #f5f0e8;
    --white:        #ffffff;
    --card-bg:      rgba(255,255,255,0.05);
    --border:       rgba(201,168,76,0.3);
    --shadow:       0 8px 32px rgba(0,0,0,0.4);
    --radius:       12px;
    --font-display: 'Cinzel', serif;
    --font-body:    'Lato', sans-serif;
    --transition:   0.3s cubic-bezier(0.4,0,0.2,1);
  }

  html { scroll-behavior: smooth; }

  body {
    font-family: var(--font-body);
    background: var(--green-deep);
    color: var(--white);
    min-height: 100vh;
    overflow-x: hidden;
  }

  /* ── SCROLLBAR ── */
  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: var(--green-deep); }
  ::-webkit-scrollbar-thumb { background: var(--olive); border-radius: 3px; }

  /* ── NAV ── */
  .nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 1000;
    display: flex; justify-content: space-between; align-items: center;
    padding: 0 5%;
    height: 72px;
    background: rgba(13,46,28,0.92);
    backdrop-filter: blur(16px);
    border-bottom: 1px solid var(--border);
    transition: var(--transition);
  }
  .nav-logo {
    display: flex; align-items: center; gap: 10px;
    font-family: var(--font-display);
    font-size: 1.4rem; font-weight: 700;
    color: var(--gold);
    text-decoration: none;
    cursor: pointer;
    letter-spacing: 0.05em;
  }
  .nav-logo img { width: 36px; height: 36px; object-fit: contain; }
  .nav-links { display: flex; gap: 8px; align-items: center; }
  .nav-links button {
    background: none; border: none; cursor: pointer;
    font-family: var(--font-body); font-size: 0.92rem; font-weight: 400;
    color: rgba(255,255,255,0.75);
    padding: 8px 16px; border-radius: 6px;
    transition: var(--transition);
    letter-spacing: 0.03em;
  }
  .nav-links button:hover, .nav-links button.active {
    color: var(--gold); background: rgba(201,168,76,0.1);
  }
  .nav-links button.active { font-weight: 700; }

  /* hamburger */
  .hamburger {
    display: none; flex-direction: column; gap: 5px;
    background: none; border: none; cursor: pointer; padding: 6px;
  }
  .hamburger span {
    display: block; width: 24px; height: 2px;
    background: var(--gold); border-radius: 2px; transition: var(--transition);
  }
  .mobile-menu {
    display: none; position: fixed; top: 72px; left: 0; right: 0; z-index: 999;
    background: rgba(13,46,28,0.97);
    backdrop-filter: blur(16px);
    border-bottom: 1px solid var(--border);
    padding: 16px 5%;
    flex-direction: column; gap: 8px;
  }
  .mobile-menu.open { display: flex; }
  .mobile-menu button {
    background: none; border: none; cursor: pointer;
    font-family: var(--font-body); font-size: 1rem;
    color: rgba(255,255,255,0.8); text-align: left;
    padding: 12px 0; border-bottom: 1px solid var(--border);
    transition: var(--transition);
  }
  .mobile-menu button:last-child { border-bottom: none; }
  .mobile-menu button:hover, .mobile-menu button.active { color: var(--gold); }

  .hero-placeholder,
  .visual-placeholder,
  .download-card {
    display: flex; align-items: center; justify-content: center;
    min-height: 220px; border-radius: 24px;
    background: rgba(255,255,255,0.08);
    border: 1px solid rgba(255,255,255,0.08);
    color: rgba(255,255,255,0.75); text-transform: uppercase;
    letter-spacing: 0.08em; font-size: 0.95rem;
  }
  .hero-placeholder { width: min(460px, 90vw); min-height: 320px; padding: 24px; }
  .download-card { width: 220px; min-height: 260px; }
  .phone-card { width: 180px; }
  .about-visual { padding: 40px; display: flex; justify-content: center; align-items: center; }
  .store-icon {
    display: inline-flex; align-items: center; justify-content: center;
    min-width: 52px; height: 38px; border-radius: 12px;
    background: rgba(255,255,255,0.08); color: var(--white);
    font-size: 0.8rem; font-weight: 700; letter-spacing: 0.08em;
  }
  .contact-card-icon {
    width: 56px; height: 56px; display: flex; align-items: center; justify-content: center;
    border-radius: 12px; background: rgba(201,168,76,0.12);
    color: var(--gold); font-size: 0.8rem; font-weight: 700; text-transform: uppercase;
    letter-spacing: 0.06em;
  }

  @media (max-width: 768px) {
    .nav-links { display: none; }
    .hamburger { display: flex; }
  }

  /* ── PAGE WRAPPER ── */
  .page { min-height: 100vh; padding-top: 72px; }

  /* ── HERO ── */
  .hero {
    position: relative; min-height: calc(100vh - 72px);
    display: flex; align-items: center;
    background: linear-gradient(135deg, var(--green-deep) 0%, var(--green-felt) 60%, var(--green-mid) 100%);
    overflow: hidden; padding: 60px 5%;
  }
  .hero::before {
    content: ''; position: absolute; inset: 0;
    background: radial-gradient(ellipse 70% 60% at 70% 50%, rgba(25,92,54,0.6) 0%, transparent 70%);
    pointer-events: none;
  }
  .hero-pattern {
    position: absolute; inset: 0; opacity: 0.03;
    background-image: repeating-linear-gradient(45deg,#fff 0,#fff 1px,transparent 0,transparent 50%);
    background-size: 20px 20px;
    pointer-events: none;
  }
  .hero-content { position: relative; z-index: 1; flex: 1; max-width: 560px; }
  .hero-badge {
    display: inline-flex; align-items: center; gap: 8px;
    font-size: 0.78rem; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase;
    color: var(--gold); background: rgba(201,168,76,0.12);
    border: 1px solid var(--border); border-radius: 100px;
    padding: 6px 16px; margin-bottom: 28px;
  }
  .hero-badge::before { content: ''; }
  .hero h1 {
    font-family: var(--font-display);
    font-size: clamp(2.4rem,5vw,4rem); font-weight: 900; line-height: 1.1;
    color: var(--white); margin-bottom: 24px; letter-spacing: -0.01em;
  }
  .hero h1 span { color: var(--gold); }
  .hero p {
    font-size: 1.05rem; line-height: 1.7; color: rgba(255,255,255,0.72);
    margin-bottom: 40px; font-weight: 300;
  }
  .hero-cta { display: flex; gap: 16px; flex-wrap: wrap; }
  .btn-primary {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 14px 32px; border-radius: 8px; font-size: 0.95rem; font-weight: 700;
    font-family: var(--font-body); cursor: pointer; text-decoration: none; border: none;
    background: linear-gradient(135deg, var(--gold) 0%, var(--gold-light) 100%);
    color: var(--green-deep); transition: var(--transition);
    box-shadow: 0 4px 20px rgba(201,168,76,0.35);
  }
  .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 28px rgba(201,168,76,0.5); }
  .btn-secondary {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 14px 32px; border-radius: 8px; font-size: 0.95rem; font-weight: 700;
    font-family: var(--font-body); cursor: pointer; text-decoration: none;
    background: transparent; color: var(--white);
    border: 1px solid rgba(255,255,255,0.3); transition: var(--transition);
  }
  .btn-secondary:hover { border-color: var(--gold); color: var(--gold); transform: translateY(-2px); }
  .hero-image {
    position: relative; flex: 1; display: flex; justify-content: flex-end; align-items: center;
  }
  .hero-image img {
    width: min(460px, 90vw); filter: drop-shadow(0 20px 60px rgba(0,0,0,0.6));
    animation: float 6s ease-in-out infinite;
  }
  @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-14px)} }

  @media (max-width: 900px) {
    .hero { flex-direction: column; text-align: center; padding: 60px 5% 40px; }
    .hero-cta { justify-content: center; }
    .hero-image { margin-top: 40px; justify-content: center; }
  }

  /* ── SECTION SHARED ── */
  .section { padding: 100px 5%; }
  .section-label {
    display: inline-block; font-size: 0.75rem; font-weight: 700; letter-spacing: 0.14em;
    text-transform: uppercase; color: var(--gold); margin-bottom: 16px;
  }
  .section-title {
    font-family: var(--font-display); font-size: clamp(1.8rem,3.5vw,2.8rem);
    font-weight: 700; color: var(--white); margin-bottom: 20px; line-height: 1.2;
  }
  .section-sub {
    font-size: 1rem; line-height: 1.75; color: rgba(255,255,255,0.65);
    max-width: 600px; font-weight: 300;
  }
  .divider {
    width: 60px; height: 3px;
    background: linear-gradient(90deg, var(--gold), transparent);
    margin: 20px 0 40px;
  }

  /* ── SCORES TABLE ── */
  .scores-section {
    background: var(--green-mid);
    padding: 80px 5%;
  }
  .scores-header { display: flex; justify-content: space-between; align-items: flex-end; flex-wrap: wrap; gap: 20px; margin-bottom: 40px; }
  .scores-table-wrap { overflow-x: auto; border-radius: var(--radius); }
  .scores-table {
    width: 100%; border-collapse: collapse; min-width: 560px;
    background: var(--card-bg); border-radius: var(--radius); overflow: hidden;
  }
  .scores-table thead tr {
    background: linear-gradient(135deg, var(--olive) 0%, var(--olive-light) 100%);
  }
  .scores-table th {
    padding: 16px 20px; text-align: center;
    font-family: var(--font-display); font-size: 0.8rem; font-weight: 600;
    letter-spacing: 0.1em; text-transform: uppercase; color: var(--white);
  }
  .scores-table td {
    padding: 14px 20px; text-align: center; font-size: 0.95rem;
    border-bottom: 1px solid rgba(255,255,255,0.06); color: rgba(255,255,255,0.85);
  }
  .scores-table tbody tr { transition: var(--transition); }
  .scores-table tbody tr:hover { background: rgba(255,255,255,0.07); }
  .scores-table tbody tr:last-child td { border-bottom: none; }
  .rank-1 { color: #ffd700 !important; font-weight: 700; font-size: 1.1rem !important; }
  .rank-2 { color: #c0c0c0 !important; font-weight: 700; font-size: 1.1rem !important; }
  .rank-3 { color: #cd7f32 !important; font-weight: 700; font-size: 1.1rem !important; }
  .score-val { font-weight: 700; color: var(--gold) !important; }

  /* add score form */
  .add-score-inline {
    background: rgba(255,255,255,0.04); border: 1px solid var(--border);
    border-radius: var(--radius); padding: 32px;
    max-width: 480px; margin: 40px auto 0;
  }
  .add-score-inline h3 {
    font-family: var(--font-display); font-size: 1.1rem; color: var(--gold);
    margin-bottom: 20px; text-align: center;
  }
  .form-row { display: flex; gap: 12px; flex-wrap: wrap; }
  .form-group { flex: 1; min-width: 140px; display: flex; flex-direction: column; gap: 6px; }
  .form-group label { font-size: 0.78rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: rgba(255,255,255,0.6); }
  .form-group input {
    padding: 11px 14px; border-radius: 8px; border: 1px solid var(--border);
    background: rgba(255,255,255,0.06); color: var(--white);
    font-family: var(--font-body); font-size: 0.95rem; outline: none;
    transition: var(--transition);
  }
  .form-group input:focus { border-color: var(--gold); background: rgba(201,168,76,0.06); }
  .form-group input::placeholder { color: rgba(255,255,255,0.3); }
  .form-submit {
    width: 100%; margin-top: 16px;
    padding: 13px; border-radius: 8px; border: none; cursor: pointer;
    background: linear-gradient(135deg, var(--olive) 0%, var(--olive-light) 100%);
    color: var(--white); font-family: var(--font-display);
    font-size: 0.9rem; font-weight: 600; letter-spacing: 0.05em;
    transition: var(--transition);
  }
  .form-submit:hover { transform: translateY(-1px); box-shadow: 0 6px 20px rgba(76,86,11,0.5); }
  .form-msg { text-align: center; margin-top: 12px; font-size: 0.9rem; color: var(--gold); min-height: 22px; }

  /* ── FEATURES ── */
  .features-grid {
    display: grid; grid-template-columns: repeat(auto-fit, minmax(260px,1fr)); gap: 24px;
    margin-top: 56px;
  }
  .feature-card {
    background: var(--card-bg); border: 1px solid var(--border);
    border-radius: var(--radius); padding: 36px 28px;
    transition: var(--transition); cursor: default;
    position: relative; overflow: hidden;
  }
  .feature-card::before {
    content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px;
    background: linear-gradient(90deg, var(--gold), var(--olive-light));
    opacity: 0; transition: var(--transition);
  }
  .feature-card:hover { transform: translateY(-6px); box-shadow: var(--shadow); border-color: rgba(201,168,76,0.4); }
  .feature-card:hover::before { opacity: 1; }
  .feature-icon {
    width: 52px; height: 52px; border-radius: 12px;
    background: rgba(201,168,76,0.12); border: 1px solid var(--border);
    display: flex; align-items: center; justify-content: center;
    font-size: 1.5rem; margin-bottom: 20px;
  }
  .feature-card h3 {
    font-family: var(--font-display); font-size: 1.1rem; font-weight: 600;
    color: var(--white); margin-bottom: 12px;
  }
  .feature-card p { font-size: 0.92rem; line-height: 1.7; color: rgba(255,255,255,0.62); font-weight: 300; }

  /* ── DOWNLOAD ── */
  .download-section {
    background: linear-gradient(135deg, var(--green-felt) 0%, var(--green-deep) 100%);
    padding: 100px 5%; position: relative; overflow: hidden;
  }
  .download-section::after {
    content: 'Solitaire'; position: absolute; right: 5%; top: 50%;
    transform: translateY(-50%) rotate(-15deg);
    font-size: 4rem; color: rgba(201,168,76,0.06); letter-spacing: 12px;
    pointer-events: none; white-space: nowrap;
  }
  .download-inner { display: flex; gap: 80px; align-items: center; flex-wrap: wrap; }
  .download-content { flex: 1; min-width: 280px; }
  .download-buttons { display: flex; gap: 16px; flex-wrap: wrap; margin-top: 36px; }
  .store-btn {
    display: flex; align-items: center; gap: 14px;
    padding: 14px 28px; border-radius: 10px;
    background: rgba(255,255,255,0.06); border: 1px solid var(--border);
    text-decoration: none; color: var(--white); transition: var(--transition);
    min-width: 200px;
  }
  .store-btn:hover { background: rgba(201,168,76,0.12); border-color: var(--gold); transform: translateY(-3px); }
  .store-btn .store-icon { font-size: 2rem; }
  .store-btn .store-text small { display: block; font-size: 0.7rem; opacity: 0.7; letter-spacing: 0.05em; text-transform: uppercase; }
  .store-btn .store-text strong { font-size: 1rem; font-family: var(--font-display); font-weight: 600; }
  .download-images { display: flex; align-items: flex-end; gap: 20px; flex-wrap: wrap; justify-content: center; }
  .download-images img { max-width: 200px; filter: drop-shadow(0 20px 40px rgba(0,0,0,0.5)); }
  .phone-img-dl { transform: perspective(800px) rotateY(-10deg) rotateX(3deg); }

  /* ── ABOUT ── */
  .about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center; }
  .about-visual {
    position: relative; display: flex; justify-content: center;
    background: rgba(255,255,255,0.03); border: 1px solid var(--border);
    border-radius: 20px; padding: 40px;
  }
  .about-visual img { max-width: 100%; max-height: 320px; object-fit: contain; }
  .about-stats { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-top: 40px; }
  .stat-box {
    background: var(--card-bg); border: 1px solid var(--border);
    border-radius: var(--radius); padding: 20px 16px; text-align: center;
  }
  .stat-box .stat-num { font-family: var(--font-display); font-size: 1.8rem; font-weight: 700; color: var(--gold); }
  .stat-box .stat-lbl { font-size: 0.78rem; color: rgba(255,255,255,0.55); margin-top: 4px; letter-spacing: 0.05em; }
  .about-text p { margin-bottom: 18px; font-size: 1rem; line-height: 1.8; color: rgba(255,255,255,0.72); font-weight: 300; }
  .about-list { list-style: none; margin: 24px 0; display: flex; flex-direction: column; gap: 10px; }
  .about-list li {
    display: flex; align-items: center; gap: 12px;
    font-size: 0.95rem; color: rgba(255,255,255,0.8);
  }
  .about-list li::before {
    content: '';
    width: 6px; height: 6px;
    background: var(--gold);
    border-radius: 50%;
    flex-shrink: 0;
  }
  @media (max-width: 900px) {
    .about-grid { grid-template-columns: 1fr; gap: 40px; }
  }

  /* ── CONTACT ── */
  .contact-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: start; }
  .contact-info { display: flex; flex-direction: column; gap: 24px; }
  .contact-card {
    display: flex; align-items: center; gap: 16px;
    background: var(--card-bg); border: 1px solid var(--border);
    border-radius: var(--radius); padding: 20px 24px;
    transition: var(--transition);
  }
  .contact-card:hover { border-color: rgba(201,168,76,0.5); transform: translateX(6px); }
  .contact-card-icon {
    width: 44px; height: 44px; border-radius: 10px;
    background: rgba(201,168,76,0.12); display: flex; align-items: center; justify-content: center;
  }
  .contact-card-icon img { width: 22px; height: 22px; object-fit: contain; filter: brightness(0) invert(1); }
  .contact-card-body small { font-size: 0.75rem; color: rgba(255,255,255,0.45); letter-spacing: 0.06em; text-transform: uppercase; display: block; margin-bottom: 2px; }
  .contact-card-body a, .contact-card-body span { color: var(--white); text-decoration: none; font-weight: 400; font-size: 0.95rem; }
  .contact-card-body a:hover { color: var(--gold); }
  .contact-form {
    background: var(--card-bg); border: 1px solid var(--border);
    border-radius: var(--radius); padding: 36px;
  }
  .contact-form h3 { font-family: var(--font-display); font-size: 1.2rem; color: var(--gold); margin-bottom: 24px; }
  .cf-group { display: flex; flex-direction: column; gap: 6px; margin-bottom: 16px; }
  .cf-group label { font-size: 0.78rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: rgba(255,255,255,0.55); }
  .cf-group input, .cf-group textarea {
    padding: 11px 14px; border-radius: 8px; border: 1px solid var(--border);
    background: rgba(255,255,255,0.05); color: var(--white);
    font-family: var(--font-body); font-size: 0.95rem; outline: none;
    transition: var(--transition); resize: none;
  }
  .cf-group input:focus, .cf-group textarea:focus { border-color: var(--gold); background: rgba(201,168,76,0.06); }
  .cf-group input::placeholder, .cf-group textarea::placeholder { color: rgba(255,255,255,0.25); }
  .field-error {
    color: #f2c96d; display: block; margin-top: 6px; font-size: 0.85rem;
  }
  .contact-sent { color: var(--gold); text-align: center; margin-top: 10px; font-size: 0.9rem; min-height: 20px; }
  @media (max-width: 900px) {
    .contact-grid { grid-template-columns: 1fr; }
  }

  /* ── FOOTER ── */
  footer {
    background: var(--green-deep); border-top: 1px solid var(--border);
    padding: 40px 5%; text-align: center;
  }
  footer .footer-logo {
    font-family: var(--font-display); font-size: 1.2rem; color: var(--gold);
    margin-bottom: 16px;
  }
  footer p { font-size: 0.85rem; color: rgba(255,255,255,0.4); }
  footer a { color: rgba(255,255,255,0.5); text-decoration: none; }
  footer a:hover { color: var(--gold); }

  /* ── TOAST ── */
  .toast {
    position: fixed; bottom: 32px; right: 32px; z-index: 9999;
    background: var(--olive); color: var(--white);
    padding: 14px 24px; border-radius: 10px;
    font-size: 0.9rem; font-weight: 600;
    box-shadow: 0 8px 28px rgba(0,0,0,0.4);
    animation: slideIn 0.3s ease;
  }
  @keyframes slideIn { from{transform:translateY(20px);opacity:0} to{transform:translateY(0);opacity:1} }

  /* ── PAGE TRANSITIONS ── */
  .page-enter { animation: pageIn 0.35s ease; }
  @keyframes pageIn { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
`;

// Inject CSS
function StyleInject() {
  return <style>{CSS}</style>;
}

// ── NAV ─────────────────────────────────────────────────────────
function Nav({ page, setPage }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const links = ["Home","About","Features","Contact"];

  const go = (p) => { setPage(p); setMenuOpen(false); };

  return (
    <>
      <nav className="nav">
        <div className="nav-logo" onClick={() => go("Home") }>
          Solitaire Classic
        </div>
        <div className="nav-links">
          {links.map(l => (
            <button key={l} className={page===l?"active":""} onClick={()=>go(l)}>{l}</button>
          ))}
        </div>
        <button className="hamburger" onClick={()=>setMenuOpen(o=>!o)} aria-label="Menu">
          <span/><span/><span/>
        </button>
      </nav>
      <div className={`mobile-menu${menuOpen?" open":""}`}>
        {links.map(l => (
          <button key={l} className={page===l?"active":""} onClick={()=>go(l)}>{l}</button>
        ))}
      </div>
    </>
  );
}

// ── HOME ─────────────────────────────────────────────────────────
function HomePage({ setPage, scores, setScores }) {
  const [form, setForm] = useState({ player: "", score: "", time: "", date: "" });
  const [msg, setMsg] = useState("");

  const handleSubmit = () => {
    if (!form.player.trim() || !form.score) { setMsg("Please enter at least a name and score."); return; }
    const newScore = {
      id: Date.now(),
      player: form.player.trim(),
      score: parseInt(form.score, 10),
      time: form.time || "—",
      date: form.date || new Date().toISOString().split("T")[0],
    };
    const updated = [...scores, newScore].sort((a,b) => b.score - a.score).slice(0,10);
    setScores(updated);
    setForm({ player: "", score: "", time: "", date: "" });
    setMsg("✓ Score added successfully!");
    setTimeout(() => setMsg(""), 3000);
  };

  return (
    <div className="page page-enter">
      {/* HERO */}
      <div className="hero">
        <div className="hero-pattern"/>
        <div className="hero-content">
          <div className="hero-badge">Classic Card Game</div>
          <h1>The Classic Card Game<br/><span>You Love</span></h1>
          <p>Play the timeless game of Solitaire on any device. Relax, unwind, and challenge yourself with endlessly satisfying gameplay that never gets old.</p>
          <div className="hero-cta">
            <button className="btn-primary" onClick={()=>setPage("Features")}>Explore Features</button>
            <button className="btn-secondary" onClick={()=>setPage("About")}>Learn More</button>
          </div>
        </div>
        <div className="hero-image">
          <div className="hero-placeholder">
            <div className="hero-placeholder-title">Solitaire preview</div>
          </div>
        </div>
      </div>

      {/* SCORES */}
      <div className="scores-section">
        <div className="scores-header">
          <div>
            <div className="section-label">Leaderboard</div>
            <h2 className="section-title">Top Scores</h2>
            <div className="divider"/>
          </div>
        </div>
        <div className="scores-table-wrap">
          <table className="scores-table">
            <thead>
              <tr>
                <th>#</th><th>Player</th><th>Score</th><th>Time</th><th>Date</th>
              </tr>
            </thead>
            <tbody>
              {scores.map((s, i) => (
                <tr key={s.id}>
                  <td className={i===0?"rank-1":i===1?"rank-2":i===2?"rank-3":""}>{i+1}</td>
                  <td>{s.player}</td>
                  <td className="score-val">{s.score.toLocaleString()}</td>
                  <td>{s.time}</td>
                  <td>{s.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Add score inline */}
        <div className="add-score-inline">
          <h3>Add Your Score</h3>
          <div className="form-row">
            <div className="form-group">
              <label>Player Name</label>
              <input placeholder="Your name" value={form.player} onChange={e=>setForm({...form,player:e.target.value})} />
            </div>
            <div className="form-group">
              <label>Score</label>
              <input type="number" placeholder="e.g. 9500" value={form.score} onChange={e=>setForm({...form,score:e.target.value})} />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Time (m:ss)</label>
              <input placeholder="e.g. 5:30" value={form.time} onChange={e=>setForm({...form,time:e.target.value})} />
            </div>
            <div className="form-group">
              <label>Date</label>
              <input type="date" value={form.date} onChange={e=>setForm({...form,date:e.target.value})} />
            </div>
          </div>
          <button className="form-submit" onClick={handleSubmit}>Submit Score</button>
          <div className="form-msg">{msg}</div>
        </div>
      </div>

      {/* DOWNLOAD PREVIEW */}
      <div className="download-section">
        <div className="download-inner">
          <div className="download-content">
            <div className="section-label">Mobile App</div>
            <h2 className="section-title">Solitaire in Your Pocket</h2>
            <div className="divider"/>
            <p className="section-sub">Available on iOS and Android. Take the classic card game wherever you go — whether you have five minutes or five hours.</p>
            <div className="download-buttons">
              <a href="https://apps.apple.com/us/app/solitaire/id359917414" target="_blank" rel="noreferrer" className="store-btn">
                <span className="store-icon">App</span>
                <span className="store-text"><small>Download on the</small><strong>App Store</strong></span>
              </a>
              <a href="https://play.google.com/store/apps/details?id=com.tripledot.solitaire&hl=en" target="_blank" rel="noreferrer" className="store-btn">
                <span className="store-icon">Play</span>
                <span className="store-text"><small>Get it on</small><strong>Google Play</strong></span>
              </a>
            </div>
          </div>
          <div className="download-images">
            <div className="download-card">App preview</div>
            <div className="download-card phone-card">Phone preview</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── ABOUT ────────────────────────────────────────────────────────
function AboutPage() {
  return (
    <div className="page page-enter">
      <div className="section" style={{background:"var(--green-deep)"}}>
        <div className="section-label">Our Story</div>
        <h1 className="section-title">About Solitaire Classic</h1>
        <div className="divider"/>
        <div className="about-grid">
          <div className="about-text">
            <p>Solitaire Classic is a love letter to one of the most iconic card games ever created. Since its popularization in the early 1990s, solitaire has been the game countless people turn to when they want to relax, sharpen their focus, or simply enjoy a few quiet minutes of play.</p>
            <p>Our team set out to build the definitive modern version of the game — one that honors the simplicity of the original while bringing it to life with smooth animations, a clean interface, and features that today's players expect.</p>
            <p>Whether you're a seasoned player chasing high scores or picking up a deck for the first time, Solitaire Classic is built for you.</p>
            <ul className="about-list">
              <li>Faithful to the classic Klondike rules</li>
              <li>Cross-platform: web, iOS, and Android</li>
              <li>Global leaderboard to track your progress</li>
              <li>Designed for comfort — play for minutes or hours</li>
              <li>No ads, no distractions — just pure gameplay</li>
            </ul>
          </div>
          <div>
            <div className="about-visual">
              <div className="visual-placeholder">Game preview</div>
            </div>
            <div className="about-stats">
              {[ ["10M+","Players Worldwide"], ["4.8","App Store Rating"], ["1991","Year Popularized"], ["Unlimited","Replayability"] ].map(([n,l])=>(
                <div className="stat-box" key={l}>
                  <div className="stat-num">{n}</div>
                  <div className="stat-lbl">{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── FEATURES ────────────────────────────────────────────────────
function FeaturesPage() {
  const features = [
    { title:"Classic Klondike Rules", desc:"The exact rules you know and love, faithfully implemented with no surprises. Draw 1 or draw 3 — your choice." },
    { title:"Global Leaderboard", desc:"Submit your scores and compete against players worldwide. See where you stand against the best." },
    { title:"Cross-Platform Play", desc:"Seamlessly play on desktop, tablet, or mobile. Your experience is consistent and smooth across all devices." },
    { title:"Smooth Animations", desc:"Every card drag, flip, and victory cascade is animated with care. The game just feels satisfying to play." },
    { title:"Hint System", desc:"Stuck? Our intelligent hint system suggests your next best move so you can keep your game flowing." },
    { title:"Unlimited Undo", desc:"Made a mistake? No problem — undo as many moves as you like and find the path to victory." },
    { title:"Dark & Light Themes", desc:"Choose the theme that suits your mood or environment. Both are designed to look great for extended play." },
    { title:"Fast & Lightweight", desc:"Built for performance. The app loads instantly and runs without a hitch, even on older devices." },
  ];

  return (
    <div className="page page-enter">
      <div className="section" style={{background:"var(--green-felt)"}}>
        <div className="section-label">What We Offer</div>
        <h1 className="section-title">Features & Gameplay</h1>
        <div className="divider"/>
        <p className="section-sub">Everything you need for the perfect solitaire experience — thoughtfully designed, meticulously polished.</p>
        <div className="features-grid">
          {features.map(f=>(
            <div className="feature-card" key={f.title}>
              <div className="feature-icon" aria-hidden="true" />
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* download CTA */}
      <div className="download-section">
        <div className="download-inner">
          <div className="download-content">
            <div className="section-label">Get Playing</div>
            <h2 className="section-title">Download & Play Free</h2>
            <div className="divider"/>
            <p className="section-sub">All features are free. No subscription, no paywall — just the game.</p>
            <div className="download-buttons">
              <a href="https://apps.apple.com/us/app/solitaire/id359917414" target="_blank" rel="noreferrer" className="store-btn">
                <span className="store-icon">App</span>
                <span className="store-text"><small>Download on the</small><strong>App Store</strong></span>
              </a>
              <a href="https://play.google.com/store/apps/details?id=com.tripledot.solitaire&hl=en" target="_blank" rel="noreferrer" className="store-btn">
                <span className="store-icon">Play</span>
                <span className="store-text"><small>Get it on</small><strong>Google Play</strong></span>
              </a>
            </div>
          </div>
          <div className="download-images">
            <div className="download-card">App preview</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── CONTACT ──────────────────────────────────────────────────────
function ContactPage() {
  const [form, setForm] = useState({ name:"", email:"", subject:"", message:"" });
  const [sent, setSent] = useState("");
  const [errors, setErrors] = useState({ name: "", email: "", message: "" });

  const validateContact = () => {
    const nextErrors = { name: "", email: "", message: "" };
    if (!form.name.trim()) nextErrors.name = "Please enter your name.";
    if (!form.email.trim()) {
      nextErrors.email = "Please enter your email address.";
    } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      nextErrors.email = "Please enter a valid email address.";
    }
    if (!form.message.trim()) nextErrors.message = "Please enter a message.";
    setErrors(nextErrors);
    return !nextErrors.name && !nextErrors.email && !nextErrors.message;
  };

  const handleSend = () => {
    if (!validateContact()) {
      setSent("Please fix the highlighted fields before sending.");
      return;
    }
    setSent("✓ This is a demo form. The message is saved locally and is not sent.");
    setForm({ name:"", email:"", subject:"", message:"" });
    setErrors({ name: "", email: "", message: "" });
    setTimeout(() => setSent(""), 6000);
  };

  return (
    <div className="page page-enter">
      <div className="section" style={{background:"var(--green-mid)"}}>
        <div className="section-label">Reach Out</div>
        <h1 className="section-title">Contact Us</h1>
        <div className="divider"/>
        <p className="section-sub" style={{marginBottom:"56px"}}>Have a question, a bug report, or just want to say hello? We read every message and usually reply within two business days.</p>

        <div className="contact-grid">
          <div>
            <div className="contact-info">
              <div className="contact-card">
                <div className="contact-card-icon">Email</div>
                <div className="contact-card-body">
                  <small>Email</small>
                  <a href="mailto:solitaire@gmail.com">solitaire@gmail.com</a>
                </div>
              </div>
              <div className="contact-card">
                <div className="contact-card-icon">Phone</div>
                <div className="contact-card-body">
                  <small>Phone</small>
                  <span>+1 346 657 908</span>
                </div>
              </div>
              <div className="contact-card">
                <div className="contact-card-icon">Time</div>
                <div className="contact-card-body">
                  <small>Response Time</small>
                  <span>Within 48 business hours</span>
                </div>
              </div>
              <div className="contact-card">
                <div className="contact-card-icon">Location</div>
                <div className="contact-card-body">
                  <small>Based In</small>
                  <span>San Francisco, CA</span>
                </div>
              </div>
            </div>
          </div>

          <div className="contact-form">
            <h3>Send a Message</h3>
            <div className="cf-group">
              <label>Your Name</label>
              <input
                placeholder="John Doe"
                value={form.name}
                onChange={e => {
                  setForm({...form, name:e.target.value});
                  if (errors.name) setErrors({...errors, name: ""});
                }}
              />
              {errors.name && <small className="field-error">{errors.name}</small>}
            </div>
            <div className="cf-group">
              <label>Email Address</label>
              <input
                type="email"
                placeholder="john@example.com"
                value={form.email}
                onChange={e => {
                  setForm({...form, email:e.target.value});
                  if (errors.email) setErrors({...errors, email: ""});
                }}
              />
              {errors.email && <small className="field-error">{errors.email}</small>}
            </div>
            <div className="cf-group">
              <label>Subject (optional)</label>
              <input
                placeholder="Bug report, feedback..."
                value={form.subject}
                onChange={e => setForm({...form,subject:e.target.value})}
              />
            </div>
            <div className="cf-group">
              <label>Message</label>
              <textarea
                rows={5}
                placeholder="Tell us what's on your mind..."
                value={form.message}
                onChange={e => {
                  setForm({...form, message:e.target.value});
                  if (errors.message) setErrors({...errors, message: ""});
                }}
              />
              {errors.message && <small className="field-error">{errors.message}</small>}
            </div>
            <button
              className="btn-primary"
              style={{width:"100%",justifyContent:"center"}}
              onClick={handleSend}
            >
              Send Message
            </button>
            <div className="contact-sent">{sent}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── FOOTER ───────────────────────────────────────────────────────
function Footer({ setPage }) {
  return (
    <footer>
      <div className="footer-logo">Solitaire Classic</div>
      <p style={{marginBottom:"12px"}}>
        <button onClick={()=>setPage("Home")} style={{background:"none",border:"none",cursor:"pointer",color:"rgba(255,255,255,0.4)",marginRight:"16px",fontFamily:"inherit"}}>Home</button>
        <button onClick={()=>setPage("About")} style={{background:"none",border:"none",cursor:"pointer",color:"rgba(255,255,255,0.4)",marginRight:"16px",fontFamily:"inherit"}}>About</button>
        <button onClick={()=>setPage("Features")} style={{background:"none",border:"none",cursor:"pointer",color:"rgba(255,255,255,0.4)",marginRight:"16px",fontFamily:"inherit"}}>Features</button>
        <button onClick={()=>setPage("Contact")} style={{background:"none",border:"none",cursor:"pointer",color:"rgba(255,255,255,0.4)",fontFamily:"inherit"}}>Contact</button>
      </p>
      <p>© 2026 Solitaire Classic. All rights reserved.JadSaleh</p>
    </footer>
  );
}

// ── APP ───────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState("Home");
  const [scores, setScores] = useState(INITIAL_SCORES);

  useEffect(() => { window.scrollTo({top:0,behavior:"smooth"}); }, [page]);

  return (
    <>
      <StyleInject/>
      <Nav page={page} setPage={setPage} />
      {page === "Home"     && <HomePage setPage={setPage} scores={scores} setScores={setScores} />}
      {page === "About"    && <AboutPage />}
      {page === "Features" && <FeaturesPage />}
      {page === "Contact"  && <ContactPage />}
      <Footer setPage={setPage} />
    </>
  );
}
