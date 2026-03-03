
import AppContext from "../contextos/AppContext";
import { useContext, useState } from "react";
const useApp = () => useContext(AppContext);
import ItineraryService from "../servicios/ItineraryService";

function useItineraryGenerator() {
    const { dispatch } = useApp();
    const [status, setStatus] = useState("idle");
    const generate = async (params) => {
        setStatus("loading");
        dispatch({ type: "SET_LOADING", payload: true });
        try {
            const itinerary = await ItineraryService.generate(params);
            dispatch({ type: "SET_ITINERARY", payload: itinerary });
            dispatch({ type: "SET_VIEW", payload: "itinerary" });
            setStatus("success");
        } catch (e) { setStatus("error"); dispatch({ type: "SET_ERROR", payload: "Error al generar itinerario" }); }
        finally { dispatch({ type: "SET_LOADING", payload: false }); }
    };
    return { generate, status };
}
export default useItineraryGenerator