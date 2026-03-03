import AppContext from "../../contextos/AppContext";
import { useContext } from "react";
import Button from "../ComponentesUI/Button";
const useApp = () => useContext(AppContext);

const CTASection = () => {
    const { dispatch } = useApp();
    return (
        <section style={{ padding: "80px 24px" }}>
            <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center", background: "linear-gradient(135deg, var(--ocean-800) 0%, var(--ocean-600) 100%)", borderRadius: "var(--radius-xl)", padding: "72px 48px", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: -60, right: -60, width: 240, height: 240, borderRadius: "50%", background: "rgba(56,178,212,0.12)", pointerEvents: "none" }} />
                <div style={{ position: "absolute", bottom: -40, left: -40, width: 160, height: 160, borderRadius: "50%", background: "rgba(224,90,58,0.1)", pointerEvents: "none" }} />
                <div style={{ position: "relative", zIndex: 1 }}>
                    <p style={{ color: "var(--sky-300)", fontWeight: 600, fontSize: 13, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 16 }}>Empieza hoy</p>
                    <h2 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 700, color: "white", letterSpacing: "-0.02em", marginBottom: 20 }}>Tu próxima aventura<br />te espera</h2>
                    <p style={{ color: "rgba(255,255,255,0.65)", fontSize: 17, marginBottom: 36, maxWidth: 480, margin: "0 auto 36px" }}>Deja que la IA diseñe el viaje de tus sueños. Destino, fechas, presupuesto: nosotros nos encargamos del resto.</p>
                    <Button size="lg" variant="accent" onClick={() => dispatch({ type: "SET_VIEW", payload: "planner" })} icon="✨">Planificar mi viaje</Button>
                </div>
            </div>
        </section>
    );
};

export default CTASection