import Card from "../componentes/ComponentesUI/Card";
import useAuth from "../hooks/useAuth";

const AdminPage = () => {
    const { users, roles } = useAuth();

    return (
        <div style={{ paddingTop: 92, minHeight: "100vh", paddingInline: 24 }}>
            <div style={{ maxWidth: 1100, margin: "0 auto" }}>
                <h1 style={{ marginBottom: 8 }}>Panel administrativo</h1>
                <p style={{ color: "var(--text-muted)", marginBottom: 20 }}>
                    Gestión de usuarios y capacidades por rol (mock).
                </p>

                <div style={{ display: "grid", gridTemplateColumns: "2fr 3fr", gap: 18 }}>
                    <Card hover={false} style={{ padding: 20 }}>
                        <h3 style={{ marginBottom: 12 }}>Usuarios</h3>
                        {users.map((user) => (
                            <div key={user.id} style={{ padding: "8px 0", borderBottom: "1px solid var(--border)" }}>
                                <strong>{user.name}</strong>
                                <div style={{ fontSize: 12, color: "var(--text-muted)" }}>
                                    {user.email} · rol: {user.role}
                                </div>
                            </div>
                        ))}
                    </Card>

                    <Card hover={false} style={{ padding: 20 }}>
                        <h3 style={{ marginBottom: 12 }}>Permisos por rol</h3>
                        {Object.entries(roles).map(([roleName, roleData]) => (
                            <div key={roleName} style={{ marginBottom: 12 }}>
                                <strong>{roleName}</strong>
                                <ul style={{ marginLeft: 18 }}>
                                    {roleData.permissions.map((permission) => (
                                        <li key={permission} style={{ fontSize: 13, color: "var(--text-secondary)" }}>
                                            {permission}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default AdminPage;