import { useState, useEffect } from "react";
import axios from "axios";

import { ProductCard } from "../components/UI";
import Footer from "../components/Footer";
import { CATEGORIES } from "../data/Data";

const API =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000";

export default function HomePage({
  setPage,
  setSelectedProduct,
  wishlist,
  setWishlist,
  addToast,
}) {

  const [products, setProducts] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  const [activeCategory, setActiveCat] =
    useState("All");

  const [sort, setSort] =
    useState("default");

  // FETCH PRODUCTS
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {

      const response = await axios.get(
        `${API}/api/products`
      );

      setProducts(
        response.data.products
      );

    } catch (err) {

      console.log(err);

    } finally {

      setLoading(false);
    }
  };

  // WISHLIST
  const toggleWishlist = (id) => {

    setWishlist((w) =>
      w.includes(id)
        ? w.filter((x) => x !== id)
        : [...w, id]
    );

    addToast(
      wishlist.includes(id)
        ? "Removed from wishlist"
        : "Added to wishlist ♥",
      "success"
    );
  };

  // VIEW PRODUCT
  const viewProduct = (p) => {

    setSelectedProduct(p);

    setPage("product-detail");
  };

  // FILTER PRODUCTS
  const filtered = products
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

  // TRENDING
  const trending = [...products]
    .slice(0, 4);

  // RECENT
  const recent = [...products]
    .reverse()
    .slice(0, 4);

  // LOADING
  if (loading) {
    return (
      <div className="page">
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <div className="page">

      {/* HERO */}
      <div className="hero">

        <h1 className="hero-title">
          Buy & Sell Smart 🌿
        </h1>

        <p className="hero-sub">
          Affordable academic essentials —
          from students, for students
        </p>

        {/* SEARCH */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div
            className="search-bar"
            style={{ maxWidth: 500 }}
          >
            <span>🔍</span>

            <input
              placeholder="Search books, electronics..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />

            <select
              onChange={(e) =>
                setSort(e.target.value)
              }
              style={{
                border: "none",
                outline: "none",
                fontSize: 12,
                color: "var(--gray-500)",
                background: "transparent",
                cursor: "pointer",
              }}
            >
              <option value="default">
                Sort
              </option>

              <option value="price-asc">
                Price ↑
              </option>

              <option value="price-desc">
                Price ↓
              </option>
            </select>
          </div>
        </div>

        {/* QUICK FILTERS */}
        <div
          style={{
            display: "flex",
            gap: 10,
            justifyContent: "center",
            marginTop: 16,
            flexWrap: "wrap",
          }}
        >
          {[
            "Books",
            "Electronics",
            "Notes",
            "Calculators",
          ].map((c) => (
            <span
              key={c}
              onClick={() =>
                setActiveCat(c)
              }
              style={{
                background:
                  "rgba(255,255,255,0.2)",
                color: "#fff",
                padding: "4px 14px",
                borderRadius: 20,
                fontSize: 12,
                cursor: "pointer",
                fontWeight: 500,
                backdropFilter:
                  "blur(4px)",
              }}
            >
              {c}
            </span>
          ))}
        </div>
      </div>

      {/* BODY */}
      <div
        style={{
          padding: "32px 24px",
          maxWidth: 1200,
          margin: "0 auto",
        }}
      >

        {/* CATEGORIES */}
        <h2 className="section-title">
          Browse Categories
        </h2>

        <div
          style={{
            display: "flex",
            gap: 10,
            overflowX: "auto",
            paddingBottom: 8,
            marginBottom: 32,
          }}
        >
          {CATEGORIES.map((c) => (
            <div
              key={c.name}
              className={`cat-chip ${
                activeCategory === c.name
                  ? "active"
                  : ""
              }`}
              onClick={() =>
                setActiveCat(c.name)
              }
            >
              <span
                style={{ fontSize: 26 }}
              >
                {c.emoji}
              </span>

              <span
                style={{
                  fontSize: 12,
                  fontWeight: 500,
                  color:
                    "var(--gray-700)",
                }}
              >
                {c.name}
              </span>
            </div>
          ))}
        </div>

        {/* PRODUCTS */}
        <div
          style={{
            display: "flex",
            justifyContent:
              "space-between",
            alignItems: "center",
            marginBottom: 16,
          }}
        >
          <h2
            className="section-title"
            style={{ marginBottom: 0 }}
          >
            {activeCategory === "All"
              ? "All Listings"
              : activeCategory}

            <span
              style={{
                fontSize: 14,
                fontWeight: 400,
                color:
                  "var(--gray-400)",
                marginLeft: 8,
              }}
            >
              ({filtered.length} items)
            </span>
          </h2>
        </div>

        <div
          className="products-grid"
          style={{ marginBottom: 48 }}
        >
          {filtered.length === 0 ? (
            <p>No products found</p>
          ) : (
            filtered.map((p) => (
              <ProductCard
                key={p._id}
                product={p}
                onView={viewProduct}
                onWishlist={
                  toggleWishlist
                }
                inWishlist={wishlist.includes(
                  p._id
                )}
              />
            ))
          )}
        </div>

        {/* TRENDING */}
        <h2 className="section-title">
          🔥 Trending Deals
        </h2>

        <div
          className="products-grid"
          style={{ marginBottom: 48 }}
        >
          {trending.map((p) => (
            <ProductCard
              key={p._id}
              product={p}
              onView={viewProduct}
              onWishlist={
                toggleWishlist
              }
              inWishlist={wishlist.includes(
                p._id
              )}
            />
          ))}
        </div>

        {/* RECENT */}
        <h2 className="section-title">
          🕐 Recently Added
        </h2>

        <div className="products-grid">
          {recent.map((p) => (
            <ProductCard
              key={p._id}
              product={p}
              onView={viewProduct}
              onWishlist={
                toggleWishlist
              }
              inWishlist={wishlist.includes(
                p._id
              )}
            />
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}