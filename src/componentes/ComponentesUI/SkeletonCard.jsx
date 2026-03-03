const SkeletonCard = () => (
    <div style={{ background: "white", borderRadius: "var(--radius-lg)", overflow: "hidden", boxShadow: "var(--shadow-sm)" }}>
        <div style={{ height: 220, background: "linear-gradient(90deg, var(--sand-100) 25%, var(--sand-50) 50%, var(--sand-100) 75%)", backgroundSize: "200% 100%", animation: "shimmer 1.5s infinite" }} />
        <div style={{ padding: 20 }}>
            {[80, 60, 40].map((w, i) => <div key={i} style={{ height: 14, width: `${w}%`, borderRadius: 7, marginBottom: 10, background: "linear-gradient(90deg, var(--sand-100) 25%, var(--sand-50) 50%, var(--sand-100) 75%)", backgroundSize: "200% 100%", animation: "shimmer 1.5s infinite" }} />)}
        </div>
    </div>
);

export default SkeletonCard