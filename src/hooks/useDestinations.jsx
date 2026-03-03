import DestinationService from "../servicios/DestinationService";
import { useCallback, useState, useEffect } from "react";
function useDestinations(filters) {
    const [destinations, setDestinations] = useState([]);
    const [loading, setLoading] = useState(false);
    const fetch = useCallback(async () => {
        setLoading(true);
        try { const res = await DestinationService.getAll(filters); setDestinations(res.data); } catch (e) { console.error(e); } finally { setLoading(false); }
    }, [JSON.stringify(filters)]);
    useEffect(() => { fetch(); }, [fetch]);
    return { destinations, loading, refetch: fetch };
}

export default useDestinations