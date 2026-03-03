const Notification = ({ notification }) => {
    if (!notification) return null;
    const colors = { success: { bg: "var(--leaf-400)", icon: "✓" }, error: { bg: "var(--coral-500)", icon: "✕" }, info: { bg: "var(--ocean-500)", icon: "ℹ" } };
    const c = colors[notification.type] || colors.info;
    return (
        <div style={{ position: "fixed", top: 24, right: 24, zIndex: 9999, background: c.bg, color: "white", padding: "14px 20px", borderRadius: "var(--radius-md)", boxShadow: "var(--shadow-lg)", display: "flex", alignItems: "center", gap: 10, animation: "slideDown 0.3s ease", minWidth: 280, fontWeight: 500 }}>
            <span style={{ width: 24, height: 24, borderRadius: "50%", background: "rgba(255,255,255,0.25)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700 }}>{c.icon}</span>
            {notification.message}
        </div>
    );
};

export default Notification