import { useState, useEffect, useCallback } from "react";
import axios from "axios";

import { StatCard, ProductCard } from "../components/UI";
import SettingsContent from "./SettingsPage";

const API =
  import.meta.env.VITE_API_URL || "http://localhost:5000";

const TABS = [
  { key: "dashboard", icon: "📊", label: "Dashboard" },
  { key: "my-listings", icon: "📦", label: "My Listings" },
  { key: "wishlist", icon: "♥", label: "Wishlist" },
  { key: "chat", icon: "💬", label: "Chats" },
  { key: "settings", icon: "⚙️", label: "Settings" },
];

// ── Overview Tab ─────────────────────────────
function OverviewTab({ products }) {
  return (
    <>
      <h1
        style={{
          fontFamily: "var(--font-display)",
          fontSize: 26,
          fontWeight: 700,
          marginBottom: 24,
        }}
      >
        Overview
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
          gap: 16,
          marginBottom: 32,
        }}
      >
        <StatCard
          icon="📦"
          label="Items Posted"
          value={products.length}
        />

        <StatCard
          icon="✅"
          label="Items Sold"
          value="0"
        />

        <StatCard
          icon="♥"
          label="Wishlist"
          value="0"
        />

        <StatCard
          icon="💬"
          label="Active Chats"
          value="0"
        />
      </div>
    </>
  );
}

// ── My Listings Tab ──────────────────────────
function MyListingsTab({
  setPage,
  products,
  setProducts,
  addToast,
}) {
  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(
        `${API}/api/products/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setProducts(
        products.filter((p) => p._id !== id)
      );

      addToast?.("Product deleted", "success");

    } catch (err) {
      console.log(err);

      addToast?.("Delete failed", "error");
    }
  };

  return (
    <>
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
            fontSize: 26,
            fontWeight: 700,
          }}
        >
          My Listings
        </h1>

        <button
          className="btn-primary"
          onClick={() => setPage("add-product")}
        >
          + Add New
        </button>
      </div>

      <div
        className="card"
        style={{ overflowX: "auto" }}
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
            {products.length === 0 ? (
              <tr>
                <td
                  colSpan="5"
                  style={{
                    textAlign: "center",
                    padding: 20,
                  }}
                >
                  No listings found
                </td>
              </tr>
            ) : (
              products.map((p) => (
                <tr key={p._id}>
                  <td>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                      }}
                    >
                      <img
                        src={
                          p.images?.[0]
                            ? `${API}/${p.images[0]}`
                            : "https://via.placeholder.com/60"
                        }
                        alt={p.title}
                        style={{
                          width: 50,
                          height: 50,
                          objectFit: "cover",
                          borderRadius: 8,
                        }}
                      />

                      <span
                        style={{ fontWeight: 500 }}
                      >
                        {p.title}
                      </span>
                    </div>
                  </td>

                  <td>{p.category}</td>

                  <td
                    style={{
                      color: "var(--green-500)",
                      fontWeight: 600,
                    }}
                  >
                    ₹{p.price}
                  </td>

                  <td>
                    <span className="badge badge-approved">
                      Active
                    </span>
                  </td>

                  <td>
                    <button
                      onClick={() =>
                        handleDelete(p._id)
                      }
                      style={{
                        background: "red",
                        color: "#fff",
                        border: "none",
                        padding: "8px 12px",
                        borderRadius: 8,
                        cursor: "pointer",
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

// ── Wishlist Tab ─────────────────────────────
function WishlistTab({ setPage, products }) {
  return (
    <>
      <h1
        style={{
          fontFamily: "var(--font-display)",
          fontSize: 26,
          fontWeight: 700,
          marginBottom: 24,
        }}
      >
        Wishlist
      </h1>

      <div className="products-grid">
        {products.length === 0 ? (
          <p>No wishlist items</p>
        ) : (
          products.map((p) => (
            <ProductCard
              key={p._id}
              product={p}
              onView={() =>
                setPage("product-detail")
              }
            />
          ))
        )}
      </div>
    </>
  );
}

// ── Dashboard Page ───────────────────────────
export default function DashboardPage({
  setPage,
  addToast,
}) {
  const [tab, setTab] =
    useState("dashboard");

  const [products, setProducts] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const user = JSON.parse(
    localStorage.getItem("user")
  );


const fetchMyProducts = useCallback(async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.get(
      `${API}/api/products/my-products`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setProducts(response.data.products || []);
  } catch (err) {
    console.log(err);
    addToast?.("Failed to fetch products", "error");
  } finally {
    setLoading(false);
  }
}, []);


  const goTo = (key) => {
    if (key === "chat") {
      setPage("chat");
      return;
    }

    setTab(key);
  };
 useEffect(() => {
  fetchMyProducts();
}, [fetchMyProducts]);

  return (
    <div
      className="page"
      style={{
        display: "flex",
        minHeight: "calc(100vh - 64px)",
      }}
    >
      {/* Sidebar */}
      <div className="sidebar">
        <p
          style={{
            fontFamily:
              "var(--font-display)",
            fontSize: 16,
            fontWeight: 700,
            color: "var(--green-600)",
            padding: "0 12px",
            marginBottom: 12,
          }}
        >
          My Account
        </p>

        {/* User Card */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "10px 12px",
            marginBottom: 16,
            background: "var(--green-50)",
            borderRadius:
              "var(--radius-sm)",
          }}
        >
          <div
            className="avatar"
            style={{
              width: 40,
              height: 40,
              fontSize: 16,
            }}
          >
            {user?.name
              ?.charAt(0)
              ?.toUpperCase()}
          </div>

          <div>
            <p
              style={{
                fontSize: 13,
                fontWeight: 600,
              }}
            >
              {user?.name}
            </p>

            <p
              style={{
                fontSize: 11,
                color: "var(--gray-400)",
              }}
            >
              {user?.email}
            </p>
          </div>
        </div>

        {/* Tabs */}
        {TABS.map((t) => (
          <button
            key={t.key}
            className={`sidebar-link ${
              tab === t.key
                ? "active"
                : ""
            }`}
            onClick={() => goTo(t.key)}
          >
            <span>{t.icon}</span>
            {t.label}
          </button>
        ))}
      </div>

      {/* Main Content */}
      <div
        style={{
          flex: 1,
          padding: "32px 28px",
          overflowY: "auto",
        }}
      >
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            {tab === "dashboard" && (
              <OverviewTab
                products={products}
              />
            )}

            {tab === "my-listings" && (
              <MyListingsTab
                setPage={setPage}
                products={products}
                setProducts={setProducts}
                addToast={addToast}
              />
            )}

            {tab === "wishlist" && (
              <WishlistTab
                setPage={setPage}
                products={products}
              />
            )}

            {tab === "settings" && (
              <SettingsContent />
            )}
          </>
        )}
      </div>
    </div>
  );
}