// src/components/ui/DeviceMockup.jsx
// Pure CSS device mockups for showcasing templates

import { useState } from "react";

/**
 * iPhone-style phone mockup
 */
export function PhoneMockup({
  src,
  alt = "Phone screen",
  className = "",
  style = {},
  children,
}) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      className={`relative ${className}`}
      style={{
        ...style,
        transformStyle: "preserve-3d",
      }}
    >
      {/* Phone Frame */}
      <div
        className="relative bg-[#1a1a1a] rounded-[2.5rem] p-[0.5rem] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5),0_0_0_1px_rgba(255,255,255,0.1)]"
        style={{
          background:
            "linear-gradient(145deg, #2a2a2a 0%, #1a1a1a 50%, #0a0a0a 100%)",
        }}
      >
        {/* Dynamic Island / Notch */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-[30%] h-[1.5rem] bg-black rounded-full z-20" />

        {/* Side Buttons - Left */}
        <div className="absolute top-[6rem] -left-[3px] w-[3px] h-[2rem] bg-[#2a2a2a] rounded-l" />
        <div className="absolute top-[9rem] -left-[3px] w-[3px] h-[3rem] bg-[#2a2a2a] rounded-l" />
        <div className="absolute top-[13rem] -left-[3px] w-[3px] h-[3rem] bg-[#2a2a2a] rounded-l" />

        {/* Side Button - Right */}
        <div className="absolute top-[10rem] -right-[3px] w-[3px] h-[4rem] bg-[#2a2a2a] rounded-r" />

        {/* Screen */}
        <div className="relative bg-black rounded-[2rem] overflow-hidden aspect-[9/19.5]">
          {src ? (
            <img
              src={src}
              alt={alt}
              className={`w-full h-full object-cover object-top transition-opacity duration-500 ${
                loaded ? "opacity-100" : "opacity-0"
              }`}
              onLoad={() => setLoaded(true)}
            />
          ) : (
            children
          )}

          {/* Screen Glare */}
          <div
            className="absolute inset-0 pointer-events-none opacity-20"
            style={{
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.3) 0%, transparent 50%)",
            }}
          />
        </div>

        {/* Home Indicator */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[35%] h-[4px] bg-white/30 rounded-full" />
      </div>
    </div>
  );
}

/**
 * iPad-style tablet mockup
 */
export function TabletMockup({
  src,
  alt = "Tablet screen",
  className = "",
  style = {},
  landscape = false,
  children,
}) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      className={`relative ${className}`}
      style={{
        ...style,
        transformStyle: "preserve-3d",
      }}
    >
      {/* Tablet Frame */}
      <div
        className="relative bg-[#1a1a1a] rounded-[1.5rem] p-[0.6rem] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5),0_0_0_1px_rgba(255,255,255,0.1)]"
        style={{
          background:
            "linear-gradient(145deg, #2a2a2a 0%, #1a1a1a 50%, #0a0a0a 100%)",
        }}
      >
        {/* Camera */}
        <div className="absolute top-[0.6rem] left-1/2 -translate-x-1/2 w-[8px] h-[8px] bg-[#0a0a0a] rounded-full border border-[#333]" />

        {/* Screen */}
        <div
          className={`relative bg-black rounded-[1rem] overflow-hidden ${
            landscape ? "aspect-[4/3]" : "aspect-[3/4]"
          }`}
        >
          {src ? (
            <img
              src={src}
              alt={alt}
              className={`w-full h-full object-cover object-top transition-opacity duration-500 ${
                loaded ? "opacity-100" : "opacity-0"
              }`}
              onLoad={() => setLoaded(true)}
            />
          ) : (
            children
          )}

          {/* Screen Glare */}
          <div
            className="absolute inset-0 pointer-events-none opacity-15"
            style={{
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.4) 0%, transparent 40%)",
            }}
          />
        </div>
      </div>
    </div>
  );
}

/**
 * MacBook-style laptop mockup
 */
export function LaptopMockup({
  src,
  alt = "Laptop screen",
  className = "",
  style = {},
  children,
}) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      className={`relative ${className}`}
      style={{
        ...style,
        transformStyle: "preserve-3d",
      }}
    >
      {/* Screen / Lid */}
      <div
        className="relative bg-[#1a1a1a] rounded-t-[0.75rem] p-[0.5rem] pb-[1rem] shadow-[0_-5px_30px_-5px_rgba(0,0,0,0.3)]"
        style={{
          background: "linear-gradient(180deg, #2a2a2a 0%, #1a1a1a 100%)",
        }}
      >
        {/* Camera */}
        <div className="absolute top-[0.35rem] left-1/2 -translate-x-1/2 w-[6px] h-[6px] bg-[#0a0a0a] rounded-full border border-[#333]" />

        {/* Screen */}
        <div className="relative bg-black rounded-[0.25rem] overflow-hidden aspect-[16/10]">
          {src ? (
            <img
              src={src}
              alt={alt}
              className={`w-full h-full object-cover object-top transition-opacity duration-500 ${
                loaded ? "opacity-100" : "opacity-0"
              }`}
              onLoad={() => setLoaded(true)}
            />
          ) : (
            children
          )}

          {/* Screen Glare */}
          <div
            className="absolute inset-0 pointer-events-none opacity-10"
            style={{
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.5) 0%, transparent 30%)",
            }}
          />
        </div>
      </div>

      {/* Keyboard Base / Bottom */}
      <div
        className="relative h-[0.75rem] bg-[#2a2a2a] rounded-b-[0.25rem] shadow-[0_10px_30px_-5px_rgba(0,0,0,0.4)]"
        style={{
          background: "linear-gradient(180deg, #3a3a3a 0%, #1a1a1a 100%)",
          clipPath: "polygon(2% 0%, 98% 0%, 100% 100%, 0% 100%)",
        }}
      >
        {/* Notch indent */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[15%] h-[3px] bg-[#1a1a1a] rounded-b-lg" />
      </div>
    </div>
  );
}

/**
 * Browser window mockup for web pages
 */
export function BrowserMockup({
  src,
  alt = "Browser screen",
  className = "",
  style = {},
  url = "genie.bug",
  children,
}) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      className={`relative ${className}`}
      style={{
        ...style,
        transformStyle: "preserve-3d",
      }}
    >
      {/* Browser Frame */}
      <div className="relative bg-[#1f1f1f] rounded-xl overflow-hidden shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)]">
        {/* Browser Chrome / Title Bar */}
        <div className="flex items-center gap-2 px-4 py-2.5 bg-[#2a2a2a] border-b border-white/5">
          {/* Traffic Lights */}
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
            <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
            <div className="w-3 h-3 rounded-full bg-[#28c940]" />
          </div>

          {/* URL Bar */}
          <div className="flex-1 flex justify-center">
            <div className="px-4 py-1 bg-[#1a1a1a] rounded-md text-[10px] text-white/40 font-mono">
              {url}
            </div>
          </div>

          {/* Spacer */}
          <div className="w-[52px]" />
        </div>

        {/* Content */}
        <div className="relative bg-black aspect-[16/10] overflow-hidden">
          {src ? (
            <img
              src={src}
              alt={alt}
              className={`w-full h-full object-cover object-top transition-opacity duration-500 ${
                loaded ? "opacity-100" : "opacity-0"
              }`}
              onLoad={() => setLoaded(true)}
            />
          ) : (
            children
          )}
        </div>
      </div>
    </div>
  );
}

export default { PhoneMockup, TabletMockup, LaptopMockup, BrowserMockup };
