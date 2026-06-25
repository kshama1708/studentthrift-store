import {
  useEffect,
  useState,
} from "react";

import api from "../api/api";

import {
  BackButton,
  EmptyState,
} from "../components/UI";
const API =
  process.env.REACT_APP_API_URL ||
  "https://studentthrift-store-backend.onrender.com";
export default function WishlistPage({
  setPage,
  wishlist,
  setWishlist,
  setSelectedProduct,
  addToast,
}) {
  const [items, setItems] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  // FETCH REAL PRODUCTS
  useEffect(() => {
    const fetchWishlistProducts =
      async () => {
        try {
          setLoading(true);

          const res =
            await api.get(
              "/products"
            );

          const allProducts =
            res.data.products || [];

          const wishlistProducts =
            allProducts.filter((p) =>
              wishlist.includes(
                p._id
              )
            );

          setItems(
            wishlistProducts
          );
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      };

    fetchWishlistProducts();
  }, [wishlist]);

  // REMOVE ITEM
  const removeFromWishlist = (
    id
  ) => {
    setWishlist((w) =>
      w.filter((x) => x !== id)
    );

    addToast(
      "Removed from wishlist",
      "success"
    );
  };

  // VIEW PRODUCT
  const viewProduct = (p) => {
    setSelectedProduct(p);

    setPage("product-detail");
  };

  return (
    <div
      className="page"
      style={{
        padding: "32px 24px",
        maxWidth: 1200,
        margin: "0 auto",
      }}
    >
      <BackButton
        onClick={() =>
          setPage("home")
        }
      />

      {/* HEADER */}
      <div
        style={{
          display: "flex",
          justifyContent:
            "space-between",
          alignItems: "center",
          marginBottom: 24,
        }}
      >
        <h1
          style={{
            fontFamily:
              "var(--font-display)",
            fontSize: 30,
            fontWeight: 700,
          }}
        >
          ♥ My Wishlist

          <span
            style={{
              fontSize: 16,
              fontWeight: 400,
              color:
                "var(--gray-400)",
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
              color:
                "var(--red-400)",
              fontSize: 13,
            }}
            onClick={() => {
              setWishlist([]);

              addToast(
                "Wishlist cleared",
                "success"
              );
            }}
          >
            Clear all
          </button>
        )}
      </div>

      {/* LOADING */}
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
        /* EMPTY */
        <EmptyState
          emoji="💔"
          title="Your wishlist is empty"
          sub="Browse listings and tap the heart icon to save items."
        />
      ) : (
        /* PRODUCTS */
        <div className="products-grid">
          {items.map((p) => (
            <div
              key={p._id}
              className="product-card"
            >
              {/* IMAGE */}
              <div
                className="product-img"
              >
 <img
  src={
    p.images?.[0]
      ? `${API}/${p.images[0]}`
      : "https://via.placeholder.com/60"
  }
  alt={p.title}
  onError={(e) => {
    e.target.src = "https://via.placeholder.com/60";
  }}
  style={{
    width: 50,
    height: 50,
    borderRadius: 8,
    objectFit: "cover",
  }}
/>
              </div>

              {/* BODY */}
              <div className="product-body">
                <span
                  className={`badge badge-${p.status}`}
                >
                  {p.status}
                </span>

                <p className="product-title">
                  {p.title}
                </p>

                <div className="product-prices">
                  <span className="price-selling">
                    ₹{p.price}
                  </span>
                </div>

                <p
                  style={{
                    fontSize: 12,
                    color:
                      "var(--gray-400)",
                  }}
                >
                  by{" "}
                  {p.seller
                    ?.name ||
                    "Unknown"}
                </p>
              </div>

              {/* FOOTER */}
              <div
                className="product-footer"
                style={{
                  flexDirection:
                    "column",
                  gap: 6,
                }}
              >
                <button
                  className="btn-primary"
                  style={{
                    justifyContent:
                      "center",
                    fontSize: 13,
                    padding: "8px",
                  }}
                  onClick={() =>
                    viewProduct(
                      p
                    )
                  }
                >
                  View Details
                </button>

                <button
                  className="btn-ghost"
                  style={{
                    color:
                      "var(--red-400)",
                    fontSize: 12,
                    textAlign:
                      "center",
                  }}
                  onClick={() =>
                    removeFromWishlist(
                      p._id
                    )
                  }
                >
                  ✕ Remove from
                  Wishlist
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}