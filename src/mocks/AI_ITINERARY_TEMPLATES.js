const AI_ITINERARY_TEMPLATES = {
    default: (dest, days, interests) => Array.from({ length: days }, (_, i) => ({
        day: i + 1,
        title: `Día ${i + 1} en ${dest}`,
        theme: ["Llegada y orientación", "Exploración histórica", "Naturaleza y vistas", "Gastronomía local", "Arte y cultura", "Aventura", "Día libre"][i % 7],
        activities: [
            { time: "09:00", name: interests.includes("cultura") ? "Visita al museo principal" : "Paseo por el centro histórico", duration: "2h", type: "cultural", cost: 15 },
            { time: "12:00", name: "Almuerzo en restaurante local", duration: "1.5h", type: "food", cost: 25 },
            { time: "14:30", name: interests.includes("naturaleza") ? "Excursión a parque natural" : "Tour por barrios tradicionales", duration: "3h", type: "outdoor", cost: 20 },
            { time: "19:00", name: "Cena y vida nocturna", duration: "2h", type: "food", cost: 40 },
        ],
        accommodation: { name: `Hotel Boutique ${dest} ${i + 1}`, rating: 4.5, price: 120 },
        tips: ["Llevar agua", "Zapatos cómodos", "Reservar con anticipación"],
    })),
};

export default AI_ITINERARY_TEMPLATES