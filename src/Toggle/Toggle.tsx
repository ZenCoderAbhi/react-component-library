import "./ToggleStyles.css"
import "../root.css";


export interface ToggleProps {
    checked: boolean;
    onChange: () => void;
   
}


export default function Toggle({ checked, onChange}: ToggleProps) {

    const toggleClass = ["defaultToggleStyling",  checked ? "toggle-checked" : "toggle-unchecked"].filter(Boolean).join(" ");

    return <button
        type="button"
        role="switch"
        
        className={toggleClass}
        onClick={onChange}
    >
        <span className="toggle-thumb" />
    </button>
}
