// src/pages/WorkDetail.jsx
// Works page using the new GenieWorld experience
import { useState, useEffect } from "react";
import GenieWorld from "../components/gallery/GenieWorld";
import { Header } from "../components/layout/Header";
import { PROJECTS } from "../data/projects";

export default function WorkDetail() {
  const [isLoading, setIsLoading] = useState(true);
  const [galleryState, setGalleryState] = useState("intro");

  // Preload project images with minimum display duration
  useEffect(() => {
    const imagePromises = PROJECTS.map((project) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = resolve;
        img.onerror = resolve;
        img.src = project.image;
      });
    });

    // Minimum display duration of 1.5s to show the loader
    const minDuration = new Promise((resolve) => setTimeout(resolve, 1500));

    // Wait for both images AND minimum duration
    Promise.all([Promise.all(imagePromises), minDuration]).then(() => {
      setIsLoading(false);
    });

    // Fallback timeout
    const timeout = setTimeout(() => setIsLoading(false), 5000);
    return () => clearTimeout(timeout);
  }, []);

  // Hide header when viewing project details (focused state)
  const showHeader = galleryState !== "focused";

  return (
    <>
      {showHeader && <Header isFixed />}
      <GenieWorld
        projects={PROJECTS}
        onStateChange={setGalleryState}
        isLoading={isLoading}
      />
    </>
  );
}
