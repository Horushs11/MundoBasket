import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function PrimeraFEB() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/data/2025-26/primera-feb/teams.json")
      .then(r => r.json())
      .then(data => setTeams(Array.isArray(data) ? data : []))
      .catch(() => setTeams([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
      <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {loading &&
          Array.from({ length: 8 }).map((_, i) => (
            <div key={`sk-feb-${i}`} className="rounded-2xl bg-gray-800/50 animate-pulse aspect-[4/3]" />
          ))}

        {!loading && teams.map((t) => (
          <Link
            key={t.id}
            to={`/team/${t.id}`}  // mantenemos /team/:id
            className="group block focus:outline-none"
            aria-label={`Ver equipo ${t.name}`}
          >
            <div className="relative rounded-2xl bg-gray-900/60 p-4 sm:p-5 md:p-6 flex items-center justify-center aspect-[4/3] border-2 border-cyan-400 transition md:group-hover:-translate-y-1 md:hover:shadow-[0_0_10px_#22d3ee]">
              <div className="flex flex-col items-center justify-center text-center">
                <img src={t.logo} alt={t.name} className="w-28 h-28 sm:w-32 sm:h-32 md:w-40 md:h-40 object-contain mb-3" />
                <h3 className="mt-1 text-base sm:text-lg md:text-xl font-semibold text-white
             text-center leading-tight break-words line-clamp-2 min-h-[2.6em]">{t.name}</h3>
              </div>
              <span aria-hidden className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-cyan-400/20" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
