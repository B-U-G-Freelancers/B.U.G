// src/components/layout/Navbar.jsx
export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-bg-primary/80 backdrop-blur border-b border-border-subtle">
      <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="text-lg font-display tracking-wide">
          B.U.G
        </div>

        <div className="hidden md:flex gap-8 text-text-secondary">
          <a href="#about" className="hover:text-accent transition">About</a>
          <a href="#services" className="hover:text-accent transition">Services</a>
          <a href="#works" className="hover:text-accent transition">Work</a>
          <a href="#contact" className="hover:text-accent transition">Contact</a>
        </div>
      </nav>
    </header>
  );
}
