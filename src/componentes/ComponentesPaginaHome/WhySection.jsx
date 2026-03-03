const WhySection = () => {
    const features = [
        { icon: "🤖", title: "IA personalizada", desc: "Algoritmos que aprenden tus preferencias y crean itinerarios únicos adaptados a ti." },
        { icon: "⚡", title: "Instantáneo", desc: "Genera un plan completo de viaje en segundos, no en horas de investigación." },
        { icon: "💰", title: "Ajustado a tu budget", desc: "Optimizamos cada detalle para que aproveches al máximo tu presupuesto." },
        { icon: "🗺️", title: "Cobertura global", desc: "Más de 150 destinos en 80 países con información actualizada y verificada." },
    ];
    return (
        <section style={{ background: "var(--ocean-900)", padding: "80px 24px" }}>
            <div style={{ maxWidth: 1200, margin: "0 auto" }}>
                <div style={{ textAlign: "center", marginBottom: 60 }}>
                    <p style={{ color: "var(--sky-300)", fontWeight: 600, fontSize: 13, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 12 }}>¿Por qué VoyageAI?</p>
                    <h2 style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 700, color: "white", letterSpacing: "-0.02em" }}>Viaja más inteligente</h2>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 24 }}>
                    {features.map((f, i) => (
                        <div key={i} className="fade-up" style={{ animationDelay: `${i * 0.1}s`, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "var(--radius-lg)", padding: 32, textAlign: "center", transition: "var(--transition)" }}
                            onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.1)"; e.currentTarget.style.transform = "translateY(-4px)"; }}
                            onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; e.currentTarget.style.transform = "none"; }}>
                            <div style={{ fontSize: 40, marginBottom: 20 }}>{f.icon}</div>
                            <h3 style={{ color: "white", fontSize: 18, fontWeight: 600, marginBottom: 10, fontFamily: "'Playfair Display', serif" }}>{f.title}</h3>
                            <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 14, lineHeight: 1.7 }}>{f.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
export default WhySection