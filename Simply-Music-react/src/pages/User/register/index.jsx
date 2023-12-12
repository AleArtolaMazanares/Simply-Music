import { useState } from "react";
import Swal from 'sweetalert2';
import "./style.css";

function Register() {
  // Estado para almacenar los datos del formulario
  const [formData, setFormData] = useState({
    name_users: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  // Estado para almacenar mensajes de error asociados a cada campo del formulario
  const [errors, setErrors] = useState({
    name_users: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  // Función que se ejecuta cuando cambia el valor de un campo del formulario
  const handleChange = (e) => {
    // Actualizar el estado con el nuevo valor del campo
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Limpiar mensaje de error al cambiar el valor del campo
    setErrors({ ...errors, [e.target.name]: "" });
  };

  // Función que se ejecuta al enviar el formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación de campos vacíos
    const emptyFields = [];

    // Recorrer los campos del formulario
    for (const key in formData) {
      // Verificar si el campo está vacío o solo contiene espacios en blanco
      if (formData[key].trim() === "") {
        // Agregar el nombre del campo a la lista de campos vacíos
        emptyFields.push(key);
      }
    }

    // Verificar si hay campos vacíos
    if (emptyFields.length > 0) {
      // Mostrar alerta con los campos vacíos
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text:  `Por favor, complete los siguientes campos: ${emptyFields.join(", ")}`,
      });

      return; // Detener el envío del formulario si hay campos vacíos
    }

    try {
      // Enviar los datos del formulario al servidor
      const response = await fetch("http://localhost:3001/users/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          users: {
            name_users: formData.name_users,
            email: formData.email,
            password: formData.password,
            password_confirmation: formData.password_confirmation,
          },
        }),
        credentials: "include",
      });

      // Obtener la respuesta del servidor en formato JSON
      const data = await response.json();
      console.log("Respuesta del servidor", data);

      // Verificar si el registro fue exitoso
      if (response.ok) {
        // Redirigir al usuario a la página de inicio de sesión
        window.location.href = "/login";
      } else {
        // Mostrar mensaje de error en la consola si el registro falla
        console.error("Registro fallido:", data.error);
      }
    } catch (error) {
      // Mostrar mensaje de error en la consola si hay un problema con la solicitud
      console.error("Error en la solicitud:", error);
    }
  };

  return (
    <>
      <div className="register-container">
        <div className="register-info">
          <h2>Sign Up</h2>
          <p>
            Join us to explore a world of music and unlock access to exclusive
            content!
          </p>
        </div>
        <div className="container_form">
          <form onSubmit={handleSubmit}>
            <label>
              Name:
              <input
                type="text"
                name="name_users"
                value={formData.name_users}
                onChange={handleChange}
              />
              {errors.name_users && (
                <span className="error">{errors.name_users}</span>
              )}
            </label>
            <br />
            <label>
              Email:
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <span className="error">{errors.email}</span>}
            </label>
            <br />
            <label>
              Password:
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
              {errors.password && (
                <span className="error">{errors.password}</span>
              )}
            </label>
            <br />
            <label>
              Password confirmation:
              <input
                type="password"
                name="password_confirmation"
                value={formData.password_confirmation}
                onChange={handleChange}
              />
              {errors.password_confirmation && (
                <span className="error">{errors.password_confirmation}</span>
              )}
            </label>
            <br />
            <button type="submit">REGISTER</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Register;
