import { useState } from "react";
import axios from "axios";
import { BackButton } from "../components/UI";

const CATEGORY_OPTIONS = [
  "Books",
  "Electronics",
  "Notes",
  "Furniture",
  "Stationery",
];

export default function AddProductPage({
  setPage,
  addToast,
}) {
 const [form, setForm] = useState({
  title: "",
  description: "",
  category: "",
  condition: "Used",
  price: "",
  address: "",
});

  const [images, setImages] = useState([]);

  const set = (k, v) =>
    setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = async () => {
    try {

      const token =
        localStorage.getItem("token");

      // FORM DATA
      const formData =
        new FormData();

      formData.append(
        "title",
        form.title
      );

      formData.append(
        "description",
        form.description
      );
      formData.append(
        "address",
        form.address
      );
      formData.append(
        "category",
        form.category
      );
      formData.append(
  "condition",
  form.condition
);

      formData.append(
        "price",
        form.price
      );

      // IMAGES
      for (
        let i = 0;
        i < images.length;
        i++
      ) {
        formData.append(
          "images",
          images[i]
        );
      }

     const API =
  process.env.REACT_APP_API_URL ||
  "http://localhost:5000";

await axios.post(
  `${API}/api/products`,
  formData,
  {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  }
);

      setPage("dashboard");

    } catch (err) {

      console.log(
        err.response?.data ||
        err.message
      );

      addToast(
        err.response?.data?.message ||
        "Failed to add product",
        "error"
      );
    }
  };

  return (
    <div
      className="page"
      style={{
        padding: "32px 24px",
        maxWidth: 700,
        margin: "0 auto",
      }}
    >
      <BackButton onClick={() => setPage("home")} />

      <h1
        style={{
          fontFamily: "var(--font-display)",
          fontSize: 30,
          fontWeight: 700,
          marginBottom: 6,
        }}
      >
        List an Item
      </h1>

      <p
        style={{
          color: "var(--gray-400)",
          fontSize: 14,
          marginBottom: 28,
        }}
      >
        Fill in the details to list your item
      </p>

      <div className="card" style={{ padding: 28 }}>

        {/* Upload */}
        <label
  style={{
    border: "2px dashed var(--cream-300)",
    borderRadius: "var(--radius-md)",
    padding: 32,
    textAlign: "center",
    marginBottom: 20,
    cursor: "pointer",
    display: "block",
  }}
>
  <div style={{ fontSize: 36 }}>
    📸
  </div>

  <p style={{ fontWeight: 500 }}>
    Click to upload images
  </p>

  <p
    style={{
      fontSize: 13,
      color: "#666",
      marginTop: 6,
    }}
  >
    Maximum 4 images allowed
  </p>

  {images.length > 0 && (
    <p
      style={{
        fontSize: 13,
        color: "green",
        marginTop: 6,
        fontWeight: 600,
      }}
    >
      {images.length}/4 selected
    </p>
  )}

  <input
    type="file"
    multiple
    accept="image/*"
    hidden
    onChange={(e) => {

      const files =
        Array.from(
          e.target.files
        );

      if (files.length > 4) {

        addToast(
          "You can upload maximum 4 images",
          "error"
        );

        return;
      }

    setImages((prev) => {

  const combined = [
    ...prev,
    ...files,
  ];

  const unique =
    combined.filter(
      (file, index, self) =>
        index ===
        self.findIndex(
          (f) =>
            f.name === file.name
        )
    );

  if (unique.length > 4) {

    addToast(
      "Maximum 4 images allowed",
      "error"
    );

    return prev;
  }

  return unique;
});
    }}
  />
</label>

        {/* Preview */}
        {images.length > 0 && (
          <div
            style={{
              display: "flex",
              gap: 10,
              flexWrap: "wrap",
              marginBottom: 20,
            }}
          >
            {images.map((img, index) => (
              <img
                key={index}
                src={URL.createObjectURL(img)}
                alt="preview"
                style={{
                  width: 100,
                  height: 100,
                  objectFit: "cover",
                  borderRadius: 10,
                }}
              />
            ))}
          </div>
        )}

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 16,
          }}
        >

          {/* Title */}
          <input
            className="input-field"
            placeholder="Product title"
            value={form.title}
            onChange={(e) =>
              set("title", e.target.value)
            }
          />

          {/* Description */}
          <textarea
            className="input-field"
            rows={4}
            placeholder="Description"
            value={form.description}
            onChange={(e) =>
              set("description", e.target.value)
            }
          />

          {/* Category */}
          <select
            className="input-field"
            value={form.category}
            onChange={(e) =>
              set("category", e.target.value)
            }
          >
            <option value="">Select category</option>

            {CATEGORY_OPTIONS.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>

          {/* Condition */}
          <div style={{ display: "flex", gap: 10 }}>
            {["New", "Used"].map((c) => (
              <button
                key={c}
                onClick={() => set("condition", c)}
                style={{
                  flex: 1,
                  padding: 10,
                  borderRadius: 10,
                  border: "1px solid #ccc",
                  cursor: "pointer",
                  background:
                    form.condition === c
                      ? "green"
                      : "white",
                  color:
                    form.condition === c
                      ? "white"
                      : "black",
                }}
              >
                {c}
              </button>
            ))}
          </div>
          {/* Address */}
<textarea
  className="input-field"
  rows={3}
  placeholder="Pickup address / meeting location"
  value={form.address}
  onChange={(e) =>
    set("address", e.target.value)
  }
/>

          {/* Price */}
          <input
            className="input-field"
            type="number"
            placeholder="Price"
            value={form.price}
            onChange={(e) =>
              set("price", e.target.value)
            }
          />

          {/* Submit */}
          <button
            className="btn-primary"
            onClick={handleSubmit}
          >
            Publish Listing
          </button>
        </div>
      </div>
    </div>
  );
}