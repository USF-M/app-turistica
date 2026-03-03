const StarRating = ({ rating, reviews }) => (
    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <span style={{ color: "#f5a623", fontSize: 14 }}>{"★".repeat(Math.floor(rating))}{"☆".repeat(5 - Math.floor(rating))}</span>
        <span style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)" }}>{rating}</span>
        {reviews && <span style={{ fontSize: 12, color: "var(--text-muted)" }}>({reviews.toLocaleString()})</span>}
    </div>
);

export default StarRating