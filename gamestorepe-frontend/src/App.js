import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Store from "./StorePage/Store";
import Login from "./LoginPage/Login";
import Register from "./RegisterPage/Register"; // Importa la nueva página de registro

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-customBackground">
        <Routes>
          <Route path="/store" element={<Store />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
