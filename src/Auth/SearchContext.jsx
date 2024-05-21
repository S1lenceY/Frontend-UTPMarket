import React, { createContext, useContext, useState } from 'react';

// Crear el contexto
const SearchContext = createContext();

// Proveedor del contexto
export const SearchProvider = ({ children }) => {
  const [searchResults, setSearchResults] = useState([]);

  return (
    <SearchContext.Provider value={{ searchResults, setSearchResults }}>
      {children}
    </SearchContext.Provider>
  );
};

// Hook personalizado para usar el contexto
export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearch debe ser usado dentro de un SearchProvider");
  }
  return context.searchResults; // Devolver directamente el array searchResults
};

export default SearchContext;

