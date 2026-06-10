// import { useState } from "react";
// import axios from "axios";
// import "../styles/settings.css";

// const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

// export default function SettingsPage({ setPage, addToast = () => {} }) {
//   const user = JSON.parse(localStorage.getItem("user") || "{}");
//   const token = localStorage.getItem("token");

//   const [profile, setProfile] = useState({
//     name: user.name || "",
//     email: user.email || "",
//     phone: user.phone || "",
//   });

//   const [passwords, setPasswords] = useState({
//     currentPassword: "",
//     newPassword: "",
//     confirmPassword: "",
//   });

//   const [profileLoading, setProfileLoading] = useState(false);
//   const [passwordLoading, setPasswordLoading] = useState(false);

//   // PROFILE UPDATE
//   const updateProfile = async () => {
//     try {
//       setProfileLoading(true);

//       const res = await axios.put(
//         `${API}/api/auth/update-profile`,
//         profile,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       localStorage.setItem("user", JSON.stringify(res.data.user));
//       addToast("Profile updated successfully", "success");
//     } catch (err) {
//       addToast(err.response?.data?.message || "Profile update failed", "error");
//     } finally {
//       setProfileLoading(false);
//     }
//   };

//   // PASSWORD CHANGE
//   const changePassword = async () => {
//     if (!passwords.currentPassword || !passwords.newPassword) {
//       return addToast("Fill all fields", "error");
//     }

//     if (passwords.newPassword !== passwords.confirmPassword) {
//       return addToast("Passwords do not match", "error");
//     }

//     try {
//       setPasswordLoading(true);

//       await axios.put(
//         `${API}/api/auth/change-password`,
//         {
//           currentPassword: passwords.currentPassword,
//           newPassword: passwords.newPassword,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       addToast("Password updated successfully", "success");

//       setPasswords({
//         currentPassword: "",
//         newPassword: "",
//         confirmPassword: "",
//       });
//     } catch (err) {
//       addToast(err.response?.data?.message || "Password update failed", "error");
//     } finally {
//       setPasswordLoading(false);
//     }
//   };

//   const logout = () => {
//     localStorage.clear();
//     setPage("login");
//   };

//   return (
//     <div className="settings-container">
//       <h1 className="settings-title">Settings ⚙️</h1>

//       {/* PROFILE CARD */}
//       <div className="settings-card">
//         <h2>Profile</h2>

//         <input
//           value={profile.name}
//           onChange={(e) => setProfile({ ...profile, name: e.target.value })}
//           placeholder="Name"
//         />

//         <input
//           value={profile.email}
//           onChange={(e) => setProfile({ ...profile, email: e.target.value })}
//           placeholder="Email"
//         />

//         <input
//           value={profile.phone}
//           onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
//           placeholder="Phone"
//         />

//         <button onClick={updateProfile} disabled={profileLoading}>
//           {profileLoading ? "Saving..." : "Save Profile"}
//         </button>
//       </div>

//       {/* PASSWORD CARD */}
//       <div className="settings-card">
//         <h2>Change Password</h2>

//         <input
//           type="password"
//           placeholder="Current password"
//           value={passwords.currentPassword}
//           onChange={(e) =>
//             setPasswords({ ...passwords, currentPassword: e.target.value })
//           }
//         />

//         <input
//           type="password"
//           placeholder="New password"
//           value={passwords.newPassword}
//           onChange={(e) =>
//             setPasswords({ ...passwords, newPassword: e.target.value })
//           }
//         />

//         <input
//           type="password"
//           placeholder="Confirm password"
//           value={passwords.confirmPassword}
//           onChange={(e) =>
//             setPasswords({ ...passwords, confirmPassword: e.target.value })
//           }
//         />

//         <button onClick={changePassword} disabled={passwordLoading}>
//           {passwordLoading ? "Updating..." : "Update Password"}
//         </button>
//       </div>

//       {/* LOGOUT */}
//       <button className="logout-btn" onClick={logout}>
//         Logout
//       </button>
//     </div>
//   );
// }