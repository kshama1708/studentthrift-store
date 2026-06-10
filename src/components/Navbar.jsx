import { Avatar } from "./UI";

export default function Navbar({ page, setPage, user, setUser, cart })  {
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
            </>
          )}
        </div>
      </div>

      {/* Right: auth / user */}
      <div className="nav-right">
        {user ? (
          <>
            <button className="btn-ghost" onClick={() => setPage("wishlist")}>♥ Wishlist</button>
         <div style={{ position: "relative", display: "inline-block" }}>
<div style={{ position: "relative" }}>
  <button
    className="btn-ghost"
    onClick={() => setPage("cart")}
    style={{
      display: "flex",
      alignItems: "center",
      gap: 6,
    }}
  >
    🛒 Cart
  </button>

  {cart?.length > 0 && (
    <span
      style={{
        position: "absolute",
        top: -6,
        right: -10,
        background: "red",
        color: "white",
        fontSize: 11,
        width: 18,
        height: 18,
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: "bold",
      }}
    >
      {cart.length}
    </span>
  )}
</div>

</div>
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
