import SkeletonCard from "../componentes/ComponentesUI/SkeletonCard";
import Button from "../componentes/ComponentesUI/Button";
import Card from "../componentes/ComponentesUI/Card";
import StarRating from "../componentes/ComponentesUI/StarRating";
import Badge from "../componentes/ComponentesUI/Badge";
import AppContext from "../contextos/AppContext";
import { useContext, useState } from "react";
import useDestinations from "../hooks/useDestinations";
import useAuth from "../hooks/useAuth";

const useApp = () => useContext(AppContext);

const CATEGORIES = ["Todos", "Cultural", "Playa", "Aventura", "Naturaleza", "Lujo"];

const DestinationsPage = () => {
    const { dispatch } = useApp();
    const { can } = useAuth();
    const [activeCategory, setActiveCategory] = useState("Todos");
    const [search, setSearch] = useState("");
    const filters = { category: activeCategory !== "Todos" ? activeCategory : undefined, search: search || undefined };
    const { destinations, loading } = useDestinations(filters);
    return (
        <div style={{ paddingTop: 88, minHeight: "100vh" }}>
            <div style={{ background: "linear-gradient(135deg, var(--ocean-900) 0%, var(--ocean-700) 100%)", padding: "60px 24px 80px" }}>
                <div style={{ maxWidth: 1200, margin: "0 auto" }}>
                    <p style={{ color: "var(--sky-300)", fontWeight: 600, fontSize: 13, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 12 }}>Explora el mundo</p>
                    <h1 style={{ fontSize: "clamp(32px, 5vw, 56px)", fontWeight: 700, color: "white", letterSpacing: "-0.02em", marginBottom: 32 }}>Destinos increíbles</h1>
                    <div style={{ display: "flex", gap: 12, background: "rgba(255,255,255,0.1)", backdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 16, padding: "4px 16px", maxWidth: 560 }}>
                        <span style={{ color: "rgba(255,255,255,0.5)", fontSize: 20, display: "flex", alignItems: "center" }}>🔍</span>
                        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Buscar destino o país..."
                            style={{ flex: 1, padding: "14px 0", background: "transparent", border: "none", outline: "none", color: "white", fontSize: 16 }} />
                    </div>
                </div>
            </div>
            <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
                <div style={{ display: "flex", gap: 8, margin: "-28px 0 40px", flexWrap: "wrap" }}>
                    {CATEGORIES.map(cat => (
                        <button key={cat} onClick={() => setActiveCategory(cat)}
                            style={{ padding: "10px 20px", borderRadius: 99, fontSize: 14, fontWeight: 600, border: "none", cursor: "pointer", transition: "var(--transition)", background: activeCategory === cat ? "var(--ocean-800)" : "var(--white)", color: activeCategory === cat ? "white" : "var(--text-secondary)", boxShadow: activeCategory === cat ? "var(--shadow-md)" : "var(--shadow-sm)" }}>
                            {cat}
                        </button>
                    ))}
                </div>
                {loading ? (
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 28, paddingBottom: 80 }}>
                        {[1, 2, 3, 4, 5, 6].map(i => <SkeletonCard key={i} />)}
                    </div>
                ) : destinations.length === 0 ? (
                    <div style={{ textAlign: "center", padding: "80px 0", color: "var(--text-muted)" }}>
                        <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
                        <h3 style={{ fontSize: 22, fontWeight: 600, marginBottom: 8 }}>Sin resultados</h3>
                        <p>Prueba con otro término de búsqueda</p>
                    </div>
                ) : (
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 28, paddingBottom: 80 }}>
                        {destinations.map((dest, idx) => (
                            <Card key={dest.id} style={{ animation: `fadeUp 0.5s ${idx * 0.06}s both` }}>
                                <div style={{ position: "relative", overflow: "hidden", cursor: "pointer" }} onClick={() => dispatch({ type: "SET_DESTINATION", payload: dest })}>
                                    <img src={dest.image} alt={dest.name} style={{ width: "100%", height: 220, objectFit: "cover", transition: "transform 0.5s ease" }}
                                        onMouseEnter={e => e.target.style.transform = "scale(1.05)"} onMouseLeave={e => e.target.style.transform = "scale(1)"} />
                                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(10,22,40,0.5) 0%, transparent 50%)" }} />
                                    <div style={{ position: "absolute", top: 14, left: 14 }}><Badge color="ocean">{dest.category}</Badge></div>
                                    <div style={{ position: "absolute", bottom: 14, left: 14, right: 14, display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
                                        <div>
                                            <h3 style={{ color: "white", fontSize: 22, fontWeight: 700, fontFamily: "'Playfair Display', serif" }}>{dest.name}</h3>
                                            <p style={{ color: "rgba(255,255,255,0.75)", fontSize: 13 }}>🌍 {dest.country}</p>
                                        </div>
                                        <div style={{ background: "rgba(255,255,255,0.15)", backdropFilter: "blur(8px)", borderRadius: 10, padding: "6px 12px" }}>
                                            <StarRating rating={dest.rating} />
                                        </div>
                                    </div>
                                </div>
                                <div style={{ padding: "18px 22px 22px" }}>
                                    <p style={{ color: "var(--text-secondary)", fontSize: 14, lineHeight: 1.6, marginBottom: 14 }}>{dest.description}</p>
                                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                        <span style={{ fontSize: 20, fontWeight: 700, color: "var(--ocean-800)" }}>Desde <span style={{ color: "var(--coral-500)" }}>${dest.price}</span></span>
                                        <div style={{ display: "flex", gap: 8 }}>
                                            {can("destinations:edit") && <Button size="sm" variant="secondary">Editar</Button>}
                                            <Button size="sm" variant="ghost" onClick={() => dispatch({ type: "SET_DESTINATION", payload: dest })}>Ver más</Button>
                                            <Button size="sm" variant="accent" onClick={() => dispatch({ type: "SET_VIEW", payload: "planner" })} icon="✨">Planificar</Button>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default DestinationsPage