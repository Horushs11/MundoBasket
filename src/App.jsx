// src/App.jsx
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import Home from "./pages/Home.jsx";
import Acb from "./pages/Acb.jsx";
import PrimeraFEB from "./pages/PrimeraFEB.jsx";
import Team from "./pages/Team.jsx";
import Header from "./components/header.jsx";
import "/src/App.css";

export default function App() {
  const { pathname } = useLocation();
  const hideHeader = pathname === "/";

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-indigo-950 to-gray-900">
      {!hideHeader && <Header />}
      <main
        className={`max-w-[1500px] mx-auto lg:p-10 ${hideHeader ? "" : "pt-8"}`}
      >
        <Analytics />
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/Acb" element={<Acb />} />
          <Route path="/acb" element={<Navigate to="/Acb" replace />} />
          <Route path="/PrimeraFEB" element={<PrimeraFEB />} />
          <Route
            path="/primera-feb"
            element={<Navigate to="/PrimeraFEB" replace />}
          />

          <Route path="/team/:id" element={<Team />} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}
