
import { useState } from "react";
import { Users, Mail, ShieldCheck, Palette, UserPlus, Trash2 } from "lucide-react";
import Layout from "../components/Layout";
import {
  getCurrentUser,
  getUsers,
  getArtists,
  createArtist,
  deleteArtist
} from "../auth";

export default function AdminUsers() {
  const user = getCurrentUser();

  const [voters, setVoters] = useState(
    getUsers().filter((item) => item.role === "user")
  );
  const [artists, setArtists] = useState(getArtists());

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  function refreshLists() {
    setVoters(getUsers().filter((item) => item.role === "user"));
    setArtists(getArtists());
  }

  function handleCreateArtist(event) {
    event.preventDefault();

    const result = createArtist(name, email, password);
    setMessage(result.message);

    if (result.ok) {
      setName("");
      setEmail("");
      setPassword("");
      refreshLists();
    }
  }

  function handleDeleteArtist(id) {
    if (!window.confirm("Delete this Artist account?")) return;

    if (deleteArtist(id)) {
      refreshLists();
      setMessage("Artist account deleted successfully.");
    }
  }

  return (
    <Layout user={user}>
      <div className="page-heading">
        <div>
          <span className="eyebrow">ADMINISTRATION</span>
          <h1>User and Artist Management</h1>
          <p>Manage registered voters and election content creators.</p>
        </div>
      </div>

      {/* Create Artist */}
      <section className="management-list" style={{ padding: "24px", marginBottom: "28px" }}>
        <h2><UserPlus size={20} /> Create Artist Account</h2>
        <p>Create an account for someone responsible for election artwork.</p>

        <form onSubmit={handleCreateArtist} className="form-stack">
          <label>
            Artist name
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter artist name"
              required
            />
          </label>

          <label>
            Email address
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="artist@example.com"
              required
            />
          </label>

          <label>
            Temporary password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a password"
              required
            />
          </label>

          <button className="primary-button" type="submit">
            Create Artist
          </button>
        </form>

        {message && <p role="status">{message}</p>}
      </section>

      {/* Artist list */}
      <div className="page-heading">
        <div>
          <span className="eyebrow">CONTENT TEAM</span>
          <h1>Registered Artists</h1>
          <p>Manage people responsible for election artwork.</p>
        </div>
        <div className="result-total">
          <Palette size={18} />
          <strong>{artists.length}</strong>
          <span>artists</span>
        </div>
      </div>

      <div className="management-list">
        {artists.map((artist) => (
          <div className="management-row" key={artist.id}>
            <div className="avatar large-avatar">
              {artist.name.charAt(0).toUpperCase()}
            </div>

            <div className="management-info">
              <strong>{artist.name}</strong>
              <span><Mail size={14} /> {artist.email}</span>
            </div>

            <span className="status-pill status-active">
              <i />Artist
            </span>

            <button
              type="button"
              onClick={() => handleDeleteArtist(artist.id)}
              title="Delete Artist"
              aria-label={`Delete ${artist.name}`}
            >
              <Trash2 size={17} />
            </button>
          </div>
        ))}

        {!artists.length && (
          <div className="empty-state">No Artist accounts created yet.</div>
        )}
      </div>

      {/* Existing voter list */}
      <div className="page-heading" style={{ marginTop: "36px" }}>
        <div>
          <span className="eyebrow">VOTER ACCOUNTS</span>
          <h1>Registered voters</h1>
          <p>View the user accounts registered in this browser demo.</p>
        </div>

        <div className="result-total">
          <Users size={18} />
          <strong>{voters.length}</strong>
          <span>voters</span>
        </div>
      </div>

      <div className="management-list">
        {voters.map((person) => (
          <div className="management-row" key={person.id}>
            <div className="avatar large-avatar">
              {person.name.charAt(0).toUpperCase()}
            </div>

            <div className="management-info">
              <strong>{person.name}</strong>
              <span><Mail size={14} /> {person.email}</span>
            </div>

            <span className="status-pill status-active">
              <i />Registered
            </span>
          </div>
        ))}

        {!voters.length && (
          <div className="empty-state">No voters have registered yet.</div>
        )}
      </div>

      <p className="results-note">
        <ShieldCheck size={15} />
        These accounts are stored in this browser's Local Storage.
      </p>
    </Layout>
  );
}
