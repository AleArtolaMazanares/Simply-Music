import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { SimplyProvider } from "../src/components/simplyContext/simplyProvider"

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <SimplyProvider>
        <App />
      </SimplyProvider>
    </BrowserRouter>
  </React.StrictMode>
);
