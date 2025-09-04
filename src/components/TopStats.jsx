import { useMemo } from "react";

function cls(...xs) { return xs.filter(Boolean).join(" "); }
function initials(p) {
  const n = `${p.first_name ?? ""} ${p.last_name ?? ""}`.trim().split(/\s+/);
  return (n[0]?.[0] ?? "") + (n[1]?.[0] ?? "");
}
function rankBadge(i) {
  const base = "inline-flex items-center justify-center w-7 h-7 rounded-full text-sm font-bold";
  if (i === 0) return <span className={cls(base, "bg-yellow-400 text-black shadow")}>1</span>;
  if (i === 1) return <span className={cls(base, "bg-gray-300 text-black shadow")}>2</span>;
  if (i === 2) return <span className={cls(base, "bg-amber-700 text-white shadow")}>3</span>;
  return <span className={cls(base, "bg-cyan-500 text-black shadow")}>{i+1}</span>;
}

function Card({ title, children, accent="from-cyan-400 via-fuchsia-500 to-emerald-400" }) {
  return (
    <div className="relative group">
      {/* Glow borde */}
      
      <div className="relative  rounded-2xl bg-gray-900/70 border border-white/10 p-6 flex flex-col" style={{ boxShadow: "0 0 15px rgba(34, 211, 238, 0.5)", border: "4px solid #22d3ee" }}>
        <h3 className={cls(
          "text-2xl md:text-3xl font-extrabold tracking-wide text-transparent bg-clip-text",
          "bg-gradient-to-r", accent
        )}>
          {title}
        </h3>
        <div className="mt-5 space-y-3 overflow-y-auto pr-2">
          {children}
        </div>
      </div>
    </div>
  );
}

function Row({ p, value, unit, i }) {
  return (
    <div className="flex items-center gap-3 rounded-xl bg-white/5 border border-white/10 px-3 py-2.5 hover:bg-white/10 transition">
      {rankBadge(i)}
      {/* Iniciales como avatar */}
      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-cyan-400 to-fuchsia-500 text-black font-bold flex items-center justify-center">
        {initials(p)}
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-white font-semibold truncate">{p.first_name} {p.last_name}</div>
        <div className="text-xs text-white/60">{p.position} · #{p.number ?? "—"}</div>
      </div>
      <div className="text-right">
        <div className="font-mono tabular-nums text-xl text-white">
          {Number(value ?? 0).toFixed(1)} <span className="text-white/60 text-sm">{unit}</span>
        </div>
      </div>
    </div>
  );
}

export default function TopStats({ players }) {
  const topBy = (stat) =>
    [...(players ?? [])]
      .filter(p => p?.stats && typeof p.stats[stat] === "number")
      .sort((a, b) => (b.stats[stat] ?? 0) - (a.stats[stat] ?? 0))
      .slice(0, 4);

  const topPts = useMemo(() => topBy("pts"), [players]);
  const topAst = useMemo(() => topBy("ast"), [players]);
  const topReb = useMemo(() => topBy("reb"), [players]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-10">
      <Card title="Top Anotadores" accent="from-emerald-400 via-cyan-400 to-blue-500">
        {topPts.map((p, i) => (
          <Row key={p.id} p={p} value={p.stats.pts} unit="PPG" i={i} />
        ))}
        {!topPts.length && <p className="text-white/60">Sin datos todavía.</p>}
      </Card>

      <Card title="Top Asistentes" accent="from-emerald-400 via-cyan-400 to-blue-500">
        {topAst.map((p, i) => (
          <Row key={p.id} p={p} value={p.stats.ast} unit="APG" i={i} />
        ))}
        {!topAst.length && <p className="text-white/60">Sin datos todavía.</p>}
      </Card>

      <Card title="Top Reboteadores" accent="from-emerald-400 via-cyan-400 to-blue-500">
        {topReb.map((p, i) => (
          <Row key={p.id} p={p} value={p.stats.reb} unit="RPG" i={i} />
        ))}
        {!topReb.length && <p className="text-white/60">Sin datos todavía.</p>}
      </Card>
    </div>
  );
}
