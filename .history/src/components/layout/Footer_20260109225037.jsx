
import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-white/10 bg-background-dark py-16">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-10 px-6 lg:flex-row lg:px-8">
        <div className="flex flex-col items-center lg:items-start gap-4">
          <div className="flex items-center gap-3">
            <div className="flex size-7 items-center justify-center rounded bg-white text-black">
              <span className="material-symbols-outlined text-[16px] font-bold">bug_report</span>
            </div>
            <span className="text-sm font-bold text-white uppercase tracking-widest">BUG Agency © 2024</span>
          </div>
          <p className="text-xs text-text-secondary text-center lg:text-left">
            Built for those who value engineering precision. <br />
            San Francisco • London • Remote
          </p>
        </div>
        
        <div className="flex gap-12">
          {['Twitter', 'LinkedIn', 'Instagram', 'Dribbble'].map((social) => (
            <a 
              key={social} 
              href="#" 
              className="text-sm font-medium text-text-secondary hover:text-white transition-colors duration-200"
            >
              {social}
            </a>
          ))}
        </div>
      </div>
      
      <div className="mt-16 text-center">
        <span className="text-[10rem] font-black text-white/[0.02] select-none pointer-events-none leading-none">
          BUG 
        </span>
      </div>
    </footer>
  );
};
