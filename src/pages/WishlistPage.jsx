import { useEffect, useState } from "react";
import api from "../api/api";
import { BackButton, EmptyState } from "../components/UI";

export default function WishlistPage({
  setPage,
  wishlist,
  setWishlist,
  setSelectedProduct,
  addToast,
}) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Check login
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    // Redirect if not logged in
    if (!token || !user) {
      addToast("Please login to view your wishlist.", "error");
      setPage("login");
      return;
    }

    const fetchWishlistProducts = async () => {
      try {
        setLoading(true);

        const res = await api.get("/products");

        const allProducts = res.data.products || [];

        const wishlistProducts = allProducts.filter((p) =>
          wishlist.includes(p._id)
        );

        setItems(wishlistProducts);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchWishlistProducts();
  }, [wishlist, token, user]);

  const removeFromWishlist = (id) => {
    setWishlist((w) => w.filter((x) => x !== id));
    addToast("Removed from wishlist", "success");
  };

  const viewProduct = (p) => {
    setSelectedProduct(p);
    setPage("product-detail");
  };

  // Don't render anything while redirecting
  if (!token || !user) return null;

  return (
    <div
      className="page"
      style={{
        padding: "32px 24px",
        maxWidth: 1200,
        margin: "0 auto",
      }}
    >
      <BackButton onClick={() => setPage("home")} />

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 24,
        }}
      >
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 30,
            fontWeight: 700,
          }}
        >
          ♥ My Wishlist
          <span
            style={{
              fontSize: 16,
              fontWeight: 400,
              color: "var(--gray-400)",
              marginLeft: 10,
            }}
          >
            ({items.length} items)
          </span>
        </h1>

        {items.length > 0 && (
          <button
            className="btn-ghost"
            style={{
              color: "var(--red-400)",
              fontSize: 13,
            }}
            onClick={() => {
              setWishlist([]);
              addToast("Wishlist cleared", "success");
            }}
          >
            Clear all
          </button>
        )}
      </div>

      {loading ? (
        <div
          style={{
            textAlign: "center",
            padding: 40,
            fontSize: 18,
          }}
        >
          Loading wishlist...
        </div>
      ) : items.length === 0 ? (
        <EmptyState
          emoji="💔"
          title="Your wishlist is empty"
          sub="Browse listings and tap the heart icon to save items."
        />
      ) : (
        <div className="products-grid">
          {items.map((p) => (
            <div key={p._id} className="product-card">
              <div className="product-img">
                <img
                  src={
                    p.images?.[0] ||
                    "https://via.placeholder.com/300"
                  }
                  alt={p.title}
                  className="product-image"
                  style={{
                    width: "100%",
                    height: 200,
                    objectFit: "cover",
                    borderRadius: 12,
                  }}
                />
              </div>

              <div className="product-body">
                <span className={`badge badge-${p.status}`}>
                  {p.status}
                </span>

                <p className="product-title">{p.title}</p>

                <div className="product-prices">
                  <span className="price-selling">
                    ₹{p.price}
                  </span>
                </div>

                <p
                  style={{
                    fontSize: 12,
                    color: "var(--gray-400)",
                  }}
                >
                  by {p.seller?.name || "Unknown"}
                </p>
              </div>

              <div
                className="product-footer"
                style={{
                  flexDirection: "column",
                  gap: 6,
                }}
              >
                <button
                  className="btn-primary"
                  style={{
                    justifyContent: "center",
                    fontSize: 13,
                    padding: "8px",
                  }}
                  onClick={() => viewProduct(p)}
                >
                  View Details
                </button>

                <button
                  className="btn-ghost"
                  style={{
                    color: "var(--red-400)",
                    fontSize: 12,
                  }}
                  onClick={() => removeFromWishlist(p._id)}
                >
                  ✕ Remove from Wishlist
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}