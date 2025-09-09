import { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import TopStats from "../components/TopStats.jsx";
import StatsTable from "../components/StatsTable.jsx";
import "/src/App.css";

export default function Team() {
  const { id } = useParams();
  const teamId = Number(id);

  const [players, setPlayers] = useState([]);
  const [coaches, setCoaches] = useState([]);
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const [p, c, t] = await Promise.all([
          fetch("/players.json").then((r) => r.json()),
          fetch("/coaches.json").then((r) => r.json()).catch(() => []),
          fetch("/teams.json").then((r) => r.json()).catch(() => []),
        ]);
        setPlayers(Array.isArray(p) ? p : []);
        setCoaches(Array.isArray(c) ? c : []);
        setTeams(Array.isArray(t) ? t : []);
      } catch (e) {
        console.error(e);
        setErr("No se pudieron cargar los datos.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const team = useMemo(() => teams.find((t) => t.id === teamId), [teams, teamId]);
  const teamName = team?.name || `Equipo ${teamId}`;

  const coach = useMemo(() => coaches.find((c) => c.team_id === teamId), [coaches, teamId]);

  const plantilla = useMemo(
    () => players.filter((p) => Number(p.team_id) === teamId),
    [players, teamId]
  );

  if (loading) return <div className="text-white">Cargando…</div>;
  if (err) return <div className="text-red-400">{err}</div>;

  return (
    <div className="space-y-8">
      <div
        className="space-y-6 p-6 rounded-2xl bg-gray-900/60"
        style={{ boxShadow: "0 0 15px rgba(34, 211, 238, 0.5)", border: "4px solid #22d3ee" }}
      >
        <div className="flex items-center justify-between">
          <Link to="/PrimeraFEB" className="text-white font-bold transform transition hover:scale-103 bg-gradient-to-br from-cyan-400 to-fuchsia-500 p-2 rounded-2xl">← Volver a equipos</Link>
        </div>

        <header className="text-white text-center">
          {team && (
            <>
              <img
                src={team.logo || "/logos/_fallback.png"}
                alt={team.name}
                className="w-32 h-32 object-contain mx-auto mb-2"
                style={{ filter: `boxShadow: 0 0 15px rgba(34, 211, 238, 0.5)` }}
              />
              <h1
                className="text-3xl font-extrabold tracking-wide"
                style={{ color: "#22d3ee" }}
              >
                {teamName}
              </h1>
              {coach && (
                <p className="opacity-90 mt-1">
                  Entrenador:{" "}
                  <strong style={{ color: "#22d3ee" }}>
                    {coach.first_name} {coach.last_name}
                  </strong>
                </p>
              )}
            </>
          )}
        </header>

        {plantilla.length > 0 ? (
          <StatsTable players={plantilla} teamId={teamId} />
        ) : (
          <div className="text-white/80 text-center py-8">
            No hay jugadores cargados todavía para este equipo.
          </div>
        )}
      </div>

      {/* Top 4 del equipo */}
      <TopStats players={plantilla} />
    </div>
  );
}
