// src/pages/Home.jsx
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      {/* --- MÓVIL: 1 columna  --- */}
      <div
        className="sm:hidden min-h-[100svh] flex flex-col items-center justify-center gap-5 px-4 py-6"
        
      >
        {/* ACB */}
        <Link
          to="/Acb"
          aria-label="Entrar ACB"
          className="group relative w-full max-w-sm aspect-[4/5] overflow-hidden rounded-3xl shadow-xl"
        >
          <img src="/FondoAcb.jpg" alt="" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/40 group-active:bg-black/50 transition-colors" />
          <div className="absolute inset-x-4 bottom-4 flex flex-col items-center gap-3">
            <img src="/Logo-acb.png" alt="ACB" className="h-14 object-contain drop-shadow" />
            <span className="inline-flex items-center px-4 py-2 rounded-full bg-white/95 text-gray-900 font-semibold">
              Ver ACB
            </span>
          </div>
        </Link>

        {/* FEB */}
        <Link
          to="/PrimeraFEB"
          aria-label="Entrar Primera FEB"
          className="group relative w-full max-w-sm aspect-[4/5] overflow-hidden rounded-3xl shadow-xl"
        >
          <img src="/FondoFeb.jpg" alt="" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/40 group-active:bg-black/50 transition-colors" />
          <div className="absolute inset-x-4 bottom-4 flex flex-col items-center gap-3">
            <img src="/Logo-feb.png" alt="Primera FEB" className="h-14 object-contain drop-shadow" />
            <span className="inline-flex items-center px-4 py-2 rounded-full bg-white/95 text-gray-900 font-semibold">
              Ver Primera FEB
            </span>
          </div>
        </Link>
      </div>

      {/* --- TABLET/ESCRITORIO: tu layout de 2 tarjetas --- */}
      <div className="hidden sm:block fixed inset-0 overflow-hidden">
        <section className="h-full w-full grid grid-rows-2 sm:grid-rows-1 sm:grid-cols-2">
          {/* Tarjeta FEB */}
          <Link
            to="/PrimeraFEB"
            aria-label="Abrir página Primera FEB"
            className="group relative min-h-0 overflow-hidden flex items-center justify-center p-6 lg:p-8"
          >
            <div className="absolute inset-0 bg-center bg-cover opacity-0 transition-opacity duration-700 ease-out group-hover:opacity-100"
                 style={{ backgroundImage: "url('/FondoFeb.jpg')" }} />
            <div className="pointer-events-none absolute inset-0 bg-black/30 opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100" />
            <img src="/Logo-feb.png" alt="Primera FEB" className="relative z-10 block object-contain max-h-full max-w-full" />
          </Link>

          {/* Tarjeta ACB */}
          <Link
            to="/Acb"
            aria-label="Abrir página ACB"
            className="group relative min-h-0 overflow-hidden flex items-center justify-center p-6 lg:p-8"
          >
            <div className="absolute inset-0 bg-center bg-cover opacity-0 transition-opacity duration-700 ease-out group-hover:opacity-100"
                 style={{ backgroundImage: "url('/FondoAcb.jpg')" }} />
            <div className="pointer-events-none absolute inset-0 bg-black/30 opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100" />
            <img src="/Logo-acb.png" alt="ACB" className="relative z-10 block object-contain max-h-full max-w-full" />
          </Link>
        </section>
      </div>
    </>
  );
}
