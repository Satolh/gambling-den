import React, { useState } from 'react';

const Cartas = () => {
  const [posiciones, setPosiciones] = useState([
    { top: 50, left: 50 },
    { top: 50, left: 200 },
    { top: 50, left: 350 },
  ]);

  const mezclarCartas = () => {
    let contador = 0;
    const intervalo = setInterval(() => {
      // Mezclar posiciones de las cartas de forma aleatoria
      const nuevasPosiciones = posiciones
        .map(pos => ({ ...pos }))
        .sort(() => Math.random() - 0.5);

      setPosiciones(nuevasPosiciones);
      contador++;

      // Detener el intervalo después de 5 mezclas
      if (contador >= 5) {
        clearInterval(intervalo);
      }
    }, 200); // Duración de cada mezcla (1 segundo)
  };

  return (
    <div>
      {posiciones.map((pos, index) => (
        <div
          key={index}
          className="carta"
          style={{ top: `${pos.top}px`, left: `${pos.left}px` }}
        >
          Carta {index + 1}
        </div>
      ))}
      <button onClick={mezclarCartas}>Mezclar Cartas 5 Veces</button>
    </div>
  );
};

export default Cartas;
