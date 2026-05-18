// ── Stars ────────────────────────────────────────────────────
export const Stars = ({ n }) => (
  <div className="stars">
    {[1, 2, 3, 4, 5].map(i => (
      <span key={i} style={{ color: i <= n ? "var(--amber-400)" : "var(--cream-300)", fontSize: 12 }}>★</span>
    ))}
  </div>
);

// ── Toast ────────────────────────────────────────────────────
export const Toast = ({ toasts }) => (
  <div className="toast-container">
    {toasts.map(t => (
      <div key={t.id} className={`toast ${t.type}`}>
        <span>{t.type === "success" ? "✓" : t.type === "error" ? "✕" : "ℹ"}</span>
        {t.msg}
      </div>
    ))}
  </div>
);

// ── Avatar ───────────────────────────────────────────────────
export const Avatar = ({ name, size = 36 }) => (
  <div className="avatar" style={{ width: size, height: size, fontSize: size * 0.38 }}>
    {name?.[0]?.toUpperCase() ?? "?"}
  </div>
);

// ── Product Card ─────────────────────────────────────────────
export const ProductCard = ({
  product,
  onView,
  onWishlist,
  inWishlist,
}) => (

  <div className="product-card">

    {/* IMAGE */}
    <div
      className="product-img"
      style={{
        position: "relative",
        height: 220,
        overflow: "hidden",
        borderRadius: 12,
      }}
    >

      <img
        src={
          product.images?.[0]
            ? `http://localhost:5000/${product.images[0]}`
            : "https://via.placeholder.com/300"
        }
        alt={product.title}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />

      {/* WISHLIST */}
      <button
        onClick={() =>
          onWishlist?.(product._id)
        }
        style={{
          position: "absolute",
          top: 10,
          right: 10,
          fontSize: 16,
          color: inWishlist
            ? "var(--red-400)"
            : "var(--cream-300)",
          background: "#fff",
          borderRadius: "50%",
          width: 30,
          height: 30,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "var(--shadow-sm)",
          transition: "color 0.2s",
          border: "none",
          cursor: "pointer",
        }}
      >
        ♥
      </button>
    </div>

    {/* BODY */}
    <div className="product-body">

      {/* CATEGORY */}
      <div
        style={{
          display: "flex",
          justifyContent:
            "space-between",
          alignItems: "center",
          marginBottom: 8,
        }}
      >
        <span
          className="badge"
          style={{
            background:
              "var(--cream-100)",
            color:
              "var(--gray-700)",
          }}
        >
          {product.category}
        </span>
      </div>

      {/* TITLE */}
      <p className="product-title">
        {product.title}
      </p>

      {/* PRICE */}
      <div className="product-prices">

        <span className="price-selling">
          ₹{product.price}
        </span>

      </div>

      {/* SELLER */}
      <p
        style={{
          fontSize: 12,
          color: "var(--gray-400)",
        }}
      >
        by{" "}
        {product.seller?.name ||
          "Unknown Seller"}
      </p>
    </div>

    {/* FOOTER */}
    <div className="product-footer">

      <button
        className="btn-primary"
        style={{
          flex: 1,
          justifyContent:
            "center",
          padding: "8px 12px",
          fontSize: 13,
        }}
        onClick={() =>
          onView?.(product)
        }
      >
        View Details
      </button>

    </div>
  </div>
);

// ── Toggle Switch ────────────────────────────────────────────
export const Toggle = ({ on, onToggle }) => (
  <button className={`toggle ${on ? "on" : ""}`} onClick={onToggle} />
);

// ── Stat Card ────────────────────────────────────────────────
export const StatCard = ({ icon, label, value }) => (
  <div className="stat-card">
    <span style={{ fontSize: 28 }}>{icon}</span>
    <p className="stat-value">{value}</p>
    <p className="stat-label">{label}</p>
  </div>
);

// ── Bar Chart Row ────────────────────────────────────────────
export const BarChart = ({ data }) => {
  const max = Math.max(...data.map(d => d.val));
  return (
    <div className="bar-chart">
      {data.map(d => (
        <div key={d.name} className="bar-row">
          <span className="bar-label">{d.name}</span>
          <div className="bar-track">
            <div className="bar-fill" style={{ width: `${(d.val / max) * 100}%` }} />
          </div>
          <span className="bar-val">{d.suffix ? `${d.val}${d.suffix}` : d.val}</span>
        </div>
      ))}
    </div>
  );
};

// ── Page Wrapper ─────────────────────────────────────────────
export const PageWrapper = ({ children, maxWidth = 1200, pad = "32px 24px" }) => (
  <div className="page" style={{ padding: pad, maxWidth, margin: "0 auto" }}>
    {children}
  </div>
);

// ── Section Title ────────────────────────────────────────────
export const SectionTitle = ({ children, sub }) => (
  <div style={{ marginBottom: 20 }}>
    <h2 className="section-title" style={{ marginBottom: sub ? 4 : 0 }}>{children}</h2>
    {sub && <p style={{ fontSize: 13, color: "var(--gray-400)" }}>{sub}</p>}
  </div>
);

// ── Back Button ───────────────────────────────────────────────
export const BackButton = ({ onClick }) => (
  <button className="btn-ghost" onClick={onClick} style={{ marginBottom: 20, display: "flex", alignItems: "center", gap: 6 }}>
    ← Back
  </button>
);

// ── Empty State ───────────────────────────────────────────────
export const EmptyState = ({ emoji = "📭", title, sub }) => (
  <div style={{ textAlign: "center", padding: "48px 24px", color: "var(--gray-400)" }}>
    <div style={{ fontSize: 48, marginBottom: 12 }}>{emoji}</div>
    <p style={{ fontWeight: 600, fontSize: 16, color: "var(--gray-700)", marginBottom: 4 }}>{title}</p>
    <p style={{ fontSize: 13 }}>{sub}</p>
  </div>
);
