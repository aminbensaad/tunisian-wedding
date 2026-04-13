import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Preload and cache all images on startup
import couplePhoto from "./assets/couple-photo.webp";
import floralBottom from "./assets/floral-bottom-left-watercolor.png";
import floralTop from "./assets/floral-top-right-watercolor.png";
import weddingRings from "./assets/wedding-rings.png";
import tunisiaFlag from "./assets/tunisia-flag.png";

const imagesToPreload = [couplePhoto, floralBottom, floralTop, weddingRings, tunisiaFlag];
imagesToPreload.forEach((src) => {
  const img = new Image();
  img.src = src;
});

createRoot(document.getElementById("root")!).render(<App />);
