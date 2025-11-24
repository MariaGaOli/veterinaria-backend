import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Home.css";

export default function Home() {
  return (
    <div className="home-bg">

      <div className="container text-center pt-5">

        <h1 className="mb-3 home-title">🐾 Sistema Veterinário</h1>
        <p className="lead mb-5 home-subtitle">
          Bem-vindo! Escolha abaixo o que deseja fazer:
        </p>

        <div className="row justify-content-center g-4">

          <div className="col-md-4">
            <Link to="/cadastrar" className="home-btn btn w-100 p-4 fs-5">
              ➕ Cadastrar Animais
            </Link>
          </div>

          <div className="col-md-4">
            <Link to="/animais" className="home-btn btn w-100 p-4 fs-5">
              📋 Listar Animais Cadastrados
            </Link>
          </div>

          <div className="col-md-4">
            <Link to="/consultas/new" className="home-btn btn w-100 p-4 fs-5">
              🩺 Cadastrar Consultas
            </Link>
          </div>

          <div className="col-md-4">
            <Link to="/consultas" className="home-btn btn w-100 p-4 fs-5">
              📅 Listar Consultas
            </Link>
          </div>

        </div>

        {/* imagens abaixo */}
        <div className="animals-area mt-5">
          <img src="https://love.doghero.com.br/wp-content/uploads/2018/12/golden-retriever-1.png" alt="dog" />
          <img src="https://www.petz.com.br/blog/wp-content/uploads/2023/10/insuficiencia-renal-em-gatos-topo.jpg" alt="cat" />
          <img src="https://blog.polipet.com.br/wp-content/uploads/2024/02/coelho-scaled.jpeg" alt="rabbit" />
          <img src="https://static.casapino.com.br/casapino/2017/06/201706/minipig-la-_let1266-4450e880.jpg" alt="rabbit" />
          <img src="https://p2.trrsf.com/image/fget/cf/940/0/images.terra.com/2024/11/04/2068666766-hamsters.jpg" alt="rabbit" />
          <img src="https://www.universodasaudeanimal.com.br/wp-content/uploads/sites/57/2021/07/Cacho-e-gato-juntos-no-chao-posando-pra-foto.jpg" alt="rabbit" />
        </div>

      </div>

    </div>
  );
}
