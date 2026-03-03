import { createContext, useEffect, useState } from "react";
import authService from "../servicios/authService";
import { hasPermission } from "../helpers/permissions";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [users, setUsers] = useState([]);
    const [roles, setRoles] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadAuthData = async () => {
            setLoading(true);
            try {
                const [rolesData, usersData, user] = await Promise.all([
                    authService.getRoles(),
                    authService.getUsers(),
                    authService.getCurrentUser(),
                ]);

                setRoles(rolesData || {});
                setUsers(usersData || []);
                setCurrentUser(user || usersData?.[0] || null);
            } catch (error) {
                console.error("Error cargando datos de auth:", error);
                setRoles({});
                setUsers([]);
                setCurrentUser(null);
            } finally {
                setLoading(false);
            }
        };

        loadAuthData();
    }, []);

    const can = (action) => hasPermission(currentUser?.role, action, roles);

    const switchUser = async (userId) => {
        const fallback = users.find((user) => user.id === userId) || users[0] || null;
        setCurrentUser(fallback);

        try {
            const user = await authService.switchCurrentUser(userId);
            if (user) setCurrentUser(user);
        } catch (error) {
            console.error("Error cambiando usuario:", error);
        }
    };

    return <AuthContext.Provider value={{ currentUser, users, roles, loading, can, switchUser }}>{children}</AuthContext.Provider>;
}

export default AuthContext;