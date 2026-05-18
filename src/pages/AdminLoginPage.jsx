import { useState } from "react";

export default function AdminLogin({ setPage }) {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (
      name === "admin" &&
      password === "12345"
    ) {
      setPage("admin");
    } else {
      alert("Wrong admin credentials");
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
        <h2 style={{ marginBottom: 20 }}>
          Admin Login
        </h2>

        <input
          className="input-field"
          placeholder="Admin Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="input-field"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ marginTop: 12 }}
        />

        <button
          className="btn-primary"
          style={{ width: "100%", marginTop: 16 }}
          onClick={handleLogin}
        >
          Login
        </button>
      </div>
    </div>
  );
}