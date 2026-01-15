import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import ErrorBoundary from "./components/ErrorBoundary";
import Home from "./pages/Home";
import WorkDetail from "./pages/WorkDetail";
import Contact from "./pages/Contact";
import About from "./pages/About";
import TemplatesPage from "./pages/TemplatesPage";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          {/* Works page - full immersive, no layout */}
          <Route path="/works" element={<WorkDetail />} />

          {/* Templates & Pricing - cinematic environment */}
          <Route path="/templates" element={<TemplatesPage />} />

          {/* About page - cinematic environment */}
          <Route path="/about" element={<About />} />

          {/* Pages with standard layout */}
          <Route
            path="/"
            element={
              <Layout>
                <Home />
              </Layout>
            }
          />
          <Route
            path="/contact"
            element={
              <Layout>
                <Contact />
              </Layout>
            }
          />

          {/* 404 - Not Found */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
