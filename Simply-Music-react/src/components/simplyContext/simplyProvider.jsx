// Ejemplo de SimplyProvider
import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { enc, AES } from "crypto-js";

const SimplyContext = createContext();

const SimplyProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState("")
  const [userRole, setUserRole] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const decryptStoredSession = async () => {
      const storedSession = localStorage.getItem("sessionData");

      try {
        if (storedSession) {
          const decryptedSessionData = await decryptData(storedSession);

          

          // console.log("Decrypted Session Data:", decryptedSessionData);

          if (decryptedSessionData && decryptedSessionData.isAuthenticated) {
            setIsAuthenticated(true);
            setUserRole(decryptedSessionData.userRole);
          }
        }
      } catch (error) {
        console.error("Error during session decryption:", error);
        logout(); // Cerrar sesión en caso de error durante la desencriptación
        navigate("/login"); // Redirigir a la página de inicio de sesión
      }
    };

    decryptStoredSession();
  }, [navigate]);



  const login = (role, userId) => {
    setUserId(userId)

    setIsAuthenticated(true);
    setUserRole(role);

    // Guarda la información de la sesión en localStorage después de encriptar
    const encryptedSessionData = encryptData({ isAuthenticated: true, userRole: role, userId: userId });
    localStorage.setItem("sessionData", encryptedSessionData);
  };


  const logout = () => {
    setIsAuthenticated(false);
    setUserRole("");

    // Borra la información de la sesión de localStorage al cerrar sesión
    localStorage.removeItem("sessionData");
  };

  const setAuthenticatedUser = (userData) => {
    setIsAuthenticated(true);
    setUserRole(userData.userRole);
    setUserId(userData.userId); 
    // setNameUser(userData.name)

    // Guarda la información de la sesión en localStorage después de encriptar
    const encryptedSessionData = encryptData({ isAuthenticated: true, userRole: userData.userRole });
    localStorage.setItem("sessionData", encryptedSessionData);
  };

  const encryptData = (data) => {
    const secretKey = "mi tia";
    return AES.encrypt(JSON.stringify(data), secretKey).toString();
  };

  const decryptData = async (encryptedData) => {
    const secretKey = "mi tia";

    try {
      const bytes = AES.decrypt(encryptedData, secretKey);
      const decryptedString = bytes.toString(enc.Utf8);
      return JSON.parse(decryptedString);
    } catch (error) {
      console.error("Error during decryption:", error);
      throw error;
    }
  };

  return (
    <SimplyContext.Provider value={{ isAuthenticated, userRole, login, logout, setAuthenticatedUser, decryptData, userId }}>
      {children}
    </SimplyContext.Provider>
  );
};

const useSimplyContext = () => useContext(SimplyContext);

export { SimplyProvider, useSimplyContext };
