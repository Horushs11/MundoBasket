import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    fetch("/teams.json").then(r => r.json()).then(setTeams);
  }, []);

  return (
    <div className="grid grid-cols-3 gap-20">
      {teams.map(t => (
        <Link key={t.id} to={`/team/${t.id}`} className="group block focus:outline-none">
          <div
            className="bg-gray-900/60 h-72 flex flex-col items-center justify-center p-4 rounded-xl transition transform group-hover:-translate-y-1 hover:shadow-[0_0_20px_#22d3ee] focus:ring-2 focus:ring-cyan-400"
            style={{ boxShadow: "0 0 15px rgba(34, 211, 238, 0.5)", border: "4px solid #22d3ee" }}
          >
            <img src={t.logo} alt={t.name} className="w-48 h-48 object-contain mb-2" />
            <h3 className="mt-3 text-lg font-semibold text-white">{t.name}</h3>
          </div>
        </Link>
      ))}
    </div>
  );
}
