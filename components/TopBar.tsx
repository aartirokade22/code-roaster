import React from "react";
import Image from "next/image";
import { APP } from "@/config/app.config";

interface TopBarProps {
  children: React.ReactNode;
}

export default function TopBar({ children }: TopBarProps) {
  return (
    <header className="w-full bg-[#F8F4EC] border-b-2 border-[#141414] p-4 sm:p-5 flex flex-col gap-4">
      {/* Top Navbar Row */}
      <div className="flex items-center justify-between gap-2 flex-wrap sm:flex-nowrap">
        {/* Left: GDG Nashik Logo Badge */}
        <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-full border-2 border-[#141414] shadow-[3px_3px_0px_#141414]">
          <div className="w-6 h-6 relative flex items-center justify-center">
            {/* Google Colors Code Brackets */}
            <span className="font-mono text-sm font-extrabold text-[#4C80F0]">&lt;</span>
            <span className="font-mono text-sm font-extrabold text-[#EA4335]">&gt;</span>
          </div>
          <span className="font-mono text-xs font-bold text-[#141414] tracking-tight">
            GDG NASHIK
          </span>
        </div>

        {/* Center: Floating Pill Brand Badge */}
        <div className="bg-white border-2 border-[#141414] px-4 py-1.5 rounded-full shadow-[3px_3px_0px_#141414] flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#EDB13E] animate-pulse" />
          <span className="font-mono text-xs font-black text-[#141414] uppercase tracking-wider">
            {APP.name.toUpperCase()} {APP.version}
          </span>
        </div>

        {/* Right: DevFest Nashik 2026 Badge */}
        <div className="flex items-center gap-1.5 bg-[#EDB13E] text-[#141414] px-3 py-1.5 rounded-full border-2 border-[#141414] shadow-[3px_3px_0px_#141414]">
          <span className="text-xs">⚡</span>
          <span className="font-mono text-xs font-extrabold tracking-tight">
            DEVFEST NASHIK '26
          </span>
        </div>
      </div>

      {/* Hero Header Text */}
      <div className="text-center my-1 sm:my-2">
        <div className="inline-block bg-[#EFF2FB] text-[#141414] font-mono text-[11px] font-bold px-3 py-1 rounded-full border-2 border-[#141414] shadow-[2px_2px_0px_#141414] mb-2">
          CODE BOL RAHA HAI · मला वाचवा! 📢
        </div>
        <h1 className="font-space-grotesk text-2xl sm:text-3xl lg:text-4xl font-black text-[#141414] tracking-tight">
          Code Roaster{" "}
          <span className="text-xs sm:text-sm font-mono font-bold bg-[#EDB13E] px-2 py-0.5 rounded border border-[#141414] align-middle shadow-[1px_1px_0px_#141414]">
            (Desi Edition)
          </span>
        </h1>
        <p className="font-sans text-xs sm:text-sm text-gray-700 max-w-xl mx-auto mt-1 leading-snug">
          Paste your code. Pick your roast. Get humbled. Get the fix. Desi debugging, powered by Gemini.
        </p>
      </div>

      {/* Embedded Controls */}
      <div className="w-full pt-1">{children}</div>
    </header>
  );
}
