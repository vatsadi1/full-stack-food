import React, { useState } from "react";

// Frequently asked questions with keywords
const faqData = [
  {
    keywords: ["how to order", "place order", "ordering"],
    answer:
      "To order food, browse the menu, add items to your cart, and then proceed to checkout.",
  },
  {
    keywords: ["payment", "pay", "payment methods"],
    answer:
      "We currently support cash on delivery. Online payment options are coming soon!",
  },
  {
    keywords: ["delivery time", "how long", "when will it arrive"],
    answer:
      "Typical delivery time is 30 to 45 minutes, depending on your location.",
  },
  {
    keywords: ["cancel order", "can i cancel", "remove order"],
    answer:
      "You can cancel the order from the cart page before proceeding to payment.",
  },
];

function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      from: "bot",
      text: "Hi! I'm FoodsyBot. You can ask me about ordering, payments, delivery time, or canceling orders.",
    },
  ]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;

    const userText = input.trim().toLowerCase();
    setMessages((prev) => [...prev, { from: "user", text: input }]);
    setInput("");

    // Match input against any keyword in the FAQ
    const match = faqData.find((faq) =>
      faq.keywords.some((kw) => userText.includes(kw))
    );

    setTimeout(() => {
      if (match) {
        setMessages((prev) => [...prev, { from: "bot", text: match.answer }]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            from: "bot",
            text:
              "Sorry, I don't understand that. Try asking about ordering, payment methods, delivery time, or cancellations.",
          },
        ]);
      }
    }, 500);
  };

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        style={{
          position: "fixed",
          bottom: 20,
          right: 20,
          padding: "10px 20px",
          backgroundColor: "#007bff",
          color: "#fff",
          borderRadius: 30,
          border: "none",
          cursor: "pointer",
          zIndex: 1000,
        }}
      >
        {open ? "Close Chat" : "Help Chat"}
      </button>

      {open && (
        <div
          style={{
            position: "fixed",
            bottom: 70,
            right: 20,
            width: 300,
            height: 400,
            backgroundColor: "white",
            border: "1px solid #ddd",
            borderRadius: 10,
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            display: "flex",
            flexDirection: "column",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              flex: 1,
              padding: 10,
              overflowY: "auto",
              fontSize: 14,
              lineHeight: "1.4em",
            }}
          >
            {messages.map((msg, i) => (
              <div
                key={i}
                style={{
                  marginBottom: 8,
                  textAlign: msg.from === "bot" ? "left" : "right",
                }}
              >
                <span
                  style={{
                    display: "inline-block",
                    padding: "6px 10px",
                    borderRadius: 15,
                    backgroundColor:
                      msg.from === "bot" ? "#f1f1f1" : "#007bff",
                    color: msg.from === "bot" ? "#333" : "#fff",
                    maxWidth: "80%",
                    wordWrap: "break-word",
                  }}
                >
                  {msg.text}
                </span>
              </div>
            ))}
          </div>
          <div style={{ padding: 10, borderTop: "1px solid #ddd" }}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Ask a question..."
              style={{
                width: "100%",
                padding: 8,
                borderRadius: 20,
                border: "1px solid #ccc",
                outline: "none",
              }}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default Chatbot;
