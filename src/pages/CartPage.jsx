export default function CartPage({ cart, setCart, setPage }) {

  // REMOVE
  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item._id !== id));
  };



  // TOTAL
  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div
      style={{
        padding: 30,
        maxWidth: 1000,
        margin: "auto",
      }}
    >
      {/* HEADER */}
      <h2 style={{ marginBottom: 25 }}>
        🛒 Your Cart ({cart.length})
      </h2>

      {cart.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            padding: 60,
            background: "#fff",
            borderRadius: 12,
          }}
        >
          <h3>Your cart is empty</h3>

          <button
            onClick={() => setPage("home")}
            style={{
              marginTop: 15,
              padding: "12px 20px",
              border: "none",
              background: "green",
              color: "#fff",
              borderRadius: 8,
              cursor: "pointer",
            }}
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <>
          {/* ITEMS */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 18,
            }}
          >
            {cart.map((item) => (
              <div
                key={item._id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: 18,
                  background: "#fff",
                  borderRadius: 12,
                  boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
                }}
              >
                {/* LEFT */}
                <div
                  style={{
                    display: "flex",
                    gap: 15,
                    alignItems: "center",
                  }}
                >
                  <img
                    src={
                      item.images?.[0]
                        ? `https://studentthrift-store-backend.onrender.com/${item.images[0]}`
                        : "https://via.placeholder.com/90"
                    }
                    alt={item.title}
                    style={{
                      width: 90,
                      height: 90,
                      objectFit: "cover",
                      borderRadius: 10,
                    }}
                  />

                  <div>
                    <h3 style={{ margin: 0 }}>
                      {item.title}
                    </h3>

                    <p
                      style={{
                        color: "gray",
                        marginTop: 5,
                      }}
                    >
                      ₹{item.price}
                    </p>

             
                  </div>
                </div>

                {/* RIGHT */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-end",
                    gap: 10,
                  }}
                >
                  <h3>
                    ₹{item.price * item.quantity}
                  </h3>

                  <button
                    onClick={() => removeFromCart(item._id)}
                    style={{
                      background: "red",
                      color: "#fff",
                      border: "none",
                      padding: "8px 14px",
                      borderRadius: 8,
                      cursor: "pointer",
                    }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* SUMMARY */}
          <div
            style={{
              marginTop: 30,
              padding: 25,
              background: "#f8f8f8",
              borderRadius: 12,
            }}
          >
            <h2>Total: ₹{total}</h2>

            <button
  onClick={() =>
    setPage("checkout")
  }
  style={{
    marginTop: 10,
    padding: "12px 22px",
    background: "green",
    color: "#fff",
    border: "none",
    borderRadius: 8,
    cursor: "pointer",
  }}
>
  Proceed to Checkout
</button>
          </div>

          {/* BACK */}
          <button
            onClick={() => setPage("home")}
            style={{
              marginTop: 20,
              padding: "10px 16px",
              background: "#fff",
              border: "1px solid #ccc",
              borderRadius: 8,
              cursor: "pointer",
            }}
          >
            ← Continue Shopping
          </button>
        </>
      )}
    </div>
  );
}