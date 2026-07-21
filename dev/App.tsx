import { Route, Routes } from "react-router-dom";
import RootFile from "./RootFile";
import SimplePage from "./SimplePage";

export default function App() {
  return (
    <Routes>

      <Route path="/" element={<RootFile/>} />
      <Route  path="simplepage" element={<SimplePage />} />
    </Routes>
  )
}