import MOCK_DESTINATIONS from "../mocks/MOCK_DESTINATIONS";

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const DestinationService = {
    getAll: async (filters = {}) => {
        await sleep(600);
        let data = [...MOCK_DESTINATIONS];
        if (filters.category) data = data.filter((d) => d.category === filters.category);
        if (filters.search) data = data.filter((d) => d.name.toLowerCase().includes(filters.search.toLowerCase()) || d.country.toLowerCase().includes(filters.search.toLowerCase()));
        return { data, total: data.length };
    },
    getById: async (id) => {
        await sleep(400);
        return MOCK_DESTINATIONS.find((d) => d.id === id) || null;
    },
};

export default DestinationService