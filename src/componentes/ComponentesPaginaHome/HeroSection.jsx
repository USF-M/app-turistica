import AppContext from "../../contextos/AppContext";
import { useContext, useState } from "react";
import Button from "../ComponentesUI/Button";
const useApp = () => useContext(AppContext);

const HeroSection = () => {
    const { dispatch } = useApp();
    const [search, setSearch] = useState("");
    const [imgLoaded, setImgLoaded] = useState(false);
    const stats = [{ value: "150+", label: "Destinos" }, { value: "50K+", label: "Viajeros" }, { value: "4.9★", label: "Valoración" }];
    return (
        <section style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", overflow: "hidden" }}>
            <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
                <img src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1600&q=80" alt="Hero" onLoad={() => setImgLoaded(true)}
                    style={{ width: "100%", height: "100%", objectFit: "cover", opacity: imgLoaded ? 1 : 0, transition: "opacity 0.8s ease" }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(10,22,40,0.85) 0%, rgba(10,22,40,0.5) 60%, rgba(10,22,40,0.3) 100%)" }} />
            </div>
            <div style={{ position: "relative", zIndex: 1, maxWidth: 1200, margin: "0 auto", padding: "120px 24px 80px", width: "100%" }}>
                <div style={{ maxWidth: 700 }}>
                    <div className="fade-up" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.12)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 99, padding: "6px 16px", marginBottom: 24, color: "var(--sky-300)", fontSize: 13, fontWeight: 500 }}>
                        <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--sky-300)", animation: "pulse 2s infinite" }} />
                        IA planifica tu viaje perfecto
                    </div>
                    <h1 className="fade-up delay-1" style={{ fontSize: "clamp(40px, 6vw, 72px)", fontWeight: 700, color: "white", lineHeight: 1.1, marginBottom: 24, letterSpacing: "-0.03em" }}>
                        Descubre el mundo<br /><em style={{ color: "var(--sky-300)", fontStyle: "italic" }}>sin límites</em>
                    </h1>
                    <p className="fade-up delay-2" style={{ fontSize: 18, color: "rgba(255,255,255,0.75)", lineHeight: 1.7, marginBottom: 40, maxWidth: 520 }}>
                        Planifica itinerarios personalizados con inteligencia artificial. Del sueño al destino en minutos.
                    </p>
                    <div className="fade-up delay-3" style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 60 }}>
                        <div style={{ flex: 1, minWidth: 280, display: "flex", background: "rgba(255,255,255,0.1)", backdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 16, overflow: "hidden" }}>
                            <span style={{ padding: "0 16px", color: "rgba(255,255,255,0.6)", fontSize: 20, display: "flex", alignItems: "center" }}>🔍</span>
                            <input value={search} onChange={e => setSearch(e.target.value)} onKeyDown={e => e.key === "Enter" && dispatch({ type: "SET_VIEW", payload: "destinations" })}
                                placeholder="¿A dónde quieres ir?" style={{ flex: 1, padding: "16px 8px", background: "transparent", border: "none", outline: "none", color: "white", fontSize: 16 }} />
                        </div>
                        <Button size="lg" onClick={() => dispatch({ type: "SET_VIEW", payload: "destinations" })} icon="→">Explorar</Button>
                    </div>
                    <div className="fade-up delay-4" style={{ display: "flex", gap: 32, flexWrap: "wrap" }}>
                        {stats.map((s, i) => (
                            <div key={i}>
                                <div style={{ fontSize: 28, fontWeight: 700, color: "white", letterSpacing: "-0.03em" }}>{s.value}</div>
                                <div style={{ fontSize: 13, color: "rgba(255,255,255,0.55)", marginTop: 2 }}>{s.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 120, background: "linear-gradient(to top, var(--sand-50), transparent)", zIndex: 1 }} />
        </section>
    );
};

export default HeroSection