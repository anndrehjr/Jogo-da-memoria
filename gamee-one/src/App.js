import React from 'react';
import { BrowserRouter as Roteador, Route, Routes, Link } from 'react-router-dom';
import PaginaInicial from './componentes/PaginaInicial';
import JogoDaMemoria from './componentes/JogoDaMemoria';
import './estilos/App.css';

const App = () => {
  return (
    <Roteador>
      <div className="app">
        <nav>
          <ul>
            <li><Link to="/">Página Inicial</Link></li>
            <li><Link to="/jogo-da-memoria">Jogo da Memória</Link></li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<PaginaInicial />} />
          <Route path="/jogo-da-memoria" element={<JogoDaMemoria />} />
        </Routes>
      </div>
    </Roteador>
  );
}

export default App;

