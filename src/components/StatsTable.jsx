import { useMemo, useState } from "react";
import { ageFrom } from "../utils/date";

// ==== Utils ====
function fmt(n, d = 1) {
  if (n === null || n === undefined || Number.isNaN(n)) return "–";
  return Number(n).toLocaleString(undefined, { maximumFractionDigits: d });
}
function pct(n) {
  if (n === null || n === undefined || Number.isNaN(n)) return "–";
  const val = Math.abs(n) <= 1 ? n * 100 : n; // acepta 0–1 o 0–100
  return `${fmt(val, 1)}%`;
}
const get = (row, path) => path.split(".").reduce((a, k) => (a ? a[k] : undefined), row);

// Orden personalizado para la POSICIÓN
const POS_RANK = {
  pg: 1, base: 1,
  sg: 2, escolta: 2,
  sf: 3, alero: 3,
  pf: 4, "ala-pívot": 4, "ala-pivot": 4,
  c: 5, pivote: 5, pívot: 5, pivot: 5,
};
const normPos = (p) => String(p || "").normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase();

export default function StatsTable({ players = [], teamId }) {
  const [sortBy, setSortBy] = useState("stats.pts");
  const [dir, setDir] = useState("desc");

  const rows = useMemo(() => {
    const tid = teamId != null ? String(teamId) : null;

    let r = players.filter(p => (tid ? String(p.team_id) === tid : true) && p.stats);

    r = r.map((p) => {
      const age = p.age ?? ageFrom(p.birthdate);
      const pos = p.pos ?? p.position ?? p.Position ?? null; // <- recogemos posición
      return {
        id: p.id,
        name: `${p.first_name ?? ""} ${p.last_name ?? ""}`.trim(),
        height_cm: p.height_cm ?? null,
        age,
        pos,
        ...p,
      };
    });

    // Ordenación (con caso especial para posición)
    r.sort((a, b) => {
      // Si ordenamos por pos, usamos el ranking personalizado
      if (sortBy === "pos") {
        const ra = POS_RANK[normPos(a.pos)] ?? 99;
        const rb = POS_RANK[normPos(b.pos)] ?? 99;
        if (ra !== rb) return dir === "asc" ? ra - rb : rb - ra;
        // desempate alfabético
        const pa = (a.pos ?? "").toLowerCase();
        const pb = (b.pos ?? "").toLowerCase();
        if (pa < pb) return dir === "asc" ? -1 : 1;
        if (pa > pb) return dir === "asc" ? 1 : -1;
        // segundo desempate por nombre
        return a.name.localeCompare(b.name) * (dir === "asc" ? 1 : -1);
      }

      // Resto de campos: numéricos o string
      const av = get(a, sortBy), bv = get(b, sortBy);
      const na = Number(av), nb = Number(bv);
      const A = Number.isFinite(na) ? na : typeof av === "string" ? av.toLowerCase() : -Infinity;
      const B = Number.isFinite(nb) ? nb : typeof bv === "string" ? bv.toLowerCase() : -Infinity;
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
          "px-4 sm:px-3 py-3 sm:py-2 text-left text-base sm:text-sm font-bold text-white/90 whitespace-nowrap select-none cursor-pointer " +
          className
        }
      >
        <button
          type="button"
          className="inline-flex items-center gap-1 focus:outline-none"
          aria-label={`Ordenar por ${typeof children === "string" ? children : ""}`}
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
        <table className="w-full text-base sm:text-sm text-white border-collapse">
          <thead className="bg-blue-500 sticky top-0 z-10">
            <tr>
              <Th k="name" className="min-w-[14rem]">JUGADOR</Th>
              <Th k="pos" className="text-left hidden landscape:table-cell sm:table-cell">POS</Th>
              <Th k="height_cm" className="hidden landscape:table-cell lg:table-cell">ALTURA</Th>
              <Th k="age" className="hidden landscape:table-cell lg:table-cell">AÑOS</Th>
              <Th k="stats.games" className="hidden landscape:table-cell md:table-cell text-right">J</Th>
              <Th k="stats.minutes" className="hidden landscape:table-cell md:table-cell text-right">MIN</Th>
              <Th k="stats.pts" className="text-right">PTS</Th>
              <Th k="stats.reb" className="text-right">REB</Th>
              <Th k="stats.ast" className="text-right">AST</Th>
              <Th k="stats.three_pct" className="hidden landscape:table-cell md:table-cell text-right">3P%</Th>
              <Th k="stats.fg_pct" className="hidden landscape:table-cell md:table-cell text-right">2P%</Th>
              <Th k="stats.ft_pct" className="hidden landscape:table-cell md:table-cell text-right">TL%</Th>
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
                className={
                  "bg-transparent hover:bg-transparent " +
                  "sm:" + (i % 2 === 0 ? "bg-gray-800/60" : "bg-gray-900/60") +
                  " sm:hover:bg-gray-700/70"
                }
              >
                <td className="px-4 sm:px-3 py-3 sm:py-2 font-semibold sm:sticky sm:left-0 bg-transparent sm:bg-inherit sm:backdrop-blur supports-[backdrop-filter]:sm:bg-gray-900/40">
                  <div className="flex items-center gap-2 max-w-[18rem]">
                    <span className="truncate" title={p.name}>{p.name}</span>
                    {p.pos && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/10 text-white/80 ring-1 ring-white/10 sm:hidden">{p.pos}</span>
                    )}
                  </div>
                  {/* Resumen compacto solo en móvil */}
                  <div className="mt-1 text-sm text-white/70 sm:hidden">
                    <span>PTS {fmt(p.stats.pts, 1)}</span>
                    <span className="mx-2">·</span>
                    <span>REB {fmt(p.stats.reb, 1)}</span>
                    <span className="mx-2">·</span>
                    <span>AST {fmt(p.stats.ast, 1)}</span>
                  </div>
                </td>

                <td className="px-4 sm:px-3 py-3 sm:py-2 hidden landscape:table-cell sm:table-cell">
                  {p.pos ?? "–"}
                </td>

                <td className="px-4 sm:px-3 py-3 sm:py-2 hidden landscape:table-cell lg:table-cell">
                  {p.height_cm ? `${p.height_cm} cm` : "–"}
                </td>
                <td className="px-4 sm:px-3 py-3 sm:py-2 hidden landscape:table-cell lg:table-cell">
                  {fmt(p.age, 0)}
                </td>

                <td className="px-4 sm:px-3 py-3 sm:py-2 text-right">{fmt(p.stats.pts, 1)}</td>
                <td className="px-4 sm:px-3 py-3 sm:py-2 text-right">{fmt(p.stats.reb, 1)}</td>
                <td className="px-4 sm:px-3 py-3 sm:py-2 text-right">{fmt(p.stats.ast, 1)}</td>

                <td className="px-4 sm:px-3 py-3 sm:py-2 hidden landscape:table-cell md:table-cell text-right">{fmt(p.stats.games, 0)}</td>
                <td className="px-4 sm:px-3 py-3 sm:py-2 hidden landscape:table-cell md:table-cell text-right">{fmt(p.stats.minutes, 1)}</td>
                <td className="px-4 sm:px-3 py-3 sm:py-2 hidden landscape:table-cell md:table-cell text-right">{pct(p.stats.three_pct)}</td>
                <td className="px-4 sm:px-3 py-3 sm:py-2 hidden landscape:table-cell md:table-cell text-right">{pct(p.stats.fg_pct)}</td>
                <td className="px-4 sm:px-3 py-3 sm:py-2 hidden landscape:table-cell md:table-cell text-right">{pct(p.stats.ft_pct)}</td>
                <td className="px-4 sm:px-3 py-3 sm:py-2 hidden landscape:table-cell lg:table-cell text-right">{fmt(p.stats.ro, 1)}</td>
                <td className="px-4 sm:px-3 py-3 sm:py-2 hidden landscape:table-cell lg:table-cell text-right">{fmt(p.stats.br, 1)}</td>
                <td className="px-4 sm:px-3 py-3 sm:py-2 hidden landscape:table-cell lg:table-cell text-right">{fmt(p.stats.bp, 1)}</td>
                <td className="px-4 sm:px-3 py-3 sm:py-2 hidden landscape:table-cell xl:table-cell text-right">{fmt(p.stats.tap, 1)}</td>
                <td className="px-4 sm:px-3 py-3 sm:py-2 hidden landscape:table-cell xl:table-cell text-right">{fmt(p.stats.fa, 1)}</td>
                <td className="px-4 sm:px-3 py-3 sm:py-2 hidden landscape:table-cell xl:table-cell text-right">{fmt(p.stats.val, 1)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Nota móvil */}
      <div className="sm:hidden px-4 py-3 text-sm text-white/70 border-t border-white/10">
        En móvil se muestran JUGADOR, POS, PTS, REB y AST. Gira el móvil o usa una pantalla mayor para ver más columnas.
      </div>
    </div>
  );
}
