export default function FeaturesPage() {
  const features = [
    {
      title: "Classic Klondike Rules",
      desc: "The exact rules you know and love, faithfully implemented with no surprises. Draw 1 or draw 3 — your choice.",
    },
    {
      title: "Global Leaderboard",
      desc: "Submit your scores and compete against players worldwide. See where you stand against the best.",
    },
    {
      title: "Cross-Platform Play",
      desc: "Seamlessly play on desktop, tablet, or mobile. Your experience is consistent and smooth across all devices.",
    },
    {
      title: "Smooth Animations",
      desc: "Every card drag, flip, and victory cascade is animated with care. The game just feels satisfying to play.",
    },
    {
      title: "Hint System",
      desc: "Stuck? Our intelligent hint system suggests your next best move so you can keep your game flowing.",
    },
    {
      title: "Unlimited Undo",
      desc: "Made a mistake? No problem — undo as many moves as you like and find the path to victory.",
    },
    {
      title: "Dark & Light Themes",
      desc: "Choose the theme that suits your mood or environment. Both are designed to look great for extended play.",
    },
    {
      title: "Fast & Lightweight",
      desc: "Built for performance. The app loads instantly and runs without a hitch, even on older devices.",
    },
  ];

  return (
    <div className="page page-enter">
      <div className="section" style={{ background: "var(--green-felt)" }}>
        <div className="section-label">What We Offer</div>
        <h1 className="section-title">Features & Gameplay</h1>
        <div className="divider" />
        <p className="section-sub">Everything you need for the perfect solitaire experience — thoughtfully designed, meticulously polished.</p>
        <div className="features-grid">
          {features.map((f) => (
            <div className="feature-card" key={f.title}>
              <div className="feature-icon" aria-hidden="true" />
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="download-section">
        <div className="download-inner">
          <div className="download-content">
            <div className="section-label">Get Playing</div>
            <h2 className="section-title">Download & Play Free</h2>
            <div className="divider" />
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
