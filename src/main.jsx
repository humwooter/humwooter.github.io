// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )


import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LogsPage from "./pages/Logs/LogsPage";
import OstinutoPage from "./pages/OstinutoPage";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Canonical home is /logs/ */}
        <Route path="/logs" element={<LogsPage />} />
        <Route path="/logs/" element={<LogsPage />} />
        {/* Ostinuto routes */}
        <Route path="/ostinuto" element={<OstinutoPage />} />
        <Route path="/ostinuto/" element={<OstinutoPage />} />
        {/* Redirect root to canonical /logs/ */}
        {/* privacy.html and contact.html are served as static files */}
        <Route path="/" element={<Navigate to="/logs/" replace />} />
        <Route path="*" element={<Navigate to="/logs/" replace />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);