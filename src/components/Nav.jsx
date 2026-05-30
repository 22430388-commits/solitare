import { useState } from "react";

export default function Nav({ page, setPage }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const links = ["Home", "About", "Features", "Contact"];

  const go = (p) => {
    setPage(p);
    setMenuOpen(false);
  };

  return (
    <>
      <nav className="nav">
        <div className="nav-logo" onClick={() => go("Home")}>Solitaire Classic</div>
        <div className="nav-links">
          {links.map((l) => (
            <button key={l} className={page === l ? "active" : ""} onClick={() => go(l)}>
              {l}
            </button>
          ))}
        </div>
        <button className="hamburger" onClick={() => setMenuOpen((o) => !o)} aria-label="Menu">
          <span />
          <span />
          <span />
        </button>
      </nav>
      <div className={`mobile-menu${menuOpen ? " open" : ""}`}>
        {links.map((l) => (
          <button key={l} className={page === l ? "active" : ""} onClick={() => go(l)}>
            {l}
          </button>
        ))}
      </div>
    </>
  );
}
