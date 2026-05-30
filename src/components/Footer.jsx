export default function Footer({ setPage }) {
  return (
    <footer>
      <div className="footer-logo">Solitaire Classic</div>
      <p style={{ marginBottom: "12px" }}>
        <button onClick={() => setPage("Home")} style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.4)", marginRight: "16px", fontFamily: "inherit" }}>
          Home
        </button>
        <button onClick={() => setPage("About")} style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.4)", marginRight: "16px", fontFamily: "inherit" }}>
          About
        </button>
        <button onClick={() => setPage("Features")} style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.4)", marginRight: "16px", fontFamily: "inherit" }}>
          Features
        </button>
        <button onClick={() => setPage("Contact")} style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.4)", fontFamily: "inherit" }}>
          Contact
        </button>
      </p>
      <p>© 2026 Solitaire Classic. All rights reserved.JadSaleh</p>
    </footer>
  );
}
