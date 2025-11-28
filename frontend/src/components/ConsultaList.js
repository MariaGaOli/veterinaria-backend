import React, { useEffect, useState } from "react";
import ApiService from "../services/ApiService";
import "bootstrap/dist/css/bootstrap.min.css";
import BackHomeButton from "../components/BackHomeButton";

export default function ConsultaList() {
  const [consultas, setConsultas] = useState([]);

  // filtros
  const [buscaVet, setBuscaVet] = useState("");
  const [buscaAnimal, setBuscaAnimal] = useState("");
  const [buscaData, setBuscaData] = useState("");

  // estados da edição inline
  const [editando, setEditando] = useState(null);
  const [dataEdit, setDataEdit] = useState("");
  const [horaEdit, setHoraEdit] = useState("");
  const [vetEdit, setVetEdit] = useState("");
  const [animalEdit, setAnimalEdit] = useState("");

  useEffect(() => {
    carregarConsultas();
  }, []);

  const carregarConsultas = async () => {
    const data = await ApiService.getConsultas();
    setConsultas(data);
  };

  const excluir = async (id) => {
    if (!window.confirm("Deseja excluir esta consulta?")) return;
    await ApiService.deleteConsulta(id);
    setConsultas(consultas.filter((c) => c.id !== id));
  };

  // FILTROS
  const buscarPorVeterinario = async () => {
    const data = await ApiService.getConsultas(`?veterinario=${buscaVet}`);
    setConsultas(data);
  };

  const buscarPorAnimal = async () => {
    const data = await ApiService.getConsultas(`?animal=${buscaAnimal}`);
    setConsultas(data);
  };

  const buscarPorData = async () => {
    const data = await ApiService.getConsultas(`?data=${buscaData}`);
    setConsultas(data);
  };

  const limparFiltros = () => {
    setBuscaAnimal("");
    setBuscaVet("");
    setBuscaData("");
    carregarConsultas();
  };

  // Abrir edição
  const abrirEdicao = (c) => {
    setEditando(c.id);
    setDataEdit(c.data);
    setHoraEdit(c.hora);
    setVetEdit(c.veterinario);
    setAnimalEdit(c.animal);
  };

  // Salvar edição (PUT)
  const salvarEdicao = async () => {
    await ApiService.putConsulta(editando, {
      data: dataEdit,
      hora: horaEdit,
      veterinario: vetEdit,
      animal: animalEdit
    });

    setEditando(null);
    carregarConsultas();
  };

  return (
    <div className="container mt-4">
      <h2>Consultas Cadastradas</h2>
      
      {/* FILTROS */}
      <div className="row mb-4">
        <div className="col-md-4">
          <input className="form-control"
            placeholder="Veterinário"
            value={buscaVet}
            onChange={(e) => setBuscaVet(e.target.value)}
          />
        </div>
        <div className="col-md-2">
          <button className="btn btn-secondary w-100"
            onClick={buscarPorVeterinario}>Buscar</button>
        </div>

        <div className="col-md-4">
          <input className="form-control"
            placeholder="Animal"
            value={buscaAnimal}
            onChange={(e) => setBuscaAnimal(e.target.value)}
          />
        </div>
        <div className="col-md-2">
          <button className="btn btn-secondary w-100"
            onClick={buscarPorAnimal}>Buscar</button>
        </div>

        <div className="col-md-4 mt-2">
          <input type="date" className="form-control"
            value={buscaData}
            onChange={(e) => setBuscaData(e.target.value)}
          />
        </div>
        <div className="col-md-2 mt-2">
          <button className="btn btn-secondary w-100"
            onClick={buscarPorData}>Buscar Data</button>
        </div>

        <div className="col-md-2 mt-2">
          <button className="btn btn-info w-100"
            onClick={limparFiltros}>Limpar</button>
        </div>
      </div>

      {/* TABELA */}
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Data</th>
            <th>Hora</th>
            <th>Veterinário</th>
            <th>Animal</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {consultas.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center text-danger">
                Nenhuma consulta encontrada
              </td>
            </tr>
          ) : (
            consultas.map((c) => (
              <tr key={c.id}>
                <td>{new Date(c.data).toLocaleDateString("pt-BR")}</td>
                <td>{c.hora?.slice(0,5)}</td>
                <td>{c.veterinario}</td>
                <td>{c.animal}</td>
                <td>
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => abrirEdicao(c)}
                  >
                    Editar
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => excluir(c.id)}
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* FORMULÁRIO INLINE */}
      {editando && (
        <div className="card p-3 shadow mt-3">
          <h4>Editar Consulta</h4>

          <label>Data:</label>
          <input type="date"
            className="form-control mb-2"
            value={dataEdit}
            onChange={(e) => setDataEdit(e.target.value)}
          />

          <label>Hora:</label>
          <input type="time"
            className="form-control mb-2"
            value={horaEdit}
            onChange={(e) => setHoraEdit(e.target.value)}
          />

          <label>Veterinário:</label>
          <input type="text"
            className="form-control mb-2"
            value={vetEdit}
            onChange={(e) => setVetEdit(e.target.value)}
          />

          <label>Animal:</label>
          <input type="text"
            className="form-control mb-3"
            value={animalEdit}
            onChange={(e) => setAnimalEdit(e.target.value)}
          />

          <button className="btn btn-success me-2" onClick={salvarEdicao}>
            Salvar
          </button>

          <button className="btn btn-secondary"
            onClick={() => setEditando(null)}>
            Cancelar
          </button>
        </div>
      )}

      <div className="mt-4">
        <BackHomeButton />
      </div>
    </div>
  );
}
