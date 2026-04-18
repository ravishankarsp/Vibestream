import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HeroSection from "./Pages/HeroSection";
import HomePage from "./Pages/HomePage";
import HappyPage from "./Pages/HappyPage"

function App() {
  return (
    <>
      <BrowserRouter basename="/Vibestream">
        <Routes>
          <Route path="/" element={<HeroSection />} />
          <Route path="/Home" element={<HomePage />} />
          <Route path="/Happy" element={<HappyPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
