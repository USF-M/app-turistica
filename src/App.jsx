import { useState, useEffect, useCallback, createContext, useContext, useReducer } from "react";
import Footer from "./componentes/Footer/Footer";
import HomePage from "./paginas/HomePage";
import DestinationsPage from "./paginas/DestinationsPage";
import DestinationDetailPage from "./paginas/DestinationDetailPage";
import PlannerPage from "./paginas/PlannerPage";
import SavedPage from "./paginas/SavedPage";
import Notification from "./componentes/ComponentesUI/Notification";
import Navbar from "./componentes/Navbar/Navbar";
import AppContext from "./contextos/AppContext";
import ItineraryPage from "./paginas/ItineraryPage";
// ============================================================
// DESIGN TOKENS
// ============================================================
const tokens = `
  :root {
    --sand-50: #fdf8f0;
    --sand-100: #f5ecd7;
    --sand-200: #e8d5b0;
    --sand-300: #d4b483;
    --sand-400: #bc8d55;
    --sand-500: #a67340;
    --ocean-900: #0a1628;
    --ocean-800: #0f2040;
    --ocean-700: #162d56;
    --ocean-600: #1e3d70;
    --ocean-500: #2651a0;
    --ocean-400: #3a6bc5;
    --ocean-300: #5a8de0;
    --sky-400: #38b2d4;
    --sky-300: #67cfe8;
    --coral-500: #e05a3a;
    --coral-400: #f07050;
    --coral-300: #f59278;
    --leaf-500: #2d7a4f;
    --leaf-400: #3a9b65;
    --white: #ffffff;
    --text-primary: #0a1628;
    --text-secondary: #3d5070;
    --text-muted: #6b82a0;
    --border: rgba(10,22,40,0.12);
    --shadow-sm: 0 2px 8px rgba(10,22,40,0.08);
    --shadow-md: 0 8px 32px rgba(10,22,40,0.12);
    --shadow-lg: 0 24px 64px rgba(10,22,40,0.18);
    --radius-sm: 8px;
    --radius-md: 16px;
    --radius-lg: 24px;
    --radius-xl: 40px;
    --transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }
`;


// ============================================================
// STATE MANAGEMENT (Context + Reducer)
// ============================================================
//const AppContext = createContext(null);

const initialState = { currentView: "home", selectedDestination: null, generatedItinerary: null, savedItineraries: [], isLoading: false, error: null, notification: null };

function appReducer(state, action) {
  switch (action.type) {
    case "SET_VIEW": return { ...state, currentView: action.payload };
    case "SET_DESTINATION": return { ...state, selectedDestination: action.payload, currentView: "destination" };
    case "SET_ITINERARY": return { ...state, generatedItinerary: action.payload };
    case "SET_SAVED": return { ...state, savedItineraries: action.payload };
    case "SET_LOADING": return { ...state, isLoading: action.payload };
    case "SET_ERROR": return { ...state, error: action.payload };
    case "SET_NOTIFICATION": return { ...state, notification: action.payload };
    case "SAVE_ITINERARY": return { ...state, savedItineraries: [...state.savedItineraries, action.payload], notification: { type: "success", message: "¡Itinerario guardado exitosamente!" } };
    default: return state;
  }
}

function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);
  useEffect(() => {
    if (state.notification) { const t = setTimeout(() => dispatch({ type: "SET_NOTIFICATION", payload: null }), 3500); return () => clearTimeout(t); }
  }, [state.notification]);
  return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>;
}

const useApp = () => useContext(AppContext);


// ============================================================
// GLOBAL STYLES
// ============================================================
const GlobalStyles = () => (
  <style>{`
    ${tokens}
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap');
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; }
    body { font-family: 'DM Sans', sans-serif; background: var(--sand-50); color: var(--text-primary); line-height: 1.6; overflow-x: hidden; }
    h1,h2,h3,h4 { font-family: 'Playfair Display', serif; line-height: 1.2; }
    button { cursor: pointer; border: none; font-family: 'DM Sans', sans-serif; }
    input, select, textarea { font-family: 'DM Sans', sans-serif; }
    @keyframes fadeUp { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:translateY(0); } }
    @keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
    @keyframes spin { to { transform: rotate(360deg); } }
    @keyframes pulse { 0%,100% { transform:scale(1); opacity:.7; } 50% { transform:scale(1.05); opacity:1; } }
    @keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
    @keyframes slideDown { from { opacity:0; transform:translateY(-12px); } to { opacity:1; transform:translateY(0); } }
    @keyframes dotPulse { 0%,80%,100% { transform:scale(0); } 40% { transform:scale(1); } }
    .fade-up { animation: fadeUp 0.6s ease both; }
    .fade-in { animation: fadeIn 0.4s ease both; }
    .delay-1 { animation-delay: 0.1s; }
    .delay-2 { animation-delay: 0.2s; }
    .delay-3 { animation-delay: 0.3s; }
    .delay-4 { animation-delay: 0.4s; }
    .delay-5 { animation-delay: 0.5s; }
    ::-webkit-scrollbar { width: 6px; }
    ::-webkit-scrollbar-track { background: var(--sand-100); }
    ::-webkit-scrollbar-thumb { background: var(--sand-300); border-radius: 3px; }
  `}</style>
);


// ============================================================
// ROUTER / MAIN APP
// ============================================================
const ViewRouter = () => {
  const { state } = useApp();
  const views = { home: <HomePage />, destinations: <DestinationsPage />, destination: <DestinationDetailPage />, planner: <PlannerPage />, itinerary: <ItineraryPage />, saved: <SavedPage /> };
  return <div style={{ animation: "fadeIn 0.3s ease" }}>{views[state.currentView] || <HomePage />}</div>;
};

export default function App() {
  return (
    <AppProvider>
      <GlobalStyles />
      <AppWrapper />
    </AppProvider>
  );
}

function AppWrapper() {
  const { state } = useApp();
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Navbar />
      <main style={{ flex: 1 }}>
        <ViewRouter />
      </main>
      {state.currentView !== "home" && <Footer />}
      <Notification notification={state.notification} />
    </div>
  );
}
