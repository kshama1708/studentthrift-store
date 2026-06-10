import { useState } from "react";
import jsPDF from "jspdf";
import "../styles/checkoutpage.css";
const API =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000";

export default function CheckoutPage({
  cart,
  setCart,
  setPage,
}) {
  const [ordered, setOrdered] =
    useState(false);

  const [orderedItems, setOrderedItems] =
    useState([]);

  const [finalTotal, setFinalTotal] =
    useState(0);
   

  const orderDate = new Date();

  // TOTAL PRICE
  const totalPrice = cart.reduce(
    (acc, item) =>
      acc +
      Number(item.price || 0) *
      Number(item.qty || 1),
    0
  );

  // PLACE ORDER
 const handlePlaceOrder = async () => {
  try {

    const response = await fetch(
      `${API}/api/orders/place-order`,
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",
        },

       body: JSON.stringify({
  items: cart,
        }),
      }
    );

    const data =
      await response.json();

    if (data.success) {

      setOrderedItems(cart);

      setFinalTotal(
        Number(totalPrice)
      );

      setOrdered(true);

      setCart([]);

    } else {

      alert(
        "Order failed"
      );
    }

  } catch (err) {

    console.log(err);

    alert(
      "Something went wrong"
    );
  }
};

  // DOWNLOAD RECEIPT PDF
  const downloadReceipt = () => {
    const doc = new jsPDF();

    let y = 20;

    // TITLE
    doc.setFontSize(22);

    doc.text(
      "ORDER RECEIPT",
      55,
      y
    );

    y += 20;

    // PRODUCTS
    orderedItems.forEach(
      (item, index) => {
        const price = Number(
          item.price || 0
        );

        const qty = Number(
          item.qty || 1
        );

        const subtotal =
          price * qty;

        doc.setFontSize(15);

        doc.text(
          `Product ${index + 1}`,
          20,
          y
        );

        y += 10;

        doc.setFontSize(12);

        doc.text(
          `Product Name: ${item.title ||
          item.name ||
          "Product"
          }`,
          20,
          y
        );

        y += 8;

     doc.text(
  `Seller Name: ${
    item.seller?.name ||
    item.sellerName ||
    "Seller"
  }`,
  20,
  y
);

y += 8;

doc.text(
  `Address: ${
    item.seller?.address ||
    item.address ||
    item.sellerAddress ||
    "No Address"
  }`,
  20,
  y
);
  y += 8;

        doc.text(
          `Price: Rs. ${price}`,
          20,
          y
        );



       

        y += 8;

        doc.text(
          `Subtotal: Rs. ${subtotal}`,
          20,
          y
        );

        y += 12;

        // LINE
        doc.line(
          20,
          y,
          190,
          y
        );

        y += 12;
      }
    );

    // TOTAL
    doc.setFontSize(14);

    doc.text(
      `Total Amount: Rs. ${finalTotal}`,
      20,
      y
    );

    y += 12;

    doc.text(
      "Payment Method: Cash on Delivery",
      20,
      y
    );

    y += 12;

    doc.text(
      `Order Date: ${orderDate.toLocaleDateString()}`,
      20,
      y
    );

    y += 12;

    doc.text(
      `Order Time: ${orderDate.toLocaleTimeString()}`,
      20,
      y
    );

    y += 20;
    y += 12;



    doc.setFontSize(16);

    doc.text(
      "Thank you for your order!",
      45,
      y
    );

    // SAVE PDF
    doc.save("receipt.pdf");
  };

  // ORDER SUCCESS PAGE
  if (ordered) {
    return (
      <div className="receipt-page">
        <h1>
          Order Successful 🎉
        </h1>

        <h2>
          Your Receipt
        </h2>

        {orderedItems.map(
          (item) => {
            const price =
              Number(
                item.price || 0
              );

            const qty =
              Number(
                item.qty || 1
              );

            const subtotal =
              price * qty;

            return (
              <div
                key={
                  item._id ||
                  item.id
                }
                className="receipt-card"
              >
                <p>
                  <strong>
                    Product:
                  </strong>{" "}
                  {item.title ||
                    item.name ||
                    "Product"}
                </p>

                <p>
                  <strong>
                    Seller:
                  </strong>{" "}
                  {
  item.seller?.name ||
  item.sellerName ||
  "Seller"
}
                </p>
<p>
  <strong>
    Address:
  </strong>{" "}
  {
    item.seller?.address ||
    item.address ||
    item.sellerAddress ||
    "No Address"
  }
</p>
                <p>
                  <strong>
                    Price:
                  </strong>{" "}
                  Rs. {price}
                </p>

              

                <p>
                  <strong>
                    Subtotal:
                  </strong>{" "}
                  Rs.{" "}
                  {subtotal}
                </p>
              </div>
            );
          }
        )}

        <h3>
          Total Amount:
          Rs. {finalTotal}
        </h3>

        <p>
          <strong>
            Payment Method:
          </strong>{" "}
          Cash on Delivery
        </p>
        <p>
          <strong>
            Order Date:
          </strong>{" "}
          {orderDate.toLocaleDateString()}
        </p>

        <p>
          <strong>
            Order Time:
          </strong>{" "}
          {orderDate.toLocaleTimeString()}
        </p>

        <div className="receipt-buttons">
          <button
            onClick={
              downloadReceipt
            }
            className="download-btn"
          >
            Download Receipt
          </button>

          <button
            onClick={() =>
              setPage("home")
            }
            className="continue-btn"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  // CHECKOUT PAGE
  return (
    <div className="checkout-page">
      <h1>Checkout</h1>

      <div className="payment-box">
        <h2>
          Payment Method
        </h2>

        <p>
          Cash on Delivery
        </p>
      </div>

      <h2 className="total-price">
        Total Amount:
        Rs. {totalPrice}
      </h2>

      <button
        onClick={
          handlePlaceOrder
        }
        className="place-order-btn"
      >
        Place Order
      </button>
    </div>
  );
}