import React from "react";

const Videos2 = () => {
  
  const videoUrl = "https://www.dailymotion.com/video/x35s5p4";

  
  const generateEmbedUrl = (url) => {
    const match = url.match(/video\/([^_?]+)/); 
    if (match) {
      return `https://www.dailymotion.com/embed/video/${match[1]}`; 
    }
    return ""; 
  };

  const embedUrl = generateEmbedUrl(videoUrl); 
  if (!embedUrl) {
    return <p style={{ color: "red", textAlign: "center" }}>Enlace no válido.</p>;
  }

  return (
    <div
      className="video-player"
      style={{ maxWidth: "800px", margin: "auto", padding: "20px" }}
    >
      <iframe
        src={embedUrl} 
        title="Dailymotion Video"
        width="100%"
        height="450px"
        frameBorder="0"
        allow="autoplay; fullscreen" 
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default Videos2
