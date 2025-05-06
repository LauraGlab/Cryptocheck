import React, { createContext, useContext, useState, useEffect } from "react";

const CoinContext = createContext();

export const useCoinContext = () => {
  const context = useContext(CoinContext);
  if (context === undefined) {
    throw new Error("useCoinContext must be used within a CoinProvider");
  }
  return context;
};

export const CoinProvider = ({ children }) => {
  const [coins, setCoins] = useState([]);
  const [favoriteCoins, setFavoriteCoins] = useState(() => {
    try {
      const stored = localStorage.getItem("favoriteCoins");
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error("Error reading favoriteCoins from localStorage:", error);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("favoriteCoins", JSON.stringify(favoriteCoins));
    } catch (error) {
      console.error("Error writing favoriteCoins to localStorage:", error);
    }
  }, [favoriteCoins]);

  return (
    <CoinContext.Provider
      value={{ coins, setCoins, favoriteCoins, setFavoriteCoins }}
    >
      {children}
    </CoinContext.Provider>
  );
};