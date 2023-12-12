import React from "react";
import { useParams } from "react-router-dom";
import HomePage from "../User/homePage";

function ArtistView() {
  const { id } = useParams();

  return (
    <div>
      <HomePage />
    </div>
  );
}

export default ArtistView;
