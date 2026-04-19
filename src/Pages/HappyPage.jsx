import React, { useEffect, useState } from "react";
import "../Styles/HappyPage.css";
import URL from "../config/api.js";
import { FaPlay, FaPause } from "react-icons/fa";
import Skeleton from "@mui/material/Skeleton";

export default function HappyPage() {
  const [items, setItems] = useState([]);
  const [currentVideo, setCurrentVideo] = useState(null);
  const [loading, setLoading] = useState(false);

  const playSong = (id) => {
    setCurrentVideo((p) => (p === id ? null : id));
  };
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    setLoading(true);
    try {
      let data = await fetch(`${URL}/api/happy`);
      let result = await data.json();
      setItems(result.items);
    } catch (e) {
      console.log(e.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="happy-container">
      <div className="happy-title">
        <h1>Glad you're Happy!</h1>
      </div>
      <div className="happypage-body">
        <div className="happypage-body-content">
          {loading ? (
            [1, 2, 3, 4, 5].map(() => (
              <Skeleton
                variant="rectangular"
                width="100%"
                height={84}
                sx={{
                  bgcolor: "grey.700",
                  borderRadius: "20px",
                }}
              />
            ))
          ) : (
            <>
              {items.map((v) => (
                <div key={v.id} className="card-container">
                  <div className="happypage-card-div">
                    <div className="thumbnails">
                      <img src={v.snippet.thumbnails.default.url} alt="" />
                    </div>
                    <div className="thumbnails-title">
                      <h3>{v.snippet.title}</h3>
                    </div>
                    <button className="playbtn" onClick={() => playSong(v.id)}>
                      {currentVideo !== v.id ? (
                        <FaPlay className="playicon" />
                      ) : (
                        <FaPause className="pauseicon" />
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
        {currentVideo && (
          <iframe
            style={{ display: "none" }}
            width="0"
            height="0"
            src={`https://www.youtube.com/embed/${currentVideo}?autoplay=1`}
            allow="autoplay"
          />
        )}
      </div>
    </div>
  );
}
