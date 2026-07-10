import { faCaretDown } from "@fortawesome/free-solid-svg-icons/faCaretDown";
import "./DropdownStyles.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useMemo, useRef, useState } from "react";

export interface DropDownItem {
    id : string | number;
    value : string | number;
}

export interface DropDownProps {
    valueSelected: string;
    dropdownList : DropDownItem[];
    onChange: (value: string) => void;
    type?: "single" | "multiple";
    searchable?: boolean;
}



export default function DropDown({ valueSelected, dropdownList, onChange, searchable }: DropDownProps) {

    const [isOpen, setIsOpen] = useState(false);
    const [searchText, setSearchText] = useState("");
    const [direction, setDirection] = useState<"up" | "down">("down");
    const containerRef = useRef<HTMLDivElement>(null);

    const filteredList = useMemo(() => {
        if (!searchable || !searchText) return dropdownList;
        return dropdownList.filter((item) =>
            item.value.toString().toLowerCase().includes(searchText.toLowerCase())
        );
    }, [dropdownList, searchText, searchable]);

    const closeDropdown = () => {
        setIsOpen(false);
        setSearchText("");
    };

    useEffect(() => {
        if (!isOpen) return;

        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                closeDropdown();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isOpen]);

    const handleToggle = () => {
        if (isOpen) {
            closeDropdown();
            return;
        }

        if (containerRef.current) {
            const { bottom, top } = containerRef.current.getBoundingClientRect();
            const spaceBelow = window.innerHeight - bottom;
            const spaceAbove = top;

            setDirection(
                 spaceAbove > spaceBelow ? "up" : "down"
            );
        }
        setIsOpen(true);
    };

    return (
        <>
        <div className="dropdown-container" ref={containerRef}>
            <div className="dropdown-selected" onClick={handleToggle}>
                <span>{valueSelected}</span>
                <FontAwesomeIcon icon={faCaretDown} size="sm" style={{color: "rgb(150, 202, 242)"}} />
            </div>
            {isOpen && (
                <div className={`dropdown-list ${direction === "up" ? "dropdown-up" : "dropdown-down"}`}>
                    {searchable && (
                        <input
                            type="text"
                            className="dropdown-search"
                            placeholder="Search..."
                            value={searchText}
                            
                            onChange={(e) => setSearchText(e.target.value)}
                            onClick={(e) => e.stopPropagation()}
                        />
                    )}
                    {filteredList.map((item) => (
                        <span key={item.id} className="dropdown-item" onClick={()=> {onChange(item.value.toString()); closeDropdown();}}>
                            {item.value}
                        </span>
                    ))}
                    {filteredList.length === 0 && (
                        <span className="dropdown-no-results">No results found</span>
                    )}
                </div>
            )}
        </div>
        </>
    )
}