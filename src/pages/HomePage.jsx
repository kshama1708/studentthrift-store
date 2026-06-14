import { useState, useEffect } from "react";
import axios from "axios";

import { ProductCard } from "../components/UI";
import Footer from "../components/Footer";
import { CATEGORIES } from "../data/Data";

const API =
  process.env.REACT_APP_API_URL ||
  "http://localhost:5000";

export default function HomePage({
  setPage,
  setSelectedProduct,
  wishlist,
  setWishlist,
  cart,
  setCart,
  addToCart,
  addToast,
  user,
})  {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCat] = useState("All");
  const [sort, setSort] = useState("default");
useEffect(() => {

  localStorage.setItem(
    "wishlist",
    JSON.stringify(wishlist)
  );

}, [wishlist]);
  // FETCH PRODUCTS
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${API}/api/products`);
      setProducts(response.data.products || []);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  // ───── WISHLIST ─────
  const toggleWishlist = (id) => {
    setWishlist((w) =>
      w.includes(id)
        ? w.filter((x) => x !== id)
        : [...w, id]
    );

    const isAlready = wishlist.includes(id);

    addToast(
      isAlready ? "Removed from wishlist" : "Added to wishlist ♥",
      "success"
    );
  };



  // VIEW PRODUCT
  const viewProduct = (p) => {
    setSelectedProduct(p);
    setPage("product-detail");
  };

  // FILTER
  const filtered = products
  .filter((p) => !p.isSold)
  .filter(
    (p) =>
      activeCategory === "All" ||
      p.category === activeCategory
  )
  .filter((p) =>
    p.title
      .toLowerCase()
      .includes(search.toLowerCase())
  )
  .sort((a, b) =>
    sort === "price-asc"
      ? a.price - b.price
      : sort === "price-desc"
      ? b.price - a.price
      : 0
  );

  const trending = products
  .filter((p) => !p.isSold)
  .slice(0, 4);
  const recent = products
  .filter((p) => !p.isSold)
  .slice(-4);

  if (loading) {
    return (
      <div className="page">
        <h2>Loading...</h2>
      </div>
    );
  }
//   const removeFromCart = (id) => {
//   setCart((prev) => prev.filter((item) => item._id !== id));
// };

  return (
    <div className="page">

      {/* HERO */}
      <div className="hero">
        <h1 className="hero-title">Buy & Sell Smart 🌿</h1>
        <p className="hero-sub">
          Affordable academic essentials — from students, for students
        </p>

        {/* SEARCH */}
        <div className="search-bar" style={{ maxWidth: 500, margin: "auto" }}>
          <span>🔍</span>

          <input
            placeholder="Search books, electronics..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select onChange={(e) => setSort(e.target.value)} style={{border:"none",borderRadius:"16px",}}>
            <option value="default">Sort</option>
            <option value="price-asc">Price ↑</option>
            <option value="price-desc">Price ↓</option>
          </select>
        </div>
      </div>

      {/* BODY */}
      <div style={{ padding: 24, maxWidth: 1200, margin: "auto" }}>

        {/* CATEGORIES */}
        <h2 className="section-title">Browse Categories</h2>

        <div style={{ display: "flex", gap: 10, overflowX: "auto" }}>
          {CATEGORIES.map((c) => (
            <div
              key={c.name}
              onClick={() => setActiveCat(c.name)}
              className={`cat-chip ${
                activeCategory === c.name ? "active" : ""
              }`}
            >
              <span>{c.emoji}</span>
              <span>{c.name}</span>
            </div>
          ))}
        </div>

        {/* PRODUCTS */}
        <h2 className="section-title">
          {activeCategory} ({filtered.length})
        </h2>

        <div className="products-grid">
        {filtered.map((p) => (
  <ProductCard
    key={p._id}
    product={p}
    onView={viewProduct}
    onWishlist={toggleWishlist}
 onAddToCart={(product) => {

  if (!user) {
    addToast(
      "Please login first",
      "error"
    );

    setPage("login");
    return;
  }

  addToCart(product);
}}
    inWishlist={wishlist.includes(p._id)}
  />
))}

        </div>

        {/* TRENDING */}
        <h2 className="section-title">🔥 Trending</h2>

        <div className="products-grid">
          {trending.map((p) => (
            <ProductCard
              key={p._id}
              product={p}
              onView={viewProduct}
              onWishlist={toggleWishlist}
             onAddToCart={(product) => {

  if (!user) {
    addToast(
      "Please login first",
      "error"
    );

    setPage("login");
    return;
  }

  addToCart(product);
}}
              inWishlist={wishlist.includes(p._id)}
            />
          ))}
        </div>

        {/* RECENT */}
        <h2 className="section-title">🕐 Recently Added</h2>

        <div className="products-grid">
          {recent.map((p) => (
            <ProductCard
              key={p._id}
              product={p}
              onView={viewProduct}
              onWishlist={toggleWishlist}
              onAddToCart={(product) => {

  if (!user) {
    addToast(
      "Please login first",
      "error"
    );

    setPage("login");
    return;
  }

  addToCart(product);
}}
              inWishlist={wishlist.includes(p._id)}
            />
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}