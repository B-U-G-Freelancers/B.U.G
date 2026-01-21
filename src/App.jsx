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

// Import BugIntro for premium loading experience
import BugIntro from "./components/ui/BugIntro";

function App() {
  return (
    <ErrorBoundary>
      <ProjectProvider>
        <BrowserRouter>
          <ScrollToTop />
          <Suspense fallback={<BugIntro />}>
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
