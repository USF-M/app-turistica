const roles = {
    admin: {
        description: "Acceso total",
        permissions: [
            "routes:*",
            "destinations:create",
            "destinations:edit",
            "destinations:delete",
            "itineraries:create",
            "itineraries:edit:any",
            "itineraries:delete:any",
            "users:manage",
            "admin:panel",
        ],
    },
    editor: {
        description: "Gestión de contenido",
        permissions: [
            "routes:home",
            "routes:destinations",
            "routes:planner",
            "routes:saved",
            "destinations:create",
            "destinations:edit",
            "itineraries:create",
            "itineraries:edit:any",
        ],
    },
    user: {
        description: "Viajero estándar",
        permissions: [
            "routes:home",
            "routes:destinations",
            "routes:planner",
            "routes:saved",
            "itineraries:create",
            "itineraries:edit:own",
            "itineraries:delete:own",
            "destinations:view",
        ],
    },
};

export default roles;