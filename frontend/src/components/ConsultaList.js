import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import BackHomeButton from "../components/BackHomeButton";

export default function ConsultaList() {
  const navigate = useNavigate();
  const [consultas, setConsultas] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/consultas")
      .then(res => res.json())
      .then(data => {
        console.log("RESPOSTA DA API:", data);

        // Se o backend responder { consultas: [...] }
        if (Array.isArray(data)) {
          setConsultas(data);
        } else if (Array.isArray(data.consultas)) {
          setConsultas(data.consultas);
        } else {
          setConsultas([]); // segurança caso venha algo inesperado
        }
      })
      .catch(err => {
        console.error("Erro ao carregar consultas", err);
        setConsultas([]);
      });
  }, []);

  const excluir = async (id) => {
    if (!window.confirm("Deseja excluir esta consulta?")) return;

    await fetch(`http://localhost:3000/consultas/${id}`, { method: "DELETE" });

    setConsultas((prev) => prev.filter((c) => c.id !== id));
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
            {consultas.map((c) => (
              <tr key={c.id}>
                <td>{new Date(c.data).toLocaleDateString("pt-BR")}</td>
                <td>{c.hora?.slice(0, 5)}</td>
                <td>{c.veterinario}</td>
                <td>{c.animal}</td>
                <td>
                  <button className="btn btn-danger btn-sm"
                    onClick={() => excluir(c.id)}>
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
