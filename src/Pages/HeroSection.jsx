import React from "react";
import "../Styles/HeroSection.css";
import { useNavigate } from "react-router-dom";

export default function HeroSection() {
  const navigation = useNavigate();
  return (
    <div className="hero-section-container">
      <div className="hs-content">
        <h1>Vibe Stream</h1>
        <p>Music can change your mood, Let's Go</p>
      </div>
      <button className="hs-btn" type="button" onClick={()=>navigation("/Home")}>
        Let's Start
      </button>
    </div>
  );
}
