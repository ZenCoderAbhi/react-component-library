import { useState } from "react";
import { Toggle } from "../src";
import Button from "../src/Button";
import { Eye } from 'lucide-react';
import Card from "../src/Card/Card";
import DropDown from "../src/DropDown/DropDown";
import type { DropDownItem } from "../src/DropDown/DropDown";

const dropdownList: DropDownItem[] = [
  { id: 1, value: "Apple" },
  { id: 2, value: "Banana" },
  { id: 3, value: "Cherry" },
  { id: 4, value: "Mango" },
  { id: 5, value: "Orange" },
];

function App() {

  const [toggleChecked, setToggleChecked] = useState(false);

  const [dropdownValue, setDropdownValue] = useState("Apple");

  function handleToggleChange() {
    setToggleChecked(!toggleChecked);
  }

  function handleDropdownChange(value: string) {
    setDropdownValue(value);
  }

  return (
    <div style={{display:"flex", flexDirection:"column", gap:"20px", padding:"20px"}}>
      <h1>Welcome to my React Library</h1>
      <h3>First Component Button </h3>
      <span>======================</span>
      <h4>Small button and primary variant</h4>
      <div  style={{display:"flex", gap:"10px"}}>
        <Button label="Small Button" onClick={() => alert("Small button clicked!")} variant="primary" size="small" icon={<Eye />} />
        <Button label="Small Button" onClick={() => alert("Small button clicked!")} variant="primary" size="small" disabled={true} />
      </div>
      <h4>Medium button and secondary variant</h4>
      <div  style={{display:"flex", gap:"10px"}}>
        <Button label="Medium Button" onClick={() => alert("Medium button clicked!")} variant="secondary" size="medium" />
        <Button label="Medium Button" onClick={() => alert("Medium button clicked!")} variant="secondary" size="medium" disabled={true} />
      </div>
      <h4>Large button and primary variant</h4>
      <div  style={{display:"flex", gap:"10px"}}>
        <Button label="Large Button" onClick={() => alert("Large button clicked!")} variant="primary" size="large" />
        <Button label="Large Button" onClick={() => alert("Large button clicked!")} variant="primary" size="large" disabled={true} />
      </div>
      <h4>Custom styles via ownStyles</h4>
      <div style={{display:"flex", gap:"10px"}}>
        <Button label="Custom Button" onClick={() => alert("Custom button clicked!")} variant="primary" size="small" ownStyles={{ backgroundColor: "#7c3aed", color: "#fff", border: "2px solid #4c1d95", letterSpacing: "0.1em" , height: "40px" }} disabled={true} />
        <Button label="Custom Button" onClick={() => alert("Custom button clicked!")} variant="secondary" size="large" ownStyles={{ fontStyle: "italic", boxShadow: "4px 4px 0px #000" }} />
      </div>
      <span>======================</span>


      <h3>Second Component Toggle </h3>
      <span>======================</span>
      <h4>Toggle</h4>
      <div style={{display:"flex", gap:"10px"}}>
        <Toggle checked={toggleChecked} onChange={handleToggleChange}  />
      </div>
      <span>======================</span>

      <h3>Third Component Card </h3>
      <span>======================</span>
      <div style={{width:"600px", height:"400px"}} >
        <Card flexDirection="row">
         <div>This is my card component</div>
         <div>It is display flex card</div>
        </Card>
      </div>
      <span>======================</span>

      <h3>Fourth Component DropDown </h3>
      <span>======================</span>
      <div style={{width:"200px", height:"30px"}}>
        <DropDown  valueSelected={dropdownValue} dropdownList={dropdownList} onChange={handleDropdownChange} searchable={true} />
      </div>
    </div>
  );
}

export default App;
