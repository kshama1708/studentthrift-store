import { BackButton, EmptyState } from "../components/UI";
import { PRODUCTS } from "../data/Data";

export default function WishlistPage({ setPage, wishlist, setWishlist, setSelectedProduct, addToast }) {
  const items = PRODUCTS.filter(p => wishlist.includes(p.id));

  const removeFromWishlist = id => {
    setWishlist(w => w.filter(x => x !== id));
    addToast("Removed from wishlist", "success");
  };

  const viewProduct = p => { setSelectedProduct(p); setPage("product-detail"); };

  return (
    <div className="page" style={{ padding: "32px 24px", maxWidth: 1200, margin: "0 auto" }}>
      <BackButton onClick={() => setPage("home")} />

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: 30, fontWeight: 700 }}>
          ♥ My Wishlist
          <span style={{ fontSize: 16, fontWeight: 400, color: "var(--gray-400)", marginLeft: 10 }}>
            ({items.length} items)
          </span>
        </h1>
        {items.length > 0 && (
          <button
            className="btn-ghost"
            style={{ color: "var(--red-400)", fontSize: 13 }}
            onClick={() => { setWishlist([]); addToast("Wishlist cleared", "success"); }}
          >Clear all</button>
        )}
      </div>

      {items.length === 0 ? (
        <EmptyState emoji="💔" title="Your wishlist is empty" sub="Browse listings and tap the heart icon to save items." />
      ) : (
        <div className="products-grid">
          {items.map(p => (
            <div key={p.id} className="product-card">
              <div className="product-img"><span>{p.emoji}</span></div>
              <div className="product-body">
                <span className={`badge badge-${p.condition.toLowerCase()}`}>{p.condition}</span>
                <p className="product-title">{p.title}</p>
                <div className="product-prices">
                  <span className="price-original">₹{p.original}</span>
                  <span className="price-selling">₹{p.price}</span>
                </div>
                <p style={{ fontSize: 12, color: "var(--gray-400)" }}>by {p.seller}</p>
              </div>
              <div className="product-footer" style={{ flexDirection: "column", gap: 6 }}>
                <button
                  className="btn-primary"
                  style={{ justifyContent: "center", fontSize: 13, padding: "8px" }}
                  onClick={() => viewProduct(p)}
                >View Details</button>
                <button
                  className="btn-ghost"
                  style={{ color: "var(--red-400)", fontSize: 12, textAlign: "center" }}
                  onClick={() => removeFromWishlist(p.id)}
                >✕ Remove from Wishlist</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
