import { useState, useContext } from "react";
import AppContext from "../contextos/AppContext";
import Button from "../componentes/ComponentesUI/Button";
import Badge from "../componentes/ComponentesUI/Badge";
import Card from "../componentes/ComponentesUI/Card";
import StarRating from "../componentes/ComponentesUI/StarRating";
import useAuth from "../hooks/useAuth";

const useApp = () => useContext(AppContext);

const ActivityTypeColors = { cultural: { bg: "#e8f0fc", color: "var(--ocean-500)", icon: "🏛" }, food: { bg: "#fef3e2", color: "#d97706", icon: "🍽" }, outdoor: { bg: "#e6f5ec", color: "var(--leaf-500)", icon: "🌿" }, shopping: { bg: "#fce8f3", color: "#db2777", icon: "🛍" }, default: { bg: "var(--sand-100)", color: "var(--text-muted)", icon: "📍" } };

const ItineraryPage = () => {
  const { state, dispatch } = useApp();
  const { can } = useAuth();
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
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 20 }}>
            <div>
              <h1 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 700, color: "white", marginBottom: 8, letterSpacing: "-0.02em" }}>{itinerary.destination}</h1>

            </div>
            {can("itineraries:create") && <Button variant="secondary" size="sm" onClick={() => dispatch({ type: "SAVE_ITINERARY", payload: itinerary })} icon="📌">Guardar</Button>}
          </div>
        </div>
      </div>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px 50px" }}>
        <div style={{ display: "flex", gap: 8, margin: "20px 0" }}>
          {itinerary.items.map((d, i) => (
            <button key={i} onClick={() => setActiveDay(i)} style={{ padding: "10px 20px", borderRadius: 12, background: activeDay === i ? "var(--ocean-800)" : "var(--white)", color: activeDay === i ? "white" : "var(--text-secondary)" }}>Día {d.day}</button>
          ))}
        </div>
        {day && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 28 }}>
            <div>
              <div style={{ display: "flex", gap: 8, marginBottom: 18 }}>
                {["timeline", "grid"].map(m => <button key={m} onClick={() => setViewMode(m)} style={{ padding: "8px 16px", borderRadius: 8 }}>{m}</button>)}
              </div>
              {day.activities.map((act, i) => {
                const typeStyle = ActivityTypeColors[act.type] || ActivityTypeColors.default;
                return <div key={i} style={{ background: "var(--white)", borderRadius: 16, padding: "14px 18px", marginBottom: 10 }}><strong>{typeStyle.icon} {act.name}</strong></div>;
              })}
            </div>
            <Card hover={false} style={{ padding: 24 }}>
              <h3>💰 Resumen del día</h3>
              <p>Total: ${totalCost}</p>
              {day.accommodation && <div><p>{day.accommodation.name}</p><StarRating rating={day.accommodation.rating} /></div>}
              <Badge color="sky" size="sm">Modo: {viewMode}</Badge>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default ItineraryPage