import { useContext } from "react";
import Footer from "./Footer";
import BugIntro from "../ui/BugIntro";
import { Header } from "./Header";
import GlobalBackground from "./GlobalBackground";
import ProjectContext from "../../context/ProjectContext";

const INTRO_SHOWN_KEY = "bug_intro_shown";

export default function Layout({ children }) {
  const { introComplete, setIntroComplete } = useContext(ProjectContext);

  const handleIntroComplete = () => {
    setIntroComplete(true);
  };

  return (
    <div className="relative min-h-screen bg-transparent text-white overflow-x-hidden selection:bg-cyan-500 selection:text-black">
      <GlobalBackground />

      {/* 🧠 INTRO BOOT SEQUENCE (TOPMOST) */}
      {!introComplete && (
        <div className="fixed inset-0 z-[9999]">
          <BugIntro onComplete={handleIntroComplete} />
        </div>
      )}

      {/* Header / Menu - fixed position */}
      <div
        className={`fixed top-0 left-0 w-full z-[100] transition-opacity duration-500 ${
          introComplete ? "opacity-100" : "opacity-0"
        }`}
      >
        <Header isFixed />
      </div>

      <main className="flex-1">{children}</main>

      <Footer />
    </div>
  );
}
