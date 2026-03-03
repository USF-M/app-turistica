const ActivityTypeColors = { cultural: { bg: "#e8f0fc", color: "var(--ocean-500)", icon: "🏛" }, food: { bg: "#fef3e2", color: "#d97706", icon: "🍽" }, outdoor: { bg: "#e6f5ec", color: "var(--leaf-500)", icon: "🌿" }, shopping: { bg: "#fce8f3", color: "#db2777", icon: "🛍" }, default: { bg: "var(--sand-100)", color: "var(--text-muted)", icon: "📍" } };

const ItineraryPage = () => {
  const { state, dispatch } = useApp();
  const itinerary = state.generatedItinerary;
  const [activeDay, setActiveDay] = useState(0);
  const [viewMode, setViewMode] = useState("timeline");
  if (!itinerary) return (
    <div style={{ paddingTop: 88, minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: 60, marginBottom: 20 }}>🗺</div>
        <h2 style={{ fontSize: 24, marginBottom: 12 }}>No hay itinerario activo</h2>
        <Button onClick={() => dispatch({ type: "SET_VIEW", payload: "planner" })} icon="✨">Crear itinerario</Button>
      </div>
    </div>
  );
  const day = itinerary.items[activeDay];
  const totalCost = day?.activities.reduce((s, a) => s + a.cost, 0) || 0;
  return (
    <div style={{ paddingTop: 68, minHeight: "100vh", background: "var(--sand-50)" }}>
      <div style={{ background: "linear-gradient(135deg, var(--ocean-900), var(--ocean-700))", padding: "48px 24px 64px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <button onClick={() => dispatch({ type: "SET_VIEW", payload: "planner" })} style={{ color: "rgba(255,255,255,0.6)", background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 10, padding: "7px 14px", cursor: "pointer", fontSize: 13, marginBottom: 24, backdropFilter: "blur(8px)" }}>← Nueva planificación</button>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 20 }}>
            <div>
              <div style={{ color: "var(--sky-300)", fontSize: 13, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 8 }}>✨ Itinerario generado por IA</div>
              <h1 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 700, color: "white", marginBottom: 8, letterSpacing: "-0.02em" }}>{itinerary.destination}</h1>
              <div style={{ display: "flex", gap: 16, color: "rgba(255,255,255,0.65)", fontSize: 14, flexWrap: "wrap" }}>
                <span>🗓 {itinerary.days} días</span>
                <span>💰 Presupuesto: ${itinerary.budget}</span>
                <span>💵 Estimado: ${itinerary.totalEstimated}</span>
              </div>
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <Button variant="secondary" size="sm" onClick={() => dispatch({ type: "SAVE_ITINERARY", payload: itinerary })} icon="📌">Guardar</Button>
              <Button size="sm" variant="accent" icon="📤">Compartir</Button>
            </div>
          </div>
        </div>
      </div>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
        <div style={{ display: "flex", gap: 8, margin: "-24px 0 32px", flexWrap: "nowrap", overflowX: "auto", paddingBottom: 4 }}>
          {itinerary.items.map((d, i) => (
            <button key={i} onClick={() => setActiveDay(i)} style={{ flexShrink: 0, padding: "10px 20px", borderRadius: 12, background: activeDay === i ? "var(--ocean-800)" : "var(--white)", color: activeDay === i ? "white" : "var(--text-secondary)", border: "none", cursor: "pointer", fontWeight: 600, fontSize: 14, boxShadow: "var(--shadow-sm)", transition: "var(--transition)", transform: activeDay === i ? "translateY(-2px)" : "none" }}>
              Día {d.day}
            </button>
          ))}
        </div>
        {day && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 28, paddingBottom: 80 }}>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24, flexWrap: "wrap", gap: 12 }}>
                <div>
                  <h2 style={{ fontSize: 26, fontWeight: 700, marginBottom: 4 }}>{day.title}</h2>
                  <p style={{ color: "var(--coral-500)", fontWeight: 600, fontSize: 14 }}>{day.theme}</p>
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  {["timeline", "grid"].map(m => (
                    <button key={m} onClick={() => setViewMode(m)} style={{ padding: "8px 16px", borderRadius: 8, border: "none", background: viewMode === m ? "var(--ocean-800)" : "var(--sand-100)", color: viewMode === m ? "white" : "var(--text-muted)", cursor: "pointer", fontWeight: 500, fontSize: 13, transition: "var(--transition)", textTransform: "capitalize" }}>
                      {m === "timeline" ? "⏱ Timeline" : "⊞ Cuadrícula"}
                    </button>
                  ))}
                </div>
              </div>
              <div style={viewMode === "grid" ? { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 } : { display: "flex", flexDirection: "column", gap: 0 }}>
                {day.activities.map((act, i) => {
                  const typeStyle = ActivityTypeColors[act.type] || ActivityTypeColors.default;
                  return viewMode === "timeline" ? (
                    <div key={i} style={{ display: "flex", gap: 0, animation: `fadeUp 0.4s ${i * 0.07}s both` }}>
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginRight: 20, minWidth: 56 }}>
                        <div style={{ fontSize: 12, fontWeight: 600, color: "var(--text-muted)", paddingTop: 24 }}>{act.time}</div>
                        <div style={{ width: 12, height: 12, borderRadius: "50%", background: "var(--ocean-500)", border: "3px solid var(--ocean-200)", marginTop: 8, flexShrink: 0 }} />
                        {i < day.activities.length - 1 && <div style={{ width: 2, flex: 1, background: "var(--border)", minHeight: 40 }} />}
                      </div>
                      <div style={{ flex: 1, background: "var(--white)", borderRadius: 16, padding: "20px 24px", marginBottom: 12, boxShadow: "var(--shadow-sm)", border: "1px solid var(--border)", display: "flex", gap: 16, alignItems: "center" }}>
                        <div style={{ width: 48, height: 48, borderRadius: 12, background: typeStyle.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>{typeStyle.icon}</div>
                        <div style={{ flex: 1 }}>
                          <h4 style={{ fontSize: 16, fontWeight: 600, marginBottom: 4 }}>{act.name}</h4>
                          <div style={{ display: "flex", gap: 12, color: "var(--text-muted)", fontSize: 13 }}>
                            <span>⏱ {act.duration}</span>
                            <span style={{ color: typeStyle.color, fontWeight: 600 }}>~${act.cost}</span>
                          </div>
                        </div>
                        <Badge color={act.type === "food" ? "sand" : "sky"} size="sm">{act.type}</Badge>
                      </div>
                    </div>
                  ) : (
                    <div key={i} style={{ background: "var(--white)", borderRadius: 16, padding: 20, boxShadow: "var(--shadow-sm)", border: "1px solid var(--border)", animation: `fadeUp 0.4s ${i * 0.07}s both` }}>
                      <div style={{ width: 44, height: 44, borderRadius: 12, background: typeStyle.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, marginBottom: 12 }}>{typeStyle.icon}</div>
                      <div style={{ fontSize: 11, color: "var(--text-muted)", fontWeight: 600, marginBottom: 6 }}>{act.time}</div>
                      <h4 style={{ fontSize: 15, fontWeight: 600, marginBottom: 8 }}>{act.name}</h4>
                      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                        <Badge color="sand" size="sm">⏱ {act.duration}</Badge>
                        <Badge color="sky" size="sm">💰 ${act.cost}</Badge>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 20, position: "sticky", top: 88 }}>
              <Card hover={false} style={{ padding: 24 }}>
                <h3 style={{ fontWeight: 700, fontSize: 17, marginBottom: 16 }}>💰 Resumen del día</h3>
                {day.activities.map((a, i) => (
                  <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: i < day.activities.length - 1 ? "1px solid var(--border)" : "none", fontSize: 14 }}>
                    <span style={{ color: "var(--text-secondary)" }}>{a.name}</span>
                    <span style={{ fontWeight: 600 }}>${a.cost}</span>
                  </div>
                ))}
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: 16, padding: "12px 0 0", borderTop: "2px solid var(--ocean-800)", fontWeight: 700, fontSize: 16 }}>
                  <span>Total estimado</span>
                  <span style={{ color: "var(--coral-500)" }}>${totalCost}</span>
                </div>
              </Card>
              <Card hover={false} style={{ padding: 24 }}>
                <h3 style={{ fontWeight: 700, fontSize: 17, marginBottom: 16 }}>🏨 Alojamiento</h3>
                <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <div style={{ width: 44, height: 44, borderRadius: 10, background: "var(--sand-100)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>🏨</div>
                  <div>
                    <div style={{ fontWeight: 600, marginBottom: 4 }}>{day.accommodation.name}</div>
                    <StarRating rating={day.accommodation.rating} />
                    <div style={{ marginTop: 6, fontWeight: 700, color: "var(--ocean-800)" }}>${day.accommodation.price}/noche</div>
                  </div>
                </div>
              </Card>
              <Card hover={false} style={{ padding: 24 }}>
                <h3 style={{ fontWeight: 700, fontSize: 17, marginBottom: 16 }}>💡 Tips del día</h3>
                {day.tips.map((t, i) => (
                  <div key={i} style={{ display: "flex", gap: 10, marginBottom: 10, fontSize: 14 }}>
                    <span style={{ color: "var(--sky-400)", fontWeight: 700 }}>→</span>
                    <span style={{ color: "var(--text-secondary)" }}>{t}</span>
                  </div>
                ))}
              </Card>
            </div>
          </div>
        )}
      </div>
      <style>{`@media (max-width: 900px) { .itinerary-grid { grid-template-columns: 1fr !important; } }`}</style>
    </div>
  );
};

export default ItineraryPage