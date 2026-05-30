import { useState } from "react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
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
    setForm({ name: "", email: "", subject: "", message: "" });
    setErrors({ name: "", email: "", message: "" });
    setTimeout(() => setSent(""), 6000);
  };

  return (
    <div className="page page-enter">
      <div className="section" style={{ background: "var(--green-mid)" }}>
        <div className="section-label">Reach Out</div>
        <h1 className="section-title">Contact Us</h1>
        <div className="divider" />
        <p className="section-sub" style={{ marginBottom: "56px" }}>
          Have a question, a bug report, or just want to say hello? We read every message and usually reply within two business days.
        </p>

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
                  setForm({ ...form, name: e.target.value });
                  if (errors.name) setErrors({ ...errors, name: "" });
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
                  setForm({ ...form, email: e.target.value });
                  if (errors.email) setErrors({ ...errors, email: "" });
                }}
              />
              {errors.email && <small className="field-error">{errors.email}</small>}
            </div>
            <div className="cf-group">
              <label>Subject (optional)</label>
              <input
                placeholder="Bug report, feedback..."
                value={form.subject}
                onChange={e => setForm({ ...form, subject: e.target.value })}
              />
            </div>
            <div className="cf-group">
              <label>Message</label>
              <textarea
                rows={5}
                placeholder="Tell us what's on your mind..."
                value={form.message}
                onChange={e => {
                  setForm({ ...form, message: e.target.value });
                  if (errors.message) setErrors({ ...errors, message: "" });
                }}
              />
              {errors.message && <small className="field-error">{errors.message}</small>}
            </div>
            <button
              className="btn-primary"
              style={{ width: "100%", justifyContent: "center" }}
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
