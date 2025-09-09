import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function PrimeraFEB() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/teams.json")
      .then((r) => r.json())
      .then((data) => setTeams(data || []))
      .catch(() => setTeams([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
      {/* Grid responsive */}
      <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {loading &&
          Array.from({ length: 8 }).map((_, i) => (
            <div
              key={`skeleton-${i}`}
              className="rounded-2xl bg-gray-800/50 animate-pulse aspect-[4/3]"
            />
          ))}

        {!loading && teams.map((t) => (
          <Link
            key={t.id}
            to={`/team/${t.id}`}
            aria-label={`Ver equipo ${t.name}`}
            className="group block focus:outline-none"
          >
            <div
              className="relative rounded-2xl bg-gray-900/60 p-4 sm:p-5 md:p-6 flex items-center justify-center aspect-[4/3] shadow-[0_0_15px_rgba(34,211,238,0.5)] border-2 border-cyan-400 transition transform motion-reduce:transform-none md:group-hover:-translate-y-1 md:hover:shadow-[0_0_20px_#22d3ee] focus:ring-2 focus:ring-cyan-400/80"
            >
              <div className="flex flex-col items-center justify-center text-center">
                <img
                  src={t.logo}
                  alt={t.name}
                  loading="lazy"
                  decoding="async"
                  className="w-28 h-28 sm:w-32 sm:h-32 md:w-40 md:h-40 object-contain mb-3"
                  sizes="(max-width: 640px) 7rem, (max-width: 768px) 8rem, 10rem"
                />
                <h3 className="mt-1 text-base sm:text-lg md:text-xl font-semibold text-white line-clamp-1">
                  {t.name}
                </h3>
              </div>

              {/* Border glow accent (decorativo) */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-cyan-400/20"
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}