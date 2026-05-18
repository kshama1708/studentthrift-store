const cards = [
  { icon: "🎯", title: "Our Mission", desc: "Make quality academic resources accessible to every student, regardless of their financial background, by creating an affordable secondhand marketplace." },
  { icon: "👁", title: "Our Vision",  desc: "A campus where no student has to choose between textbooks and meals — where sharing resources creates a stronger, kinder academic community." },
  { icon: "💚", title: "Why We Exist", desc: "We noticed students spending thousands on books and equipment used for just one semester. There had to be a better way. The Thrift Store is that way." },
  { icon: "💰", title: "How We Save You Money", desc: "Average students save ₹3,000–8,000 per semester by buying used. Our platform makes it safe, easy, and fast to find what you need at the right price." },
];


export default function AboutPage() {
  return (
    <div className="page" style={{ padding: "48px 24px", maxWidth: 900, margin: "0 auto" }}>
      {/* ── Header ───────────────────────────────────────── */}
      <div style={{ textAlign: "center", marginBottom: 48 }}>
        <span
          style={{
            background: "var(--green-100)", color: "var(--green-600)",
            padding: "4px 14px", borderRadius: 20, fontSize: 13, fontWeight: 600,
          }}
        >About Us</span>

        <h1
          style={{
            fontFamily: "var(--font-display)", fontSize: 42, fontWeight: 700,
            marginTop: 16, marginBottom: 12,
          }}
        >
          Built by students,<br />for students
        </h1>

        <p style={{ color: "var(--gray-500)", fontSize: 16, maxWidth: 560, margin: "0 auto", lineHeight: 1.7 }}>
          The Thrift Store is a student-first marketplace that makes academic life more
          affordable by connecting buyers and sellers on campus.
        </p>
      </div>

      {/* ── Cards ────────────────────────────────────────── */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 48 }}>
        {cards.map(c => (
          <div key={c.title} className="card" style={{ padding: 28 }}>
            <div style={{ fontSize: 36, marginBottom: 14 }}>{c.icon}</div>
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 700, marginBottom: 10 }}>
              {c.title}
            </h3>
            <p style={{ fontSize: 14, color: "var(--gray-500)", lineHeight: 1.7 }}>{c.desc}</p>
          </div>
        ))}
      </div>

      {/* ── Stats banner ─────────────────────────────────── */}
      {/* <div
        style={{
          background: "var(--green-600)", borderRadius: "var(--radius-xl)",
          padding: 40, textAlign: "center", color: "#fff",
        }}
      >
        <h2
          style={{
            fontFamily: "var(--font-display)", fontSize: 32, fontWeight: 700,
            marginBottom: 12,
          }}
        >Join 2,400+ students already saving</h2>
        <p style={{ opacity: 0.85, marginBottom: 24, fontSize: 15 }}>
          The Thrift Store is free to use. No listing fees. No commissions.
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
        </div>
      </div> */}
    </div>
  );
}
