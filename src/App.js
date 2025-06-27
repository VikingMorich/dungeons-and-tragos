import { useState } from "react";
import './App.css';

function App() {

  const [dead, setDead] = useState([]);
  const [box, setBox] = useState([]);
  const [round, setRound] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [msgRound, setMsgRound] = useState("?");
  const specialRoundFreq = 5;

  const letras = ['A','B','C','D','E','F','G','H','I'];
  const numeros = [1,2,3,4,5,6,7,8,9];
  const specialRounds = ['666', '666', 'triple-box', 'triple-box', 'border', 'cross', 'trapattack', 'skull'];
  //const specialRounds = ['skull'];

  // Special rounds:
  

  const toggleModal = () => {
    setOpenModal(!openModal);
  }

  const generateCoordinates = () => {
      const letra = letras[Math.floor(Math.random() * letras.length)];
      const numero = numeros[Math.floor(Math.random() * numeros.length)];
      return letra + numero;
  };

  const reroll = () => {
    if ((round + 1) === 1) {
      setBox(['E5']);
    } else if ((round + 1) % specialRoundFreq === 0 && round !== 0) {
      // Special round logic
      const special = specialRounds[Math.floor(Math.random() * specialRounds.length)]
      console.log("Special round:", special);
      if (special === '666') {
        setDead([generateCoordinates(), generateCoordinates(), generateCoordinates(), generateCoordinates(), generateCoordinates(), generateCoordinates(), generateCoordinates(), generateCoordinates(), generateCoordinates(), generateCoordinates()]);
        setBox([]);
        setMsgRound('¡A tomar por culo!');
      } else if (special === 'triple-box') {
        setDead([generateCoordinates()]);
        setBox([generateCoordinates(), generateCoordinates(), generateCoordinates()]);
        setMsgRound('¡Regalos para todos!');
      // } else if (special === 'lord-of-bath') {
      //   setDead([generateCoordinates(), generateCoordinates()]);
      //   setBox([generateCoordinates()]);
      //   setMsgRound('Te conviertes en el Señor del baño. Todos deben obedecer tus órdenes para ir al baño. Si alguien va sin tu permiso, bebe 4 tragos.');
      // } else if (special === 'no-dj') {
      //   setDead([generateCoordinates(), generateCoordinates()]);
      //   setBox([generateCoordinates()]);
      //   setMsgRound('🔇 Noche sin DJ: Nadie puede hablar hasta el final de tu próximo turno. Si alguien rompe la regla, bebe 2 tragos.');
      // } else if (special === 'use-card') {
      //   setDead([generateCoordinates(), generateCoordinates()]);
      //   setBox([generateCoordinates()]);
      //   setMsgRound('Todos los jugadores deben usar una carta en su próximo turno o descartan toda la mano y beben 3 tragos.');
      } else if (special === 'border') {
        setDead(['A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8', 'A9', 'B1', 'B9', 'C1', 'C9', 'D1', 'D9', 'E1', 'E9', 'F1', 'F9', 'G1', 'G9', 'H1', 'H9', 'I1', 'I2', 'I3', 'I4', 'I5', 'I6', 'I7', 'I8', 'I9']);
        setBox([generateCoordinates()]);
      } else if (special === 'cross') {
        setDead(['A5', 'B5', 'C5', 'D5', 'E5', 'F5', 'G5', 'H5', 'I5', 'E1', 'E2', 'E3', 'E4', 'E6', 'E7', 'E8', 'E9']);
        setBox([generateCoordinates()]);
      } else if (special === 'trapattack') {
        setDead([generateCoordinates(), generateCoordinates(), generateCoordinates()]);
        setBox([generateCoordinates(), generateCoordinates()]);
        setMsgRound('Estas trampas se quedan en el mapa 5 rondas. Si alguien cae en una, bebe 2 tragos.');
      } else if (special === 'skull') {
        setDead(['B3', 'B4', 'B5', 'B6', 'B7','C2', 'C3', 'C4', 'C5', 'C6', 'C7', 'C8', 'D2', 'D5', 'D8', 'E2', 'E5', 'E8', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'G3', 'G4', 'G5', 'G6', 'G7', 'H3', 'H5', 'H7']);
        setBox([generateCoordinates()]);
        setMsgRound('Todos los afectados por estas trampas pierden 1 botella.');
      }
    } else {
      setDead([generateCoordinates(), generateCoordinates()]);
      setBox([generateCoordinates()]);
      setMsgRound('?');
    }
    console.log("Rerolling...");
    setRound(round + 1);
  };


  return (
    <div className="App" style={{
    backgroundImage: round % specialRoundFreq === 0 && round !== 0 ? "url('/fondos_web-darkmode.png')" : "url('/fondos_web.png')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    minHeight: "100vh"
  }}>
      <img src={round % specialRoundFreq === 0 && round !== 0 ? '/logo-darkmode.png' : '/logo.png'} className="logo" alt="Logo" />
      <a onClick={reroll} className="button">
        <span>{round !== 0 ? "Siguiente Ronda" : "Nueva Partida"} </span>
      </a>
      {round !== 0 && <p className={"round " + (round % specialRoundFreq === 0 ? 'special-round' : '')}><span>{round % specialRoundFreq === 0 ? '༺♆ ' : ''}Ronda: {round}{round % specialRoundFreq === 0 ? ' ♆༻' : ''}</span></p>}
      {dead.length !== 0 || box.length !== 0 ?
      <div className="tablero-container">
        <div className="coordinates-container">
          <div className="coordinates">
            <img src='/trampa2.png' alt='dead' className="icon"></img>
            {dead.length === 32 ? 
            <span>Todo el borde</span>
            : 
            dead.length === 33 ? 
            <span>💀</span>
            :
            dead.length === 17 ?
            <span>Fila E · Columna 5</span> :
            dead.map((d, index) => (
              <>
                {index !== 0 && <span>·</span>}
                <span>{d}</span>
              </>
            ))}
          </div>
          {box.length !== 0 ? 
          <div className="coordinates">
            <img src='/barril.png' alt='caja' className="icon"></img>
            {box.map((boxItem, i)=> (
              <>
                {i !== 0 && <span>·</span>}
                <span>{boxItem}</span>
              </>
            ))}
          </div> : null}
        </div>
        <div className="tablero">
        {letras.map(letra => (
          <div key={letra} className="fila">
            {numeros.map(numero => (
              <div key={letra + numero} className={"celda " + (dead.includes(letra + numero) ? "dead" : "") + (box.includes(letra + numero) ? "box" : "")}>
                {letra + numero}
              </div>
            ))}
          </div>
        ))}
        </div>
        {msgRound !== '?' && <p className="msg-round">{msgRound}</p>}
      </div>
      :
      <div className="welcome-message">
        <p>Prepara el tablero y tus bebidas. La batalla esta a punto de empezar...</p>
        <p>Échate unas risas y pilla un buen pedo con tus colegas planeando estrategias y haciendo combos increíbles con las cartas de acción.</p>
      </div>
      }
      <footer className="footer-content">
        <span>Pablosky & VikingMorich production    </span>
        <div className="rules" onClick={toggleModal}>
          <span>?</span>
        </div>
      </footer>
      {openModal && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-close" onClick={toggleModal}>
              <span className="close">&times;</span>
            </div>
            <h2>Preparación</h2>
            <p>Juntar las piezas del tablero en acuerdo entre todos los jugadores, poniendo las piezas de tablero extra sobre el tablero principal generando diferentes niveles de altitud pudiendo acceder con las escaleras.</p>
            <p>Colocar las bases de cada jugador en esquinas lo más opuestas posible. Las bases ocuparan dos espacios del tablero para cada uno de los jugadores.</p>
            <p>Repartir dos vasos de chupito a cada jugador y colocarlos en la base de cada jugador.</p>
            <p>Escoger el licor con el que se va a jugar durante la partida y rellenar todos los vasos en juego.</p>
            <p>Repartir tres cartas de barril a cada jugador.</p>
            <h2>Objetivo del Juego</h2>
            <p>Conseguir 12 puntos. (Botellitas)</p>
            <h2>Como conseguir puntos</h2>
            <p>Consigues puntos cuando saltas el vaso de un enemigo o lo eliminas con una de tus cartas. Cuando esto pasa, el enemigo muere, debe beberse el contenido de ese chupito y envía el vaso eliminado a su base.</p>
            <p>Es importante que, para matar al enemigo, tu vaso no puede caer en la casilla de un enemigo, debe sobrepasarla.</p>
            <h2>Barril</h2>
            <p>Al principio de cada ronda caerá uno o varios barriles en unas casillas aleatorias. Estos barriles son alicientes para la partida y se pueden utilizar en cualquier momento de la partida (según indique cada carta). Para conseguirlos, debes hacer que uno de tus vasos caiga o cruce por encima de la casilla del barril. En ese momento, deberás robar una carta de la pila y añadirla a tu mazo.</p>
            <h2>Trampas</h2>
            <p>Junto a los barriles, también aparecerá en la web, en que casillas se encuentras las trampas de la siguiente ronda. Si un jugador está situado en una de esas casillas, morirá. Deberá beber, volver ese vaso a su base.</p>
            <h2>Orden del juego</h2>
            <p>El juego se divide en rondas. La ronda se repetirá cuando cada jugador haya realizado su turno.</p>
            <p>Empezará el jugador que haya sacado el dado más alto y se continuará en sentido horario.</p>
            <h4>Ronda</h4>
              <p>Turno del jugador 1. Durante su turno podrá ejercer varias acciones en el orden que él decida:</p>
              <ul>
                <li>Tira los dos dados a la vez.</li>
                  <p>1d8 decidirá el número de casillas que avanzará a uno de sus vasos.</p>
                  <p>1d4 decidirá el número de casillas que avanzará su otro vaso o un vaso del enemigo que continuará después de tu turno.</p>
                <li>Utilizar sus cartas. Tantas como él decida y en cualquier momento de su turno.</li>
              </ul>
              <p>Turno del jugador 2 … Hasta dar la vuelta a todos los jugadores.</p>
              <p>Dar al botón de “Siguiente Ronda”, situar los barriles donde indica la WEB y eliminar a los jugadores que hayan caído en la casilla de trampa.</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
