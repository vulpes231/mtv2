import React, { useEffect, useState } from "react";
import { Landing, Navbar } from "./components";
import { Route, Routes } from "react-router-dom";
import { Dashboard, Detail, Enroll, Transfer } from "./pages";

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
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signup" element={<Enroll />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/account" element={<Detail />} />
        <Route path="/transfer" element={<Transfer />} />
      </Routes>
    </div>
  );
};

export default App;
