// src/components/ErrorBoundary.jsx
// Global error boundary for catching React errors
import { Component } from "react";
import { Link } from "react-router-dom";
import { AlertTriangle, Home, RefreshCw } from "lucide-react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-black text-white flex items-center justify-center p-6">
          {/* Background effects */}
          <div className="fixed inset-0 pointer-events-none">
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.9) 100%)",
              }}
            />
            <div
              className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
              }}
            />
          </div>

          <div className="relative z-10 text-center max-w-md">
            {/* Error icon */}
            <div className="mb-8 flex justify-center">
              <div className="w-20 h-20 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center">
                <AlertTriangle className="w-10 h-10 text-red-400" />
              </div>
            </div>

            {/* System label */}
            <div
              className="text-[10px] tracking-[0.3em] uppercase text-red-400/60 mb-4"
              style={{ fontFamily: "'Space Grotesk', monospace" }}
            >
              SYS.ERROR
            </div>

            {/* Title */}
            <h1
              className="text-3xl font-semibold mb-4"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Something went wrong
            </h1>

            {/* Description */}
            <p
              className="text-white/50 mb-8"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              An unexpected error occurred. Please try refreshing the page or
              return to the homepage.
            </p>

            {/* Actions */}
            <div className="flex gap-4 justify-center">
              <button
                onClick={this.handleReload}
                className="flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 hover:bg-white/10 text-white/70 text-xs tracking-widest uppercase transition-all border border-white/10"
                style={{ fontFamily: "'Space Grotesk', monospace" }}
              >
                <RefreshCw className="w-4 h-4" />
                RELOAD
              </button>
              <Link
                to="/"
                className="flex items-center gap-2 px-6 py-3 rounded-full bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 text-xs tracking-widest uppercase transition-all border border-blue-500/30"
                style={{ fontFamily: "'Space Grotesk', monospace" }}
              >
                <Home className="w-4 h-4" />
                HOME
              </Link>
            </div>

            {/* Error details (dev only) */}
            {import.meta.env.DEV && this.state.error && (
              <div className="mt-8 p-4 bg-red-500/5 border border-red-500/20 rounded text-left">
                <div
                  className="text-[10px] tracking-widest uppercase text-red-400/60 mb-2"
                  style={{ fontFamily: "'Space Grotesk', monospace" }}
                >
                  ERROR.DETAILS
                </div>
                <pre className="text-xs text-red-400/80 font-mono overflow-auto">
                  {this.state.error.toString()}
                </pre>
              </div>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
