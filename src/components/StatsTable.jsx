import { useMemo, useState } from "react";

function fmt(n, d = 1) {
  if (n === null || n === undefined || Number.isNaN(n)) return "–";
  return Number(n).toLocaleString(undefined, { maximumFractionDigits: d });
}
function pct(n) {
  if (n === null || n === undefined || Number.isNaN(n)) return "–";
  return `${fmt(n, 1)}%`;
}
const get = (row, path) =>
  path.split(".").reduce((a, k) => (a ? a[k] : undefined), row);

export default function StatsTable({ players, teamId }) {
  const [sortBy, setSortBy] = useState("stats.pts");
  const [dir, setDir] = useState("desc");

  const rows = useMemo(() => {
    let r = players.filter((p) => (teamId ? p.team_id === teamId : true) && p.stats);
    r = r.map((p) => ({
      id: p.id,
      name: `${p.first_name ?? ""} ${p.last_name ?? ""}`.trim(),
      height_cm: p.height_cm ?? null,
      age: p.age ?? null,
      ...p,
    }));
    r.sort((a, b) => {
      const av = get(a, sortBy); const bv = get(b, sortBy);
      const na = Number(av); const nb = Number(bv);
      const A = Number.isFinite(na) ? na : (typeof av === "string" ? av.toLowerCase() : -Infinity);
      const B = Number.isFinite(nb) ? nb : (typeof bv === "string" ? bv.toLowerCase() : -Infinity);
      if (A < B) return dir === "asc" ? -1 : 1;
      if (A > B) return dir === "asc" ? 1 : -1;
      return 0;
    });
    return r;
  }, [players, teamId, sortBy, dir]);

  const setSort = (key) => {
    if (key === sortBy) setDir((d) => (d === "asc" ? "desc" : "asc"));
    else {
      setSortBy(key);
      setDir("desc");
    }
  };

  const Th = ({ k, children }) => (
    <th
      onClick={() => setSort(k)}
      className="px-3 py-2 cursor-pointer text-sm font-bold text-white hover:text-cyan-300 whitespace-nowrap"
    >
      {children}{" "}
      {sortBy === k ? (dir === "asc" ? "▲" : "▼") : ""}
    </th>
  );

  return (
    <div className="overflow-x-auto rounded-xl shadow-lg mt-6">
      <table className="w-full text-sm text-white border-collapse">
        <thead className="bg-blue-500">
          <tr>
            <Th k="name">JUGADOR</Th>
            <Th k="height_cm">ALTURA</Th>
            <Th k="age">AÑOS</Th>
            <Th k="stats.pts">PTS</Th>
            <Th k="stats.reb">REB</Th>
            <Th k="stats.ast">AST</Th>
            <Th k="stats.games">J</Th>
            <Th k="stats.minutes">MIN</Th>
            <Th k="stats.three_pct">3P%</Th>
            <Th k="stats.fg_pct">FG%</Th>
            <Th k="stats.ft_pct">FT%</Th>
            <Th k="stats.ro">RO</Th>
            <Th k="stats.br">BR</Th>
            <Th k="stats.bp">BP</Th>
            <Th k="stats.tap">TAP</Th>
            <Th k="stats.fa">FA</Th>
            <Th k="stats.val">VAL</Th>
          </tr>
        </thead>
        <tbody>
          {rows.map((p, i) => (
            <tr
              key={p.id}
              className={i % 2 === 0 ? "bg-gray-800/60 hover:bg-gray-700/70" : "bg-gray-900/60 hover:bg-gray-700/70"}
            >
              <td className="px-3 py-2 font-semibold">{p.name}</td>
              <td className="px-3 py-2">{p.height_cm ? `${p.height_cm} cm` : "–"}</td>
              <td className="px-3 py-2">{fmt(p.age, 0)}</td>
              <td className="px-3 py-2 text-right">{fmt(p.stats.pts, 1)}</td>
              <td className="px-3 py-2 text-right">{fmt(p.stats.reb, 1)}</td>
              <td className="px-3 py-2 text-right">{fmt(p.stats.ast, 1)}</td>
              <td className="px-3 py-2 text-right">{fmt(p.stats.games, 0)}</td>
              <td className="px-3 py-2 text-right">{fmt(p.stats.minutes, 1)}</td>
              <td className="px-3 py-2 text-right">{pct(p.stats.three_pct)}</td>
              <td className="px-3 py-2 text-right">{pct(p.stats.fg_pct)}</td>
              <td className="px-3 py-2 text-right">{pct(p.stats.ft_pct)}</td>
              <td className="px-3 py-2 text-right">{fmt(p.stats.ro, 1)}</td>
              <td className="px-3 py-2 text-right">{fmt(p.stats.br, 1)}</td>
              <td className="px-3 py-2 text-right">{fmt(p.stats.bp, 1)}</td>
              <td className="px-3 py-2 text-right">{fmt(p.stats.tap, 1)}</td>
              <td className="px-3 py-2 text-right">{fmt(p.stats.fa, 1)}</td>
              <td className="px-3 py-2 text-right">{fmt(p.stats.val, 1)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}