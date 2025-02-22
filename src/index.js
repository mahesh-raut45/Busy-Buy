import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

// Set Initial Theme Based on LocalStorage
const savedTheme = localStorage.getItem("theme") || "light";
document.documentElement.setAttribute("data-theme", savedTheme);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
