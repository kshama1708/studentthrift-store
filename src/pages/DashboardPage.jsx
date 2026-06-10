import { useState, useEffect, useCallback } from "react";
import axios from "axios";

import { StatCard, ProductCard } from "../components/UI";

const API =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000";

const TABS = [
  {
    key: "dashboard",
    icon: "📊",
    label: "Dashboard",
  },
  {
    key: "my-listings",
    icon: "📦",
    label: "My Listings",
  },
  {
    key: "wishlist",
    icon: "♥",
    label: "Wishlist",
  },
];

// ================= OVERVIEW =================
function OverviewTab({
  products,
}) {

  const soldCount =
    products.filter(
      (p) => p.isSold
    ).length;

  const wishlistCount =
    JSON.parse(
      localStorage.getItem(
        "wishlist"
      ) || "[]"
    ).length;

  return (
    <>
      <h1
        style={{
          fontFamily:
            "var(--font-display)",
          fontSize: 26,
          fontWeight: 700,
        }}
      >
        Overview
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(160px, 1fr))",
          gap: 16,
          marginTop: 20,
        }}
      >
        <StatCard
          icon="📦"
          label="Items Posted"
          value={
            products.length
          }
        />

        <StatCard
          icon="💰"
          label="Items Sold"
          value={soldCount}
        />

        <StatCard
          icon="♥"
          label="Wishlist"
          value={
            wishlistCount
          }
        />
      </div>
    </>
  );
}

// ================= MY LISTINGS =================
function MyListingsTab({
  setPage,
  products,
  setProducts,
  addToast,
}) {

  const handleDelete =
    async (id) => {

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        await axios.delete(
          `${API}/api/products/${id}`,
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

        setProducts(
          products.filter(
            (p) =>
              p._id !== id
          )
        );

        addToast?.(
          "Product deleted",
          "success"
        );

      } catch (err) {

        console.log(err);

        addToast?.(
          "Delete failed",
          "error"
        );
      }
    };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent:
            "space-between",
          marginBottom: 20,
        }}
      >
        <h1
          style={{
            fontFamily:
              "var(--font-display)",
            fontSize: 26,
          }}
        >
          My Listings
        </h1>

        <button
          className="btn-primary"
          onClick={() =>
            setPage(
              "add-product"
            )
          }
        >
          + Add New
        </button>
      </div>

      <div
        className="card"
        style={{
          overflowX: "auto",
        }}
      >
        <table className="data-table">

          <thead>
            <tr>
              <th>Item</th>
              <th>Category</th>
              <th>Price</th>
              <th>Status</th>
              <th>Delete</th>
            </tr>
          </thead>

          <tbody>

            {products.length ===
            0 ? (

              <tr>
                <td
                  colSpan="5"
                  style={{
                    textAlign:
                      "center",
                    padding: 20,
                  }}
                >
                  No listings found
                </td>
              </tr>

            ) : (

              products.map(
                (p) => (
                  <tr
                    key={p._id}
                  >

                    <td>
                      <div
                        style={{
                          display:
                            "flex",
                          gap: 10,
                          alignItems:
                            "center",
                        }}
                      >
                        <img
                          src={
                            p.images?.[0]
                              ? `${API}/${p.images[0]}`
                              : "https://via.placeholder.com/60"
                          }
                          alt={
                            p.title
                          }
                          style={{
                            width: 50,
                            height: 50,
                            borderRadius: 8,
                            objectFit:
                              "cover",
                          }}
                        />

                        {p.title}
                      </div>
                    </td>

                    <td>
                      {
                        p.category
                      }
                    </td>

                    <td
                      style={{
                        color:
                          "green",
                        fontWeight: 600,
                      }}
                    >
                      ₹{p.price}
                    </td>

                    <td>
                      <div
                        style={{
                          display:
                            "flex",
                          flexDirection:
                            "column",
                          gap: 4,
                        }}
                      >
                        <span
                          className={`badge badge-${p.status}`}
                        >
                          {
                            p.status
                          }
                        </span>

                        <span
                          style={{
                            fontSize: 12,
                            color:
                              p.isSold
                                ? "red"
                                : "green",
                          }}
                        >
                          {p.isSold
                            ? "🔴 SOLD"
                            : "🟢 AVAILABLE"}
                        </span>
                      </div>
                    </td>

                    <td>
                      <button
                        disabled={
                          p.isSold
                        }
                        onClick={() =>
                          handleDelete(
                            p._id
                          )
                        }
                        style={{
                          background:
                            p.isSold
                              ? "gray"
                              : "red",
                          color:
                            "#fff",
                          border:
                            "none",
                          padding:
                            "8px 12px",
                          borderRadius: 8,
                          cursor:
                            p.isSold
                              ? "not-allowed"
                              : "pointer",
                        }}
                      >
                        {p.isSold
                          ? "Sold"
                          : "Delete"}
                      </button>
                    </td>

                  </tr>
                )
              )

            )}

          </tbody>

        </table>
      </div>
    </>
  );
}

// ================= WISHLIST =================
function WishlistTab({
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

  // FETCH PRODUCTS
  useEffect(() => {

    const fetchWishlistProducts =
      async () => {

        try {

          setLoading(true);

          const res =
            await axios.get(
              `${API}/api/products`
            );

          const allProducts =
            res.data.products ||
            [];

          const wishlistProducts =
            allProducts.filter(
              (p) =>
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

  // REMOVE
  const removeFromWishlist =
    (id) => {

      setWishlist((w) =>
        w.filter(
          (x) => x !== id
        )
      );

      addToast?.(
        "Removed from wishlist",
        "success"
      );
    };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <h1
        style={{
          fontFamily:
            "var(--font-display)",
          fontSize: 26,
          marginBottom: 20,
        }}
      >
        Wishlist
      </h1>

      <div className="products-grid">

        {items.length === 0 ? (

          <p>
            No wishlist items
          </p>

        ) : (

          items.map((p) => (

            <div
              key={p._id}
              style={{
                position:
                  "relative",
              }}
            >

              <ProductCard
                product={p}
                onView={() => {

                  setSelectedProduct(
                    p
                  );

                  setPage(
                    "product-detail"
                  );
                }}
              />

              <button
                onClick={() =>
                  removeFromWishlist(
                    p._id
                  )
                }
                style={{
                  position:
                    "absolute",
                  top: 10,
                  right: 10,
                  background:
                    "red",
                  color:
                    "#fff",
                  border:
                    "none",
                  padding:
                    "6px 10px",
                  borderRadius: 8,
                  cursor:
                    "pointer",
                  fontSize: 12,
                }}
              >
                Remove
              </button>

            </div>

          ))
        )}

      </div>
    </>
  );
}

// ================= MAIN DASHBOARD =================
export default function DashboardPage({
  setPage,
  addToast,
  setSelectedProduct,
  wishlist,
  setWishlist,
}) {

  const [tab, setTab] =
    useState(
      "dashboard"
    );

  const [products, setProducts] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const user = JSON.parse(
    localStorage.getItem(
      "user"
    )
  );

  const fetchMyProducts =
    useCallback(
      async () => {

        try {

          const token =
            localStorage.getItem(
              "token"
            );

          const res =
            await axios.get(
              `${API}/api/products/my-products`,
              {
                headers: {
                  Authorization:
                    `Bearer ${token}`,
                },
              }
            );

          setProducts(
            res.data.products ||
              []
          );

        } catch (err) {

          console.log(err);

          addToast?.(
            "Failed to fetch products",
            "error"
          );

        } finally {

          setLoading(false);

        }
      },
      [addToast]
    );

  useEffect(() => {

    fetchMyProducts();

  }, [fetchMyProducts]);

  return (
    <div
      className="page"
      style={{
        display: "flex",
        minHeight:
          "100vh",
      }}
    >

      {/* SIDEBAR */}
      <div className="sidebar">

        <div
          style={{
            padding: 12,
            fontWeight: 700,
          }}
        >
          My Account
        </div>

        <div
          style={{
            padding: 12,
            background:
              "#f2f2f2",
            borderRadius: 8,
          }}
        >
          <div>
            {user?.name}
          </div>

          <div
            style={{
              fontSize: 12,
            }}
          >
            {user?.email}
          </div>
        </div>

        {TABS.map((t) => (
          <button
            key={t.key}
            className={`sidebar-link ${
              tab === t.key
                ? "active"
                : ""
            }`}
            onClick={() =>
              setTab(t.key)
            }
          >
            {t.icon}{" "}
            {t.label}
          </button>
        ))}

      </div>

      {/* CONTENT */}
      <div
        style={{
          flex: 1,
          padding: 30,
        }}
      >

        {loading ? (

          <p>Loading...</p>

        ) : (

          <>
            {tab ===
              "dashboard" && (
              <OverviewTab
                products={
                  products
                }
              />
            )}

            {tab ===
              "my-listings" && (
              <MyListingsTab
                setPage={
                  setPage
                }
                products={
                  products
                }
                setProducts={
                  setProducts
                }
                addToast={
                  addToast
                }
              />
            )}

            {tab ===
              "wishlist" && (
              <WishlistTab
                setPage={
                  setPage
                }
                wishlist={
                  wishlist
                }
                setWishlist={
                  setWishlist
                }
                setSelectedProduct={
                  setSelectedProduct
                }
                addToast={
                  addToast
                }
              />
            )}
          </>
        )}

      </div>
    </div>
  );
}