// MusicContext.jsx
import React, { createContext, useContext, useReducer } from "react";

// Definir el estado inicial y el reductor
const initialState = {
  isAuthenticated: false,
  userId: "",
  userRole: "",
};

const musicReducer = (state, action) => {
  switch (action.type) {
    // Definir casos de reducción según las acciones necesarias
    default:
      return state;
  }
};

const MusicContext = createContext();

const MusicProvider = ({ children }) => {
  const [state, dispatch] = useReducer(musicReducer, initialState);

  return (
    <MusicContext.Provider value={{ state, dispatch }}>
      {children}
    </MusicContext.Provider>
  );
};

const useMusicContext = () => useContext(MusicContext);

export { MusicProvider, useMusicContext };
