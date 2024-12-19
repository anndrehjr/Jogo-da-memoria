import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion'; // Importando o motion para animações
import '../estilos/JogoDaMemoria.css';

const JogoDaMemoria = () => {
  const [cartas, setCartas] = useState([]);
  const [cartasViradas, setCartasViradas] = useState([]);
  const [paresCombinados, setParesCombinados] = useState(0);
  const [tabuleiroBloqueado, setTabuleiroBloqueado] = useState(false);
  const [tempo, setTempo] = useState(0); // Estado para o cronômetro
  const [cliques, setCliques] = useState(0); // Estado para contagem de cliques
  const [vitoria, setVitoria] = useState(false); // Controle de vitória
  const [iniciouJogo, setIniciouJogo] = useState(false); // Verifica se o cronômetro começou
  const navigate = useNavigate();

  useEffect(() => {
    inicializarTabuleiro();
  }, []);

  useEffect(() => {
    if (iniciouJogo && tempo > 0 && !vitoria) {
      const timer = setInterval(() => {
        setTempo(tempo => tempo + 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [tempo, vitoria, iniciouJogo]);

  const inicializarTabuleiro = () => {
    const imagensCartas = [
      "images/1.jpg", "images/2.jpg", "images/3.png", "images/4.png",
      "images/5.jpg", "images/6.jpg", "images/7.jpg", "images/8.jpg",
      "images/9.jpg", "images/10.jpg", "images/11.jpg", "images/15.jpg",
      "images/12.jpeg", "images/13.jpeg", "images/14.jpeg", "images/16.jpg",
      "images/17.png", "images/18.jpg", "images/19.jpeg", "images/20.png",
    ];

    const cartasEmbaralhadas = [...imagensCartas, ...imagensCartas]
      .sort(() => Math.random() - 0.5)
      .map((src, index) => ({
        id: index,
        src,
        virada: false,
        combinada: false
      }));

    setCartas(cartasEmbaralhadas);
    setCartasViradas([]);
    setParesCombinados(0);
    setVitoria(false); // Reseta o estado de vitória ao reiniciar
    setTempo(0); // Reseta o tempo ao reiniciar
    setCliques(0); // Reseta o contador de cliques ao reiniciar
    setIniciouJogo(false); // Reseta o estado de inicialização do jogo
  };

  const virarCarta = (cartaClicada) => {
    if (tabuleiroBloqueado || cartaClicada.virada || cartaClicada.combinada) return;

    // Iniciar o cronômetro no primeiro clique
    if (!iniciouJogo) {
      setIniciouJogo(true);
    }

    const novasCartas = cartas.map(carta =>
      carta.id === cartaClicada.id ? { ...carta, virada: true } : carta
    );

    setCartas(novasCartas);
    setCartasViradas([...cartasViradas, cartaClicada]);
    setCliques(cliques + 1); // Contabilizando o clique

    if (cartasViradas.length === 1) {
      setTabuleiroBloqueado(true);
      verificarCombinacao([...cartasViradas, cartaClicada]);
    }
  };

  const verificarCombinacao = (cartasParaVerificar) => {
    const [primeiraCarta, segundaCarta] = cartasParaVerificar;

    if (primeiraCarta.src === segundaCarta.src) {
      const novasCartas = cartas.map(carta =>
        carta.id === primeiraCarta.id || carta.id === segundaCarta.id
          ? { ...carta, virada: true, combinada: true }
          : carta
      );
      setCartas(novasCartas);
      setParesCombinados(paresCombinados + 1);
      setCartasViradas([]);
      setTabuleiroBloqueado(false);

      // Efeito visual ao acertar o par
      setTimeout(() => {
        document.querySelectorAll('.carta.combinada').forEach(carta => {
          carta.classList.add('efeito-par-acertado');
        });
      }, 200);

      // Verificar se venceu
      if (paresCombinados + 1 === cartas.length / 2) {
        setVitoria(true);
      }
    } else {
      setTimeout(() => {
        const novasCartas = cartas.map(carta =>
          carta.id === primeiraCarta.id || carta.id === segundaCarta.id
            ? { ...carta, virada: false }
            : carta
        );
        setCartas(novasCartas);
        setCartasViradas([]);
        setTabuleiroBloqueado(false);
      }, 1000);
    }
  };

  const voltarParaPaginaInicial = () => {
    navigate('/'); // Navega para a página inicial
  };

  return (
    <motion.div 
      className="jogo-da-memoria"
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2>Jogo da Memória</h2>

      <div className="botoes-controle">
        <button className="botao-reiniciar" onClick={inicializarTabuleiro}>
          Reiniciar Jogo
        </button>
        <button className="botao-voltar" onClick={voltarParaPaginaInicial}>
          Voltar à Tela Inicial
        </button>
      </div>

      {/* Exibindo a mensagem de vitória com animação */}
      {vitoria && (
        <motion.div
          className="mensagem-vitoria"
          initial={{ scale: 0 }} 
          animate={{ scale: 1 }} 
          exit={{ scale: 0 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <h3>Parabéns! Você encontrou todos os pares!</h3>
          <p>Tempo: {tempo} segundos | Cliques: {cliques}</p>
        </motion.div>
      )}

      {/* Exibindo o tempo e cliques */}
      {!vitoria && (
        <div className="status-jogo">
          <p>Tempo: {tempo}s</p>
          <p>Cliques: {cliques}</p>
        </div>
      )}

      <div className="tabuleiro">
        {cartas.map(carta => (
          <div
            key={carta.id}
            className={`carta ${carta.virada ? 'virada' : ''} ${carta.combinada ? 'combinada' : ''}`}
            onClick={() => virarCarta(carta)}
          >
            {carta.virada && <img src={carta.src} alt="Carta" />}
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default JogoDaMemoria;
