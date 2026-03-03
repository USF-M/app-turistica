import AppContext from "../../contextos/AppContext";
import { useContext, useState, useEffect } from "react";
import Button from "../ComponentesUI/Button";
const useApp = () => useContext(AppContext);

const NAV_ITEMS = [
    { id: "home", label: "Inicio", icon: "🏠" },
    { id: "destinations", label: "Destinos", icon: "🗺️" },
    { id: "planner", label: "Planificar", icon: "✨" },
    { id: "saved", label: "Mis Viajes", icon: "📌" },
];

const Navbar = () => {
    const { state, dispatch } = useApp();
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    useEffect(() => { const h = () => setScrolled(window.scrollY > 40); window.addEventListener("scroll", h); return () => window.removeEventListener("scroll", h); }, []);
    const isHome = state.currentView === "home";
    const bg = scrolled || !isHome ? "var(--white)" : "transparent";
    const textColor = scrolled || !isHome ? "var(--text-primary)" : "var(--white)";
    return (
        <>
            <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000, background: bg, backdropFilter: scrolled ? "blur(20px)" : "none", boxShadow: scrolled ? "0 1px 0 var(--border)" : "none", transition: "var(--transition)", padding: "0 24px" }}>
                <div style={{ maxWidth: 1200, margin: "0 auto", height: 68, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <button onClick={() => dispatch({ type: "SET_VIEW", payload: "home" })} style={{ display: "flex", alignItems: "center", gap: 10, background: "none", border: "none", cursor: "pointer" }}>
                        <div style={{ width: 36, height: 36, borderRadius: 10, background: "linear-gradient(135deg, var(--ocean-500), var(--sky-400))", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>✈</div>
                        <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 700, color: textColor, letterSpacing: "-0.02em" }}>VoyageAI</span>
                    </button>
                    <div style={{ display: "flex", gap: 4, alignItems: "center" }} className="desktop-nav">
                        {NAV_ITEMS.map(item => (
                            <button key={item.id} onClick={() => dispatch({ type: "SET_VIEW", payload: item.id })}
                                style={{ padding: "8px 16px", borderRadius: 10, background: state.currentView === item.id ? (scrolled || !isHome ? "var(--ocean-800)" : "rgba(255,255,255,0.2)") : "transparent", color: state.currentView === item.id ? (scrolled || !isHome ? "white" : "white") : textColor, fontWeight: 500, fontSize: 14, transition: "var(--transition)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>
                                <span style={{ fontSize: 15 }}>{item.icon}</span>{item.label}
                            </button>
                        ))}
                        <Button size="sm" onClick={() => dispatch({ type: "SET_VIEW", payload: "planner" })} icon="✨" style={{ marginLeft: 8 }}>Planificar viaje</Button>
                    </div>
                    <button onClick={() => setMobileOpen(!mobileOpen)} style={{ display: "none", background: "none", border: "none", fontSize: 24, color: textColor, padding: 8 }} className="mobile-menu-btn">{mobileOpen ? "✕" : "☰"}</button>
                </div>
            </nav>
            {mobileOpen && (
                <div style={{ position: "fixed", inset: 0, zIndex: 999, background: "var(--ocean-900)", padding: "100px 24px 40px", display: "flex", flexDirection: "column", gap: 8, animation: "fadeIn 0.2s ease" }}>
                    {NAV_ITEMS.map(item => (
                        <button key={item.id} onClick={() => { dispatch({ type: "SET_VIEW", payload: item.id }); setMobileOpen(false); }}
                            style={{ padding: "16px 20px", borderRadius: 14, background: state.currentView === item.id ? "rgba(255,255,255,0.1)" : "transparent", color: "var(--white)", fontWeight: 500, fontSize: 18, textAlign: "left", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 12 }}>
                            <span style={{ fontSize: 22 }}>{item.icon}</span>{item.label}
                        </button>
                    ))}
                </div>
            )}
            <style>{`@media (max-width: 768px) { .desktop-nav { display: none !important; } .mobile-menu-btn { display: flex !important; } }`}</style>
        </>
    );
};

export default Navbar;
