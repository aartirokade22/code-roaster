import React from "react";
import { AI, APP } from "@/config/app.config";

interface StatusBarProps {
  isRoasting: boolean;
}

export default function StatusBar({ isRoasting }: StatusBarProps) {
  return (
    <footer className="w-full bg-[#F5F5F3] border-t-2 border-[#141414] px-4 py-2 flex flex-col gap-1 select-none">
      {/* Primary Status Row */}
      <div className="flex items-center justify-between font-mono text-[11px] text-gray-700">
        <div className="flex items-center gap-2">
          <span>STATUS:</span>
          {isRoasting ? (
            <span className="inline-flex items-center gap-1.5 text-[#9A3412] font-bold bg-[#FEFCE8] px-2 py-0.5 rounded border border-[#EDB13E]">
              <span className="w-2 h-2 rounded-full bg-[#EDB13E] animate-ping" />
              PROCESSING...
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 text-[#15803D] font-bold bg-[#F0FDF4] px-2 py-0.5 rounded border border-[#4FA35A]">
              <span className="w-2 h-2 rounded-full bg-[#4FA35A]" />
              ONLINE ({AI.modelLabel.toUpperCase()})
            </span>
          )}
          <span className="hidden sm:inline text-gray-400">
            | ENGINE: GOOGLE GEMINI
          </span>
        </div>

        <div className="font-bold tracking-widest text-[#141414]">
          {APP.name.toUpperCase()} {APP.version} // LIVE
        </div>
      </div>

      {/* Workshop Attribution Line */}
      <div className="text-center font-mono text-[10px] text-gray-500 pt-0.5 border-t border-gray-200">
        Made at GDG Nashik Pre-DevFest Workshop
      </div>
    </footer>
  );
}
