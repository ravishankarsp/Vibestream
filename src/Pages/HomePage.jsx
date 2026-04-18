import React, { useEffect, useState } from "react";
import "../Styles/HomePage.css";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate()
  const cardDetails = [
    {
      mode: "Happy",
      emoji: ["😊", "😄", "😁", "😆", "😃", "😍", "🤩", "🥳", "😎", "😺"],
      color: "#FACC15",
    },
    {
      mode: "Sad",
      emoji: ["😢", "😭", "😞", "😔", "😟", "💔"],
      color: "#3B82F6",
    },
    {
      mode: "Relax",
      emoji: ["😌", "🧘", "🌿", "😴", "☁️"],
      color: "#22C55E",
    },
    {
      mode: "Energetic",
      emoji: ["⚡", "🔥", "💪", "🚀", "🎧"],
      color: "#EF4444",
    },
  ];
  return (
    <div className="homepage-container">
      <div className="homepage-heading">
        <h1 className="homepage-title">How are you feeling today?</h1>
      </div>
      <div className="homepage-card-container">
        {cardDetails.map((v) => (
          <div
            className="homepage-card"
            key={v.mode}
            style={{ backgroundColor: v.color }}
            onClick={() => navigate(`/${v.mode}`)}
          >
            <div className="homepage-card-content">
              <h1>{v.emoji[Math.floor(Math.random() * v.emoji.length)]}</h1>
              <h3>{v.mode}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
