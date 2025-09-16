import { useMemo } from "react";

function cls(...xs) { return xs.filter(Boolean).join(" "); }
// function initials(p) {
//   const n = `${p.first_name ?? ""} ${p.last_name ?? ""}`.trim().split(/\s+/);
//   return (n[0]?.[0] ?? "") + (n[1]?.[0] ?? "");
// }
function rankBadge(i) {
  const base = "inline-flex items-center justify-center rounded-full font-bold";
  if (i === 0) return <span className={cls(base, "w-7 h-7 sm:w-8 sm:h-8 text-xs sm:text-sm bg-cyan-500 text-black shadow")}>1</span>;
  if (i === 1) return <span className={cls(base, "w-7 h-7 sm:w-8 sm:h-8 text-xs sm:text-sm bg-cyan-500 text-black shadow")}>2</span>;
  if (i === 2) return <span className={cls(base, "w-7 h-7 sm:w-8 sm:h-8 text-xs sm:text-sm bg-cyan-500 text-black shadow")}>3</span>;
  return <span className={cls(base, "w-7 h-7 sm:w-8 sm:h-8 text-xs sm:text-sm bg-cyan-500 text-black shadow")}>{i+1}</span>;
}

function Card({ title, children, accent="from-emerald-400 via-cyan-400 to-blue-500" }) {
  return (
    <div className="relative rounded-2xl bg-gray-900/70 border border-white/10 p-4 sm:p-5 lg:p-6">
      <h3
        className={cls(
          "text-lg sm:text-xl lg:text-2xl font-extrabold tracking-wide text-transparent bg-clip-text",
          "bg-gradient-to-r", accent
        )}
      >
        {title}
      </h3>

      {/* En móvil acotamos alto para evitar scroll general; solo la lista scrollea si hace falta */}
      <div className="mt-4 sm:mt-5 space-y-2 sm:space-y-3 max-h-[40svh] sm:max-h-[48svh] overflow-y-auto pr-1">
        {children}
      </div>
    </div>
  );
}

function Row({ p, value, unit, i }) {
  return (
    <div className="flex items-center gap-3 rounded-xl bg-white/5 border border-white/10 px-3 py-2 sm:px-3.5 sm:py-2.5 hover:bg-white/10 transition">
      {rankBadge(i)}
      {/* Avatar con iniciales */}
      {/* <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-br from-cyan-400 to-fuchsia-500 text-black font-bold flex items-center justify-center">
        <span className="text-xs sm:text-sm">{initials(p)}</span>
      </div> */}
      <div className="flex-1 min-w-0">
        <div className="text-white font-semibold truncate text-sm sm:text-base">
          {p.first_name} {p.last_name}
        </div>
        <div className="text-[11px] sm:text-xs text-white/60">{p.position} · #{p.number ?? "—"}</div>
      </div>
      <div className="text-right">
        <div className="font-mono tabular-nums text-base sm:text-xl text-white">
          {Number(value ?? 0).toFixed(1)} <span className="text-white/60 text-xs sm:text-sm">{unit}</span>
        </div>
      </div>
    </div>
  );
}

export default function TopStats({ players = [] }) {
  const topBy = (stat) =>
    [...players]
      .filter(p => p?.stats && typeof p.stats[stat] === "number")
      .sort((a, b) => (b.stats[stat] ?? 0) - (a.stats[stat] ?? 0))
      .slice(0, 4);

  const topPts = useMemo(() => topBy("pts"), [players]);
  const topAst = useMemo(() => topBy("ast"), [players]);
  const topReb = useMemo(() => topBy("reb"), [players]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mt-6">
      <Card title="Top Anotadores" accent="text-white">
        {topPts.length ? topPts.map((p, i) => (
          <Row key={p.id} p={p} value={p.stats.pts} unit="PPG" i={i} />
        )) : <p className="text-white/60 text-sm">Sin datos todavía.</p>}
      </Card>

      <Card title="Top Asistentes" accent="text-white">
        {topAst.length ? topAst.map((p, i) => (
          <Row key={p.id} p={p} value={p.stats.ast} unit="APG" i={i} />
        )) : <p className="text-white/60 text-sm">Sin datos todavía.</p>}
      </Card>

      <Card title="Top Reboteadores" accent="text-white">
        {topReb.length ? topReb.map((p, i) => (
          <Row key={p.id} p={p} value={p.stats.reb} unit="RPG" i={i} />
        )) : <p className="text-white/60 text-sm">Sin datos todavía.</p>}
      </Card>
    </div>
  );
}