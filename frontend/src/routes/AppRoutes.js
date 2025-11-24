import { BrowserRouter, Routes, Route } from "react-router-dom";

import Consultas from "../pages/Consultas";



export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/consultas" element={<Consultas />} />
      </Routes>
    </BrowserRouter>
  );
}
