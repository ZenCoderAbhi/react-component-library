import type { ReactNode } from "react"
import "./CardStyles.css"
import "../root.css"

export interface CardProps {
    children : ReactNode;
    flexDirection? : "row" | "column";
}

export default function Card({ children, flexDirection="column" }: CardProps) {
    const cardClass = ["card", "rounded-border8px", "box-shadow", flexDirection === "row" ? "rowDisplayFlex" : "columnDisplayFlex"].filter(Boolean).join(" ");

    return (
        <div className={cardClass}>
            {children}
        </div>
    )
}