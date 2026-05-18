import { useState } from "react";
import { Toggle } from "../components/UI";

// SettingsContent is exported separately so DashboardPage can embed it inline
export function SettingsContent({ addToast }) {
  // Safely parse localStorage user
  const storedUser = JSON.parse(
    localStorage.getItem("user") || "{}"
  );

  // Profile state
  const [profile, setProfile] = useState({
    name: storedUser?.name || "",
    email: storedUser?.email || "",
    phone: storedUser?.phone || "",
  });

  // Preferences state
  const [toggles, setToggles] = useState({
    notifications: true,
    darkMode: false,
    emailUpdates: true,
  });

  // Toggle handler
  const flip = (key) => {
    setToggles((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  // Save profile
  const saveProfile = () => {
    localStorage.setItem("user", JSON.stringify(profile));
    addToast?.("Profile updated!", "success");
  };

  // Update password
  const updatePassword = () => {
    addToast?.("Password updated!", "success");
  };

  // Delete account
  const deleteAccount = () => {
    localStorage.removeItem("user");
    addToast?.("Account deleted!", "error");
  };

  const preferenceItems = [
    {
      k: "notifications",
      label: "Push Notifications",
      desc: "Get alerts for new messages and offers",
    },
    {
      k: "darkMode",
      label: "Dark Mode",
      desc: "Switch to a darker interface",
    },
    {
      k: "emailUpdates",
      label: "Email Updates",
      desc: "Receive weekly deals in your inbox",
    },
  ];

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 20,
        maxWidth: 560,
      }}
    >
      {/* ── Edit Profile ──────────────────────────────── */}
      <div className="card" style={{ padding: 24 }}>
        <h3
          style={{
            fontWeight: 600,
            marginBottom: 16,
            fontSize: 15,
          }}
        >
          Edit Profile
        </h3>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 12,
          }}
        >
          <input
            className="input-field"
            value={profile.name}
            onChange={(e) =>
              setProfile({
                ...profile,
                name: e.target.value,
              })
            }
            placeholder="Full Name"
          />

          <input
            className="input-field"
            value={profile.email}
            onChange={(e) =>
              setProfile({
                ...profile,
                email: e.target.value,
              })
            }
            placeholder="Email"
          />

          <input
            className="input-field"
            value={profile.phone}
            onChange={(e) =>
              setProfile({
                ...profile,
                phone: e.target.value,
              })
            }
            placeholder="Phone number"
          />

          <button
            className="btn-primary"
            style={{ alignSelf: "flex-start" }}
            onClick={saveProfile}
          >
            Save Changes
          </button>
        </div>
      </div>

      {/* ── Change Password ───────────────────────────── */}
      <div className="card" style={{ padding: 24 }}>
        <h3
          style={{
            fontWeight: 600,
            marginBottom: 16,
            fontSize: 15,
          }}
        >
          Change Password
        </h3>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 12,
          }}
        >
          <input
            className="input-field"
            type="password"
            placeholder="Current password"
          />

          <input
            className="input-field"
            type="password"
            placeholder="New password"
          />

          <input
            className="input-field"
            type="password"
            placeholder="Confirm new password"
          />

          <button
            className="btn-primary"
            style={{ alignSelf: "flex-start" }}
            onClick={updatePassword}
          >
            Update Password
          </button>
        </div>
      </div>

      {/* ── Preferences / Toggles ─────────────────────── */}
      <div className="card" style={{ padding: 24 }}>
        <h3
          style={{
            fontWeight: 600,
            marginBottom: 16,
            fontSize: 15,
          }}
        >
          Preferences
        </h3>

        {preferenceItems.map((item, index) => (
          <div
            key={item.k}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "12px 0",
              borderBottom:
                index !== preferenceItems.length - 1
                  ? "1px solid var(--cream-100)"
                  : "none",
            }}
          >
            <div>
              <p
                style={{
                  fontSize: 14,
                  fontWeight: 500,
                }}
              >
                {item.label}
              </p>

              <p
                style={{
                  fontSize: 12,
                  color: "var(--gray-400)",
                }}
              >
                {item.desc}
              </p>
            </div>

            <Toggle
              on={toggles[item.k]}
              onToggle={() => flip(item.k)}
            />
          </div>
        ))}
      </div>

      {/* ── Danger Zone ───────────────────────────────── */}
      <div
        className="card"
        style={{
          padding: 24,
          border: "1px solid #fde8e8",
        }}
      >
        <h3
          style={{
            fontWeight: 600,
            marginBottom: 8,
            fontSize: 15,
            color: "var(--red-400)",
          }}
        >
          Danger Zone
        </h3>

        <p
          style={{
            fontSize: 13,
            color: "var(--gray-500)",
            marginBottom: 14,
          }}
        >
          Once you delete your account, there is no going back.
        </p>

        <button
          onClick={deleteAccount}
          style={{
            background: "var(--red-400)",
            color: "#fff",
            padding: "9px 18px",
            borderRadius: "var(--radius-sm)",
            fontSize: 13,
            fontWeight: 500,
            cursor: "pointer",
            border: "none",
          }}
        >
          Delete Account
        </button>
      </div>
    </div>
  );
}

// Full page wrapper (used as standalone route)
export default function SettingsPage({
  setPage,
  addToast,
}) {
  return (
    <div
      className="page"
      style={{
        padding: "32px 24px",
        maxWidth: 700,
        margin: "0 auto",
      }}
    >
      <button
        className="btn-ghost"
        onClick={() => setPage("home")}
        style={{ marginBottom: 20 }}
      >
        ← Back
      </button>

      <h1
        style={{
          fontFamily: "var(--font-display)",
          fontSize: 30,
          fontWeight: 700,
          marginBottom: 24,
        }}
      >
        Settings
      </h1>

      <SettingsContent addToast={addToast} />
    </div>
  );
}