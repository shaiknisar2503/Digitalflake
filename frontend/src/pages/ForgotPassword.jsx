import React from "react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const submit = async () => {
    await axios.post("http://localhost:5000/api/auth/forgot-password", { email });
    alert("Reset link sent");
  };

  return (
    <div className="screen">
      <div className="card">
        <h3>Did you forget password?</h3>
        <p>Enter your email address and we'll send you a link</p>

        <input
          placeholder="Email Address"
          onChange={e => setEmail(e.target.value)}
        />

        <button onClick={submit}>Request reset link</button>
        <span className="link" onClick={() => navigate("/")}>
          Back to login
        </span>
      </div>
    </div>
  );
}
