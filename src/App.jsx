import React, { useEffect, useState } from "react";
import { Landing, Navbar } from "./components";
import { Route, Routes } from "react-router-dom";
import { Enroll, Login } from "./pages";

const App = () => {
  const [lightMode, setLightMode] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", !lightMode);
  }, [lightMode]);

  const toggleMode = () => {
    setLightMode((prevMode) => !prevMode);
  };

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signup" element={<Enroll />} />
        <Route path="/signin" element={<Login />} />
      </Routes>
    </div>
  );
};

export default App;
