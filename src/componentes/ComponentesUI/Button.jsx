
import { useState } from "react";

const Button = ({ children, variant = "primary", size = "md", onClick, disabled, icon, style: extraStyle = {} }) => {
    const [hover, setHover] = useState(false);
    const base = { display: "inline-flex", alignItems: "center", gap: 8, fontWeight: 600, borderRadius: 12, cursor: disabled ? "not-allowed" : "pointer", transition: "var(--transition)", border: "none", fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.01em", opacity: disabled ? 0.6 : 1 };
    const sizes = { sm: { padding: "8px 16px", fontSize: 13 }, md: { padding: "12px 24px", fontSize: 15 }, lg: { padding: "16px 32px", fontSize: 16 } };
    const variants = {
        primary: { background: hover ? "var(--ocean-600)" : "var(--ocean-800)", color: "var(--white)", boxShadow: hover ? "0 8px 24px rgba(10,22,40,0.3)" : "0 4px 12px rgba(10,22,40,0.2)", transform: hover ? "translateY(-2px)" : "none" },
        secondary: { background: hover ? "var(--sand-100)" : "var(--white)", color: "var(--ocean-800)", border: "2px solid var(--border)", transform: hover ? "translateY(-1px)" : "none" },
        accent: { background: hover ? "var(--coral-400)" : "var(--coral-500)", color: "var(--white)", boxShadow: hover ? "0 8px 24px rgba(224,90,58,0.3)" : "0 4px 12px rgba(224,90,58,0.2)", transform: hover ? "translateY(-2px)" : "none" },
        ghost: { background: hover ? "var(--sand-100)" : "transparent", color: "var(--text-secondary)" },
    };
    return (
        <button onClick={disabled ? undefined : onClick} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
            style={{ ...base, borderRadius: 12, ...sizes[size], ...variants[variant], ...extraStyle }}>
            {icon && <span style={{ fontSize: size === "sm" ? 14 : 18 }}>{icon}</span>}
            {children}
        </button>
    );
};

export default Button