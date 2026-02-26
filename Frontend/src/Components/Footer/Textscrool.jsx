// src/Components/Footer/Textscrool.jsx
import React from "react";
import { motion } from "framer-motion";

const STAGGER = 0.035;
const cn = (...args) => args.filter(Boolean).join(" ");

/**
 * TextRoll
 * - parent has height: 1em & overflow:hidden so only one line is visible
 * - top row (initial) moves up to -100% on hover
 * - bottom row (initially y:100%) moves to 0 on hover
 */
const TextRoll = ({ children, className, center = false }) => {
  const letters = String(children).split("");

  return (
    <motion.span
      initial="initial"
      whileHover="hovered"
      className={cn("textroll-wrapper", className)}
      style={{
        display: "inline-block",
        position: "relative",
        overflow: "hidden",  // CRITICAL: clips the second row
        height: "1em",       // show only one line (adjust if you use bigger font-size)
        lineHeight: 1,
        whiteSpace: "nowrap",
        verticalAlign: "middle",
        padding: "0 4px",
        cursor: "pointer",
      }}
    >
      {/* top row (visible initially) */}
      <div style={{ display: "inline-block", whiteSpace: "nowrap" }}>
        {letters.map((l, i) => {
          const delay = center
            ? STAGGER * Math.abs(i - (letters.length - 1) / 2)
            : STAGGER * i;

          return (
            <motion.span
              key={`t1-${i}`}
              variants={{
                initial: { y: 0 },
                hovered: { y: "-100%" }, // slide up
              }}
              transition={{ ease: "easeInOut", delay }}
              style={{ display: "inline-block" }}
            >
              {l}
            </motion.span>
          );
        })}
      </div>

      {/* bottom row (hidden by overflow until hover) */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          display: "inline-block",
          whiteSpace: "nowrap",
          pointerEvents: "none", // don't block the hover
        }}
      >
        {letters.map((l, i) => {
          const delay = center
            ? STAGGER * Math.abs(i - (letters.length - 1) / 2)
            : STAGGER * i;

          return (
            <motion.span
              key={`t2-${i}`}
              variants={{
                initial: { y: "100%" }, // below view
                hovered: { y: 0 },      // slide in
              }}
              transition={{ ease: "easeInOut", delay }}
              style={{ display: "inline-block" }}
            >
              {l}
            </motion.span>
          );
        })}
      </div>
    </motion.span>
  );
};

/** Skiper58: small list intended for footer use */
const Skiper58 = () => {
  const navigationItems = [
    { name: "Home" },
    { name: "About Us" },
    { name: "Delivery" },
    { name: "Privacy policy" },
    { name: "Account" },
    { name: "Login" },
  ];

  return (
    <ul
      style={{
        listStyle: "none",
        padding: 0,
        margin: 0,
        display: "flex",
        flexDirection: "column",
        gap: 8,
        alignItems: "center",
      }}
    >
      {navigationItems.map((item, idx) => (
        <li key={idx} style={{ margin: 0 }}>
          <TextRoll
            center
            className="skiper-text"
            // If you want bigger or smaller font for footer, change fontSize here
            // or control it via your Footer.css
            style={{ fontSize: "0.95rem" }}
          >
            {item.name}
          </TextRoll>
        </li>
      ))}
    </ul>
  );
};

export default Skiper58;
