import { useEffect, useState } from "react";

function Header() {
  const [hidden, setHidden] = useState(false);
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setSolid(y > 8);                 
      setHidden(y > lastY && y > 80);  
      lastY = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-50 transition-transform duration-300 ${hidden ? "-translate-y-full" : ""}`}>
      <div className={`h-14 sm:h-16 border-b transition-colors duration-300 backdrop-blur
        ${solid
          ? "bg-white/70 dark:bg-neutral-900/60 border-black/5 dark:border-white/10 shadow-sm"
          : "bg-transparent border-transparent"}`}>
        <nav className="mx-auto max-w-7xl h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between"
             style={{ paddingTop: "env(safe-area-inset-top)" }}>
          <a href="/" className="font-semibold"><img src="/LogoMundo.png" alt="Logo" className="h-36 w-36 md:h-48 md:w-48"/></a>
          <div className="flex items-center gap-6 text-sm">
            <a href="/primera-feb" className="opacity-80 text-white text-sm ">Primera FEB</a>
            <a href="/acb" className="hover opacity-80 text-white text-sm">ACB</a>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Header;
