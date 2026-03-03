import AppContext from "../../contextos/AppContext";
import { useContext } from "react";
const useApp = () => useContext(AppContext);
const Footer = () => {
    const { dispatch } = useApp();
    return (
        <footer style={{ background: "var(--ocean-900)", color: "rgba(255,255,255,0.6)", padding: "60px 24px 40px" }}>
            <div style={{ maxWidth: 1200, margin: "0 auto" }}>
                <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 40, marginBottom: 48, flexWrap: "wrap" }}>
                    <div>
                        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                            <div style={{ width: 36, height: 36, borderRadius: 10, background: "linear-gradient(135deg, var(--ocean-500), var(--sky-400))", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>✈</div>
                            <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 700, color: "white" }}>VoyageAI</span>
                        </div>
                        <p style={{ fontSize: 14, lineHeight: 1.8, maxWidth: 280 }}>La plataforma que usa inteligencia artificial para crear los itinerarios de viaje más personalizados del mundo.</p>
                    </div>
                    {[{ title: "Producto", links: ["Planificador IA", "Destinos", "Mis viajes", "Preferencias"] }, { title: "Compañía", links: ["Sobre nosotros", "Blog", "Prensa", "Contacto"] }, { title: "Legal", links: ["Privacidad", "Términos", "Cookies"] }].map((col) => (
                        <div key={col.title}>
                            <h4 style={{ color: "white", fontWeight: 600, fontSize: 14, marginBottom: 16, letterSpacing: "0.04em" }}>{col.title}</h4>
                            {col.links.map(l => <div key={l} style={{ marginBottom: 10, cursor: "pointer", fontSize: 14, transition: "color 0.2s" }} onMouseEnter={e => e.target.style.color = "white"} onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.6)"}>{l}</div>)}
                        </div>
                    ))}
                </div>
                <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 13, flexWrap: "wrap", gap: 12 }}>
                    <span>© 2025 VoyageAI. Todos los derechos reservados.</span>
                    <span>Hecho con ❤️ para los viajeros del mundo</span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;