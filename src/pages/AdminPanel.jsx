import { useEffect, useMemo, useState } from "react";
import api from "../api/api";

import { StatCard, BarChart } from "../components/UI";

const ADMIN_TABS = [
  {
    key: "dashboard",
    icon: "📊",
    label: "Dashboard",
  },
  {
    key: "listings",
    icon: "📦",
    label: "Manage Listings",
  },
  {
    key: "reports",
    icon: "📋",
    label: "Reports",
  },
];

export default function AdminPanel({
  setPage,
}) {
  const [tab, setTab] =
    useState("dashboard");

  const [products, setProducts] =
    useState([]);
  const [actionLoading, setActionLoading] =
    useState(false);

  const [users, setUsers] = useState([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  const [statusFilter, setStatusFilter] =
    useState("all");

  // FETCH ALL DATA
  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setLoading(true);

        await Promise.all([
          fetchProducts(),
          fetchUsers(),
        ]);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  // FETCH PRODUCTS
  const fetchProducts = async () => {
    try {
      const res = await api.get(
        "/admin/products"
      );

      setProducts(
        res.data.products || []
      );
    } catch (error) {
      console.log(error);
    }
  };

  // FETCH USERS
  const fetchUsers = async () => {
    try {
      const res = await api.get(
        "/admin/users"
      );

      setUsers(
        res.data.users || []
      );
    } catch (error) {
      console.log(error);
    }
  };

  // APPROVE PRODUCT
  const approveProduct = async (id) => {
    try {
      setActionLoading(true);

      await api.put(
        `/admin/products/${id}/approve`
      );

      await fetchProducts();
    } catch (error) {
      console.log(error);
    } finally {
      setActionLoading(false);
    }
  };

  // REJECT PRODUCT
  const rejectProduct = async (id) => {
    try {
      setActionLoading(true);

      await api.put(
        `/admin/products/${id}/reject`
      );

      await fetchProducts();
    } catch (error) {
      console.log(error);
    } finally {
      setActionLoading(false);
    }
  };

  // DELETE PRODUCT
  const deleteProduct = async (id) => {
    const ok = window.confirm(
      "Delete this product?"
    );

    if (!ok) return;

    try {
      setActionLoading(true);

      await api.delete(
        `/admin/products/${id}`
      );

      await fetchProducts();
    } catch (error) {
      console.log(error);
    } finally {
      setActionLoading(false);
    }
  };


  // FILTER PRODUCTS
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch =
        (p.title || "")
          .toLowerCase()
          .includes(
            search.toLowerCase()
          );


      const matchesStatus =
  statusFilter === "all"
    ? true
    : statusFilter === "sold"
  ? Boolean(p.isSold)
    : p.status === statusFilter;

      return (
        matchesSearch &&
        matchesStatus
      );
    });
  }, [
    products,
    search,
    statusFilter,
  ]);

  // REAL STATS
  const stats = {
    totalUsers: users.length,
    totalProducts: products.length,
    approvedProducts: products.filter(p => p.status === "approved").length,
    rejectedProducts: products.filter(p => p.status === "rejected").length,
    soldProducts: products.filter(p => p.isSold === true).length,
  };

  if (loading) {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "24px",
          fontWeight: "bold",
        }}
      >
        Loading Admin Panel...
      </div>
    );
  }

  return (
    <div
      className="page"
      style={{
        display: "flex",
        minHeight: "100vh",
      }}
    >
      {/* SIDEBAR */}
      <div className="admin-sidebar">
        <div
          style={{
            padding: "10px 14px 20px",
            borderBottom:
              "1px solid rgba(255,255,255,0.1)",
          }}
        >
          <h2 style={{ color: "#fff" }}>
            🌿 Thrift Admin
          </h2>
        </div>

        {ADMIN_TABS.map((item) => (
          <button

            key={item.key}
            className={`admin-link ${tab === item.key
              ? "active"
              : ""
              }`}
            onClick={() =>
              setTab(item.key)
            }
          >
            {item.icon} {item.label}
          </button>
        ))}

        <button
          className="admin-link"
          style={{
            marginTop: "auto",
          }}
          onClick={() =>
            setPage("home")
          }
        >
          ← Exit Admin
        </button>
      </div>

      {/* CONTENT */}
      <div
        style={{
          flex: 1,
          padding: 30,
          background:
            "var(--cream-50)",
        }}
      >
        {/* DASHBOARD */}
        {tab === "dashboard" && (
          <>
            <h1>Admin Dashboard</h1>

            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit,minmax(200px,1fr))",
                gap: 16,
                marginTop: 20,
              }}
            >

              <StatCard
                icon="📦"
                label="Total Products"
                value={
                  stats.totalProducts
                }
              />

              <StatCard
                icon="✅"
                label="Approved"
                value={
                  stats.approvedProducts
                }
              />

              <StatCard
                icon="🚨"
                label="Rejected"
                value={stats.rejectedProducts}
              />
              <StatCard
                icon="💰"
                label="Sold Products"
                value={stats.soldProducts}
              />
            </div>
          </>
        )}

        {/* LISTINGS */}
        {tab === "listings" && (
          <>
            <h1>Manage Listings</h1>

            <div
              style={{
                display: "flex",
                gap: 10,
                margin: "20px 0",
              }}
            >
              <input
                placeholder="Search..."
                value={search}
                onChange={(e) =>
                  setSearch(
                    e.target.value
                  )
                }
                className="input-field"
              />

              <select
                className="input-field"
                value={statusFilter}
                onChange={(e) =>
                  setStatusFilter(
                    e.target.value
                  )
                }
              >
                <option value="all">
                  All
                </option>

                <option value="pending">
                  Pending
                </option>

                <option value="approved">
                  Approved
                </option>

                <option value="rejected">
                  Rejected
                </option>
                <option value="sold">Sold</option>
              </select>
            </div>

            <table className="data-table">
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Seller</th>
                  <th>Status</th>
                  <th>Price</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredProducts.length === 0 && (
                  <tr>
                    <td colSpan="5">
                      No products found
                    </td>
                  </tr>
                )}
                {filteredProducts.map(
                  (p) => (
                    <tr key={p._id}>
                      <td>
                        {p.title}
                      </td>

                      <td>
                        {
                          p.seller?.name
                        }
                      </td>

                      
                       <td>
  <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
    
    <span className={`badge badge-${p.status}`}>
      {p.status}
    </span>

    <span style={{ fontSize: 12, color: p.isSold ? "red" : "green" }}>
      {p.isSold ? "🔴 SOLD" : "🟢 AVAILABLE"}
    </span>

  </div>
</td>

                    <td>
                        ₹{p.price}
                      </td>

                      <td>
                        <div
                          style={{
                            display:
                              "flex",
                            gap: 6,
                          }}
                        >
                          <td>
  {p.isSold ? (
    <span style={{ color: "red", fontWeight: 600 }}>
      SOLD - No actions allowed
    </span>
  ) : (
    <div style={{ display: "flex", gap: 6 }}>
      
      <button
        disabled={actionLoading}
        onClick={() => approveProduct(p._id)}
      >
        Approve
      </button>

      <button
        disabled={actionLoading}
        onClick={() => rejectProduct(p._id)}
      >
        Reject
      </button>

      <button
        disabled={actionLoading}
        onClick={() => deleteProduct(p._id)}
      >
        Delete
      </button>

    </div>
  )}
</td>
                        </div>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </>
        )}

        {/* REPORTS */}
        {tab === "reports" && (
          <>
            <h1>Reports</h1>

            <BarChart
  data={[
    {
      name: "Approved",
      val: products.filter(p => p.status === "approved").length,
    },
    {
      name: "Pending",
      val: products.filter(p => p.status === "pending").length,
    },
    {
      name: "Rejected",
      val: products.filter(p => p.status === "rejected").length,
    },
    {
      name: "Sold",
      val: products.filter(p => p.isSold).length,
    },
  ]}
/>
          </>
        )}
      </div>
    </div>
  );
}