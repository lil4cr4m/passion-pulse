import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Context & Security
import { AuthProvider } from "./context/AuthContext";
import Protected from "./components/layout/Protected";

// Layout Components
import Navbar from "./components/layout/Navbar";

// Page Components
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import CreatePulse from "./pages/CreatePulse";

/**
 * MAIN APP COMPONENT
 * 2026 Architecture: Centralized routing with global Auth State
 */
function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-slate-50 text-slate-900">
          {/* Navbar stays at the top across all routes */}
          <Navbar />

          <main className="container mx-auto">
            <Routes>
              {/* PUBLIC ROUTES */}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/profile/:id" element={<Profile />} />

              {/* PROTECTED ROUTES: Only accessible if logged in */}
              <Route
                path="/create"
                element={
                  <Protected>
                    <CreatePulse />
                  </Protected>
                }
              />

              {/* 404 FALLBACK */}
              <Route
                path="*"
                element={
                  <div className="flex flex-col items-center justify-center py-20">
                    <h1 className="text-6xl font-black text-slate-200">404</h1>
                    <p className="text-slate-500 mt-4">
                      Vibe not found. Let's go back home.
                    </p>
                  </div>
                }
              />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
