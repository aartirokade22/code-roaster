import React from "react";
import { LANGUAGES, ROAST_LEVELS } from "@/config/app.config";
import { LanguageId, RoastLevel } from "@/types/roast";

interface RoastControlsProps {
  roastLevel: RoastLevel;
  onRoastLevelChange: (level: RoastLevel) => void;
  language: LanguageId;
  onLanguageChange: (lang: LanguageId) => void;
  onRoast: () => void;
  isRoasting: boolean;
  errorDrawerOpen: boolean;
  onToggleErrorDrawer: () => void;
}

export default function RoastControls({
  roastLevel,
  onRoastLevelChange,
  language,
  onLanguageChange,
  onRoast,
  isRoasting,
  errorDrawerOpen,
  onToggleErrorDrawer,
}: RoastControlsProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 w-full">
      {/* Left controls: Roast Level & Language */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Roast Level Segmented Pills */}
        <div className="flex items-center bg-[#F8F4EC] p-1 border-2 border-[#141414] rounded-full shadow-[2px_2px_0px_#141414]">
          <span className="font-mono text-[10px] font-bold text-gray-500 uppercase px-2 hidden sm:inline">
            LEVEL:
          </span>
          {ROAST_LEVELS.map((level) => {
            const isSelected = roastLevel === level.id;
            return (
              <button
                key={level.id}
                type="button"
                onClick={() => onRoastLevelChange(level.id as RoastLevel)}
                title={level.description}
                className={`font-mono text-xs font-bold px-3 py-1 rounded-full transition-all cursor-pointer ${
                  isSelected
                    ? "bg-[#EDB13E] text-[#141414] border border-[#141414] shadow-[1px_1px_0px_#141414]"
                    : "text-gray-700 hover:text-[#141414] hover:bg-white"
                }`}
              >
                {level.label}
              </button>
            );
          })}
        </div>

        {/* Language Selector */}
        <div className="relative flex items-center">
          <select
            value={language}
            onChange={(e) => onLanguageChange(e.target.value as LanguageId)}
            className="appearance-none font-mono text-xs font-bold bg-white text-[#141414] border-2 border-[#141414] rounded-full px-3 py-1.5 pr-8 shadow-[2px_2px_0px_#141414] focus:outline-none focus:ring-2 focus:ring-[#4C80F0] cursor-pointer"
          >
            {LANGUAGES.map((lang) => (
              <option key={lang.id} value={lang.id}>
                {lang.label} (.{lang.extension})
              </option>
            ))}
          </select>
          <span className="pointer-events-none absolute right-3 font-mono text-xs text-[#141414]">
            ▾
          </span>
        </div>

        {/* Error Drawer Toggle Button */}
        <button
          type="button"
          onClick={onToggleErrorDrawer}
          className={`font-mono text-xs font-bold px-3 py-1.5 border-2 border-dashed border-[#141414] rounded-full transition-all cursor-pointer ${
            errorDrawerOpen
              ? "bg-[#141414] text-white shadow-[2px_2px_0px_#EDB13E]"
              : "bg-white text-[#141414] hover:bg-gray-50 shadow-[2px_2px_0px_#141414]"
          }`}
        >
          {errorDrawerOpen ? "− ERROR MESSAGE" : "+ ERROR MESSAGE"}
        </button>
      </div>

      {/* Right control: Primary Roast CTA */}
      <button
        type="button"
        disabled={isRoasting}
        onClick={onRoast}
        className={`font-mono text-xs font-extrabold px-5 py-2 rounded-full border-2 border-[#141414] transition-all flex items-center gap-2 cursor-pointer ${
          isRoasting
            ? "bg-[#141414] text-[#EDB13E] opacity-90 cursor-not-allowed animate-pulse"
            : "bg-[#EDB13E] text-[#141414] shadow-[4px_4px_0px_#141414] hover:bg-[#F4B400] active:translate-x-0.5 active:translate-y-0.5"
        }`}
      >
        {isRoasting ? (
          <>
            <span className="w-2.5 h-2.5 rounded-full bg-[#EDB13E] animate-ping" />
            ANALYZING...
          </>
        ) : (
          <>
            <span>Roast Me / भाजून काढ 🔥 →</span>
            <span className="hidden sm:inline-block font-mono text-[10px] font-bold bg-[#141414] text-white px-1.5 py-0.5 rounded border border-white">
              Ctrl ⏎
            </span>
          </>
        )}
      </button>
    </div>
  );
}
