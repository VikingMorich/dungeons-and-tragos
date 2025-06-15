import { useState } from "react";
import './App.css';

function App() {

  const [dead, setDead] = useState("?");
  const [dead2, setDead2] = useState("?");
  const [box, setBox] = useState("?");

  const letras = ['A','B','C','D','E','F','G','H','I'];
  const numeros = [1,2,3,4,5,6,7,8,9];

  const generateCoordinates = () => {
      const letra = letras[Math.floor(Math.random() * letras.length)];
      const numero = numeros[Math.floor(Math.random() * numeros.length)];
      return letra + numero;
  };

  const reroll = () => {
    setDead(generateCoordinates());
    setDead2(generateCoordinates());
    setBox(generateCoordinates());
    console.log("Rerolling...");
  };


  return (
    <div className="App">
      <h1>Dungeons & Tragos</h1>
      {dead !== "?" ?
      <div className="tablero-container">
        <div className="coordinates">
          <span className="icon">💥</span>
          <span>{dead}</span>
          <span>·</span>
          <span>{dead2}</span>
        </div>
        <div className="coordinates">
          <span className="icon">📦</span>
          <span>{box}</span>
        </div>
        <div className="tablero">
        {letras.map(letra => (
          <div key={letra} className="fila">
            {numeros.map(numero => (
              <div key={letra + numero} className={"celda " + (letra + numero === dead || letra + numero === dead2 ? "dead" : "") + (letra + numero === box ? "box" : "")}>
                {letra + numero}
              </div>
            ))}
          </div>
        ))}
        </div>
      </div>
      : 
      <div className="welcome-message">
        <span>Prepara el tablero y tus bebidas. La batalla esta a punto de empezar. Cuando esteis listos haz click aquí para empezar.</span>
      </div>
      }
    
      <a onClick={reroll} className="button">
        <span>{dead !== "?" ? "Reroll" : "Play"} </span>
      </a>
    </div>
  );
}

export default App;
