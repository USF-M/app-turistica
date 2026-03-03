import MOCK_ITINERARIES from "../mocks/MOCK_ITINERARIES";
import AI_ITINERARY_TEMPLATES from "../mocks/AI_ITINERARY_TEMPLATES";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const ItineraryService = {
    generate: async ({ destination, days, budget, interests, ownerId }) => {
        await sleep(2200);
        return {
            id: `IT${Date.now()}`,
            destination,
            days,
            budget,
            interests,
            ownerId,
            createdAt: new Date().toISOString(),
            status: "planning",
            items: AI_ITINERARY_TEMPLATES.default(destination, parseInt(days, 10), interests),
            totalEstimated: parseInt(days, 10) * 200,
        };
    },
    getSaved: async () => {
        await sleep(500);
        return MOCK_ITINERARIES;
    },
};

export default ItineraryService