const USERS_KEY = "votewise_users";
const SESSION_KEY = "votewise_session";

export function initializeAdmin() {
  const users = JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
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

export function getUsers() {
  return JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
}

export function registerUser(name, email, password) {
  const users = getUsers();
  if (users.some((user) => user.email.toLowerCase() === email.toLowerCase())) {
    return { ok: false, message: "An account with this email already exists." };
  }
  users.push({
    id: `user-${Date.now()}`,
    name: name.trim(),
    email: email.trim().toLowerCase(),
    password,
    role: "user"
  });
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
  return { ok: true };
}

export function signIn(email, password) {
  const user = getUsers().find(
    (item) => item.email.toLowerCase() === email.trim().toLowerCase() && item.password === password
  );
  if (!user) return null;

  const session = { id: user.id, name: user.name, email: user.email, role: user.role };
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  return session;
}

export function getCurrentUser() {
  try {
    return JSON.parse(localStorage.getItem(SESSION_KEY) || "null");
  } catch {
    return null;
  }
}

export function signOut() {
  localStorage.removeItem(SESSION_KEY);
}