import { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import { Route, Routes } from "react-router";
import DashBoard from "./pages/DashBoard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<DashBoard />} />
    </Routes>
  );
}

export default App;
