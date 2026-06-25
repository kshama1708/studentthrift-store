export default function Footer() {
  return (
    <footer className="footer">
      <div
        style={{
          maxWidth: 1200, margin: "0 auto",
          display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: 32, marginBottom: 24,
        }}
      >
        <div>
          <p style={{ fontFamily: "var(--font-display)", fontSize: 20, color: "#fff", marginBottom: 8 }}>
            🌿 The Thrift Store
          </p>
          <p style={{ fontSize: 13, lineHeight: 1.6 }}>
            Your marketplace for affordable academic essentials.
          </p>
        </div>

        <div>
          <p style={{ fontWeight: 600, color: "#fff", marginBottom: 10, fontSize: 13 }}>Quick Links</p>
          {["Home", "About", "Sell an Item"].map(l => (
            <p key={l} style={{ marginBottom: 6 }}><a href="/">{l}</a></p>
          ))}
        </div>

        <div>
          <p style={{ fontWeight: 600, color: "#fff", marginBottom: 10, fontSize: 13 }}>Support</p>
          {["Contact Us", "Terms of Service", "Privacy Policy", "Help Center"].map(l => (
            <p key={l} style={{ marginBottom: 6 }}><a href="/">{l}</a></p>
          ))}
        </div>

        <div>
          <p style={{ fontWeight: 600, color: "#fff", marginBottom: 10, fontSize: 13 }}>Contact</p>
          <p style={{ fontSize: 13, marginBottom: 4 }}>📧 supportthriftstore@gmail.com</p>
          <p style={{ fontSize: 13, marginBottom: 4 }}>📞 +91 00000 00000</p>
        </div>
      </div>

      <div
        style={{
          borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: 16,
          textAlign: "center", fontSize: 12, color: "rgba(255,255,255,0.4)",
        }}
      >
        © 2026 The Thrift Store. Made with 💚 for students.
      </div>
    </footer>
  );
}
