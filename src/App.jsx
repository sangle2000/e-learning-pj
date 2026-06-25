import { useState } from "react";
import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./pages/Home/index.jsx";
import Header from "./pages/Header/index.jsx";
import SignIn from "./pages/Auth/SignIn.jsx";
import SignUp from "./pages/Auth/SignUp.jsx";
import HeaderAuth from "./pages/Auth/HeaderAuth.jsx";

// Simple subpage templates to demonstrate navigation
function ProjectsPage() {
  return (
    <main className="container" style={{ padding: "40px 20px" }}>
      <h1
        style={{
          fontFamily: "var(--font-brand)",
          fontSize: "2rem",
          marginBottom: "16px",
          color: "var(--color-primary)",
        }}
      >
        Our Projects
      </h1>
      <p style={{ color: "var(--color-text-muted)", maxWidth: "600px" }}>
        Explore coding challenges, student projects, and developer portfolios
        built with modern frameworks.
      </p>
    </main>
  );
}

function CoursesPage() {
  return (
    <main className="container" style={{ padding: "40px 20px" }}>
      <h1
        style={{
          fontFamily: "var(--font-brand)",
          fontSize: "2rem",
          marginBottom: "16px",
          color: "var(--color-primary)",
        }}
      >
        Browse Courses
      </h1>
      <p style={{ color: "var(--color-text-muted)", maxWidth: "600px" }}>
        Find interactive learning pathways covering frontend engineering, system
        design, and algorithms.
      </p>
    </main>
  );
}

function DashboardPage() {
  return (
    <main className="container" style={{ padding: "40px 20px" }}>
      <h1
        style={{
          fontFamily: "var(--font-brand)",
          fontSize: "2rem",
          marginBottom: "16px",
          color: "var(--color-primary)",
        }}
      >
        User Dashboard
      </h1>
      <p style={{ color: "var(--color-text-muted)", maxWidth: "600px" }}>
        Welcome back! Track your course progress, certificates, and coding
        activity here.
      </p>
    </main>
  );
}

function SettingsPage() {
  return (
    <main className="container" style={{ padding: "40px 20px" }}>
      <h1
        style={{
          fontFamily: "var(--font-brand)",
          fontSize: "2rem",
          marginBottom: "16px",
          color: "var(--color-primary)",
        }}
      >
        Settings
      </h1>
      <p style={{ color: "var(--color-text-muted)", maxWidth: "600px" }}>
        Configure your email preferences, avatar, account details, and
        notification thresholds.
      </p>
    </main>
  );
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    () => !!localStorage.getItem("accessToken"),
  );
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <>
      <HeaderAuth />
      <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/project" element={<ProjectsPage />} />
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </>
  );
}

export default App;
