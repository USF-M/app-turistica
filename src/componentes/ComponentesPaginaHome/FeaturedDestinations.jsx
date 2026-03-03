import AppContext from "../../contextos/AppContext";
import { useContext, useState, useEffect } from "react";
import Button from "../ComponentesUI/Button";
import useDestinations from "../../hooks/useDestinations";
import SkeletonCard from "../ComponentesUI/SkeletonCard";
import Card from "../ComponentesUI/Card";
import Badge from "../ComponentesUI/Badge";
import StarRating from "../ComponentesUI/StarRating";
const useApp = () => useContext(AppContext);

const FeaturedDestinations = () => {
    const { dispatch } = useApp();
    const { destinations, loading } = useDestinations({});
    const featured = destinations.slice(0, 3);
    return (
        <section style={{ padding: "80px 24px", maxWidth: 1200, margin: "0 auto" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 48, flexWrap: "wrap", gap: 16 }}>
                <div>
                    <p style={{ color: "var(--coral-500)", fontWeight: 600, fontSize: 13, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 8 }}>Destinos destacados</p>
                    <h2 style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 700, letterSpacing: "-0.02em" }}>Lugares que inspiran</h2>
                </div>
                <Button variant="secondary" onClick={() => dispatch({ type: "SET_VIEW", payload: "destinations" })} icon="→">Ver todos</Button>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: 28 }}>
                {loading ? [1, 2, 3].map(i => <SkeletonCard key={i} />) : featured.map((dest, idx) => (
                    <Card key={dest.id} style={{ animationDelay: `${idx * 0.1}s` }} className="fade-up">
                        <div style={{ position: "relative", overflow: "hidden", cursor: "pointer" }} onClick={() => dispatch({ type: "SET_DESTINATION", payload: dest })}>
                            <img src={dest.image} alt={dest.name} style={{ width: "100%", height: 240, objectFit: "cover", transition: "transform 0.5s ease" }}
                                onMouseEnter={e => e.target.style.transform = "scale(1.05)"} onMouseLeave={e => e.target.style.transform = "scale(1)"} />
                            <div style={{ position: "absolute", top: 16, left: 16, display: "flex", gap: 6 }}>
                                <Badge color="ocean">{dest.category}</Badge>
                            </div>
                            <div style={{ position: "absolute", bottom: 16, right: 16, background: "rgba(10,22,40,0.8)", backdropFilter: "blur(8px)", borderRadius: 10, padding: "6px 12px", color: "white", fontSize: 14, fontWeight: 600 }}>
                                Desde ${dest.price}
                            </div>
                        </div>
                        <div style={{ padding: "20px 24px 24px" }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                                <div>
                                    <h3 style={{ fontSize: 22, fontWeight: 700, marginBottom: 2 }}>{dest.name}</h3>
                                    <p style={{ color: "var(--text-muted)", fontSize: 14 }}>🌍 {dest.country}</p>
                                </div>
                                <StarRating rating={dest.rating} reviews={dest.reviews} />
                            </div>
                            <p style={{ color: "var(--text-secondary)", fontSize: 14, lineHeight: 1.6, marginBottom: 16 }}>{dest.description}</p>
                            <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 16 }}>
                                {dest.tags.map(t => <Badge key={t} color="sand" size="sm">{t}</Badge>)}
                            </div>
                            <div style={{ display: "flex", gap: 10 }}>
                                <Button size="sm" onClick={() => dispatch({ type: "SET_DESTINATION", payload: dest })} style={{ flex: 1 }}>Ver destino</Button>
                                <Button size="sm" variant="accent" onClick={() => dispatch({ type: "SET_VIEW", payload: "planner" })} icon="✨" style={{ flex: 1 }}>Planificar</Button>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </section>
    );
};

export default FeaturedDestinations