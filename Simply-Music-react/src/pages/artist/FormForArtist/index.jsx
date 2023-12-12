import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PagePrincipalArtist from "../pagePrincipalArtist";
import "./style.css";
import HandleFormForArtist from "../../../components/FormForArtist";
import SpinnerLoading from "../../../components/SpinerLoading";

const FormForArtist = () => {
  const { id } = useParams();

  const [formData, setFormData] = useState({
    name: "",
    image: "",
    description: "",
    genre: "",
  });

  const [formularioEnviado, setFormularioEnviado] = useState(false);
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true); // Inicialmente establecido como true

  useEffect(() => {
    const obtenerIdUsuario = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/users/users/${id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              credentials: "include",
            },
          }
        );

        if (response.ok) {
          const usuario = await response.json();
          setUsuario(usuario);
          localStorage.setItem("userId", usuario.id);
        } else {
          console.error("Error al obtener la información del usuario.");
        }
      } catch (error) {
        console.error("Error de red:", error);
      } finally {
        setLoading(false); // Después de obtener la información, establecer loading a false
      }
    };

    obtenerIdUsuario();
  }, [id]);

  useEffect(() => {
    const verificarFormularioEnviado = async () => {
      if (usuario) {
        const formularioYaEnviado = localStorage.getItem(
          `formularioEnviado_${usuario.id}`
        );
        if (formularioYaEnviado) {
          setFormularioEnviado(true);
        }
      }
    };

    verificarFormularioEnviado();
  }, [usuario]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formularioYaEnviado = localStorage.getItem(
      `formularioEnviado_${usuario.id}`
    );
    if (formularioYaEnviado) {
      // Si ya se ha enviado, no hagas nada
      return;
    }

    try {
      setLoading(true); // Establecer loading a true mientras se envía

      const response = await fetch(
        "http://localhost:3001/users/content_artists",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...formData, user_id: id }),
        }
      );

      if (response.ok) {
        const contentUser = await response.json();
        setUsuario((prevUsuario) => ({
          ...prevUsuario,
          content_user: contentUser,
        }));

        setFormularioEnviado(true);
        localStorage.setItem(`formularioEnviado_${usuario.id}`, "true");

        const idsResponse = await fetch(
          `http://localhost:3001/users/content_artists/get_ids_by_user?user_id=${id}`
        );
        if (idsResponse.ok) {
          const ids = await idsResponse.json();
          console.log("IDs actualizados:", ids);
        } else {
          console.error("Error al obtener los IDs actualizados.");
        }

        console.log("Formulario enviado con éxito");
      } else {
        const errorData = await response.json();
        console.error("Error al enviar el formulario:", errorData);
      }
    } catch (error) {
      console.error("Error de red:", error);
    } finally {
      setLoading(false); // Establecer loading de nuevo a false después del envío
    }
  };

  if (loading) {
    return <SpinnerLoading />;
  }

  if (formularioEnviado) {
    return <PagePrincipalArtist contentUserData={usuario.content_user} />;
  }

  return (
    <>
      <HandleFormForArtist
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        formData={formData}
      />
    </>
  );
};

export default FormForArtist;
