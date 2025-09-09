import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="fixed inset-0 overflow-hidden">
      <section className="h-full w-full grid grid-rows-2 sm:grid-rows-1 sm:grid-cols-2">
        {/* Tarjeta FEB */}
        <Link
          to="/PrimeraFEB"
          aria-label="Abrir página Primera FEB"
          className="group relative min-h-0 overflow-hidden flex items-center justify-center p-4 sm:p-6 lg:p-8  cursor-pointer
                 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
        >
          <div
            className="absolute inset-0 bg-center bg-cover opacity-0  transition-[opacity,transform,filter] duration-800 ease-out
                   group-hover:opacity-100 group-hover:scale-100 group-active:opacity-100"
            style={{ backgroundImage: "url('/FondoFeb.jpg')" }}
          />
          <div className="pointer-events-none absolute inset-0 bg-black/30 opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100 group-active:opacity-100" />
          <img
            src="/Logo-feb.png"
            alt="Primera FEB"
            className="relative z-10 block object-contain max-h-full max-w-full transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          />
        </Link>

        {/* Tarjeta ACB */}
        <Link
          to="/Acb"
          aria-label="Abrir página ACB"
          className="group relative min-h-0 overflow-hidden flex items-center justify-center p-4 sm:p-6 lg:p-8  cursor-pointer
                 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
        >
          <div
            className="absolute inset-0 bg-center bg-cover opacity-0  transition-[opacity,transform,filter] duration-800 ease-out
                   group-hover:opacity-100 group-hover:scale-100 group-active:opacity-100"
            style={{ backgroundImage: "url('/FondoAcb.jpg')" }}
          />
          <div className="pointer-events-none absolute inset-0 bg-black/30 opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100 group-active:opacity-100" />
          <img
            src="/Logo-acb.png"
            alt="ACB"
            className="relative z-10 block object-contain max-h-full max-w-full transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          />
        </Link>
      </section>
    </div>
  );
}