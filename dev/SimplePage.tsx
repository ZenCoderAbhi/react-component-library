import Navbar from "../src/Navbar/Nabvar";
import type { NavItemProps } from "../src/Navbar/Nabvar";
import { LayoutDashboard, Settings, ShieldCheck } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faWallet } from "@fortawesome/free-solid-svg-icons";

const menuList: Array<NavItemProps> = [
    { menuName: "Dashboard", iconImage: <LayoutDashboard  />, onClick: () => alert("Dashboard clicked") },
    { menuName: "Profile Page", iconImage: <FontAwesomeIcon icon={faUser} />, onClick: () => alert("Profile Page clicked") },
    { menuName: "Settings", iconImage: <Settings size={18} />, subMenu: [
        { menuName: "Account", iconImage: <FontAwesomeIcon icon={faWallet} />, onClick: () => alert("Account clicked") },
        { menuName: "Security", iconImage: <ShieldCheck size={18} />, onClick: () => alert("Security clicked") },
    ] },
];

export default function SimplePage() {
    return (
        <div style={{position:"fixed", top:0, left:0, height:"100%"}}>
            <Navbar menuList={menuList}/>
        </div>
    )
}