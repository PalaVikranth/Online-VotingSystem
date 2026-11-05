import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, LockKeyhole, Mail, Vote } from "lucide-react";
import { signIn } from "../auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    const user = signIn(email, password);
    if (!user) { setError("Email or password is incorrect. Please try again."); return; }
    navigate(user.role === "admin" ? "/admin" : "/dashboard");
  }

  return (
    <div className="auth-page">
      <section className="auth-visual">
        <div className="auth-brand"><span className="brand-mark"><Vote size={22} /></span> VoteWise</div>
        <div className="auth-message"><span className="hero-kicker">YOUR VOICE. YOUR CHOICE.</span><h1>Every vote is a step toward a better tomorrow.</h1><p>A simple, transparent way to participate in the decisions that matter to your community.</p><div className="visual-stat"><div className="stat-icon"><LockKeyhole size={19} /></div><div><strong>One person. One vote.</strong><span>Participation starts with you.</span></div></div></div>
        <div className="auth-visual-footer">A student project built for responsible participation.</div>
      </section>
      <section className="auth-form-side">
        <div className="auth-form-wrap">
          <div className="mobile-auth-brand"><span className="brand-mark"><Vote size={20} /></span> VoteWise</div>
          <span className="eyebrow">WELCOME BACK</span><h2>Sign in to your account</h2><p className="form-intro">Enter your details to access your voting workspace.</p>
          <form onSubmit={handleSubmit} className="form-stack">
            <label>Email address<div className="input-wrap"><Mail size={18} /><input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" required /></div></label>
            <label>Password<div className="input-wrap"><LockKeyhole size={18} /><input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter your password" required /></div></label>
            {error && <div className="alert alert-error">{error}</div>}
            <button className="primary-button full-button" type="submit">Sign in <ArrowRight size={17} /></button>
          </form>
          <p className="auth-switch">New to VoteWise? <Link to="/signup">Create an account</Link></p>
          <div className="demo-note"><strong>Admin demo access</strong><span>admin@voting.com · admin123</span></div>
          <p className="auth-disclaimer">Academic demonstration only. Do not use for real elections or sensitive information.</p>
        </div>
      </section>
    </div>
  );
}