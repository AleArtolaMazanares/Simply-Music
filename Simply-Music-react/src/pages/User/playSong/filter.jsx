import React, { useEffect } from "react";

function filter() {
  const prueba = async () => {
    const url = `http://localhost:3001/users/songs`;
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
  };



  return <div>filter</div>;
}

export default filter;
