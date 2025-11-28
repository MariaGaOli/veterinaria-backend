import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import BackHomeButton from "../components/BackHomeButton";
import ApiService from "../services/ApiService";

export default function CadastroAnimal() {
  const [nome, setNome] = useState("");
  const [especie, setEspecie] = useState("");
  const [raca, setRaca] = useState("");
  const [idade, setIdade] = useState("");
  const [erro, setErro] = useState("");

  const navigate = useNavigate();

  const validar = () => {
    if (!nome.trim() || !especie.trim() || !raca.trim() || !idade.trim())
      return "Preencha todos os campos.";

    if (!/^[A-Za-zÀ-ú\s]+$/.test(nome))
      return "Nome só pode conter letras.";

    if (isNaN(idade) || idade <= 0)
      return "Idade deve ser um número válido.";

    return "";
  };

  const salvar = async (e) => {
    e.preventDefault();

    const msg = validar();
    if (msg) {
      setErro(msg);
      return;
    }

    const novoAnimal = { nome, especie, idade, raca };

    try {
      await ApiService.post("/animais", novoAnimal);
      navigate("/animais");
    } catch (error) {
      setErro("Erro ao salvar animal no servidor.");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Cadastrar Animal</h2>

      <form className="mt-3" onSubmit={salvar}>
        {erro && <div className="alert alert-danger">{erro}</div>}

        <label className="form-label">Nome</label>
        <input
          type="text"
          className="form-control mb-2"
          value={nome}
          onChange={(e) =>
            setNome(e.target.value.replace(/[^A-Za-zÀ-ú\s]/g, ""))
          }
        />

        <label className="form-label">Espécie</label>
        <input
          type="text"
          className="form-control mb-2"
          value={especie}
          onChange={(e) => setEspecie(e.target.value)}
        />

        <label className="form-label">Raça</label>
        <input
          type="text"
          className="form-control mb-2"
          value={raca}
          onChange={(e) => setRaca(e.target.value)}
        />

        <label className="form-label">Idade</label>
        <input
          type="number"
          className="form-control mb-3"
          value={idade}
          onChange={(e) => setIdade(e.target.value)}
        />

        <button className="btn btn-success">Salvar</button>
      </form>

      <div className="container mt-4">
        <BackHomeButton />
      </div>
    </div>
  );
}
