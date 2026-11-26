
import { NavLink, useNavigate } from "react-router-dom";
import {
  Activity,
  BarChart3,
  ClipboardList,
  CircleHelp,
  LogOut,
  ShieldCheck,
  Users,
  Vote,
  Palette
} from "lucide-react";

import { signOut } from "../auth";

export default function Layout({ user, children }) {
  const navigate = useNavigate();

  const admin = user.role === "admin";
  const artist = user.role === "artist";

  const roleName = admin
    ? "Administrator"
    : artist
    ? "Election Artist"
    : "Voter";

  const links = admin
    ? [
        { to: "/admin", label: "Overview", icon: BarChart3 },
        { to: "/admin/elections", label: "Elections", icon: ClipboardList },
        { to: "/admin/users", label: "Users & Artists", icon: Users },
        { to: "/results", label: "Results", icon: Activity }
      ]
    : artist
    ? [
        { to: "/artist", label: "Artist Dashboard", icon: Palette }
      ]
    : [
        { to: "/dashboard", label: "My dashboard", icon: BarChart3 },
        { to: "/results", label: "Election results", icon: Activity }
      ];

  const logout = () => {
    signOut();
    navigate("/login");
  };

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <span className="brand-mark"><Vote size={21} /></span>
          <span>
            VoteWise
            <small>ONLINE VOTING</small>
          </span>
        </div>

        <div className="side-label">WORKSPACE</div>

        <nav className="side-nav">
          {links.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end
              className={({ isActive }) =>
                `nav-link ${isActive ? "active" : ""}`
              }
            >
              <Icon size={18} />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <div className="help-card">
            <CircleHelp size={18} />
            <strong>Need help?</strong>
            <span>Contact your election coordinator.</span>
          </div>

          <button className="nav-link logout-button" onClick={logout}>
            <LogOut size={18} />
            <span>Sign out</span>
          </button>
        </div>
      </aside>

      <main className="main-area">
        <header className="topbar">
          <div className="mobile-brand">
            <span className="brand-mark"><Vote size={18} /></span>
            VoteWise
          </div>

          <div className="topbar-right">
            <span className="secure-label">
              <ShieldCheck size={15} />
              Demo environment
            </span>

            <div className="user-chip">
              <div className="avatar">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <strong>{user.name}</strong>
                <small>{roleName}</small>
              </div>
            </div>
          </div>
        </header>

        <div className="page-content">{children}</div>

        <footer className="footer">
          © 2026 VoteWise · Academic project demonstration
        </footer>
      </main>
    </div>
  );
}
