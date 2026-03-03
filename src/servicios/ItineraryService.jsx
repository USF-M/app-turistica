import MOCK_ITINERARIES from "../mocks/MOCK_ITINERARIES";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const ItineraryService = {
    generate: async ({ destination, days, budget, interests }) => {
        await sleep(2200);
        return { id: `IT${Date.now()}`, destination, days, budget, interests, createdAt: new Date().toISOString(), items: AI_ITINERARY_TEMPLATES.default(destination, parseInt(days), interests), totalEstimated: parseInt(days) * 200 };
    },
    getSaved: async () => {
        await sleep(500);
        return MOCK_ITINERARIES;
    },
};

export default ItineraryService