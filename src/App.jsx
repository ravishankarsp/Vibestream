import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HeroSection from "./Pages/HeroSection";
import HomePage from "./Pages/HomePage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HeroSection />} />
          <Route path="/Home" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
