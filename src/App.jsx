import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary";
import { ProjectProvider } from "./context/ProjectContext";
import ScrollToTop from "./components/ScrollToTop";

// Eager load: Home page (critical path)
import Home from "./pages/Home";
import Layout from "./components/layout/Layout";

// Lazy load: Non-critical pages for code splitting
const WorkDetail = React.lazy(() => import("./pages/WorkDetail"));
const ProjectPage = React.lazy(() => import("./pages/ProjectPage"));
const Contact = React.lazy(() => import("./pages/Contact"));
const About = React.lazy(() => import("./pages/About"));
const TemplatesPage = React.lazy(() => import("./pages/TemplatesPage"));
const NotFound = React.lazy(() => import("./pages/NotFound"));

// Loading fallback component
function PageLoader() {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center"
      style={{ backgroundColor: "#0b0d10" }}
    >
      <div className="flex flex-col items-center gap-4">
        {/* Animated loader */}
        <div className="relative w-12 h-12">
          <div className="absolute inset-0 rounded-full border-2 border-white/10" />
          <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-[#3a7cff] animate-spin" />
        </div>
        <span
          className="text-white/40 text-xs tracking-[0.3em] uppercase"
          style={{ fontFamily: "'Space Grotesk', monospace" }}
        >
          Loading...
        </span>
      </div>
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ProjectProvider>
        <BrowserRouter>
          <ScrollToTop />
          <Suspense fallback={<PageLoader />}>
            <Routes>
              {/* Works page - full immersive, no layout */}
              <Route
                path="/home"
                element={
                  <Layout>
                    <Home />
                  </Layout>
                }
              />
              <Route path="/works" element={<WorkDetail />} />
              <Route path="/works/:projectId" element={<ProjectPage />} />

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
          </Suspense>
        </BrowserRouter>
      </ProjectProvider>
    </ErrorBoundary>
  );
}

export default App;
