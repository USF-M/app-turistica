import Button from "../componentes/ComponentesUI/Button";
import Card from "../componentes/ComponentesUI/Card";
import LoadingDots from "../componentes/ComponentesUI/LoadingDots";
import { useState } from "react";

import useItineraryGenerator from "../hooks/useItineraryGenerator";
const INTEREST_OPTIONS = [
    { id: "cultura", label: "Cultura & Historia", icon: "🏛" },
    { id: "naturaleza", label: "Naturaleza", icon: "🌿" },
    { id: "gastronomia", label: "Gastronomía", icon: "🍜" },
    { id: "aventura", label: "Aventura", icon: "🧗" },
    { id: "arte", label: "Arte & Museos", icon: "🎨" },
    { id: "playa", label: "Playa & Mar", icon: "🏖" },
    { id: "nightlife", label: "Vida nocturna", icon: "🌃" },
    { id: "shopping", label: "Shopping", icon: "🛍" },
];

const AIGenerating = () => (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "80px 24px", textAlign: "center" }}>
        <div style={{ width: 80, height: 80, borderRadius: 20, background: "linear-gradient(135deg, var(--ocean-500), var(--sky-400))", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 36, marginBottom: 28, animation: "pulse 2s infinite" }}>🤖</div>
        <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 12 }}>Creando tu itinerario perfecto</h2>
        <p style={{ color: "var(--text-muted)", fontSize: 16, marginBottom: 32, maxWidth: 400, lineHeight: 1.7 }}>Nuestra IA está analizando millones de opciones para crear una experiencia única para ti.</p>
        <LoadingDots />
        <div style={{ marginTop: 32, display: "flex", flexDirection: "column", gap: 8, color: "var(--text-muted)", fontSize: 13 }}>
            {["Analizando destino...", "Optimizando actividades...", "Ajustando presupuesto...", "Generando itinerario personalizado..."].map((t, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--ocean-400)", animation: `dotPulse 2s ${i * 0.3}s infinite` }} />
                    {t}
                </div>
            ))}
        </div>
    </div>
);

const PlannerPage = () => {
    const { generate, status } = useItineraryGenerator();
    const [form, setForm] = useState({ destination: "", startDate: "", endDate: "", budget: "", travelers: "2", pace: "moderate", interests: [], accommodation: "hotel" });
    const [step, setStep] = useState(1);
    const setField = (k, v) => setForm(f => ({ ...f, [k]: v }));
    const toggleInterest = (id) => setForm(f => ({ ...f, interests: f.interests.includes(id) ? f.interests.filter(i => i !== id) : [...f.interests, id] }));
    const days = form.startDate && form.endDate ? Math.max(1, Math.ceil((new Date(form.endDate) - new Date(form.startDate)) / 86400000)) : 0;
    const handleSubmit = () => {
        if (!form.destination || !form.startDate || !form.endDate) return;
        generate({ destination: form.destination, days, budget: form.budget, interests: form.interests, travelers: form.travelers });
    };
    if (status === "loading") return <div style={{ paddingTop: 68, minHeight: "100vh", display: "flex", alignItems: "center" }}><AIGenerating /></div>;
    const inputStyle = { width: "100%", padding: "14px 16px", border: "2px solid var(--border)", borderRadius: 12, fontSize: 15, outline: "none", background: "var(--white)", color: "var(--text-primary)", transition: "border-color 0.2s ease", boxSizing: "border-box" };
    const labelStyle = { display: "block", fontSize: 13, fontWeight: 600, color: "var(--text-secondary)", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.05em" };
    return (
        <div style={{ paddingTop: 88, minHeight: "100vh", background: "var(--sand-50)" }}>
            <div style={{ background: "linear-gradient(135deg, var(--ocean-900) 0%, var(--ocean-700) 100%)", padding: "56px 24px 80px", textAlign: "center" }}>
                <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 99, padding: "6px 16px", marginBottom: 20, color: "var(--sky-300)", fontSize: 13, fontWeight: 500 }}>
                    <span>✨</span> Powered by IA
                </div>
                <h1 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 700, color: "white", letterSpacing: "-0.02em", marginBottom: 16 }}>Planifica tu viaje perfecto</h1>
                <p style={{ color: "rgba(255,255,255,0.65)", fontSize: 17, maxWidth: 480, margin: "0 auto" }}>Cuéntanos sobre tu viaje ideal y nuestra IA creará un itinerario personalizado en segundos.</p>
            </div>
            <div style={{ maxWidth: 760, margin: "-40px auto 0", padding: "0 24px 80px" }}>
                <Card hover={false} style={{ padding: "40px 40px" }}>
                    <div style={{ display: "flex", gap: 0, marginBottom: 40, borderBottom: "2px solid var(--border)" }}>
                        {[{ n: 1, l: "Destino" }, { n: 2, l: "Fechas" }, { n: 3, l: "Preferencias" }].map(s => (
                            <button key={s.n} onClick={() => setStep(s.n)} style={{ flex: 1, padding: "12px 8px", background: "none", border: "none", cursor: "pointer", borderBottom: step === s.n ? "3px solid var(--ocean-800)" : "3px solid transparent", marginBottom: -2, color: step === s.n ? "var(--ocean-800)" : "var(--text-muted)", fontWeight: step === s.n ? 700 : 400, fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, transition: "var(--transition)" }}>
                                <span style={{ width: 24, height: 24, borderRadius: "50%", background: step === s.n ? "var(--ocean-800)" : "var(--border)", color: step === s.n ? "white" : "var(--text-muted)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700 }}>{s.n}</span>
                                {s.l}
                            </button>
                        ))}
                    </div>
                    <div style={{ animation: "fadeIn 0.3s ease" }}>
                        {step === 1 && (
                            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                                <div>
                                    <label style={labelStyle}>🌍 Destino</label>
                                    <input value={form.destination} onChange={e => setField("destination", e.target.value)} placeholder="Ej: Tokio, París, Marruecos..." style={inputStyle} onFocus={e => e.target.style.borderColor = "var(--ocean-500)"} onBlur={e => e.target.style.borderColor = "var(--border)"} />
                                </div>
                                <div>
                                    <label style={labelStyle}>👥 Número de viajeros</label>
                                    <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                                        {["1", "2", "3-4", "5+"].map(n => (
                                            <button key={n} onClick={() => setField("travelers", n)} style={{ padding: "10px 20px", borderRadius: 10, border: `2px solid ${form.travelers === n ? "var(--ocean-800)" : "var(--border)"}`, background: form.travelers === n ? "var(--ocean-800)" : "transparent", color: form.travelers === n ? "white" : "var(--text-secondary)", fontWeight: 600, fontSize: 15, cursor: "pointer", transition: "var(--transition)" }}>
                                                {n} {n === "1" ? "persona" : "personas"}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <label style={labelStyle}>🏨 Alojamiento preferido</label>
                                    <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                                        {[{ v: "hotel", l: "Hotel", icon: "🏨" }, { v: "hostel", l: "Hostel", icon: "🛏" }, { v: "airbnb", l: "Apartamento", icon: "🏠" }, { v: "luxury", l: "Lujo", icon: "✨" }].map(a => (
                                            <button key={a.v} onClick={() => setField("accommodation", a.v)} style={{ padding: "10px 18px", borderRadius: 10, border: `2px solid ${form.accommodation === a.v ? "var(--ocean-800)" : "var(--border)"}`, background: form.accommodation === a.v ? "var(--ocean-800)" : "transparent", color: form.accommodation === a.v ? "white" : "var(--text-secondary)", fontWeight: 500, fontSize: 14, cursor: "pointer", transition: "var(--transition)", display: "flex", alignItems: "center", gap: 6 }}>
                                                <span>{a.icon}</span>{a.l}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <Button size="lg" onClick={() => setStep(2)} style={{ alignSelf: "flex-end" }}>Siguiente →</Button>
                            </div>
                        )}
                        {step === 2 && (
                            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                                    <div>
                                        <label style={labelStyle}>📅 Fecha de salida</label>
                                        <input type="date" value={form.startDate} onChange={e => setField("startDate", e.target.value)} min={new Date().toISOString().split("T")[0]} style={inputStyle} onFocus={e => e.target.style.borderColor = "var(--ocean-500)"} onBlur={e => e.target.style.borderColor = "var(--border)"} />
                                    </div>
                                    <div>
                                        <label style={labelStyle}>📅 Fecha de regreso</label>
                                        <input type="date" value={form.endDate} onChange={e => setField("endDate", e.target.value)} min={form.startDate || new Date().toISOString().split("T")[0]} style={inputStyle} onFocus={e => e.target.style.borderColor = "var(--ocean-500)"} onBlur={e => e.target.style.borderColor = "var(--border)"} />
                                    </div>
                                </div>
                                {days > 0 && <div style={{ background: "var(--ocean-900)", color: "var(--sky-300)", borderRadius: 12, padding: "12px 16px", fontSize: 14, fontWeight: 500, display: "flex", alignItems: "center", gap: 10 }}>🗓 Duración del viaje: <strong>{days} días</strong></div>}
                                <div>
                                    <label style={labelStyle}>💰 Presupuesto total (USD)</label>
                                    <input type="number" value={form.budget} onChange={e => setField("budget", e.target.value)} placeholder="Ej: 2500" style={inputStyle} onFocus={e => e.target.style.borderColor = "var(--ocean-500)"} onBlur={e => e.target.style.borderColor = "var(--border)"} />
                                    <div style={{ display: "flex", gap: 8, marginTop: 10, flexWrap: "wrap" }}>
                                        {[{ l: "Económico", v: "1000" }, { l: "Moderado", v: "2500" }, { l: "Confortable", v: "5000" }, { l: "Premium", v: "10000" }].map(b => (
                                            <button key={b.v} onClick={() => setField("budget", b.v)} style={{ padding: "6px 14px", borderRadius: 8, border: `1.5px solid ${form.budget === b.v ? "var(--ocean-500)" : "var(--border)"}`, background: form.budget === b.v ? "rgba(38,81,160,0.08)" : "transparent", color: form.budget === b.v ? "var(--ocean-600)" : "var(--text-muted)", fontSize: 12, fontWeight: 500, cursor: "pointer", transition: "var(--transition)" }}>
                                                {b.l} (~${b.v})
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <label style={labelStyle}>⚡ Ritmo de viaje</label>
                                    <div style={{ display: "flex", gap: 10 }}>
                                        {[{ v: "relaxed", l: "Relajado", desc: "Pocas actividades" }, { v: "moderate", l: "Moderado", desc: "Balance perfecto" }, { v: "intensive", l: "Intenso", desc: "Máximo aprovechamiento" }].map(p => (
                                            <button key={p.v} onClick={() => setField("pace", p.v)} style={{ flex: 1, padding: "12px 10px", borderRadius: 12, border: `2px solid ${form.pace === p.v ? "var(--ocean-800)" : "var(--border)"}`, background: form.pace === p.v ? "var(--ocean-800)" : "transparent", color: form.pace === p.v ? "white" : "var(--text-secondary)", cursor: "pointer", transition: "var(--transition)", textAlign: "center" }}>
                                                <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 3 }}>{p.l}</div>
                                                <div style={{ fontSize: 11, opacity: 0.7 }}>{p.desc}</div>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div style={{ display: "flex", gap: 12, justifyContent: "space-between" }}>
                                    <Button variant="secondary" onClick={() => setStep(1)}>← Atrás</Button>
                                    <Button onClick={() => setStep(3)}>Siguiente →</Button>
                                </div>
                            </div>
                        )}
                        {step === 3 && (
                            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                                <div>
                                    <label style={{ ...labelStyle, marginBottom: 4 }}>🎯 Tus intereses</label>
                                    <p style={{ color: "var(--text-muted)", fontSize: 13, marginBottom: 16 }}>Selecciona todos los que apliquen</p>
                                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: 10 }}>
                                        {INTEREST_OPTIONS.map(opt => {
                                            const active = form.interests.includes(opt.id);
                                            return (
                                                <button key={opt.id} onClick={() => toggleInterest(opt.id)} style={{ padding: "14px 12px", borderRadius: 12, border: `2px solid ${active ? "var(--ocean-800)" : "var(--border)"}`, background: active ? "var(--ocean-800)" : "var(--white)", color: active ? "white" : "var(--text-secondary)", cursor: "pointer", transition: "var(--transition)", display: "flex", alignItems: "center", gap: 10, fontWeight: 500, fontSize: 14, transform: active ? "scale(1.02)" : "scale(1)" }}>
                                                    <span style={{ fontSize: 20 }}>{opt.icon}</span>{opt.label}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                                <div style={{ background: "var(--sand-100)", borderRadius: 16, padding: 20 }}>
                                    <h4 style={{ fontWeight: 700, marginBottom: 12, fontSize: 15 }}>Resumen de tu viaje</h4>
                                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, fontSize: 14 }}>
                                        {[["🌍 Destino", form.destination || "—"], ["📅 Duración", days ? `${days} días` : "—"], ["💰 Presupuesto", form.budget ? `$${form.budget}` : "—"], ["👥 Viajeros", form.travelers], ["⚡ Ritmo", form.pace], ["🏨 Alojamiento", form.accommodation]].map(([k, v]) => (
                                            <div key={k} style={{ display: "flex", gap: 6 }}><span style={{ color: "var(--text-muted)" }}>{k}:</span><strong>{v}</strong></div>
                                        ))}
                                    </div>
                                </div>
                                <div style={{ display: "flex", gap: 12, justifyContent: "space-between" }}>
                                    <Button variant="secondary" onClick={() => setStep(2)}>← Atrás</Button>
                                    <Button size="lg" variant="accent" onClick={handleSubmit} disabled={!form.destination || !form.startDate || !form.endDate} icon="✨">Generar itinerario con IA</Button>
                                </div>
                            </div>
                        )}
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default PlannerPage