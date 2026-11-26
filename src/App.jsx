
import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import HomeIndia from "./pages/HomeIndia";
import Constituencies from "./pages/Constituencies";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AdminDashboard from "./pages/AdminDashboard";
import AdminUsers from "./pages/AdminUsers";
import UserDashboard from "./pages/UserDashboard";
import ArtistDashboard from "./pages/ArtistDashboard";
import Results from "./pages/Results";

import ProtectedRoute from "./components/ProtectedRoute";
import { initializeAdmin, getCurrentUser } from "./auth";
import { getElections } from "./store";

export default function App() {
  useEffect(() => {
    initializeAdmin();
    getElections();
  }, []);

  const user = getCurrentUser();

  return (
    <Routes>
      <Route path="/" element={<HomeIndia />} />
      <Route path="/constituencies" element={<Constituencies />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Admin */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute role="admin">
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/elections"
        element={
          <ProtectedRoute role="admin">
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/users"
        element={
          <ProtectedRoute role="admin">
            <AdminUsers />
          </ProtectedRoute>
        }
      />

      {/* Artist */}
      <Route
        path="/artist"
        element={
          <ProtectedRoute role="artist">
            <ArtistDashboard />
          </ProtectedRoute>
        }
      />

      {/* User */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute role="user">
            <UserDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/results"
        element={
          <ProtectedRoute>
            <Results />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
