export default function AboutPage() {
  return (
    <div className="page page-enter">
      <div className="section" style={{ background: "var(--green-deep)" }}>
        <div className="section-label">Our Story</div>
        <h1 className="section-title">About Solitaire Classic</h1>
        <div className="divider" />
        <div className="about-grid">
          <div className="about-text">
            <p>
              Solitaire Classic is a love letter to one of the most iconic card games ever created. Since its popularization in the early 1990s, solitaire has been the game countless people turn to when they want to relax, sharpen their focus, or simply enjoy a few quiet minutes of play.
            </p>
            <p>
              Our team set out to build the definitive modern version of the game — one that honors the simplicity of the original while bringing it to life with smooth animations, a clean interface, and features that today's players expect.
            </p>
            <p>
              Whether you're a seasoned player chasing high scores or picking up a deck for the first time, Solitaire Classic is built for you.
            </p>
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
              {[
                ["10M+", "Players Worldwide"],
                ["4.8", "App Store Rating"],
                ["1991", "Year Popularized"],
                ["Unlimited", "Replayability"],
              ].map(([n, l]) => (
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
