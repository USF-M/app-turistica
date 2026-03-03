import Badge from "../componentes/ComponentesUI/Badge";
import Button from "../componentes/ComponentesUI/Button";
import Card from "../componentes/ComponentesUI/Card";

const DestinationDetailPage = () => {
    const { state, dispatch } = useApp();
    const dest = state.selectedDestination;
    if (!dest) return null;
    const infoItems = [
        { icon: "🌤", label: "Clima", value: dest.climate },
        { icon: "📅", label: "Mejor época", value: dest.bestSeason },
        { icon: "💬", label: "Idioma", value: dest.language },
        { icon: "💱", label: "Moneda", value: dest.currency },
        { icon: "⭐", label: "Valoración", value: `${dest.rating} (${dest.reviews?.toLocaleString()} reseñas)` },
        { icon: "💰", label: "Precio aprox.", value: `Desde $${dest.price}` },
    ];
    return (
        <div style={{ paddingTop: 68, minHeight: "100vh" }}>
            <div style={{ position: "relative", height: "clamp(360px, 55vh, 520px)", overflow: "hidden" }}>
                <img src={dest.image} alt={dest.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(10,22,40,0.9) 0%, rgba(10,22,40,0.3) 60%, transparent 100%)" }} />
                <div style={{ position: "absolute", bottom: 48, left: 0, right: 0, maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
                    <button onClick={() => dispatch({ type: "SET_VIEW", payload: "destinations" })} style={{ display: "flex", alignItems: "center", gap: 8, color: "rgba(255,255,255,0.7)", background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 10, padding: "8px 16px", marginBottom: 20, cursor: "pointer", fontSize: 14, backdropFilter: "blur(8px)" }}>
                        ← Volver a destinos
                    </button>
                    <div style={{ display: "flex", gap: 10, marginBottom: 12 }}>
                        <Badge color="ocean">{dest.category}</Badge>
                        <Badge color="sky">{dest.continent}</Badge>
                    </div>
                    <h1 style={{ fontSize: "clamp(36px, 5vw, 60px)", fontWeight: 700, color: "white", letterSpacing: "-0.03em", marginBottom: 6 }}>{dest.name}</h1>
                    <p style={{ color: "rgba(255,255,255,0.75)", fontSize: 18 }}>🌍 {dest.country}</p>
                </div>
            </div>
            <div style={{ maxWidth: 1200, margin: "0 auto", padding: "48px 24px 80px", display: "grid", gridTemplateColumns: "1fr 340px", gap: 40, alignItems: "start" }}>
                <div>
                    <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 16 }}>Sobre {dest.name}</h2>
                    <p style={{ color: "var(--text-secondary)", fontSize: 17, lineHeight: 1.8, marginBottom: 40 }}>{dest.description} Este destino ofrece una combinación única de experiencias culturales, naturales y gastronómicas que lo convierten en uno de los favoritos de los viajeros internacionales.</p>
                    <h3 style={{ fontSize: 22, fontWeight: 700, marginBottom: 20 }}>Imprescindibles</h3>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 16, marginBottom: 40 }}>
                        {dest.highlights?.map((h, i) => (
                            <div key={i} style={{ background: "var(--white)", border: "1px solid var(--border)", borderRadius: 14, padding: "16px 20px", display: "flex", alignItems: "center", gap: 12 }}>
                                <span style={{ width: 36, height: 36, borderRadius: 10, background: "var(--ocean-800)", color: "var(--sky-300)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, flexShrink: 0 }}>📍</span>
                                <span style={{ fontWeight: 500, fontSize: 15 }}>{h}</span>
                            </div>
                        ))}
                    </div>
                    <div style={{ display: "flex", gap: 12 }}>
                        <Button size="lg" variant="accent" onClick={() => dispatch({ type: "SET_VIEW", payload: "planner" })} icon="✨">Planificar viaje aquí</Button>
                        <Button size="lg" variant="secondary">Guardar destino</Button>
                    </div>
                </div>
                <div style={{ position: "sticky", top: 88 }}>
                    <Card style={{ padding: 28 }} hover={false}>
                        <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 24 }}>Información práctica</h3>
                        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                            {infoItems.map((item, i) => (
                                <div key={i} style={{ display: "flex", gap: 14, alignItems: "flex-start", paddingBottom: 16, borderBottom: i < infoItems.length - 1 ? "1px solid var(--border)" : "none" }}>
                                    <span style={{ fontSize: 20 }}>{item.icon}</span>
                                    <div>
                                        <div style={{ fontSize: 11, fontWeight: 600, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 3 }}>{item.label}</div>
                                        <div style={{ fontSize: 15, fontWeight: 500, color: "var(--text-primary)" }}>{item.value}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <Button size="md" style={{ width: "100%", marginTop: 8, justifyContent: "center" }} onClick={() => dispatch({ type: "SET_VIEW", payload: "planner" })} icon="✨">Crear itinerario</Button>
                    </Card>
                </div>
            </div>
            <style>{`@media (max-width: 768px) { .detail-grid { grid-template-columns: 1fr !important; } }`}</style>
        </div>
    );
};

export default DestinationDetailPage
