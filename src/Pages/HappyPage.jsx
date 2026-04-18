import React, { useEffect, useState } from "react";
import "../Styles/HappyPage.css";
import URL from "../config/api.js";

export default function HappyPage() {
  const [items, setItems] = useState([]);
  const [currentVideo, setCurrentVideo] = useState(null);

  const playSong = (id) => {
    setCurrentVideo(id);
  };
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    let data = await fetch(`${URL}/api/happy`);
    let result = await data.json();
    setItems(result.items);
    console.log(result);
  };
  return (
    <div className="happy-container">
      <div className="happy-title">
        <h1>Glad you're Happy!</h1>
      </div>
      <div className="happypage-body">
        <div className="happypage-body-content">
          {items.map((v) => (
            <div key={v.id} className="card-container">
              <div className="happypage-card-div">
                <div className="thumbnails">
                  <img src={v.snippet.thumbnails.medium.url} alt="" />
                </div>
                <div className="thumbnails-title">
                  <h3>{v.snippet.title}</h3>
                </div>
                <button onClick={() => playSong(v.id)}>▶ Play</button>
              </div>
            </div>
          ))}
        </div>
        {currentVideo && (
          <iframe
            width="0"
            height="0"
            src={`https://www.youtube.com/embed/${currentVideo}?autoplay=1`}
            allow="autoplay"
            title="player"
          />
        )}
      </div>
    </div>
  );
}
