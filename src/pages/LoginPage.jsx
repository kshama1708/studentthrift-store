import { useState } from "react";
import axios from "axios";

export default function LoginPage({ setPage, setUser, addToast }) {
  const [email, setEmail]     = useState("");
  const [pwd, setPwd]         = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [remember, setRemember] = useState(false);

const handleLogin = async () => {
  try {
    const response = await axios.post(
      "http://localhost:5000/api/auth/login",
      {
        email,
        password: pwd,
      }
    );

    // SAVE USER
    localStorage.setItem(
      "user",
      JSON.stringify(response.data.user)
    );

    // SAVE TOKEN
    localStorage.setItem(
      "token",
      response.data.token
    );

    // SET USER STATE
    setUser(response.data.user);

    addToast("Welcome back!", "success");

    setPage("dashboard");

  } catch (err) {
    addToast(
      err.response?.data?.message || "Login failed",
      "error"
    );
  }
};
  
  

  return (
    <div
      className="page"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, var(--green-50) 0%, var(--cream-100) 100%)",
        display: "flex", alignItems: "center", justifyContent: "center", padding: 20,
      }}
    >
      <div
        style={{
          background: "#fff", borderRadius: "var(--radius-xl)",
          padding: "40px 36px", width: "100%", maxWidth: 400,
          boxShadow: "var(--shadow-lg)", border: "1px solid var(--cream-200)",
        }}
      >
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: 40, marginBottom: 8 }}>🌿</div>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: 26, fontWeight: 700, color: "var(--green-600)" }}>
            The Thrift Store
          </h1>
          <p style={{ color: "var(--gray-400)", fontSize: 13, marginTop: 4 }}>Welcome back, student!</p>
        </div>

        {/* Fields */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div>
            <label style={{ fontSize: 13, fontWeight: 500, color: "var(--gray-700)", marginBottom: 5, display: "block" }}>
              Email
            </label>
            <input
              className="input-field" type="email" placeholder="you@gmail.com"
              value={email} onChange={e => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label style={{ fontSize: 13, fontWeight: 500, color: "var(--gray-700)", marginBottom: 5, display: "block" }}>
              Password
            </label>
            <div style={{ position: "relative" }}>
              <input
                className="input-field"
                type={showPwd ? "text" : "password"}
                placeholder="••••••••"
                value={pwd} onChange={e => setPwd(e.target.value)}
                style={{ paddingRight: 40 }}
                onKeyDown={e => e.key === "Enter" && handleLogin()}
              />
              <button
                onClick={() => setShowPwd(!showPwd)}
                style={{
                  position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)",
                  background: "none", border: "none", cursor: "pointer", fontSize: 16, color: "var(--gray-400)",
                }}
              >{showPwd ? "🙈" : "👁"}</button>
              
            </div>
          </div>

          {/* Remember + Forgot */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <label style={{ display: "flex", alignItems: "center", gap: 6, cursor: "pointer", fontSize: 13, color: "var(--gray-600)" }}>
              <input
                type="checkbox" checked={remember}
                onChange={e => setRemember(e.target.checked)}
                style={{ accentColor: "var(--green-500)" }}
              />
              Remember me
            </label>
           <span
  style={{
    fontSize: 13,
    color: "var(--green-500)",
    cursor: "pointer",
    fontWeight: 500,
  }}
  onClick={async () => {
    if (!email) {
      addToast("Enter your email first", "error");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/forgot-password",
        { email }
      );

      addToast(res.data.message, "success");
    } catch (err) {
      addToast(
        err.response?.data?.message ||
          "Failed to send reset link",
        "error"
      );
    }
  }}
>
  Forgot password?
</span>
          </div>

          <button
            className="btn-primary"
            style={{ justifyContent: "center", padding: "12px", fontSize: 15, marginTop: 4 }}
            onClick={handleLogin}
          >Login →</button>

          <p style={{ textAlign: "center", fontSize: 13, color: "var(--gray-500)" }}>
            New here?{" "}
            <span
              style={{ color: "var(--green-500)", cursor: "pointer", fontWeight: 500 }}
              onClick={() => setPage("register")}
            >Create an account</span>
          </p>

          {/* Admin shortcut */}
         <div
  style={{
    borderTop: "1px solid var(--cream-200)",
    paddingTop: 14,
    textAlign: "center",
  }}
>
  <button
    className="btn-outline"
    style={{
      width: "100%",
      justifyContent: "center",
      fontSize: 13,
    }}
    onClick={() => setPage("adminLogin")}
  >
    Go to Admin Panel
  </button>
</div>
        </div>
      </div>
    </div>
  );
}
