import { useState } from "react";
import axios from "axios";

const fields = [
  { k: "name",    label: "Full Name",         type: "text",     ph: "Your name" },
  { k: "email",   label: "Email",     type: "email",    ph: "you@gmail.edu" },
  { k: "pwd",     label: "Password",          type: "password", ph: "Create a strong password" },
  { k: "confirm", label: "Confirm Password",  type: "password", ph: "Re-enter password" },
];

export default function RegisterPage({ setPage, addToast }) {
  const [form, setForm] = useState({ name: "", email: "", pwd: "", confirm: "" });
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

const handleRegister = async () => {
  if (!form.name || !form.email || !form.pwd) {
    addToast("Please fill all fields", "error");
    return;
  }

  if (form.pwd !== form.confirm) {
    addToast("Passwords do not match", "error");
    return;
  }

  try {

  const response = await axios.post(
    "http://localhost:5000/api/auth/register",
    {
      name: form.name,
      email: form.email,
      password: form.pwd,
    }
  );

  console.log(response.data);

  addToast("Account created successfully!", "success");

  setPage("login");

} catch (err) {

  console.log(err);

  console.log(err.response?.data);

  addToast(
    err.response?.data?.message || "Registration failed",
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
          padding: "40px 36px", width: "100%", maxWidth: 420,
          boxShadow: "var(--shadow-lg)", border: "1px solid var(--cream-200)",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: 40, marginBottom: 8 }}>🌿</div>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: 26, fontWeight: 700, color: "var(--green-600)" }}>
            Join Thrift Store
          </h1>
          <p style={{ color: "var(--gray-400)", fontSize: 13, marginTop: 4 }}>Start saving money today</p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {fields.map(({ k, label, type, ph }) => (
            <div key={k}>
              <label style={{ fontSize: 13, fontWeight: 500, color: "var(--gray-700)", marginBottom: 5, display: "block" }}>
                {label}
              </label>
              <input
                className="input-field" type={type} placeholder={ph}
                value={form[k]} onChange={e => set(k, e.target.value)}
              />
            </div>
          ))}

          <button
            className="btn-primary"
            style={{ justifyContent: "center", padding: "12px", fontSize: 15, marginTop: 4 }}
            onClick={handleRegister}
          >Create Account →</button>

          <p style={{ textAlign: "center", fontSize: 13, color: "var(--gray-500)" }}>
            Already have an account?{" "}
            <span
              style={{ color: "var(--green-500)", cursor: "pointer", fontWeight: 500 }}
              onClick={() => setPage("login")}
            >Login</span>
          </p>
        </div>
      </div>
    </div>
  );
}
