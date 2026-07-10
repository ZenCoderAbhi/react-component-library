import "./ButtonStyles.css"
import "../root.css";


export interface ButtonProps {
    label: string;
    onClick: () => void;
    variant : "primary" | "secondary" ;
    size: "small" | "medium" | "large";
    rounded? : boolean;
    disabled? : boolean;
    icon?: React.ReactNode;
    ownStyles?: React.CSSProperties;
}

const sizeClassMap: Record<ButtonProps["size"], string> = {
    small: "sm-btn",
    medium: "md-btn",
    large: "lg-btn",
}


export default function Button({ label, onClick, variant, size="medium", rounded=true, disabled=false, icon, ownStyles }: ButtonProps) {

    const buttonClass = ["defaultButtonStyling", icon ? "button-with-icon" : "",sizeClassMap[size], rounded ? "rounded-border5px" : "", variant === "primary" ? "primary-btn" : "secondary-btn"].filter(Boolean).join(" ");

    return <button className={buttonClass} onClick={onClick} disabled={disabled} style={ownStyles}>
        {icon}
        {label}
        </button>
}