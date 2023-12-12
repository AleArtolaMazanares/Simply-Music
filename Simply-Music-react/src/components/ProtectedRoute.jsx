import React, { useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useSimplyContext } from "./simplyContext/simplyProvider";
import { AES, enc } from "crypto-js";

const ProtectedRoute = ({ element, requiredRoles }) => {
  const { isAuthenticated, userRole, decryptData } = useSimplyContext();
  const navigate = useNavigate();
  const location = useLocation();
  const [sessionLoaded, setSessionLoaded] = useState(false);


  useEffect(() => {
    const handleRedirect = async () => {
      // Verificar si la información de la sesión se ha cargado
      if (!sessionLoaded) {
        try {
          // Intenta cargar la información de la sesión desde localStorage
          await decryptData(localStorage.getItem("sessionData"));
          setSessionLoaded(true);

        } catch (error) {
          console.error("Error during session decryption:", error);
          setSessionLoaded(true); // Establecer como cargado incluso en caso de error
        }
        return;
      }

      // Verificar la autenticación y el rol del usuario
      if (!isAuthenticated || (requiredRoles && !requiredRoles.includes(userRole))) {
        // Redirigir al login si el usuario no está autenticado o no tiene el rol requerido
        navigate("/login", { state: { from: location.pathname } });
      }
    };

    handleRedirect(); // Llamar a la función de redirección al cargar el componente
  }, [isAuthenticated, userRole, decryptData, location.pathname, sessionLoaded, navigate]);

  return isAuthenticated ? element : null;
};

export default ProtectedRoute;
