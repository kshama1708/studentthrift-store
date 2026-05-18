import { Avatar } from "./UI";

export default function Navbar({ page, setPage, user, setUser }) {
  return (
    <nav className="navbar">
      {/* Left: logo + links */}
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <span className="nav-logo" onClick={() => setPage("home")}>🌿 The Thrift Store</span>

        <div className="nav-links">
          <button
            className={`btn-ghost nav-link ${page === "home" ? "active" : ""}`}
            onClick={() => setPage("home")}
          >Home</button>
          <button
            className={`btn-ghost nav-link ${page === "about" ? "active" : ""}`}
            onClick={() => setPage("about")}
          >About</button>

          {user && (
            <>
              <button
                className={`btn-ghost nav-link ${page === "add-product" ? "active" : ""}`}
                onClick={() => setPage("add-product")}
              >Sell</button>
              <button
                className={`btn-ghost nav-link ${page === "chat" ? "active" : ""}`}
                onClick={() => setPage("chat")}
              >Chats</button>
            </>
          )}
        </div>
      </div>

      {/* Right: auth / user */}
      <div className="nav-right">
        {user ? (
          <>
            <button className="btn-ghost" onClick={() => setPage("wishlist")}>♥ Wishlist</button>
          
            <button
              className="btn-ghost"
              onClick={() => setPage("dashboard")}
              style={{ display: "flex", alignItems: "center", gap: 8 }}
            >
              <Avatar name={user.name} />
              <span style={{ fontSize: 13 }}>{user.name?.split(" ")[0]}</span>
            </button>
            <button
              className="btn-outline"
              onClick={() => { setUser(null); setPage("home"); }}
            >Logout</button>
          </>
        ) : (
          <>
            <button className="btn-ghost" onClick={() => setPage("login")}>Login</button>
            <button className="btn-primary" onClick={() => setPage("register")}>Register</button>
          </>
        )}
      </div>
    </nav>
  );
}
