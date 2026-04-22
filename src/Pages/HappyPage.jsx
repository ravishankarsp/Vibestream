import React, { useEffect, useRef, useState } from "react";
import "../Styles/HappyPage.css";
import URL from "../config/api.js";
import { FaPlay, FaPause } from "react-icons/fa";
import Skeleton from "@mui/material/Skeleton";

export default function HappyPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [isPlayingAll, setIsPlayingAll] = useState(false);
  const [player, setPlayer] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const playSong = (id, index) => {
  if (!player) return;

  if (currentIndex === index) {
    if (isPlaying) {
      player.pauseVideo();
      setIsPlaying(false);
    } else {
      player.playVideo();
      setIsPlaying(true);
    }
  } else {
    setIsPlayingAll(false);
    setCurrentIndex(index);
    player.loadVideoById(id);
    setIsPlaying(true);
  }
};
  const onPlayerStateChange = (event) => {
    if (event.data === window.YT.PlayerState.ENDED) {
      setCurrentIndex((prev) => (prev !== null ? prev + 1 : 0));
    }
    if (event.data === window.YT.PlayerState.PLAYING) {
      setIsPlaying(true);
    }
    if (event.data === window.YT.PlayerState.PAUSED) {
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    fetchData();
    if (!window.YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      document.body.appendChild(tag);
    }
    window.onYouTubeIframeAPIReady = () => {
      const ytPlayer = new window.YT.Player("player", {
        height: "300",
        width: "200",
        videoId: "",
        events: {
          onStateChange: onPlayerStateChange,
        },
      });

      setPlayer(ytPlayer);
    };
  }, []);

  useEffect(() => {
    if (player && isPlayingAll && items.length > 0) {
      if (currentIndex !== null && currentIndex < items.length) {
        const videoId = items[currentIndex]?.id;
        if (videoId) {
          player.loadVideoById(videoId);
        }
      } else {
        setIsPlayingAll(false);
      }
    }
  }, [currentIndex, isPlayingAll, player, items]);

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
            [1, 2, 3, 4, 5, 6].map((_, index) => (
              <Skeleton
                key={index}
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
              <div className="playallbtn">
                <button
                  type="button"
                  onClick={() => {
                    if (player && items.length > 0) {
                      setCurrentIndex(0);
                      setIsPlayingAll(true);
                      player.loadVideoById(items[0].id);
                    }
                  }}
                >
                  Play All
                </button>
              </div>
              {items.map((v, index) => {
                const isActive = currentIndex === index && isPlaying;
                return (
                  <div
                    key={v.id}
                    className="card-container"
                    style={{
                      boxShadow: isActive
                        ? "0 0 15px #FACC15"
                        : "0 2px 2px rgba(0,0,0,0.2)",
                      transform: isActive ? "scale(1.02)" : "scale(1)",
                      transition: "0.2s ease",
                    }}
                  >
                    <div className="happypage-card-div">
                      <div className="thumbnails">
                        <img src={v.snippet.thumbnails.default.url} alt="" />
                      </div>
                      <div className="thumbnails-title">
                        <h3>{v.snippet.title}</h3>
                      </div>
                      <button
                        className="playbtn"
                        onClick={() => playSong(v.id, index)}
                      >
                        {currentIndex === index && isPlaying ? (
                          <FaPause />
                        ) : (
                          <FaPlay />
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </>
          )}
        </div>
      </div>
      <div
        id="player"
        style={{ width: "1px", height: "1px", opacity: 0 }}
      ></div>
    </div>
  );
}
