import { useState } from "react";

export default function HomePage({ setPage, scores, setScores }) {
  const [form, setForm] = useState({ player: "", score: "", time: "", date: "" });
  const [msg, setMsg] = useState("");

  const handleSubmit = () => {
    if (!form.player.trim() || !form.score) {
      setMsg("Please enter at least a name and score.");
      return;
    }

    const newScore = {
      id: Date.now(),
      player: form.player.trim(),
      score: parseInt(form.score, 10),
      time: form.time || "—",
      date: form.date || new Date().toISOString().split("T")[0],
    };

    const updated = [...scores, newScore].sort((a, b) => b.score - a.score).slice(0, 10);
    setScores(updated);
    setForm({ player: "", score: "", time: "", date: "" });
    setMsg("✓ Score added successfully!");
    setTimeout(() => setMsg(""), 3000);
  };

  return (
    <div className="page page-enter">
      <div className="hero">
        <div className="hero-pattern" />
        <div className="hero-content">
          <div className="hero-badge">Classic Card Game</div>
          <h1>
            The Classic Card Game
            <br />
            <span>You Love</span>
          </h1>
          <p>
            Play the timeless game of Solitaire on any device. Relax, unwind, and challenge yourself with endlessly satisfying gameplay that never gets old.
          </p>
          <div className="hero-cta">
            <button className="btn-primary" onClick={() => setPage("Features")}>Explore Features</button>
            <button className="btn-secondary" onClick={() => setPage("About")}>Learn More</button>
          </div>
        </div>
        <div className="hero-image">
          <div className="hero-placeholder">App preview</div>
        </div>
      </div>

      <div className="scores-section">
        <div className="scores-header">
          <div>
            <div className="section-label">Leaderboard</div>
            <h2 className="section-title">Top Scores</h2>
            <div className="divider" />
          </div>
        </div>
        <div className="scores-table-wrap">
          <table className="scores-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Player</th>
                <th>Score</th>
                <th>Time</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {scores.map((s, i) => (
                <tr key={s.id}>
                  <td className={i === 0 ? "rank-1" : i === 1 ? "rank-2" : i === 2 ? "rank-3" : ""}>{i + 1}</td>
                  <td>{s.player}</td>
                  <td className="score-val">{s.score.toLocaleString()}</td>
                  <td>{s.time}</td>
                  <td>{s.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="add-score-inline">
          <h3>Add Your Score</h3>
          <div className="form-row">
            <div className="form-group">
              <label>Player Name</label>
              <input placeholder="Your name" value={form.player} onChange={e => setForm({ ...form, player: e.target.value })} />
            </div>
            <div className="form-group">
              <label>Score</label>
              <input type="number" placeholder="e.g. 9500" value={form.score} onChange={e => setForm({ ...form, score: e.target.value })} />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Time (m:ss)</label>
              <input placeholder="e.g. 5:30" value={form.time} onChange={e => setForm({ ...form, time: e.target.value })} />
            </div>
            <div className="form-group">
              <label>Date</label>
              <input type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} />
            </div>
          </div>
          <button className="form-submit" onClick={handleSubmit}>Submit Score</button>
          <div className="form-msg">{msg}</div>
        </div>
      </div>

      <div className="download-section">
        <div className="download-inner">
          <div className="download-content">
            <div className="section-label">Mobile App</div>
            <h2 className="section-title">Solitaire in Your Pocket</h2>
            <div className="divider" />
            <p className="section-sub">
              Available on iOS and Android. Take the classic card game wherever you go — whether you have five minutes or five hours.
            </p>
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
