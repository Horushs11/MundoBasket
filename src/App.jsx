import { Routes, Route, Link } from "react-router-dom";
import { Analytics } from '@vercel/analytics/react';
import Home from "./pages/Home.jsx";
import Acb from "./pages/Acb.jsx";
import PrimeraFEB from "./pages/PrimeraFEB.jsx";
import Team from "./pages/Team.jsx";
import '/src/App.css';

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-indigo-950 to-gray-900">
      <div className="p-10 max-w-[1500px] mx-auto">
        <Analytics />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Acb" element={<Acb />} />
        <Route path="/PrimeraFEB" element={<PrimeraFEB />} />
        <Route path="/team/:id" element={<Team />} />
      </Routes>
      </div>
    </div>
  );
}