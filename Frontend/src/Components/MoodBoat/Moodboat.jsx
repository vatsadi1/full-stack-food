import React, { useState } from "react";
import { food_list } from '../../assets/frontend_assets/assets'

function MoodBoat({ onAddToCart }) {
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hi! Tell me your mood and I'll suggest some food 🍔🍰🥗" },
  ]);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFood, setSelectedFood] = useState(null);

  // Mood → Category mapper
  const moodToCategory = (mood) => {
    mood = mood.toLowerCase();
    if (mood.includes("happy") || mood.includes("excited")) return "Cake";
    if (mood.includes("sad") || mood.includes("tired")) return "Deserts";
    if (mood.includes("healthy") || mood.includes("light")) return "Salad";
    if (mood.includes("hungry") || mood.includes("spicy")) return "Rolls";
    if (mood.includes("comfort") || mood.includes("cozy")) return "Pasta";
    return null;
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { from: "user", text: input };
    const newMessages = [...messages, userMessage];

    const category = moodToCategory(input);
    if (category) {
      const suggestedFoods = food_list.filter((food) => food.category === category);
      const randomFood =
        suggestedFoods[Math.floor(Math.random() * suggestedFoods.length)];

      newMessages.push({
        from: "bot",
        text: `Since you're feeling ${input}, I suggest: ${randomFood.name} 🍽️`,
        food: randomFood,
      });
    } else {
      newMessages.push({
        from: "bot",
        text: "🤔 Try moods like 'happy', 'sad', 'healthy', or 'spicy'.",
      });
    }

    setMessages(newMessages);
    setInput("");
  };

  return (
    <div style={styles.wrapper}>
      {isOpen ? (
        <div style={styles.container}>
          <div style={styles.header}>
            <span>Foodsy Bot 🤖</span>
            <button onClick={() => setIsOpen(false)} style={styles.closeBtn}>
              ✖
            </button>
          </div>
          <div style={styles.chatBox}>
            {messages.map((msg, index) => (
              <div
                key={index}
                style={{
                  ...styles.message,
                  alignSelf: msg.from === "user" ? "flex-end" : "flex-start",
                  backgroundColor: msg.from === "user" ? "#d1f5d3" : "#f0f0f0",
                }}
              >
                <p>{msg.text}</p>
                {msg.food && (
                  <div
                    style={styles.foodCard}
                    onClick={() => setSelectedFood(msg.food)}
                  >
                    <img
                      src={msg.food.image}
                      alt={msg.food.name}
                      style={styles.foodImage}
                    />
                    <p>
                      <strong>{msg.food.name}</strong> - ${msg.food.price}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div style={styles.inputBox}>
            <input
              type="text"
              value={input}
              placeholder="Type your mood..."
              onChange={(e) => setInput(e.target.value)}
              style={styles.input}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button onClick={handleSend} style={styles.button}>
              Send
            </button>
          </div>
        </div>
      ) : (
        <button style={styles.chatBtn} onClick={() => setIsOpen(true)}>
          💬 Chat
        </button>
      )}

      {/* ✅ Food Popup Modal */}
      {selectedFood && (
        <div style={styles.modalOverlay} onClick={() => setSelectedFood(null)}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <img
              src={selectedFood.image}
              alt={selectedFood.name}
              style={styles.modalImage}
            />
            <h3>{selectedFood.name}</h3>
            <p>Price: ${selectedFood.price}</p>
            <p style={{ fontSize: "14px", color: "#555" }}>
              {selectedFood.description}
            </p>
            <button
              style={styles.addToCartBtn}
              onClick={() => {
                if (onAddToCart) onAddToCart(selectedFood); // 🔥 add to cart
                setSelectedFood(null); // close modal
              }}
            >
              🛒 Add to Cart
            </button>
            <button
              style={styles.closeModalBtn}
              onClick={() => setSelectedFood(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  wrapper: {
    position: "fixed",
    bottom: "20px",
    left: "20px",
    zIndex: 1000,
  },
  container: {
    width: "300px",
    height: "400px",
    border: "1px solid #ddd",
    borderRadius: "12px",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    fontFamily: "Arial, sans-serif",
    boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
    background: "white",
  },
  header: {
    background: "#4caf50",
    color: "white",
    padding: "10px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  closeBtn: {
    background: "transparent",
    border: "none",
    color: "white",
    fontSize: "16px",
    cursor: "pointer",
  },
  chatBox: {
    flex: 1,
    padding: "10px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    overflowY: "auto",
  },
  message: {
    maxWidth: "70%",
    padding: "8px",
    borderRadius: "8px",
    fontSize: "14px",
    cursor: "default",
  },
  inputBox: {
    display: "flex",
    borderTop: "1px solid #ddd",
  },
  input: {
    flex: 1,
    padding: "10px",
    border: "none",
    outline: "none",
    fontSize: "14px",
  },
  button: {
    padding: "10px 16px",
    border: "none",
    background: "#4caf50",
    color: "white",
    cursor: "pointer",
  },
  chatBtn: {
    background: "#4caf50",
    color: "white",
    padding: "12px 16px",
    border: "none",
    borderRadius: "50px",
    cursor: "pointer",
    fontSize: "14px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.3)",
  },
  foodCard: {
    marginTop: "6px",
    border: "1px solid #ddd",
    borderRadius: "6px",
    padding: "4px",
    backgroundColor: "#fafafa",
    cursor: "pointer",
  },
  foodImage: {
    width: "70px",
    borderRadius: "6px",
    marginBottom: "4px",
  },
  // Popup Modal Styles
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    background: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2000,
  },
  modalContent: {
    background: "white",
    padding: "20px",
    borderRadius: "12px",
    width: "300px",
    textAlign: "center",
    boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
  },
  modalImage: {
    width: "100%",
    borderRadius: "10px",
    marginBottom: "10px",
  },
  addToCartBtn: {
    marginTop: "10px",
    padding: "10px 14px",
    background: "#ff9800",
    border: "none",
    color: "white",
    cursor: "pointer",
    borderRadius: "6px",
    width: "100%",
    fontWeight: "bold",
  },
  closeModalBtn: {
    marginTop: "10px",
    padding: "8px 12px",
    background: "#ccc",
    border: "none",
    color: "black",
    cursor: "pointer",
    borderRadius: "6px",
    width: "100%",
  },
};

export default MoodBoat;
