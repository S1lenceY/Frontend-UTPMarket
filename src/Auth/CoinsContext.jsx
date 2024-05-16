import React, { createContext, useContext, useState, useEffect } from 'react';

const CoinsContext = createContext();

export const CoinsProvider = ({ children }) => {
  const [totalCoins, setTotalCoins] = useState(parseInt(window.localStorage.getItem("coins")) || 0);
  console.log("Total de monedas:", totalCoins); // Imprimir totalCoins en la consola

  const updateTotalCoins = (newTotalCoins) => {
    setTotalCoins(newTotalCoins);
  };

  useEffect(() => {
    // Almacenar el nuevo valor de totalCoins en el localStorage
    window.localStorage.setItem("coins", totalCoins.toString());
  }, [totalCoins]); // Se ejecutará cada vez que totalCoins cambie

  return (
    <CoinsContext.Provider value={{ totalCoins, updateTotalCoins }}>
      {children}
    </CoinsContext.Provider>
  );
};

export const useCoins = () => useContext(CoinsContext);
