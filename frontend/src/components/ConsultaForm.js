import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import BackHomeButton from "../components/BackHomeButton";

export default function ConsultaForm() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    data: "",
    hora: "",
    veterinario: "",
    animal: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const consultas = JSON.parse(localStorage.getItem("consultas")) || [];
    consultas.push(form);
    localStorage.setItem("consultas", JSON.stringify(consultas));

    alert("Consulta cadastrada com sucesso!");
    navigate("/consultas");
  };

  return (
    <div className="container mt-4">
      <h2>Cadastro de Consulta</h2>
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="row">

          <div className="col-md-6 mb-3">
            <label className="form-label">Data</label>
            <input type="date" className="form-control" name="data" required
              value={form.data} onChange={handleChange} />
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">Hora</label>
            <input type="time" className="form-control" name="hora" required
              value={form.hora} onChange={handleChange} />
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">Veterinário Responsável</label>
            <input type="text" className="form-control" name="veterinario" required
              placeholder="Digite o nome"
              value={form.veterinario} onChange={handleChange} />
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">Animal</label>
            <input type="text" className="form-control" name="animal" required
              placeholder="Nome do animal"
              value={form.animal} onChange={handleChange} />
          </div>

        </div>

        <button type="submit" className="btn btn-success">Salvar</button>
        <button type="button" className="btn btn-secondary ms-2"
          onClick={() => navigate("/consultas")}>
          Cancelar
        </button>
      </form>

      <div className="container mt-4">
        <BackHomeButton />
        </div>
    </div>
  );
}
