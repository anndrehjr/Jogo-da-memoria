import React from 'react';
import { Link } from 'react-router-dom';

const PaginaInicial = () => {
  return (
    <div className="pagina-inicial">
      <h1>Bem-vindo à Plataforma de Jogos</h1>
      <p>Escolha um jogo para começar:</p>
      <ul>
        <li><Link to="/jogo-da-memoria">Jogo da Memória</Link></li>
      </ul>
    </div>
  );
}

export default PaginaInicial;

