import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import TopStats from "../components/TopStats";
import StatsTable from "../components/StatsTable";

export default function Team() {
  const { id } = useParams(); // /team/:id
  const [team, setTeam] = useState(null);
  const [league, setLeague] = useState(null); // "acb" | "primera-feb"
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      // 1) Busca el equipo en ambas ligas
      const [febTeams, acbTeams] = await Promise.all([
        fetch("/data/2025-26/primera-feb/teams.json").then(r=>r.json()).catch(()=>[]),
        fetch("/data/2025-26/acb/teams.json").then(r=>r.json()).catch(()=>[]),
      ]);
      const allTeams = [...(febTeams||[]), ...(acbTeams||[])];
      const t = allTeams.find(x => String(x.id) === String(id));
      if (!t) { if (!cancelled){setTeam(null); setLeague(null); setPlayers([]); setLoading(false);} return; }

      const lg = t.league || (febTeams.some(x=>x.id===t.id) ? "primera-feb" : "acb");
      // 2) Carga jugadores solo de esa liga
      const ps = await fetch(`/data/2025-26/${lg}/players.json`).then(r=>r.json()).catch(()=>[]);
      if (cancelled) return;
      setTeam(t);
      setLeague(lg);
      setPlayers(Array.isArray(ps) ? ps : []);
      setLoading(false);
    }
    load();
    return () => { cancelled = true; };
  }, [id]);

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
        <div className="h-24 rounded-2xl bg-gray-800/50 animate-pulse mb-6" />
        <div className="h-64 rounded-2xl bg-gray-800/50 animate-pulse" />
      </div>
    );
  }

  if (!team) {
    return (
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
        <p className="text-white/80">Equipo no encontrado.</p>
        <div className="mt-2 space-x-4">
          <Link to="/acb" className="text-cyan-400 hover:underline">Ir a ACB</Link>
          <Link to="/PrimeraFEB" className="text-cyan-400 hover:underline">Ir a Primera FEB</Link>
        </div>
      </div>
    );
  }

  const roster = players.filter(p => String(p.team_id) === String(id));

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex items-center gap-4 sm:gap-6 mb-6">
        <img src={team.logo} alt={team.name} className="w-16 h-16 sm:w-20 sm:h-20 object-contain" />
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">{team.name}</h1>
          {league && <p className="text-white/60 capitalize">{league.replace("-", " ")}</p>}
        </div>
      </div>

      <TopStats players={roster} />
      <StatsTable players={roster} teamId={id} />
    </div>
  );
}