import { useState, useEffect, useRef } from "react";
import { CHAT_MESSAGES, CHAT_CONTACTS } from "../data/Data";

export default function ChatPage() {
  const [messages, setMessages] = useState(CHAT_MESSAGES);
  const [input, setInput]       = useState("");
  const [activeContact, setActiveContact] = useState(0);
  const bottomRef = useRef(null);

  const send = () => {
    if (!input.trim()) return;
    setMessages(m => [
      ...m,
      {
        id: m.length + 1, text: input, sent: true,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
    ]);
    setInput("");
  };

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const contact = CHAT_CONTACTS[activeContact];

  return (
    <div className="page" style={{ display: "flex", height: "calc(100vh - 64px)" }}>
      {/* ── Contact list ────────────────────────────────── */}
      <div style={{ width: 280, borderRight: "1px solid var(--cream-200)", background: "#fff", overflowY: "auto" }}>
        <div style={{ padding: "16px", borderBottom: "1px solid var(--cream-200)" }}>
          <p style={{ fontWeight: 700, fontSize: 16 }}>Messages</p>
        </div>

        {CHAT_CONTACTS.map((c, i) => (
          <div
            key={c.name}
            onClick={() => setActiveContact(i)}
            style={{
              padding: "14px 16px", display: "flex", gap: 10, cursor: "pointer",
              borderBottom: "1px solid var(--cream-100)", transition: "var(--transition)",
              background: activeContact === i ? "var(--green-50)" : "transparent",
            }}
            onMouseEnter={e => { if (activeContact !== i) e.currentTarget.style.background = "var(--cream-50)"; }}
            onMouseLeave={e => { if (activeContact !== i) e.currentTarget.style.background = "transparent"; }}
          >
            <div className="avatar">{c.name[0]}</div>
            <div style={{ flex: 1, overflow: "hidden" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <p style={{ fontSize: 14, fontWeight: 600 }}>{c.name}</p>
                {c.unread > 0 && (
                  <span
                    style={{
                      background: "var(--green-500)", color: "#fff",
                      borderRadius: "50%", width: 18, height: 18, fontSize: 10,
                      display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 600,
                    }}
                  >{c.unread}</span>
                )}
              </div>
              <p style={{ fontSize: 12, color: "var(--green-500)", fontWeight: 500 }}>{c.item}</p>
              <p style={{ fontSize: 11, color: "var(--gray-400)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {c.last}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* ── Chat area ───────────────────────────────────── */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", background: "var(--cream-50)" }}>
        {/* Header */}
        <div
          style={{
            padding: "14px 20px", background: "#fff",
            borderBottom: "1px solid var(--cream-200)",
            display: "flex", alignItems: "center", gap: 12,
          }}
        >
          <div className="avatar">{contact.name[0]}</div>
          <div>
            <p style={{ fontWeight: 600, fontSize: 14 }}>{contact.name}</p>
            <p style={{ fontSize: 12, color: "var(--green-500)" }}>{contact.item}</p>
          </div>
        </div>

        {/* Messages */}
        <div
          style={{ flex: 1, overflowY: "auto", padding: "20px", display: "flex", flexDirection: "column", gap: 12 }}
        >
          {messages.map(m => (
            <div key={m.id} style={{ display: "flex", flexDirection: "column", alignItems: m.sent ? "flex-end" : "flex-start" }}>
              <div className={`chat-bubble ${m.sent ? "sent" : "received"}`}>{m.text}</div>
              <span style={{ fontSize: 11, color: "var(--gray-400)", marginTop: 4 }}>{m.time}</span>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div
          style={{
            padding: "16px 20px", background: "#fff",
            borderTop: "1px solid var(--cream-200)",
            display: "flex", gap: 10,
          }}
        >
          <input
            className="input-field"
            placeholder="Type a message..."
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && send()}
            style={{ flex: 1 }}
          />
          <button className="btn-primary" onClick={send} style={{ paddingLeft: 20, paddingRight: 20 }}>
            Send ↑
          </button>
        </div>
      </div>
    </div>
  );
}
