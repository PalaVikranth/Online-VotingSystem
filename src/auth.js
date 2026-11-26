
const USERS_KEY = "votewise_users";
const SESSION_KEY = "votewise_session";

// Initialize default Admin account
export function initializeAdmin() {
  const users = getUsers();

  if (!users.some((user) => user.role === "admin")) {
    users.push({
      id: "admin-default",
      name: "Administrator",
      email: "admin@voting.com",
      password: "admin123",
      role: "admin"
    });

    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  }
}

// Get all registered accounts
export function getUsers() {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
  } catch {
    return [];
  }
}

// Get all Artist accounts
export function getArtists() {
  return getUsers().filter((user) => user.role === "artist");
}

// Admin creates an Artist account
export function createArtist(name, email, password) {
  const users = getUsers();

  if (!name.trim() || !email.trim() || !password) {
    return {
      ok: false,
      message: "Please fill all fields."
    };
  }

  const normalizedEmail = email.trim().toLowerCase();

  if (
    users.some(
      (user) => user.email.toLowerCase() === normalizedEmail
    )
  ) {
    return {
      ok: false,
      message: "An account with this email already exists."
    };
  }

  users.push({
    id: `artist-${Date.now()}`,
    name: name.trim(),
    email: normalizedEmail,
    password,
    role: "artist"
  });

  localStorage.setItem(USERS_KEY, JSON.stringify(users));

  return {
    ok: true,
    message: "Artist account created successfully."
  };
}

// Delete an Artist account
export function deleteArtist(artistId) {
  const users = getUsers();

  const artist = users.find(
    (user) => user.id === artistId && user.role === "artist"
  );

  if (!artist) return false;

  const updatedUsers = users.filter(
    (user) => user.id !== artistId
  );

  localStorage.setItem(USERS_KEY, JSON.stringify(updatedUsers));

  return true;
}

// Register a normal User
export function registerUser(name, email, password) {
  const users = getUsers();

  const normalizedEmail = email.trim().toLowerCase();

  if (
    users.some(
      (user) => user.email.toLowerCase() === normalizedEmail
    )
  ) {
    return {
      ok: false,
      message: "An account with this email already exists."
    };
  }

  users.push({
    id: `user-${Date.now()}`,
    name: name.trim(),
    email: normalizedEmail,
    password,
    role: "user"
  });

  localStorage.setItem(USERS_KEY, JSON.stringify(users));

  return { ok: true };
}

// Login for Admin, Artist and User
export function signIn(email, password) {
  const normalizedEmail = email.trim().toLowerCase();

  const user = getUsers().find(
    (item) =>
      item.email.toLowerCase() === normalizedEmail &&
      item.password === password
  );

  if (!user) return null;

  const session = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role
  };

  localStorage.setItem(SESSION_KEY, JSON.stringify(session));

  return session;
}

// Get currently logged-in account
export function getCurrentUser() {
  try {
    return JSON.parse(localStorage.getItem(SESSION_KEY) || "null");
  } catch {
    return null;
  }
}

// Logout
export function signOut() {
  localStorage.removeItem(SESSION_KEY);
}
