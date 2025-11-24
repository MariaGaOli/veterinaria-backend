import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import BackHomeButton from "../components/BackHomeButton";

export default function ConsultaList() {
  const navigate = useNavigate();
  const [consultas, setConsultas] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("consultas")) || [];
    setConsultas(data);
  }, []);

  const excluir = (index) => {
    const novaLista = [...consultas];
    novaLista.splice(index, 1);
    setConsultas(novaLista);
    localStorage.setItem("consultas", JSON.stringify(novaLista));
  };

  return (
    <div className="container mt-4">
      <h2>Consultas Cadastradas</h2>

      <button className="btn btn-primary mb-3"
        onClick={() => navigate("/consultas/new")}>
        Nova Consulta
      </button>

      {consultas.length === 0 ? (
        <p>Nenhuma consulta cadastrada.</p>
      ) : (
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
            {consultas.map((c, index) => (
              <tr key={index}>
                <td>{c.data}</td>
                <td>{c.hora}</td>
                <td>{c.veterinario}</td>
                <td>{c.animal}</td>
                <td>
                  <button className="btn btn-danger btn-sm"
                    onClick={() => excluir(index)}>
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

        <div className="container mt-4">
        <BackHomeButton />
        </div>
    </div>
  );
}
