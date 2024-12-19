import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import JogoDaMemoria from './componentes/JogoDaMemoria';
import PaginaInicial from './componentes/PaginaInicial';
import './estilos/App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Routes>
          <Route path="/" element={<PaginaInicial />} />
          <Route path="/jogo-da-memoria" element={<JogoDaMemoria />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

