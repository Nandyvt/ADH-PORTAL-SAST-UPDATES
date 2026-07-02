/**
 * LOCAL DEV ONLY login page. Posts straight to the local backend's auth-service
 * (through the api-gateway) instead of redirecting to AHA SSO. Purely additive —
 * does not touch the real Login page or SSO flow (see pages/Login).
 *
 * Reachable at /local-login. Only intended for use when REACT_APP_MY_ENV=local.
 */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  isLocalLoginAvailable,
  localLogin,
} from "app/hooks/auth/localLoginManager";

const LocalLogin = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    const result = await localLogin({ username, password });

    setSubmitting(false);

    if (result.success) {
      navigate(result.redirectPath || "/dashboard");
    } else {
      setError(result.errorMessage || "Login failed");
    }
  };

  return (
    <div style={{ maxWidth: 360, margin: "80px auto", padding: 24 }}>
      <h2 style={{ marginBottom: 8 }}>Local Dev Login</h2>
      <p style={{ fontSize: 13, color: "#666", marginBottom: 24 }}>
        Bypasses AHA SSO and authenticates directly against the local
        auth-service. For local development only.
      </p>

      {!isLocalLoginAvailable() && (
        <div style={{ color: "#b00020", marginBottom: 16, fontSize: 13 }}>
          REACT_APP_MY_ENV is not set to &quot;local&quot;, so this will call
          the currently configured environment&apos;s gateway rather than
          your local backend. Set REACT_APP_MY_ENV=local to target
          http://localhost:8080.
        </div>
      )}

      <form onSubmit={onSubmit}>
        <div style={{ marginBottom: 12 }}>
          <label htmlFor="local-login-username" style={{ display: "block", marginBottom: 4 }}>
            Username
          </label>
          <input
            id="local-login-username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ width: "100%", padding: 8 }}
          />
        </div>

        <div style={{ marginBottom: 12 }}>
          <label htmlFor="local-login-password" style={{ display: "block", marginBottom: 4 }}>
            Password
          </label>
          <input
            id="local-login-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: "100%", padding: 8 }}
          />
        </div>

        {error && (
          <div style={{ color: "#b00020", marginBottom: 12, fontSize: 13 }}>
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="btn btn-round btn-primary btn-width"
        >
          {submitting ? "Signing in..." : "Sign In Locally"}
        </button>
      </form>

      <p style={{ marginTop: 24, fontSize: 13 }}>
        <a href="/">Back to AHA SSO sign in</a>
      </p>
    </div>
  );
};

export default LocalLogin;
