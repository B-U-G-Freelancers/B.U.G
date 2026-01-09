// src/components/layout/Footer.jsx
export default function Footer() {
  return (
    <footer className="border-t border-border-subtle">
      <div className="max-w-7xl mx-auto px-6 py-6 text-text-muted text-sm">
        © {new Date().getFullYear()} BUG — Build Your Genie
      </div>
    </footer>
  );
}
