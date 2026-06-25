import {
  BackButton,
} from "../components/UI";
import { useState } from "react";
const API =
  process.env.REACT_APP_API_URL ||
  "https://studentthrift-store-backend.onrender.com";
  

export default function ProductDetailPage({
  product,
  setPage,
  wishlist,
  setWishlist,
  addToast,
  addToCart,
}) {
const getImageUrl = (img) => {
  return img || "https://via.placeholder.com/500";
};
  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const [selectedImage, setSelectedImage] =
    useState(0);
console.log(JSON.stringify(product, null, 2));
  if (!product) return null;

  const productId =
    product._id || product.id;

  const inWishlist =
    wishlist.includes(productId);

const toggleWishlist = () => {

  if (!user) {
    addToast(
      "Please login first",
      "error"
    );

    setPage("login");
    return;
  }

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
console.log(
  `${API}/${product.images?.[0]}`
);
const orderNow = () => {

  if (!user) {
    addToast(
      "Please login first",
      "error"
    );

    setPage("login");
    return;
  }

  addToCart(product);

  setPage("cart");
};
console.log("Product:", product);
console.log("Images:", product.images);
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
    window.innerWidth < 768
      ? "1fr"
      : "1fr 1fr",
  gap: 32,
}}
      >
       {/* LEFT IMAGE */}
<div>

  {/* MAIN IMAGE */}
  <div
    style={{
      background: "var(--cream-100)",
      borderRadius: "var(--radius-lg)",
      aspectRatio: "1",
      overflow: "hidden",
      marginBottom: 12,
    }}
  >
    <img
src={getImageUrl(product.images?.[selectedImage])}
      alt={product.title}
      style={{
        width: "100%",
        height: "100%",
        objectFit: "cover",
      }}
    />
  </div>

  {/* THUMBNAILS */}
  <div
    style={{
      display: "flex",
      gap: 10,
      flexWrap: "wrap",
    }}
  >
    {product.images?.length > 0 &&
product.images.map((img, index) =>  (
      <img
        key={index}
       src={getImageUrl(img)}
        alt="thumb"
        onClick={() =>
          setSelectedImage(index)
        }
        style={{
          width: window.innerWidth < 768 ? 60 : 80,
height: window.innerWidth < 768 ? 60 : 80,
          objectFit: "cover",
          borderRadius: 10,
          cursor: "pointer",
          border:
            selectedImage === index
              ? "2px solid green"
              : "1px solid #ddd",
        }}
      />
    ))}
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
{/* CONDITION */}
<div
  style={{
    marginBottom: 20,
  }}
>
  <span
    style={{
      background:
        product.condition === "New"
          ? "#dcfce7"
          : "#fef3c7",
      color:
        product.condition === "New"
          ? "#166534"
          : "#92400e",
      padding: "6px 12px",
      borderRadius: 20,
      fontSize: 13,
      fontWeight: 600,
    }}
  >
    {product.condition || "Used"} Condition
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
{/* PICKUP ADDRESS */}
<div
  style={{
    background: "var(--cream-50)",
    borderRadius: "var(--radius-md)",
    padding: 14,
    marginBottom: 20,
    border:
      "1px solid var(--cream-200)",
  }}
>
  <p
    style={{
      fontSize: 12,
      color: "var(--gray-400)",
      marginBottom: 8,
    }}
  >
    PICKUP LOCATION
  </p>

  <p
    style={{
      fontSize: 14,
      lineHeight: 1.6,
      color: "var(--gray-700)",
    }}
  >
    {product.address
  ? product.address
  : "Pickup address not provided. You can mail then."}
  </p>
</div>
          {/* ACTIONS */}
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
    justifyContent: "center",
    padding: "13px",
  }}
 onClick={(e) => {

  e.stopPropagation();

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
>
  Add to Cart
</button>

  <button
    className="btn-outline"
    style={{
      justifyContent: "center",
      padding: "12px",
    }}
    onClick={orderNow}
  >
   Order Now 
  </button>

  <button
    className="btn-outline"
    style={{
      justifyContent: "center",
      padding: "12px",
    }}
    onClick={toggleWishlist}
  >
    {inWishlist ? "♥ Saved to Wishlist" : "♡ Add to Wishlist"}
  </button>

  <button
    className="btn-ghost"
    style={{
      color: "var(--red-400)",
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