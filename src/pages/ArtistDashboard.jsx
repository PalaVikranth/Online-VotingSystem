
import { useState } from "react";
import {
  Palette,
  Upload,
  Image,
  Trash2,
  Eye
} from "lucide-react";

import Layout from "../components/Layout";
import { getCurrentUser } from "../auth";

const ARTWORK_KEY = "votewise_artist_artwork";

export default function ArtistDashboard() {
  const user = getCurrentUser();

  const [artworks, setArtworks] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(ARTWORK_KEY) || "[]");
    } catch {
      return [];
    }
  });

  const [title, setTitle] = useState("");
  const [type, setType] = useState("Election Poster");
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  function saveArtworks(updated) {
    setArtworks(updated);
    localStorage.setItem(ARTWORK_KEY, JSON.stringify(updated));
  }

  function handleUpload(event) {
    event.preventDefault();

    if (!file) {
      setMessage("Please select an image.");
      return;
    }

    if (!file.type.startsWith("image/")) {
      setMessage("Please select a valid image file.");
      return;
    }

    if (file.size > 1024 * 1024) {
      setMessage("Please choose an image smaller than 1 MB.");
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      const artwork = {
        id: `art-${Date.now()}`,
        title: title.trim(),
        type,
        image: reader.result,
        artist: user.name
      };

      saveArtworks([artwork, ...artworks]);
      setTitle("");
      setFile(null);
      event.target.reset();
      setMessage("Artwork uploaded successfully!");
    };

    reader.readAsDataURL(file);
  }

  function deleteArtwork(id) {
    if (!window.confirm("Delete this artwork?")) return;

    saveArtworks(artworks.filter(item => item.id !== id));
  }

  return (
    <Layout user={user}>
      <div className="page-heading">
        <div>
          <span className="eyebrow">CREATIVE WORKSPACE</span>
          <h1>Artist Dashboard</h1>
          <p>Create and manage election artwork.</p>
        </div>

        <div className="result-total">
          <Palette size={20} />
          <strong>{artworks.length}</strong>
          <span>artworks</span>
        </div>
      </div>

      <section className="management-list" style={{ padding: 24 }}>
        <h2><Upload size={20} /> Upload new artwork</h2>

        <form onSubmit={handleUpload} className="form-stack">
          <label>
            Artwork title
            <input
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="Example: Vijayawada Election Poster"
              required
            />
          </label>

          <label>
            Artwork type
            <select
              value={type}
              onChange={e => setType(e.target.value)}
            >
              <option>Election Poster</option>
              <option>Campaign Banner</option>
              <option>Candidate Photo</option>
              <option>Party Symbol</option>
              <option>Party Logo</option>
            </select>
          </label>

          <label>
            Select image
            <input
              type="file"
              accept="image/*"
              onChange={e => setFile(e.target.files?.[0] || null)}
              required
            />
          </label>

          <button className="primary-button" type="submit">
            <Upload size={17} /> Upload Artwork
          </button>
        </form>

        {message && <p role="status">{message}</p>}
      </section>

      <div className="page-heading" style={{ marginTop: 32 }}>
        <div>
          <span className="eyebrow">YOUR CREATIONS</span>
          <h1>My Artwork</h1>
          <p>Preview and manage your uploaded images.</p>
        </div>
      </div>

      <div className="management-list" style={{ padding: 20 }}>
        {artworks.length === 0 ? (
          <div className="empty-state">
            <Image size={30} />
            <p>No artwork uploaded yet.</p>
          </div>
        ) : (
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
            gap: 20
          }}>
            {artworks.map(item => (
              <div key={item.id} style={{
                border: "1px solid #ddd",
                borderRadius: 12,
                overflow: "hidden"
              }}>
                <img
                  src={item.image}
                  alt={item.title}
                  style={{
                    width: "100%",
                    height: 170,
                    objectFit: "cover"
                  }}
                />

                <div style={{ padding: 14 }}>
                  <strong>{item.title}</strong>
                  <p>{item.type}</p>
                  <button
                    type="button"
                    onClick={() => window.open(item.image, "_blank")}
                    className="primary-button"
                  >
                    <Eye size={15} /> Preview
                  </button>

                  <button
                    type="button"
                    onClick={() => deleteArtwork(item.id)}
                    style={{ marginLeft: 8 }}
                  >
                    <Trash2 size={15} /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
