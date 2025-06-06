import React from "react";

export interface PresentationCardProps {
    /**
     * The title (headline) for this card.
     */
    title: string;
    /**
     * Any React nodes to render inside the card body.
     */
    children: React.ReactNode;
    /**
     * (Optional) a CSS className to apply on the card container.
     */
    className?: string;
}

/**
 * A simple visually‐styled “card” wrapper.
 * Renders a title and any children inside a bordered box.
 */
const PresentationCard: React.FC<PresentationCardProps> =
    ({
         title,
         children,
         className = "",
     }: PresentationCardProps) => {
        return (
            <div
                className={className}
                style={{
                    border: "1px solid #ddd",
                    borderRadius: 8,
                    padding: 24,
                    maxWidth: 500,
                    margin: "24px auto",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
                    backgroundColor: "#fff",
                }}
            >
                <h2 style={{margin: "0 0 16px 0", fontSize: "1.5rem", color: "#333"}}>
                    {title}
                </h2>
                <div>{children}</div>
            </div>
        );
    };

export default PresentationCard;