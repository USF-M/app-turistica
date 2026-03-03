import { createContext, useState, useEffect } from "react";
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
            const [rolesData, usersData, user] = await Promise.all([
                authService.getRoles(),
                authService.getUsers(),
                authService.getCurrentUser(),
            ]);
            setRoles(rolesData);
            setUsers(usersData);
            setCurrentUser(user);
            setLoading(false);
        };

        loadAuthData();
    }, []);

    const can = (action) => hasPermission(currentUser?.role, action, roles);

    const switchUser = async (userId) => {
        setLoading(true);
        const user = await authService.switchCurrentUser(userId);
        setCurrentUser(user);
        setLoading(false);
    };

    return <AuthContext.Provider value={{ currentUser, users, roles, loading, can, switchUser }}>{children}</AuthContext.Provider>;
}

export default AuthContext;