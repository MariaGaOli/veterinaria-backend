import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ApiService from "../services/ApiService";
import BackHomeButton from "../components/BackHomeButton";
import "bootstrap/dist/css/bootstrap.min.css";

export default function ListaAnimais() {
  const [animais, setAnimais] = useState([]);
  const [busca, setBusca] = useState("");
  const [buscaId, setBuscaId] = useState("");
  const [editando, setEditando] = useState(null);

  const [nomeEdit, setNomeEdit] = useState("");
  const [especieEdit, setEspecieEdit] = useState("");
  const [racaEdit, setRacaEdit] = useState("");
  const [idadeEdit, setIdadeEdit] = useState("");

  const [mensagem, setMensagem] = useState("");

  useEffect(() => {
    carregarAnimais();
  }, []);

  const carregarAnimais = async () => {
    try {
      const data = await ApiService.get("/animais");
      const lista = Array.isArray(data) ? data : [];
      setAnimais(lista);
      setMensagem(lista.length === 0 ? "Nenhum animal cadastrado." : "");
    } catch (err) {
      console.error("Erro ao carregar animais:", err);
      setAnimais([]);
      setMensagem("Erro ao carregar animais.");
    }
  };

  const buscarPorTermo = async () => {
    try {
      const data = await ApiService.get(`/animais?termo=${busca}`);
      const lista = Array.isArray(data) ? data : [];
      setAnimais(lista);
      setMensagem(lista.length === 0 ? "Nenhum animal encontrado para o termo informado." : "");
    } catch (err) {
      console.error("Erro na busca por termo:", err);
      setAnimais([]);
      setMensagem("Erro ao buscar animais.");
    }
  };

  const buscarPorId = async () => {
    if (!buscaId) return;

    try {
      const data = await ApiService.get(`/animais/${buscaId}`);

      if (!data || !data.id) {
        setAnimais([]);
        setMensagem("Animal não encontrado.");
        return;
      }

      setAnimais([data]);
      setMensagem("");
    } catch (error) {
      // 404 ou outro erro da API
      setAnimais([]);
      setMensagem("Animal não encontrado.");
    }
  };

  const remover = async (id) => {
    try {
      await ApiService.delete(`/animais/${id}`);
      const novaLista = animais.filter((a) => a && a.id !== id);
      setAnimais(novaLista);
      if (novaLista.length === 0) {
        setMensagem("Nenhum animal cadastrado.");
      }
    } catch (error) {
      console.error("Erro ao excluir animal:", error);
      setMensagem("Erro ao excluir animal.");
    }
  };

  const abrirEdicao = (animal) => {
    setEditando(animal.id);
    setNomeEdit(animal.nome);
    setEspecieEdit(animal.especie);
    setRacaEdit(animal.raca);
    setIdadeEdit(animal.idade);
  };

  const salvarEdicao = async () => {
    const atualizado = {
      nome: nomeEdit,
      especie: especieEdit,
      raca: racaEdit,
      idade: idadeEdit,
    };

    try {
      await ApiService.put(`/animais/${editando}`, atualizado);
      setEditando(null);
      carregarAnimais();
    } catch (error) {
      console.error("Erro ao atualizar:", error);
      setMensagem("Erro ao atualizar animal.");
    }
  };

  // Proteção extra: garante que vamos iterar só sobre itens válidos
  const listaSegura = Array.isArray(animais)
    ? animais.filter((a) => a && a.id !== undefined)
    : [];

  return (
    <div className="container mt-4">
      <h2>Animais Cadastrados</h2>

      <Link to="/cadastrar" className="btn btn-primary mb-3">
        Cadastrar Novo
      </Link>

      <div className="row mb-4">
        <div className="col-md-4">
          <input
            type="text"
            placeholder="Buscar por Nome / Espécie / Raça"
            className="form-control"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          />
        </div>

        <div className="col-md-2">
          <button className="btn btn-secondary w-100" onClick={buscarPorTermo}>
            Buscar
          </button>
        </div>

        <div className="col-md-4">
          <input
            type="number"
            placeholder="Buscar por ID do animal"
            className="form-control"
            value={buscaId}
            onChange={(e) => setBuscaId(e.target.value)}
          />
        </div>

        <div className="col-md-2">
          <button className="btn btn-info w-100" onClick={buscarPorId}>
            Buscar ID
          </button>
        </div>
      </div>

      {mensagem && (
        <div className="alert alert-info py-2">{mensagem}</div>
      )}

      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Espécie</th>
            <th>Raça</th>
            <th>Idade</th>
            <th>Ações</th>
          </tr>
        </thead>

        <tbody>
          {listaSegura.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center text-muted">
                Nenhum animal para exibir.
              </td>
            </tr>
          ) : (
            listaSegura.map((a) => (
              <tr key={a.id}>
                <td>{a.id}</td>
                <td>{a.nome}</td>
                <td>{a.especie}</td>
                <td>{a.raca}</td>
                <td>{a.idade}</td>
                <td>
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => abrirEdicao(a)}
                  >
                    Editar
                  </button>

                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => remover(a.id)}
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {editando && (
        <div className="card p-3 shadow">
          <h4>Editar Animal</h4>

          <label>Nome:</label>
          <input
            className="form-control mb-2"
            value={nomeEdit}
            onChange={(e) => setNomeEdit(e.target.value)}
          />

          <label>Espécie:</label>
          <input
            className="form-control mb-2"
            value={especieEdit}
            onChange={(e) => setEspecieEdit(e.target.value)}
          />

          <label>Raça:</label>
          <input
            className="form-control mb-2"
            value={racaEdit}
            onChange={(e) => setRacaEdit(e.target.value)}
          />

          <label>Idade:</label>
          <input
            type="number"
            className="form-control mb-3"
            value={idadeEdit}
            onChange={(e) => setIdadeEdit(e.target.value)}
          />

          <button className="btn btn-success me-2" onClick={salvarEdicao}>
            Salvar Alterações
          </button>

          <button
            className="btn btn-secondary"
            onClick={() => setEditando(null)}
          >
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
