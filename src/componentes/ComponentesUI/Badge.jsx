const Badge = ({ children, color = "ocean", size = "sm" }) => {
    const colors = { ocean: { bg: "var(--ocean-800)", text: "var(--sky-300)" }, sand: { bg: "var(--sand-200)", text: "var(--sand-500)" }, coral: { bg: "#fdeae5", text: "var(--coral-500)" }, leaf: { bg: "#e6f5ec", text: "var(--leaf-500)" }, sky: { bg: "#e6f7fb", text: "var(--sky-400)" } };
    const c = colors[color] || colors.ocean;
    const pad = size === "sm" ? "3px 10px" : "5px 14px";
    return <span style={{ background: c.bg, color: c.text, padding: pad, borderRadius: 99, fontSize: size === "sm" ? 11 : 13, fontWeight: 600, letterSpacing: "0.03em", whiteSpace: "nowrap" }}>{children}</span>;
};

export default Badge