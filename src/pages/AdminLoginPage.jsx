import { useState } from "react";
import api from "../api/api";

export default function AdminLogin({
  setPage,
}) {
  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleLogin = async () => {
    try {
      setLoading(true);

      const res = await api.post(
        "/auth/login",
        {
          email,
          password,
        }
      );

      // CHECK ADMIN
      if (
        res.data.user.role !==
        "admin"
      ) {
        alert(
          "Access denied. Not admin."
        );

        return;
      }

      // SAVE TOKEN
      localStorage.setItem(
        "token",
        res.data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(
          res.data.user
        )
      );

      alert("Admin login success");

      setPage("admin");
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data
          ?.message ||
          "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <div
        className="card"
        style={{
          maxWidth: 400,
          margin: "60px auto",
          padding: 24,
        }}
      >
        <h2
          style={{
            marginBottom: 20,
          }}
        >
          Admin Login
        </h2>

        <input
          className="input-field"
          placeholder="Admin Email"
          value={email}
          onChange={(e) =>
            setEmail(
              e.target.value
            )
          }
        />

        <input
          className="input-field"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(
              e.target.value
            )
          }
          style={{
            marginTop: 12,
          }}
        />

        <button
          className="btn-primary"
          style={{
            width: "100%",
            marginTop: 16,
          }}
          onClick={handleLogin}
          disabled={loading}
        >
          {loading
            ? "Logging in..."
            : "Login"}
        </button>
      </div>
    </div>
  );
}