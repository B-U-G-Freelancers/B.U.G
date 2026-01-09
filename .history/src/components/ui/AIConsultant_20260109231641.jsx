// src/components/ui/AIConsultant.jsx
import { useState, useRef, useEffect } from "react";
import { GoogleGenAI } from "@google/genai";

export default function AIConsultant() {
  const [isOpen, setIsOpen] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [response]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setIsLoading(true);
    setResponse("Refining your engineering strategy...");

    try {
      const ai = new GoogleGenAI({
        apiKey: import.meta.env.VITE_GEMINI_API_KEY,
      });
      const model = "gemini-2.0-flash";

      const result = await ai.models.generateContent({
        model,
        contents: `You are the lead engineering consultant at BUG Agency. A potential client is asking about: "${prompt}". 
        Provide a concise, high-level engineering and design strategy (max 150 words). 
        Maintain a professional, premium, and engineering-first tone. Mention why BUG's "clarity over complexity" approach is right for this.`,
        config: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
        },
      });

      setResponse(
        result.text || "Sorry, I couldn't process that. Please try again."
      );
    } catch (error) {
      console.error("AI Error:", error);
      setResponse(
        "Our AI advisor is currently offline. Please use the contact form or try again later."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-50">
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex size-14 items-center justify-center rounded-full shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 ${
          isOpen
            ? "bg-text-primary text-bg-primary rotate-90"
            : "bg-accent text-text-primary"
        }`}
      >
        <span className="material-symbols-outlined text-2xl font-bold">
          {isOpen ? "close" : "bolt"}
        </span>
      </button>

      {/* Floating Panel */}
      {isOpen && (
        <div className="absolute bottom-20 right-0 w-[90vw] max-w-[400px] overflow-hidden rounded-2xl bg-bg-secondary border border-border-subtle shadow-[0_40px_100px_rgba(0,0,0,0.8)] backdrop-blur-xl animate-in slide-in-from-bottom-5 duration-300">
          <div className="bg-text-primary/5 p-6 border-b border-border-subtle">
            <h3 className="text-lg font-bold text-text-primary flex items-center gap-2">
              <span className="material-symbols-outlined text-accent text-xl">
                auto_awesome
              </span>
              Project Advisor
            </h3>
            <p className="text-xs text-text-secondary mt-1">
              Refine your project requirements with BUG AI.
            </p>
          </div>

          <div
            ref={scrollRef}
            className="p-6 max-h-[350px] overflow-y-auto space-y-4"
          >
            {!response && !isLoading ? (
              <div className="text-center py-10 space-y-4">
                <span className="material-symbols-outlined text-5xl text-text-primary/10">
                  lightbulb
                </span>
                <p className="text-sm text-text-secondary">
                  Tell me about your product idea or complex engineering
                  challenge.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="bg-text-primary/5 rounded-xl p-4 text-sm text-text-secondary border border-border-subtle">
                  <span className="text-text-primary font-bold block mb-1">
                    Your query:
                  </span>
                  {prompt}
                </div>
                <div className="bg-accent/10 rounded-xl p-4 text-sm text-text-primary border border-accent/20 leading-relaxed">
                  <span className="text-accent font-bold block mb-1">
                    BUG Strategy:
                  </span>
                  {response}
                </div>
              </div>
            )}
            {isLoading && (
              <div className="flex items-center gap-2 text-accent animate-pulse py-2">
                <span className="material-symbols-outlined animate-spin text-sm">
                  refresh
                </span>
                <span className="text-xs font-bold uppercase tracking-widest">
                  Processing
                </span>
              </div>
            )}
          </div>

          <div className="p-6 bg-bg-primary/50 border-t border-border-subtle">
            <form onSubmit={handleSubmit} className="relative">
              <input
                autoFocus
                type="text"
                placeholder="Describe your challenge..."
                className="w-full bg-text-primary/5 border border-border-subtle rounded-lg py-3 pl-4 pr-12 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent transition-colors"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !prompt.trim()}
                className="absolute right-2 top-1.5 size-8 rounded-md bg-text-primary text-bg-primary flex items-center justify-center disabled:opacity-30 disabled:grayscale transition-all hover:bg-text-secondary"
              >
                <span className="material-symbols-outlined text-lg">
                  arrow_upward
                </span>
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
