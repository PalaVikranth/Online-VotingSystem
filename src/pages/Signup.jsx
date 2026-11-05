import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, LockKeyhole, Mail, UserRound, Vote } from "lucide-react";
import { registerUser } from "../auth";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    if (password.length < 6) { setError("Password must contain at least 6 characters."); return; }
    if (password !== confirm) { setError("Passwords do not match."); return; }
    const result = registerUser(name, email, password);
    if (!result.ok) { setError(result.message); return; }
    navigate("/login", { state: { message: "Account created. Please sign in." } });
  }

  return (
    <div className="auth-page">
      <section className="auth-visual">
        <div className="auth-brand"><span className="brand-mark"><Vote size={22} /></span> VoteWise</div>
        <div className="auth-message"><span className="hero-kicker">BE PART OF THE DECISION</span><h1>Your opinion deserves a place at the table.</h1><p>Create your voter account and take part in the elections available to you.</p><div className="visual-stat"><div className="stat-icon"><UserRound size={19} /></div><div><strong>Get started in moments</strong><span>Register once and access your dashboard.</span></div></div></div>
        <div className="auth-visual-footer">A student project built for responsible participation.</div>
      </section>
      <section className="auth-form-side">
        <div className="auth-form-wrap">
          <div className="mobile-auth-brand"><span className="brand-mark"><Vote size={20} /></span> VoteWise</div>
          <span className="eyebrow">CREATE ACCOUNT</span><h2>Join VoteWise</h2><p className="form-intro">Fill in your details to create a voter account.</p>
          <form onSubmit={handleSubmit} className="form-stack">
            <label>Full name<div className="input-wrap"><UserRound size={18} /><input value={name} onChange={e => setName(e.target.value)} placeholder="Your full name" required minLength={2} /></div></label>
            <label>Email address<div className="input-wrap"><Mail size={18} /><input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" required /></div></label>
            <label>Password<div className="input-wrap"><LockKeyhole size={18} /><input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="At least 6 characters" required minLength={6} /></div></label>
            <label>Confirm password<div className="input-wrap"><LockKeyhole size={18} /><input type="password" value={confirm} onChange={e => setConfirm(e.target.value)} placeholder="Re-enter your password" required /></div></label>
            {error && <div className="alert alert-error">{error}</div>}
            <button className="primary-button full-button" type="submit">Create account <ArrowRight size={17} /></button>
          </form>
          <p className="auth-switch">Already registered? <Link to="/login">Sign in</Link></p>
          <p className="auth-disclaimer">Academic demonstration only. Do not use for real elections or sensitive information.</p>
        </div>
      </section>
    </div>
  );
}