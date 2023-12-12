import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSimplyContext } from "../../../components/simplyContext/simplyProvider";
import Swal from "sweetalert2";
import { enc, AES } from "crypto-js";
import "../login/style.css";

const LoginForm = () => {
  // Utilizamos el hook useSimplyContext para acceder a la función login
  const { login } = useSimplyContext();

  // Hook para la navegación programática en React Router
  const navigate = useNavigate();

  // Estado local para gestionar los datos del formulario (email y contraseña)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Manejar cambios en los campos del formulario
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Función para cifrar datos utilizando AES encryption
  const encryptData = (data) => {
    const secretKey = "mi tia"; // Cambia esto por una clave segura
    return AES.encrypt(JSON.stringify(data), secretKey).toString();
  };

  // Manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Realizar la solicitud de inicio de sesión al servidor
      const response = await fetch("http://localhost:3001/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include",
      });

      console.log("Response from server:", response);

      // Manejar errores en la respuesta
      if (!response.ok) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Invalid credentials or non-JSON response",
        });
        return;
      }

      // Obtener datos de la respuesta (usuario y rol)
      const data = await response.json();

      const userId = data.user.id;

      const name_users = data.user.name_users;

      // Llamar a la función login del contexto para establecer la autenticación
      login(data.user.role, userId, name_users);

      // Guardar la información de la sesión en el localStorage de forma cifrada
      const sessionData = {
        isAuthenticated: true,
        userRole: data.user.role,
        userId: userId,
        name_users: name_users,
        // Otros datos de la sesión que necesites almacenar
      };

      const encryptedSessionData = encryptData(sessionData);
      localStorage.setItem("sessionData", encryptedSessionData);

      // Redirigir al usuario según el rol utilizando Navigate
      if (data.user.role === "user") {
        navigate(`/user/${userId}`);
      } else if (data.user.role === "artist") {
        navigate(`/user/${userId}`);
      } else if (data.user.role === "admin") {
        navigate(`/admin`);
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  // Renderizar el componente del formulario de inicio de sesión
  return (
    <div id="form-ui">
      <form action="" method="post" id="form" onSubmit={handleSubmit}>
        <div id="form-body">
          <div id="welcome-lines">
            <div id="welcome-line-1">Simply</div>
            <div id="welcome-line-2">Welcome Back, Loyd</div>
          </div>
          <div id="input-area">
            <div className="form-inp">
              <label>
                {/* Input para el correo electrónico */}
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email Address"
                />
              </label>
            </div>
            <div className="form-inp">
              <label>
                {/* Input para la contraseña */}
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                />
              </label>
            </div>
          </div>
          <div id="submit-button-cvr">
            {/* Botón para enviar el formulario */}
            <button id="submit-button" type="submit">
              Login
            </button>
          </div>

          <div id="bar"></div>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
