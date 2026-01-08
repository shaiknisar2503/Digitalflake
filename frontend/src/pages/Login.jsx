import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API = "http://localhost:5000/api/auth";

export default function Login() {
  const navigate = useNavigate();

  const [mode, setMode] = useState("login"); // login | signup
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const clearMessages = () => {
    setSuccess("");
    setError("");
  };

  /* ================= LOGIN ================= */
  const handleLogin = async () => {
    clearMessages();

    if (!email || !password) {
      setError("Email and password are required");
      return;
    }

    try {
      const res = await axios.post(`${API}/login`, {
        email,
        password
      });

      // ✅ LOGIN SUCCESS
      setSuccess("Login successful");

      // store token
      localStorage.setItem("token", res.data.token);

      // ✅ redirect AFTER popup
      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);

    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  /* ================= SIGNUP ================= */
  const handleSignup = async () => {
    clearMessages();

    if (!email || !password) {
      setError("Email and password are required");
      return;
    }

    try {
      const res = await axios.post(`${API}/signup`, {
        email,
        password
      });

      // ✅ SIGNUP SUCCESS POPUP
      setSuccess("Account created successfully");

      setMode("login");
      setPassword("");

    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="screen">
      <div className="card">
        <h2>digitalflake</h2>

        {/* POPUPS */}
        {success && <div className="popup success">{success}</div>}
        {error && <div className="popup error">{error}</div>}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        {mode === "login" ? (
          <>
            <button onClick={handleLogin}>Login</button>
            <p className="link" onClick={() => setMode("signup")}>
              Create new account
            </p>
          </>
        ) : (
          <>
            <button onClick={handleSignup}>Create Account</button>
            <p className="link" onClick={() => setMode("login")}>
              Back to login
            </p>
          </>
        )}
      </div>
    </div>
  );
}
