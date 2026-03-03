 const LoadingDots = () => (
    <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
        {[0, 1, 2].map(i => <div key={i} style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--ocean-400)", animation: `dotPulse 1.4s ease-in-out ${i * 0.16}s infinite` }} />)}
    </div>
);

export default LoadingDots