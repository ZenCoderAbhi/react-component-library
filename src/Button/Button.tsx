import "./ButtonStyles.css"
import "../root.css";


export interface ButtonProps {
    label?: string;
    onClick: () => void;
    variant : "primary" | "secondary" ;
    size: "small" | "medium" | "large";
    rounded? : boolean;
    disabled? : boolean;
    icon?: React.ReactNode;
    ownStyles?: React.CSSProperties;
    className?: string;
}

const sizeClassMap: Record<ButtonProps["size"], string> = {
    small: "sm-btn",
    medium: "md-btn",
    large: "lg-btn",
}


export default function Button({ label, onClick, variant, size="medium", rounded=true, disabled=false, icon, ownStyles, className }: ButtonProps) {

    const buttonClass = ["defaultButtonStyling", icon ? "button-with-icon" : "",sizeClassMap[size], rounded ? "rounded-border5px" : "", variant === "primary" ? "primary-btn" : "secondary-btn", className].filter(Boolean).join(" ");

    return <button className={buttonClass} onClick={onClick} disabled={disabled} style={ownStyles}>
        {icon}
        {label}
        </button>
}