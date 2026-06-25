import { useState, useEffect } from "react";
import "./styles/global.css";
import axios from "axios";

// Layout
import Navbar from "./components/Navbar";
import { Toast } from "./components/UI";

// Pages
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import DashboardPage from "./pages/DashboardPage";
import WishlistPage from "./pages/WishlistPage";
import AddProductPage from "./pages/AddProductPage";
import SettingsPage from "./pages/SettingsPage";
import AdminPanel from "./pages/AdminPanel";
import AdminLogin from "./pages/AdminLoginPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckOutPages";

import { PRODUCTS } from "./data/Data";
const API =
  process.env.REACT_APP_API_URL ||
  "http://localhost:5000";
const HIDE_NAVBAR = ["login", "register", "admin", "adminLogin"];

export default function App() {
  const [page, setPage] = useState("home");
const [user, setUser] =
  useState(null);

  const [wishlist, setWishlist] =
  useState([]);

  const [cart, setCart] = useState(() =>
    JSON.parse(localStorage.getItem("cart") || "[]")
  );

  const [selectedProduct, setSelectedProduct] = useState(PRODUCTS[0]);
  const [toasts, setToasts] = useState([]);


  

  // persist cart
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);


  // toast
  const addToast = (msg, type = "info") => {
    const id = Date.now();
    setToasts((t) => [...t, { id, msg, type }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3000);
  };

  // 🛒 ADD TO CART
 const addToCart = (product) => {

  // LOGIN CHECK
  if (!user) {

    addToast(
      "Please login first",
      "error"
    );

    setPage("login");

    return;
  }

  setCart((prev) => {

    const exists = prev.find(
      (p) => p._id === product._id
    );

    if (exists) {

      addToast(
        "Already in cart 🛒",
        "info"
      );

      return [...prev];
    }


    return [
      ...prev,
      {
        ...product,
        quantity: 1,
      },
    ];
  });
};
  const shared = {
    setPage,
    setUser,
    user,
    addToast,
  };

   // FETCH WISHLIST
const fetchWishlist =
  async () => {

    try {

      const token =
        localStorage.getItem(
          "token"
        );

      if (!token) return;

      const res =
        await axios.get(
          `${API}/api/users/wishlist`,
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

      setWishlist(
        res.data.wishlist.map(
          (item) => item._id
        )
      );

    } catch (err) {

      console.log(err);

    }
  };


// useEffect
useEffect(() => {

  if (user) {

    fetchWishlist();

  }

}, [user]);
  return (
    <>
      <Toast toasts={toasts} />

      {/* NAVBAR */}
      {!HIDE_NAVBAR.includes(page) && (
        <Navbar
          page={page}
          setPage={setPage}
          user={user}
          setUser={setUser}
          cart={cart}
        />
      )}

      {/* AUTH PAGES */}
      {page === "login" && (
        <LoginPage {...shared} setUser={setUser} />
      )}

      {page === "register" && (
        <RegisterPage {...shared} />
      )}

      {
        page === "checkout" && (
          <CheckoutPage
            cart={cart}
            setCart={setCart}
            setPage={setPage}
          />
        )
      }

      {/* HOME */}
      {page === "home" && (
        <HomePage
          {...shared}
          user={user}
          wishlist={wishlist}
          setWishlist={setWishlist}
          cart={cart}
          setCart={setCart}
          addToCart={addToCart}
          setSelectedProduct={setSelectedProduct}
        />
      )}

      {/* ABOUT */}
      {page === "about" && <AboutPage />}

      {/* CART PAGE */}
      {/* CART PAGE */}
      {page === "cart" &&
        (user ? (
          <CartPage
            cart={cart}
            setCart={setCart}
            setPage={setPage}
          />
        ) : (
          <LoginPage
            {...shared}
          />
        ))}

      {/* PRODUCT DETAILS */}
      {page === "product-detail" && (
    <ProductDetailPage
  product={selectedProduct}
  wishlist={wishlist}
  setWishlist={setWishlist}
  cart={cart}
  setCart={setCart}
  addToCart={addToCart}
  {...shared}
/>
      )}

      {/* DASHBOARD */}
    {page === "dashboard" &&
  (user ? (
    <DashboardPage
      {...shared}
      wishlist={wishlist}
      setWishlist={setWishlist}
      setSelectedProduct={setSelectedProduct}
    />
  ) : (
    <LoginPage
      {...shared}
    />
  ))}

      {/* WISHLIST */}
      {/* WISHLIST */}
     {page === "wishlist" &&
  (user ? (
    <WishlistPage
      wishlist={wishlist}
      setWishlist={setWishlist}
      setSelectedProduct={setSelectedProduct}
      {...shared}
    />
  ) : (
    <LoginPage
      {...shared}
    />
  ))}
      

      {/* ADD PRODUCT */}
      {page === "add-product" && (
        <AddProductPage {...shared} />
      )}

      {/* SETTINGS */}
      {page === "settings" && (
        <SettingsPage {...shared} />
      )}

      {/* ADMIN */}
      {page === "adminLogin" && (
        <AdminLogin setPage={setPage} />
      )}

      {page === "admin" && (
        <AdminPanel setPage={setPage} />
      )}
    </>
  );
}