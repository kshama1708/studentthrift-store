import {
  Stars,
  BackButton,
} from "../components/UI";

const API =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000";

export default function ProductDetailPage({
  product,
  setPage,
  wishlist,
  setWishlist,
  addToast,
}) {

  if (!product) return null;

  const productId =
    product._id || product.id;

  const inWishlist =
    wishlist.includes(productId);

  const toggleWishlist = () => {

    setWishlist((w) =>
      inWishlist
        ? w.filter((x) => x !== productId)
        : [...w, productId]
    );

    addToast(
      inWishlist
        ? "Removed from wishlist"
        : "Added to wishlist ♥",
      "success"
    );
  };

  return (
    <div
      className="page"
      style={{
        padding: "32px 24px",
        maxWidth: 1000,
        margin: "0 auto",
      }}
    >
      <BackButton
        onClick={() => setPage("home")}
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "1fr 1fr",
          gap: 32,
        }}
      >
        {/* LEFT IMAGE */}
        <div>
          <div
            style={{
              background:
                "var(--cream-100)",
              borderRadius:
                "var(--radius-lg)",
              aspectRatio: "1",
              overflow: "hidden",
            }}
          >
            <img
              src={
                product.images?.[0]
                  ? `${API}/${product.images[0]}`
                  : "https://via.placeholder.com/500"
              }
              alt={product.title}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </div>
        </div>

        {/* RIGHT INFO */}
        <div>

          {/* CATEGORY */}
          <div
            style={{
              marginBottom: 12,
            }}
          >
            <span
              className="badge"
              style={{
                background:
                  "var(--cream-100)",
                color:
                  "var(--gray-600)",
              }}
            >
              {product.category}
            </span>
          </div>

          {/* TITLE */}
          <h1
            style={{
              fontFamily:
                "var(--font-display)",
              fontSize: 30,
              fontWeight: 700,
              marginBottom: 16,
            }}
          >
            {product.title}
          </h1>

          {/* PRICE */}
          <div
            style={{
              marginBottom: 20,
            }}
          >
            <span
              style={{
                fontFamily:
                  "var(--font-display)",
                fontSize: 36,
                fontWeight: 700,
                color:
                  "var(--green-500)",
              }}
            >
              ₹{product.price}
            </span>
          </div>

          {/* SELLER */}
          <div
            style={{
              background:
                "var(--cream-50)",
              borderRadius:
                "var(--radius-md)",
              padding: 16,
              marginBottom: 20,
              border:
                "1px solid var(--cream-200)",
            }}
          >
            <p
              style={{
                fontSize: 12,
                color:
                  "var(--gray-400)",
                marginBottom: 8,
              }}
            >
              SELLER
            </p>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
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
                {product.seller?.name
                  ?.charAt(0)
                  ?.toUpperCase() || "U"}
              </div>

              <div>
                <p
                  style={{
                    fontWeight: 600,
                    fontSize: 14,
                  }}
                >
                  {product.seller?.name ||
                    "Unknown Seller"}
                </p>

                <p
                  style={{
                    fontSize: 12,
                    color:
                      "var(--gray-400)",
                  }}
                >
                  {product.seller?.email}
                </p>
              </div>
            </div>
          </div>

          {/* DESCRIPTION */}
          <div
            style={{
              background:
                "var(--cream-50)",
              borderRadius:
                "var(--radius-md)",
              padding: 14,
              marginBottom: 20,
              border:
                "1px solid var(--cream-200)",
            }}
          >
            <p
              style={{
                fontSize: 14,
                color:
                  "var(--gray-700)",
                lineHeight: 1.7,
              }}
            >
              {product.description}
            </p>
          </div>

          {/* ACTIONS */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 10,
            }}
          >
            <button
              className="btn-primary"
              style={{
                justifyContent:
                  "center",
                padding: "13px",
              }}
              onClick={() =>
                setPage("chat")
              }
            >
              💬 Chat with Seller
            </button>

            <button
              className="btn-outline"
              style={{
                justifyContent:
                  "center",
                padding: "12px",
              }}
              onClick={toggleWishlist}
            >
              {inWishlist
                ? "♥ Saved to Wishlist"
                : "♡ Add to Wishlist"}
            </button>

            <button
              className="btn-ghost"
              style={{
                color:
                  "var(--red-400)",
                fontSize: 12,
                textAlign: "center",
              }}
            >
              ⚑ Report this listing
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}