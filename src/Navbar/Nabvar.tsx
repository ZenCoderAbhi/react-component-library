import { useState } from "react"
import "./NavbarStyles.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight, faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

export interface NavItemProps {
    menuName : string;
    iconImage? : React.ReactNode;
    subMenu?: Array<NavItemProps>;
    onClick?: () => void;
}

interface NavItemComponentProps extends NavItemProps {
    collapsed?: boolean;
}

export function NavItem({menuName, iconImage, subMenu, onClick, collapsed}:NavItemComponentProps) {
    const [open, setOpen] = useState(false);

    const handleClick = () => {
        if (subMenu) {
            if (collapsed) {
                setOpen(prev => !prev);
            }
        } else {
            onClick?.();
        }
    };

    return (
        <div className={`navitem-wrapper ${open ? 'navitem-open' : ''}`}>
            <div className="navitem" onClick={handleClick}>
                <span className="navitem-icon">{iconImage}</span>
                {!collapsed && <span>{menuName}</span>}
            </div>
            {subMenu && (
                <>
                    {!collapsed && (
                        <span className="navitem-caret">
                            <FontAwesomeIcon icon={faCaretRight} size="lg" style={{color: "rgb(255, 212, 59)", cursor:"pointer"}} />
                        </span>
                    )}
                    <div className="navitem-submenu">
                        {subMenu.map((item, index) => (
                            <NavItem key={index} {...item} />
                        ))}
                    </div>
                </>
            )}
        </div>
    )
}

export interface NavbarProps {
    menuList: Array<NavItemProps>;
}

export default function Navbar({menuList}:NavbarProps) {

    const [collapse, setCollapse] = useState(false);

    return (
        <div className={`navbar-container ${collapse===true ? 'navbar-close' : 'navbar-open'}`}>
            <div className="navitem navbar-toggle" onClick={() => setCollapse(prev => !prev)}>
                <span className="navitem-icon">
                    <FontAwesomeIcon icon={collapse ? faAngleRight : faAngleLeft} size="lg" style={{color: "rgb(255, 255, 255)"}} />
                </span>
                {!collapse && <span>Collapse</span>}
            </div>
            {menuList.map((item, index) => (
                <NavItem key={index} {...item} collapsed={collapse} />
            ))}
        </div>
    )
}