import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css"
import App from "./App.jsx";

import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
    <Toaster position="top-right" toastOptions={{
      style: {
        background: "#1f1f1f",
        color: "#fff",
        borderRadius: "8px",
        border: "1px solid #444",
      },
      success: { iconTheme: { primary: "#a855f7", secondary: "#fff" } },
      error: { iconTheme: { primary: "#ef4444", secondary: "#fff" } },
    }} />
  </React.StrictMode>
);
