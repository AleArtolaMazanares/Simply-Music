import React, { useState } from "react";

function HandleForFeed({ id }) {

  // Estado para manejar los valores del formulario
  const [formData, setFormData] = useState({
    content: "",
    date: "",
    user_id: id,
  });

  // Manejar cambios en los campos del formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log('formData antes de enviar:', formData);

    try {
      const response = await fetch("http://localhost:3001/users/feeds", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Error al enviar el formulario");
      }

      // Aquí puedes manejar la respuesta de tu servidor si es necesario
      const responseData = await response.json();
      console.log("Respuesta del servidor:", responseData);
    } catch (error) {
      console.error("Error de solicitud:", error.message);
    }
  };

  return (
    <div>
      <h2>Feed Form</h2>
      <form onSubmit={handleSubmit}>
        {/* No se muestra el campo user_id en el formulario */}
        <input type="hidden" name="user_id" value={formData.user_id} />

        <label>
          Content:
          <input
            type="text"
            name="content"
            value={formData.content}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Date:
          <input
            type="datetime-local"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default HandleForFeed;
