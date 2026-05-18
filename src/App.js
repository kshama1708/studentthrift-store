import { useState } from "react";
import "./styles/global.css";

// Layout
import Navbar  from "./components/Navbar";
import { Toast } from "./components/UI";

// Pages
import LoginPage        from "./pages/LoginPage";
import RegisterPage     from "./pages/RegisterPage";
import HomePage         from "./pages/HomePage";
import AboutPage        from "./pages/AboutPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import DashboardPage    from "./pages/DashboardPage";
import WishlistPage     from "./pages/WishlistPage";
import AddProductPage   from "./pages/AddProductPage";
import ChatPage         from "./pages/ChatpPage";
import SettingsPage     from "./pages/SettingsPage";
import AdminPanel       from "./pages/AdminPanel";
import AdminLogin       from "./pages/AdminLoginPage";
import { PRODUCTS }     from "./data/Data";

// Pages where the Navbar should NOT appear
const HIDE_NAVBAR = [
  "login",
  "register",
  "admin",
  "adminLogin"
];

export default function App() {
  const [page, setPage]                     = useState("home");
  const [user, setUser]                     = useState(null);
  const [wishlist, setWishlist]             = useState([2, 4]);
  const [selectedProduct, setSelectedProduct] = useState(PRODUCTS[1]);
  const [toasts, setToasts]                 = useState([]);

  // ── Toast helper ──────────────────────────────────────────
  const addToast = (msg, type = "info") => {
    const id = Date.now();
    setToasts(t => [...t, { id, msg, type }]);
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 3000);
  };

  // ── Shared props ─────────────────────────────────────────
  const shared = { setPage, addToast };
  const productListProps = {
    ...shared,
    wishlist, setWishlist,
    setSelectedProduct,
  };

  return (
    <>
      {/* Global toast notifications */}
      <Toast toasts={toasts} />

      {/* Navbar (hidden on auth & admin pages) */}
      {!HIDE_NAVBAR.includes(page) && (
        <Navbar page={page} setPage={setPage} user={user} setUser={setUser} />
      )}

      {/* ── Page router ──────────────────────────────────── */}
      {page === "login"          && <LoginPage        {...shared} setUser={setUser} />}
      {page === "register"       && <RegisterPage      {...shared} />}
      {page === "home"           && <HomePage          {...productListProps} />}
      {page === "about"          && <AboutPage />}
      {page === "product-detail" && (
        <ProductDetailPage
          product={selectedProduct}
          wishlist={wishlist}
          setWishlist={setWishlist}
          {...shared}
        />
      )}
      {page === "dashboard"  && <DashboardPage  {...shared} />}
      {page === "wishlist"   && (
        <WishlistPage
          wishlist={wishlist}
          setWishlist={setWishlist}
          setSelectedProduct={setSelectedProduct}
          {...shared}
        />
      )}
      {page === "add-product" && <AddProductPage {...shared} />}
      {page === "chat"        && <ChatPage       {...shared} />}
      {page === "settings"    && <SettingsPage   {...shared} />}
      {page === "adminLogin" && (<AdminLogin setPage={setPage} />)}
      {page === "admin"       && <AdminPanel      setPage={setPage} />}
      
    </>
  );
}
