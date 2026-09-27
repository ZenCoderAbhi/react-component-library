import { useState } from "react";
import { Toggle } from "../src";
import Button from "../src/Button";
import { Eye } from 'lucide-react';
import Card from "../src/Card/Card";
import DropDown from "../src/DropDown/DropDown";
import type { DropDownItem } from "../src/DropDown/DropDown";
import Popup from "../src/Popup/Popup";
import { useNavigate } from "react-router-dom";
import Image from "../src/Image/Image";



const dropdownList: DropDownItem[] = [
  { id: 1, value: "Apple" },
  { id: 2, value: "Banana" },
  { id: 3, value: "Cherry" },
  { id: 4, value: "Mango" },
  { id: 5, value: "Orange" },
];

interface ImageListItem {
  imageId: number;
  imageUrl: string;
  [key: string]: unknown;
}

const imageList: ImageListItem[] = [
  {imageId : 1, imageUrl :"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6UyMUu6gXOBrOMs8mTILhavPp_EImgd_CUA78Wg56-w&s=10"},
  {imageId : 2, imageUrl :"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGwblbNNpafqsV3AcmYbiuGkBVnBzP_cpRormOnPfjkQ&s=10"},
  {imageId : 3, imageUrl :"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxZzkBQxgrN5sN3avgbF_Gd4lvFntqVIttGw0dV2nfmA&s=10"},
  {imageId : 4, imageUrl :"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS39Qj7bFCCL9ppu7XqTkAaP_iTwg-EvZYX4j22J1maQQ&s=10"},
  {imageId : 5, imageUrl :"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuXOHN2EWJahzbkvHjdcALwiF77o8UKZMjgn9zMTWBPA&s=10"},
  {imageId : 6, imageUrl :"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSW1dNS7ryxcu7gDh1MeQSBjWaixsdImEysbQQGMBQaCw&s=10"},
  {imageId : 7, imageUrl :"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREXQolNbUwmefPaP_V1nhGeo4EgAx7vKobXCtFxIALJg&s=10"},
]

function RootFile() {

  const [toggleChecked, setToggleChecked] = useState(false);

  const [dropdownValue, setDropdownValue] = useState("Apple");

  const [multiDropdownValue, setMultiDropdownValue] = useState<DropDownItem[]>([]);

  const [popupOpen, setPopupOpen] = useState(false);

  const handlePopupToggle = () => {
    setPopupOpen(!popupOpen)
  }

  function handleToggleChange() {
    setToggleChecked(!toggleChecked);
  }

  function handleDropdownChange(item :DropDownItem) {
    setDropdownValue(item.value.toLocaleString());
  }

  function handleMultiDropdownChange(item :DropDownItem[]) {
    setMultiDropdownValue(item);
  }

  const navigate = useNavigate();

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

      <h3>Fourth Component MultiSelection DropDown </h3>
      <span>======================</span>
      <div style={{width:"200px", height:"30px"}}>
        <DropDown  valueSelected={multiDropdownValue.length===0 ? "Select an option" : `${multiDropdownValue.length} options selected`} dropdownList={dropdownList} type="multiple" onMultiChange={handleMultiDropdownChange} searchable={true} />
      </div>
      <span>======================</span>

      <h3>Fifth Component Popup </h3>
      <span>======================</span>
      <Button label="Open Popup" onClick={()=>setPopupOpen(true)} variant="primary" size="medium" />
      <Popup open={popupOpen} type="delete" onClose={handlePopupToggle} popupHeader="Are you sure you want to delete?"/>
      <span>======================</span>
      <h3>Sixth Component Navbar</h3>
      <span>======================</span>
      <Button  label="Navigate to simple Page" variant="primary" size="medium" onClick={()=>navigate("/simplepage")} />
      <span>======================</span>

      <h3>Seventh Component Image</h3>
      <span>======================</span>
      <div style={{width:"350px", height:"350px"}}>
        <Image images={imageList} />
      </div>
      <span>======================</span>
    </div>
  );
}

export default RootFile;
