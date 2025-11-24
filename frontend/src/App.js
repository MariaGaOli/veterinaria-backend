import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Consultas from "./pages/Consultas";
import ListaAnimais from "./components/AnimalList";
import CadastroAnimal from "./components/AnimalForm";
import Home from './pages/Home';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/consultas/*" element={<Consultas />} />
        <Route path="/consultas/cadastrar" element={<Consultas />} />
        <Route path="/animais" element={<ListaAnimais />} />
        <Route path="/cadastrar" element={<CadastroAnimal />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
