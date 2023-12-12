import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

function ReproductorMusic() {
  const { id } = useParams();
  console.log(id)

  const prueba = async () => {
    const url = `http://localhost:3001/users/albums/${id}`;
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
  };
  useEffect(() => {
    prueba();
  }, [id]);
  return <div>ReproductorMusic</div>;
}

export default ReproductorMusic;
