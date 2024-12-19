import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

function PaginaInicial() {
  return (
    <motion.div 
      className="pagina-inicial"
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1>Bem-vindo à Plataforma de Jogos</h1>
      <nav>
        <Link to="/jogo-da-memoria" className="link-animado">
          Jogo da Memória
        </Link>
      </nav>
    </motion.div>
  );
}

export default PaginaInicial;
