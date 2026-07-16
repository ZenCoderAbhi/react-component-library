import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./PopupStyles.css"
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import { faTrash, faCircleCheck, faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { TriangleAlert } from "lucide-react";
import Button from "../Button/Button";

export interface PopupProps {
    open : boolean;
    onClose : () => void;
    children? : React.ReactNode;
    popupHeader? : string;
    type?: 'delete' | 'error' | 'success' | 'info' | 'default';
    transparent?: boolean;
}

function PopupTypeIcon({ type }: { type: PopupProps['type'] }) {
    switch (type) {
        case 'delete':
            return <FontAwesomeIcon icon={faTrash} size="sm" style={{color: "rgb(241, 6, 6)"}} />;
        case 'error':
            return <TriangleAlert color="#f10909" />;
        case 'success':
            return <FontAwesomeIcon icon={faCircleCheck} size="sm" style={{color: "rgb(99, 230, 190)"}} />;
        case 'info':
            return <FontAwesomeIcon icon={faCircleInfo} style={{color: "rgb(255, 212, 59)"}} />;
        default:
            return null;
    }
}

function PopupActions({ type, onClose }: { type: PopupProps['type']; onClose: () => void }) {
    if (type === 'delete') {
        return (
            <div className="popup-actions">
                <Button label="Cancel" onClick={onClose} variant="secondary" size="medium" />
                <Button label="Yes" onClick={onClose} variant="primary" size="medium" />
            </div>
        );
    }

    if (type === 'error' || type === 'success' || type === 'info') {
        return (
            <div className="popup-actions">
                <Button label="OK" onClick={onClose} variant="primary" size="medium" />
            </div>
        );
    }

    return null;
}

export default function Popup({ open,onClose ,children,popupHeader, type='default', transparent=false }: PopupProps) {
    if (!open) return null;

    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <>
        {open && (
            <div className={`popup-container${transparent ? ' popup-transparent' : ''}`} onClick={handleOverlayClick}>
                        <div className="popup-content">
                            {type === 'default' ? (
                                <div className="popup-body">{children}</div>
                            ) : (
                                <>
                                    <div className="popup-close">
                                        <FontAwesomeIcon icon={faCircleXmark} size="lg" style={{color: "rgb(150, 202, 242)", cursor:"pointer"}} onClick={onClose}/>
                                    </div>
                                    <div className="popup-header">
                                        <div className={`popup-icon-wrapper popup-icon-${type}`}>
                                            <PopupTypeIcon type={type} />
                                        </div>
                                        {popupHeader}
                                    </div>
                                    
                                    <PopupActions type={type} onClose={onClose} />
                                </>
                            )}
                        </div>
                    </div>
                )}
        </>
    )

}