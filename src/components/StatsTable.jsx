import { useMemo, useState } from "react";

function fmt(n, d = 1) {
  if (n === null || n === undefined || Number.isNaN(n)) return "–";
  return Number(n).toLocaleString(undefined, { maximumFractionDigits: d });
}
function pct(n) {
  if (n === null || n === undefined || Number.isNaN(n)) return "–";
  return `${fmt(n, 1)}%`;
}
const get = (row, path) => path.split(".").reduce((a, k) => (a ? a[k] : undefined), row);

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

  const Th = ({ k, className = "", children }) => {
    const active = sortBy === k;
    const ariaSort = active ? (dir === "asc" ? "ascending" : "descending") : "none";
    return (
      <th
        scope="col"
        aria-sort={ariaSort}
        onClick={() => setSort(k)}
        className={
          "px-3 py-2 text-left text-xs sm:text-sm font-bold text-white/90 whitespace-nowrap select-none " +
          "cursor-pointer hover:text-cyan-300 focus-within:text-cyan-300 " +
          className
        }
      >
        <button
          type="button"
          className="inline-flex items-center gap-1 focus:outline-none"
          aria-label={`Ordenar por ${typeof children === 'string' ? children : ''}`}
        >
          <span>{children}</span>
          {active && <span>{dir === "asc" ? "▲" : "▼"}</span>}
        </button>
      </th>
    );
  };

  return (
    <div className="mt-6 overflow-hidden rounded-xl shadow-lg ring-1 ring-white/10">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-white border-collapse">
          <thead className="bg-blue-500 sticky top-0 z-10">
            <tr>
              <Th k="name" className="min-w-[12rem]">JUGADOR</Th>
              <Th k="height_cm" className="hidden landscape:table-cell lg:table-cell">ALTURA</Th>
              <Th k="age" className="hidden landscape:table-cell lg:table-cell">AÑOS</Th>
              <Th k="stats.pts" className="text-right">PTS</Th>
              <Th k="stats.reb" className="text-right">REB</Th>
              <Th k="stats.ast" className="text-right">AST</Th>
              <Th k="stats.games" className="hidden landscape:table-cell md:table-cell text-right">J</Th>
              <Th k="stats.minutes" className="hidden landscape:table-cell md:table-cell text-right">MIN</Th>
              <Th k="stats.three_pct" className="hidden landscape:table-cell md:table-cell text-right">3P%</Th>
              <Th k="stats.fg_pct" className="hidden landscape:table-cell md:table-cell text-right">FG%</Th>
              <Th k="stats.ft_pct" className="hidden landscape:table-cell md:table-cell text-right">FT%</Th>
              <Th k="stats.ro" className="hidden landscape:table-cell lg:table-cell text-right">RO</Th>
              <Th k="stats.br" className="hidden landscape:table-cell lg:table-cell text-right">BR</Th>
              <Th k="stats.bp" className="hidden landscape:table-cell lg:table-cell text-right">BP</Th>
              <Th k="stats.tap" className="hidden landscape:table-cell xl:table-cell text-right">TAP</Th>
              <Th k="stats.fa" className="hidden landscape:table-cell xl:table-cell text-right">FA</Th>
              <Th k="stats.val" className="hidden landscape:table-cell xl:table-cell text-right">VAL</Th>
            </tr>
          </thead>
          <tbody>
            {rows.map((p, i) => (
              <tr
                key={p.id}
                className={(i % 2 === 0 ? "bg-gray-800/60" : "bg-gray-900/60") + " hover:bg-gray-700/70"}
              >
                {/* Nombre sticky para facilitar el scroll horizontal */}
                <td className="px-3 py-2 font-semibold sticky left-0 bg-inherit backdrop-blur supports-[backdrop-filter]:bg-gray-900/40">
                  <div className="flex items-center gap-2 max-w-[14rem]">
                    <span className="truncate" title={p.name}>{p.name}</span>
                  </div>
                  {/* Fila compacta extra en móviles */}
                  <div className="mt-1 text-xs text-white/70 sm:hidden">
                    <span>PTS {fmt(p.stats.pts, 1)}</span>
                    <span className="mx-2">·</span>
                    <span>REB {fmt(p.stats.reb, 1)}</span>
                    <span className="mx-2">·</span>
                    <span>AST {fmt(p.stats.ast, 1)}</span>
                  </div>
                </td>
                <td className="px-3 py-2 hidden landscape:table-cell lg:table-cell">{p.height_cm ? `${p.height_cm} cm` : "–"}</td>
                <td className="px-3 py-2 hidden landscape:table-cell lg:table-cell">{fmt(p.age, 0)}</td>
                <td className="px-3 py-2 text-right">{fmt(p.stats.pts, 1)}</td>
                <td className="px-3 py-2 text-right">{fmt(p.stats.reb, 1)}</td>
                <td className="px-3 py-2 text-right">{fmt(p.stats.ast, 1)}</td>
                <td className="px-3 py-2 hidden landscape:table-cell md:table-cell text-right">{fmt(p.stats.games, 0)}</td>
                <td className="px-3 py-2 hidden landscape:table-cell md:table-cell text-right">{fmt(p.stats.minutes, 1)}</td>
                <td className="px-3 py-2 hidden landscape:table-cell md:table-cell text-right">{pct(p.stats.three_pct)}</td>
                <td className="px-3 py-2 hidden landscape:table-cell md:table-cell text-right">{pct(p.stats.fg_pct)}</td>
                <td className="px-3 py-2 hidden landscape:table-cell md:table-cell text-right">{pct(p.stats.ft_pct)}</td>
                <td className="px-3 py-2 hidden landscape:table-cell lg:table-cell text-right">{fmt(p.stats.ro, 1)}</td>
                <td className="px-3 py-2 hidden landscape:table-cell lg:table-cell text-right">{fmt(p.stats.br, 1)}</td>
                <td className="px-3 py-2 hidden landscape:table-cell lg:table-cell text-right">{fmt(p.stats.bp, 1)}</td>
                <td className="px-3 py-2 hidden landscape:table-cell xl:table-cell text-right">{fmt(p.stats.tap, 1)}</td>
                <td className="px-3 py-2 hidden landscape:table-cell xl:table-cell text-right">{fmt(p.stats.fa, 1)}</td>
                <td className="px-3 py-2 hidden landscape:table-cell xl:table-cell text-right">{fmt(p.stats.val, 1)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Leyenda de columnas ocultas en móvil */}
      <div className="sm:hidden px-3 py-2 text-xs text-white/60 border-t border-white/10">
        En móvil en vertical se muestran JUGADOR, PTS, REB y AST. En horizontal verás más columnas
      </div>
    </div>
  );
}