import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthProvider } from "./context/AuthProvider";
import "leaflet/dist/leaflet.css";


import "bootstrap/dist/css/bootstrap.min.css";

/* 🔥 ORDER MATTERS */
import "./styles/base.css";
import "./styles/layout.css";
import "./styles/theme.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <App />
  </AuthProvider>
);
