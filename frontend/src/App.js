import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from './pages/Home';
import ListaAnimais from "./components/AnimalList";
import CadastroAnimal from "./components/AnimalForm";

import Consultas from "./components/ConsultaList";
import ConsultaForm from "./components/ConsultaForm";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        {/* CONSULTAS */}
        <Route path="/consultas" element={<Consultas />} />
        <Route path="/consultas/cadastrar" element={<ConsultaForm />} />

        {/* ANIMAIS */}
        <Route path="/animais" element={<ListaAnimais />} />
        <Route path="/cadastrar" element={<CadastroAnimal />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
