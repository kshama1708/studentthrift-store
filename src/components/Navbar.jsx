import { useState } from "react";
import { Avatar } from "./UI";
import "../styles/navbar.css"

export default function Navbar({
  page,
  setPage,
  user,
  setUser,
  cart,
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = (pageName) => {
    setPage(pageName);
    setMenuOpen(false);
  };

  const logout = () => {
    setUser(null);
    navigate("home");
  };

  return (
    <>
      {/* Overlay */}
      {menuOpen && (
        <div
          className="menu-overlay active"
          onClick={() => setMenuOpen(false)}
        />
      )}

      <nav className="navbar">
        {/* Left */}
        <div className="nav-left">
          <span
            className="nav-logo"
            onClick={() => navigate("home")}
          >
            🌿 The Thrift Store
          </span>

          {/* Desktop Links */}
          <div className="nav-links desktop-only">
            <button
              className={`btn-ghost nav-link ${
                page === "home" ? "active" : ""
              }`}
              onClick={() => navigate("home")}
            >
              Home
            </button>

            <button
              className={`btn-ghost nav-link ${
                page === "about" ? "active" : ""
              }`}
              onClick={() => navigate("about")}
            >
              About
            </button>

            {user && (
              <button
                className={`btn-ghost nav-link ${
                  page === "add-product" ? "active" : ""
                }`}
                onClick={() => navigate("add-product")}
              >
                Sell
              </button>
            )}
          </div>
        </div>

        {/* Right Desktop */}
        <div className="nav-right desktop-only">
          {user ? (
            <>
              <button
                className="btn-ghost"
                onClick={() => navigate("wishlist")}
              >
                ♥ Wishlist
              </button>

              <div className="desktop-cart">
                <button
                  className="btn-ghost"
                  onClick={() => navigate("cart")}
                >
                  🛒 Cart
                </button>

                {cart?.length > 0 && (
                  <span className="cart-badge">
                    {cart.length}
                  </span>
                )}
              </div>

              <button
                className="btn-ghost profile-btn"
                onClick={() => navigate("dashboard")}
              >
                <Avatar name={user.name} />
                <span>{user.name?.split(" ")[0]}</span>
              </button>

              <button
                className="btn-outline"
                onClick={logout}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                className="btn-ghost"
                onClick={() => navigate("login")}
              >
                Login
              </button>

              <button
                className="btn-primary"
                onClick={() => navigate("register")}
              >
                Register
              </button>
            </>
          )}
        </div>

        {/* Mobile Cart */}
        {user && (
          <button
            className="cart-mobile-btn mobile-only"
            onClick={() => navigate("cart")}
          >
            🛒

            {cart?.length > 0 && (
              <span className="cart-badge">
                {cart.length}
              </span>
            )}
          </button>
        )}

        {/* Hamburger */}
        <button
          className={`hamburger mobile-only ${
            menuOpen ? "open" : ""
          }`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Mobile Drawer */}
       <div
  className={`nav-menu ${
    menuOpen ? "active" : ""
  }`}
>
        
                    {/* Mobile Navigation */}
          <button
            className={`btn-ghost nav-link ${
              page === "home" ? "active" : ""
            }`}
            onClick={() => navigate("home")}
          >
            Home
          </button>

          <button
            className={`btn-ghost nav-link ${
              page === "about" ? "active" : ""
            }`}
            onClick={() => navigate("about")}
          >
            About
          </button>

          {user && (
            <>
              <button
                className={`btn-ghost nav-link ${
                  page === "add-product" ? "active" : ""
                }`}
                onClick={() => navigate("add-product")}
              >
                Sell
              </button>

              <button
                className="btn-ghost"
                onClick={() => navigate("wishlist")}
              >
                ♥ Wishlist
              </button>

              <button
                className="btn-ghost profile-btn"
                onClick={() => navigate("dashboard")}
              >
                <Avatar name={user.name} />
                <span>{user.name?.split(" ")[0]}</span>
              </button>

              <button
                className="btn-outline"
                onClick={logout}
              >
                Logout
              </button>
            </>
          )}

          {!user && (
            <>
              <button
                className="btn-ghost"
                onClick={() => navigate("login")}
              >
                Login
              </button>

              <button
                className="btn-primary"
                onClick={() => navigate("register")}
              >
                Register
              </button>
            </>
          )}
        </div>
      </nav>
    </>
  );
}