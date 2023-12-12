import React from "react";
import "../SpinerLoading/style.css";

function SpinnerLoading() {
  return (
    <div className="loader">
      <div className="loader-text">Loading...</div>
      <div className="loader-bar"></div>
    </div>
  );
}

export default SpinnerLoading;
