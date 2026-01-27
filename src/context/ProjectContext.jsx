// src/context/ProjectContext.jsx
import { createContext, useContext, useMemo, useState } from "react";
import { PROJECTS } from "../data/projects";

// Create the context
const ProjectContext = createContext(null);

/**
 * ProjectProvider - Wraps the app to provide project data throughout
 */
export function ProjectProvider({ children }) {
  const [introComplete, setIntroComplete] = useState(false);

  // Memoize the context value to prevent unnecessary re-renders
  const value = useMemo(
    () => ({
      projects: PROJECTS,
      introComplete,
      setIntroComplete,
      getProjectById: (id) => PROJECTS.find((p) => p.id === id),
      getProjectsByCategory: (category) =>
        PROJECTS.filter((p) => p.category === category),
    }),
    [introComplete],
  );

  return (
    <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>
  );
}

/**
 * useProjects - Hook to access all projects
 * @returns {Array} Array of all projects
 */
export function useProjects() {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error("useProjects must be used within a ProjectProvider");
  }
  return context.projects;
}

/**
 * useProject - Hook to access a single project by ID
 * @param {string} id - Project ID
 * @returns {Object|undefined} Project object or undefined if not found
 */
export function useProject(id) {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error("useProject must be used within a ProjectProvider");
  }
  return context.getProjectById(id);
}

/**
 * useProjectsByCategory - Hook to filter projects by category
 * @param {string} category - Category to filter by
 * @returns {Array} Filtered array of projects
 */
export function useProjectsByCategory(category) {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error(
      "useProjectsByCategory must be used within a ProjectProvider",
    );
  }
  return context.getProjectsByCategory(category);
}

export default ProjectContext;
