import { useState } from "react";

const Card = ({ children, style = {}, hover = true }) => {
    const [isHover, setHover] = useState(false);
    return (
        <div onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
            style={{ background: "var(--white)", borderRadius: "var(--radius-lg)", boxShadow: isHover && hover ? "var(--shadow-lg)" : "var(--shadow-md)", transition: "var(--transition)", transform: isHover && hover ? "translateY(-4px)" : "none", overflow: "hidden", ...style }}>
            {children}
        </div>
    );
};
export default Card