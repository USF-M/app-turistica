const Spinner = ({ size = 24, color = "var(--ocean-500)" }) => (
    <div style={{ width: size, height: size, border: `3px solid ${color}20`, borderTopColor: color, borderRadius: "50%", animation: "spin 0.8s linear infinite", display: "inline-block" }} />
);

export default Spinner