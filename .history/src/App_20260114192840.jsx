import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import WorkDetail from "./pages/WorkDetail";
import Contact from "./pages/Contact";
import BugCursor from "./components/ui/BugCursor";

function App() {
  return (
    <BrowserRouter>
      {/* Custom bug cursor - global */}
      <BugCursor />

      <Routes>
        {/* Works page - full immersive, no layout */}
        <Route path="/works" element={<WorkDetail />} />

        {/* Other pages with standard layout */}
        <Route
          path="*"
          element={
            <Layout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/contact" element={<Contact />} />
              </Routes>
            </Layout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
