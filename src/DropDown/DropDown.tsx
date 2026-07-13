import { faCaretDown } from "@fortawesome/free-solid-svg-icons/faCaretDown";
import "./DropdownStyles.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useMemo, useRef, useState } from "react";
import Button from "../Button";

export interface DropDownItem {
    id : string | number;
    value : string | number;
}

export interface DropDownProps {
    valueSelected: string ;
    dropdownList : DropDownItem[];
    onChange?: (item:DropDownItem ) => void;
    onMultiChange?: (item:DropDownItem[]) => void;
    type?: "single" | "multiple";
    searchable?: boolean;
}



export default function DropDown({ valueSelected, dropdownList, onChange, onMultiChange,type, searchable }: DropDownProps) {

    const [isOpen, setIsOpen] = useState(false);
    const [searchText, setSearchText] = useState("");
    const [direction, setDirection] = useState<"up" | "down">("down");
    const [selectedItems, setSelectedItems] = useState<DropDownItem[]>([]);
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

    const handleDropdownChange = (item: DropDownItem) => {
        if(type === "multiple") {
            setSelectedItems(prevSelected => {
                const isSelected = prevSelected.some(selected => selected.id === item.id);
                if (isSelected) {
                    return prevSelected.filter(selected => selected.id !== item.id);
                } else {
                    return [...prevSelected, item];
                }
            });
        }
        else {
            onChange?.(item);
        }
        
    }

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
                        <div className="dropdown-item" onClick={()=> {handleDropdownChange(item); if(type !== "multiple"){closeDropdown();}}} key={item.id}>
                            {type === "multiple" && (
                                <input type="checkbox" className="dropdown-checkbox" checked={selectedItems.some(selected => selected.id === item.id)} readOnly />
                            )}
                            <span  >
                                {item.value}
                            </span>
                        </div>
                    ))}
                    {filteredList.length === 0 && (
                        <span className="dropdown-no-results">No results found</span>
                    )}
                    {type === "multiple" && (
                        <div className="dropdown-multi-actions">

                            <Button label="OK" onClick={() => {onMultiChange?.(selectedItems); closeDropdown();}} size="small" variant="primary"/>
                        </div>
                    )}
                </div>
            )}
        </div>
        </>
    )
}