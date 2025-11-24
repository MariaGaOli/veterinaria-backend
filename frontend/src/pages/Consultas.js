import { Routes, Route } from "react-router-dom";
import ConsultaForm from "../components/ConsultaForm";
import ConsultaList from "../components/ConsultaList";

export default function Consultas() {
  return (
    <Routes>
      <Route path="/" element={<ConsultaList />} />
      <Route path="/new" element={<ConsultaForm />} />
    </Routes>
  );
}
