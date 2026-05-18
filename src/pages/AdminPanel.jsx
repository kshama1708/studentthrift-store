import { useState } from "react";
import { StatCard, BarChart } from "../components/UI";
import { PRODUCTS, USERS } from "../data/Data";
import { SettingsContent } from "./SettingsPage";

const ADMIN_TABS = [
  { key: "dashboard", icon: "📊", label: "Dashboard" },
  { key: "listings",  icon: "📦", label: "Manage Listings" },
  { key: "users",     icon: "👥", label: "Manage Users" },
  { key: "reports",   icon: "📋", label: "Reports" },
  { key: "settings",  icon: "⚙️",  label: "Settings" },
];

const categoryBarData = [
  { name: "Books",       val: 45 },
  { name: "Electronics", val: 28 },
  { name: "Notes",       val: 35 },
  { name: "Calculators", val: 22 },
  { name: "Furniture",   val: 15 },
];

const salesBarData = [
  { name: "Books",       val: 72,  suffix: "%" },
  { name: "Electronics", val: 54,  suffix: "%" },
  { name: "Notes",       val: 48,  suffix: "%" },
  { name: "Calculators", val: 39,  suffix: "%" },
  { name: "Furniture",   val: 21,  suffix: "%" },
];

// ── Sub-views ──────────────────────────────────────────────────
function AdminDashboard() {
  return (
    <>
      <h1 style={{ fontFamily: "var(--font-display)", fontSize: 26, fontWeight: 700, marginBottom: 24 }}>Admin Dashboard</h1>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 16, marginBottom: 32 }}>
        <StatCard icon="👥" label="Total Users"    value="2,418" />
        <StatCard icon="📦" label="Total Products" value="5,832" />
        <StatCard icon="✅" label="Total Sales"    value="3,241" />
        <StatCard icon="🚨" label="Reports"        value="12" />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
        <div className="card" style={{ padding: 24 }}>
          <h3 style={{ fontWeight: 700, fontSize: 15, marginBottom: 20 }}>Category Distribution</h3>
          <BarChart data={categoryBarData} />
        </div>

        <div className="card" style={{ padding: 24 }}>
          <h3 style={{ fontWeight: 700, fontSize: 15, marginBottom: 16 }}>Pending Approvals</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {PRODUCTS.slice(0, 4).map(p => (
              <div
                key={p.id}
                style={{
                  display: "flex", alignItems: "center", gap: 10,
                  padding: "8px 0", borderBottom: "1px solid var(--cream-100)",
                }}
              >
                <span style={{ fontSize: 22 }}>{p.emoji}</span>
                <div style={{ flex: 1, overflow: "hidden" }}>
                  <p style={{ fontSize: 13, fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {p.title}
                  </p>
                  <p style={{ fontSize: 11, color: "var(--gray-400)" }}>{p.seller}</p>
                </div>
                <div style={{ display: "flex", gap: 4 }}>
                  <button style={{ padding: "3px 8px", background: "var(--green-100)", color: "var(--green-600)", borderRadius: 4, border: "none", cursor: "pointer", fontSize: 11, fontWeight: 600 }}>✓</button>
                  <button style={{ padding: "3px 8px", background: "#fde8e8", color: "var(--red-400)", borderRadius: 4, border: "none", cursor: "pointer", fontSize: 11, fontWeight: 600 }}>✕</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

function ManageListings() {
  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: 26, fontWeight: 700 }}>Manage Listings</h1>
      </div>
      <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
        <div className="search-bar" style={{ maxWidth: 300 }}>
          <span>🔍</span>
          <input placeholder="Search listings..." />
        </div>
        <select className="input-field" style={{ width: 150 }}>
          <option>All status</option>
          <option>Pending</option>
          <option>Approved</option>
          <option>Rejected</option>
        </select>
      </div>
      <div className="card" style={{ overflow: "hidden" }}>
        <table className="data-table">
          <thead>
            <tr><th>Item</th><th>Category</th><th>Price</th><th>Seller</th><th>Status</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {PRODUCTS.map(p => {
              const status = p.id % 3 === 0 ? "pending" : p.id % 5 === 0 ? "rejected" : "approved";
              return (
                <tr key={p.id}>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ fontSize: 18 }}>{p.emoji}</span>
                      <span style={{ fontWeight: 500, fontSize: 13 }}>{p.title}</span>
                    </div>
                  </td>
                  <td>{p.category}</td>
                  <td style={{ color: "var(--green-500)", fontWeight: 600 }}>₹{p.price}</td>
                  <td style={{ fontSize: 12 }}>{p.seller}</td>
                  <td><span className={`badge badge-${status}`}>{status.charAt(0).toUpperCase() + status.slice(1)}</span></td>
                  <td>
                    <div style={{ display: "flex", gap: 4 }}>
                      <button style={{ padding: "4px 8px", background: "var(--green-100)", color: "var(--green-600)", borderRadius: 4, border: "none", cursor: "pointer", fontSize: 11, fontWeight: 600 }}>✓ Approve</button>
                      <button style={{ padding: "4px 8px", background: "#fde8e8", color: "var(--red-400)", borderRadius: 4, border: "none", cursor: "pointer", fontSize: 11, fontWeight: 600 }}>✕ Reject</button>
                      <button style={{ padding: "4px 8px", background: "var(--cream-100)", color: "var(--gray-600)", borderRadius: 4, border: "none", cursor: "pointer", fontSize: 11 }}>🗑</button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

function ManageUsers() {
  return (
    <>
      <h1 style={{ fontFamily: "var(--font-display)", fontSize: 26, fontWeight: 700, marginBottom: 24 }}>Manage Users</h1>
      <div className="card" style={{ overflow: "hidden" }}>
        <table className="data-table">
          <thead>
            <tr><th>User</th><th>Email</th><th>Joined</th><th>Listings</th><th>Status</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {USERS.map(u => (
              <tr key={u.id}>
                <td>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div className="avatar" style={{ width: 30, height: 30, fontSize: 12 }}>{u.name[0]}</div>
                    <span style={{ fontWeight: 500 }}>{u.name}</span>
                  </div>
                </td>
                <td style={{ fontSize: 12, color: "var(--gray-500)" }}>{u.email}</td>
                <td style={{ fontSize: 12, color: "var(--gray-400)" }}>{u.joined}</td>
                <td style={{ fontWeight: 600 }}>{u.listings}</td>
                <td>
                  <span className={`badge badge-${u.status}`}>
                    {u.status.charAt(0).toUpperCase() + u.status.slice(1)}
                  </span>
                </td>
                <td>
                  <div style={{ display: "flex", gap: 4 }}>
                    <button
                      style={{
                        padding: "4px 8px", borderRadius: 4, border: "none", cursor: "pointer", fontSize: 11, fontWeight: 600,
                        background: u.status === "active" ? "#fde8e8" : "var(--green-100)",
                        color: u.status === "active" ? "var(--red-400)" : "var(--green-600)",
                      }}
                    >{u.status === "active" ? "🚫 Block" : "✓ Unblock"}</button>
                    <button style={{ padding: "4px 8px", background: "var(--cream-100)", color: "var(--gray-600)", borderRadius: 4, border: "none", cursor: "pointer", fontSize: 11 }}>🗑 Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

function Reports() {
  return (
    <>
      <h1 style={{ fontFamily: "var(--font-display)", fontSize: 26, fontWeight: 700, marginBottom: 24 }}>Reports</h1>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 24 }}>
        {[
          ["Weekly Revenue", "₹24,800", "+12%"],
          ["New Users",      "143",     "+8%"],
          ["Listings Added", "328",     "+5%"],
          ["Avg. Rating",    "4.7 ★",  "+0.2"],
        ].map(([label, val, change]) => (
          <div key={label} className="stat-card" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <p className="stat-label">{label}</p>
              <p className="stat-value" style={{ fontSize: 24 }}>{val}</p>
            </div>
            <span
              style={{
                background: "var(--green-100)", color: "var(--green-600)",
                padding: "4px 10px", borderRadius: 20, fontSize: 12, fontWeight: 600,
              }}
            >{change}</span>
          </div>
        ))}
      </div>
      <div className="card" style={{ padding: 24 }}>
        <h3 style={{ fontWeight: 700, marginBottom: 16 }}>Sales by Category (This Month)</h3>
        <BarChart data={salesBarData} />
      </div>
    </>
  );
}

// ── Admin Panel ────────────────────────────────────────────────
export default function AdminPanel({ setPage }) {
  const [tab, setTab] = useState("dashboard");

  return (
    <div className="page" style={{ display: "flex", minHeight: "100vh" }}>
      {/* Admin sidebar */}
      <div className="admin-sidebar">
        <div style={{ padding: "4px 12px 20px", borderBottom: "1px solid rgba(255,255,255,0.1)", marginBottom: 12 }}>
          <p style={{ fontFamily: "var(--font-display)", fontSize: 16, fontWeight: 700, color: "#fff" }}>🌿 Thrift Admin</p>
          <p style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", marginTop: 2 }}>Control Panel</p>
        </div>

        {ADMIN_TABS.map(l => (
          <button key={l.key} className={`admin-link ${tab === l.key ? "active" : ""}`} onClick={() => setTab(l.key)}>
            <span style={{ fontSize: 15 }}>{l.icon}</span> {l.label}
          </button>
        ))}

        <div style={{ marginTop: "auto", paddingTop: 20, borderTop: "1px solid rgba(255,255,255,0.1)" }}>
          <button className="admin-link" onClick={() => setPage("home")}>← Exit Admin</button>
        </div>
      </div>

      {/* Content area */}
      <div style={{ flex: 1, padding: "32px 28px", background: "var(--cream-50)", overflowY: "auto" }}>
        {tab === "dashboard" && <AdminDashboard />}
        {tab === "listings"  && <ManageListings />}
        {tab === "users"     && <ManageUsers />}
        {tab === "reports"   && <Reports />}
        {tab === "settings"  && <SettingsContent />}
      </div>
    </div>
  );
}
