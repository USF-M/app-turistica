import useAuth from "../../hooks/useAuth";

const fallbackStyle = {
    paddingTop: 110,
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
};

const ProtectedRoute = ({ action, fallback = null, children }) => {
    const { can, loading } = useAuth();

    if (loading) {
        return (
            <div style={fallbackStyle}>
                <div>
                    <p style={{ fontWeight: 700, marginBottom: 8 }}>Validando permisos...</p>
                    <p style={{ color: "var(--text-muted)" }}>Cargando sesión</p>
                </div>
            </div>
        );
    }

    if (!can(action)) {
        return (
            fallback || (
                <div style={fallbackStyle}>
                    <div>
                        <div style={{ fontSize: 44, marginBottom: 10 }}>🔒</div>
                        <h2 style={{ marginBottom: 6 }}>Acceso denegado</h2>
                        <p style={{ color: "var(--text-muted)" }}>No tienes permisos para esta sección.</p>
                    </div>
                </div>
            )
        );
    }

    return children;
};

export default ProtectedRoute;