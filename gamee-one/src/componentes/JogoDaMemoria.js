import React, { useState, useEffect } from 'react';
import '../estilos/JogoDaMemoria.css';

const JogoDaMemoria = () => {
  const [cartas, setCartas] = useState([]);
  const [cartasViradas, setCartasViradas] = useState([]);
  const [paresCombinados, setParesCombinados] = useState(0);
  const [tabuleiroBloqueado, setTabuleiroBloqueado] = useState(false);

  useEffect(() => {
    inicializarTabuleiro();
  }, []);

  const inicializarTabuleiro = () => {
    const imagensCartas = [
      "images/1.jpg", "images/2.jpg", "images/3.png", "images/4.png",
      "images/5.jpg", "images/6.jpg", "images/7.jpg", "images/8.jpg",
      "images/9.jpg", "images/10.jpg", "images/11.jpg", "images/15.jpg",
      "images/12.jpeg", "images/13.jpeg", "images/14.jpeg" , "images/16.jpg",
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
  };

  const virarCarta = (cartaClicada) => {
    if (tabuleiroBloqueado) return;
    if (cartaClicada.virada) return;

    const novasCartas = cartas.map(carta =>
      carta.id === cartaClicada.id ? { ...carta, virada: true } : carta
    );

    setCartas(novasCartas);
    setCartasViradas([...cartasViradas, cartaClicada]);

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
          ? { ...carta, combinada: true }
          : carta
      );
      setCartas(novasCartas);
      setParesCombinados(paresCombinados + 1);
      setCartasViradas([]);
      setTabuleiroBloqueado(false);

      if (paresCombinados + 1 === cartas.length / 2) {
        // Jogo terminado
        alert("Parabéns! Você encontrou todos os pares!");
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

  return (
    <div className="jogo-da-memoria">
      <h2>Jogo da Memória</h2>
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
    </div>
  );
}

export default JogoDaMemoria;

