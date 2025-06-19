import { useState } from "react";
import './App.css';

function App() {

  const [dead, setDead] = useState([]);
  const [box, setBox] = useState([]);
  const [round, setRound] = useState(0);
  const [msgRound, setMsgRound] = useState("?");
  const specialRoundFreq = 5;

  const letras = ['A','B','C','D','E','F','G','H','I'];
  const numeros = [1,2,3,4,5,6,7,8,9];
  const specialRounds = ['666', '666', 'triple-box', 'lord-of-bath', 'no-dj', 'use-card', 'border', 'cross', 'trapattack'];

  // Special rounds:
  

  const generateCoordinates = () => {
      const letra = letras[Math.floor(Math.random() * letras.length)];
      const numero = numeros[Math.floor(Math.random() * numeros.length)];
      return letra + numero;
  };

  const reroll = () => {
    if ((round + 1) % specialRoundFreq === 0 && round !== 0) {
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
      } else if (special === 'lord-of-bath') {
        setDead([generateCoordinates(), generateCoordinates()]);
        setBox([generateCoordinates()]);
        setMsgRound('El jugador con menos puntos se convierte en el Señor del baño. Obedece sus órdenes para ir al baño. (en caso de empate se decide con el numero mas bajo de un dado)');
      } else if (special === 'no-dj') {
        setDead([generateCoordinates(), generateCoordinates()]);
        setBox([generateCoordinates()]);
        setMsgRound('🔇 Noche sin DJ: Nadie puede hablar hasta el final del próximo turno. Si alguien rompe la regla, bebe 2 tragos.');
      } else if (special === 'use-card') {
        setDead([generateCoordinates(), generateCoordinates()]);
        setBox([generateCoordinates()]);
        setMsgRound('Todos los jugadores deben usar una carta en su próximo turno o descartan toda la mano y beben 3 tragos.');
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
      }

      //Cofre en el centro i parte bloqueada
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
        <span>{dead.length !== 0 ? "Reroll" : "Jugar"} </span>
      </a>
      {round !== 0 && <p className={"round " + (round % specialRoundFreq === 0 ? 'special-round' : '')}><span>{round % specialRoundFreq === 0 ? '༺♆ ' : ''}Ronda: {round}{round % specialRoundFreq === 0 ? ' ♆༻' : ''}</span></p>}
      {dead.length !== 0 ?
      <div className="tablero-container">
        <div className="coordinates-container">
          <div className="coordinates">
            <img src='/trampa2.png' alt='dead' className="icon"></img>
            {dead.length === 32 ? 
            <span>Todo el borde</span>
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
      </div>
      }
    </div>
  );
}

export default App;
