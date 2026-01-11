import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BugIntro from "./components/BugIntro";
import Home from "./pages/Home";
import WorkDetail from "./pages/WorkDetail";
import Contact from "./pages/Contact";

function App() {
  return (
    <BrowserRouter>
      <BugIntro />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/works" element={<WorkDetail />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
