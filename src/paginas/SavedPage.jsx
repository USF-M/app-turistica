import AppContext from "../contextos/AppContext";
import { useContext, useState, useEffect } from "react";
import Button from "../componentes/ComponentesUI/Button";
import Spinner from "../componentes/ComponentesUI/Spinner";
import Card from "../componentes/ComponentesUI/Card";
import ItineraryService from "../servicios/ItineraryService";
const useApp = () => useContext(AppContext);

const SavedPage = () => {
    const { state, dispatch } = useApp();
    const [savedFromService, setSaved] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        ItineraryService.getSaved().then(data => { setSaved(data); setLoading(false); });
    }, []);
    const all = [...savedFromService, ...(state.savedItineraries || [])];
    const statusColors = { upcoming: { bg: "#e6f5ec", color: "var(--leaf-500)", label: "Próximo" }, planning: { bg: "#fef3e2", color: "#d97706", label: "Planificando" }, completed: { bg: "var(--sand-100)", color: "var(--text-muted)", label: "Completado" } };
    return (
        <div style={{ paddingTop: 88, minHeight: "100vh" }}>
            <div style={{ background: "linear-gradient(135deg, var(--ocean-900), var(--ocean-700))", padding: "56px 24px 80px" }}>
                <div style={{ maxWidth: 1200, margin: "0 auto" }}>
                    <p style={{ color: "var(--sky-300)", fontWeight: 600, fontSize: 13, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 12 }}>Tus aventuras</p>
                    <h1 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 700, color: "white", letterSpacing: "-0.02em", marginBottom: 8 }}>Mis viajes guardados</h1>
                    <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 17 }}>{all.length} itinerarios guardados</p>
                </div>
            </div>
            <div style={{ maxWidth: 1200, margin: "0 auto", padding: "40px 24px 80px" }}>
                {loading ? (
                    <div style={{ display: "flex", justifyContent: "center", padding: 80 }}><Spinner size={40} /></div>
                ) : all.length === 0 ? (
                    <div style={{ textAlign: "center", padding: "100px 0" }}>
                        <div style={{ fontSize: 64, marginBottom: 20 }}>📌</div>
                        <h2 style={{ fontSize: 26, fontWeight: 700, marginBottom: 12 }}>Ningún viaje guardado</h2>
                        <p style={{ color: "var(--text-muted)", marginBottom: 32 }}>Planifica tu primer viaje con IA y guárdalo aquí.</p>
                        <Button size="lg" onClick={() => dispatch({ type: "SET_VIEW", payload: "planner" })} icon="✨">Planificar ahora</Button>
                    </div>
                ) : (
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 24 }}>
                        {all.map((trip, i) => {
                            const sc = statusColors[trip.status] || statusColors.planning;
                            return (
                                <Card key={trip.id || i} style={{ padding: 0, animation: `fadeUp 0.5s ${i * 0.07}s both` }}>
                                    <div style={{ height: 160, background: "linear-gradient(135deg, var(--ocean-800), var(--ocean-600))", borderRadius: "var(--radius-lg) var(--radius-lg) 0 0", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" }}>
                                        <div style={{ position: "absolute", top: -30, right: -30, width: 120, height: 120, borderRadius: "50%", background: "rgba(56,178,212,0.15)" }} />
                                        <span style={{ fontSize: 52 }}>✈️</span>
                                        <div style={{ position: "absolute", top: 16, right: 16 }}>
                                            <span style={{ background: sc.bg, color: sc.color, padding: "5px 12px", borderRadius: 99, fontSize: 12, fontWeight: 600 }}>{sc.label}</span>
                                        </div>
                                    </div>
                                    <div style={{ padding: 24 }}>
                                        <h3 style={{ fontSize: 22, fontWeight: 700, marginBottom: 4 }}>{trip.destination}</h3>
                                        <p style={{ color: "var(--text-muted)", fontSize: 14, marginBottom: 16 }}>📅 {trip.startDate} → {trip.endDate}</p>
                                        <div style={{ display: "flex", gap: 12, marginBottom: 20 }}>
                                            <div style={{ flex: 1, background: "var(--sand-50)", borderRadius: 10, padding: "10px 14px", textAlign: "center" }}>
                                                <div style={{ fontWeight: 700, fontSize: 18 }}>{trip.days}</div>
                                                <div style={{ color: "var(--text-muted)", fontSize: 12 }}>días</div>
                                            </div>
                                            <div style={{ flex: 1, background: "var(--sand-50)", borderRadius: 10, padding: "10px 14px", textAlign: "center" }}>
                                                <div style={{ fontWeight: 700, fontSize: 18 }}>{trip.travelers || 2}</div>
                                                <div style={{ color: "var(--text-muted)", fontSize: 12 }}>viajeros</div>
                                            </div>
                                            <div style={{ flex: 1, background: "var(--sand-50)", borderRadius: 10, padding: "10px 14px", textAlign: "center" }}>
                                                <div style={{ fontWeight: 700, fontSize: 18 }}>${trip.budget?.toLocaleString() || "—"}</div>
                                                <div style={{ color: "var(--text-muted)", fontSize: 12 }}>budget</div>
                                            </div>
                                        </div>
                                        <div style={{ display: "flex", gap: 10 }}>
                                            <Button size="sm" style={{ flex: 1, justifyContent: "center" }} onClick={() => { dispatch({ type: "SET_ITINERARY", payload: trip }); dispatch({ type: "SET_VIEW", payload: "itinerary" }); }}>Ver itinerario</Button>
                                            <Button size="sm" variant="ghost" icon="🗑" />
                                        </div>
                                    </div>
                                </Card>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

export default SavedPage