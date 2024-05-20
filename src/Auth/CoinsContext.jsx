import React, { createContext, useContext, useState, useEffect } from 'react';

const CoinsContext = createContext();

export const CoinsProvider = ({ children }) => {
  const [totalCoins, setTotalCoins] = useState(0); // Inicialmente 0

  useEffect(() => {
    const timer = setTimeout(() => {
      const coinsFromStorage = parseInt(window.localStorage.getItem("coins")) || 0;
      setTotalCoins(coinsFromStorage);
      console.log("Total de monedas:", coinsFromStorage); // Imprimir totalCoins en la consola
    }, 2000); // Espera de 2 segundos

    return () => clearTimeout(timer); // Limpiar el temporizador al desmontar
  }, []);

  const updateTotalCoins = (newTotalCoins) => {
    if (newTotalCoins >= 0) {
      setTotalCoins(newTotalCoins);
      window.localStorage.setItem("coins", newTotalCoins.toString()); // Almacenar el nuevo valor de totalCoins en el localStorage
    } else {
      console.warn("El total de monedas no puede ser negativo.");
    }
  };

  return (
    <CoinsContext.Provider value={{ totalCoins, updateTotalCoins }}>
      {children}
    </CoinsContext.Provider>
  );
};

export const useCoins = () => useContext(CoinsContext);
