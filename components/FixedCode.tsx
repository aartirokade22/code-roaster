"use client";

import React, { useState } from "react";
import { LANGUAGES } from "@/config/app.config";
import SectionHeader from "./SectionHeader";

interface FixedCodeProps {
  sectionNumber: number;
  language: string;
  code: string;
  onApply: (code: string) => void;
}

export default function FixedCode({
  sectionNumber,
  language,
  code,
  onApply,
}: FixedCodeProps) {
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "failed">(
    "idle"
  );

  const langObj = LANGUAGES.find((l) => l.id === language);
  const extension = langObj?.extension || "txt";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopyStatus("copied");
    } catch {
      setCopyStatus("failed");
    }
    setTimeout(() => setCopyStatus("idle"), 2000);
  };

  const getCopyLabel = () => {
    if (copyStatus === "copied") return "✓ COPIED TO CLIPBOARD";
    if (copyStatus === "failed") return "✕ COPY BLOCKED, SELECT MANUALLY";
    return "📋 COPY FIXED CODE";
  };

  return (
    <div className="mb-4">
      <SectionHeader number={sectionNumber} title="Redemption Arc">
        <span className="font-mono text-xs font-bold text-[#4FA35A] bg-[#F0FDF4] px-2 py-0.5 rounded border border-[#4FA35A]">
          CORRECTED CODE
        </span>
      </SectionHeader>

      <div className="border-2 border-[#141414] rounded-xl overflow-hidden shadow-[3px_3px_0px_#141414] bg-[#171717]">
        {/* Code Header Bar */}
        <div className="flex items-center justify-between bg-[#242424] px-3 py-1.5 border-b border-[#333]">
          <span className="font-mono text-xs text-gray-300">
            solution.{extension}
          </span>
          <span className="font-mono text-[10px] font-bold text-[#4FA35A] tracking-wider uppercase">
            READY TO APPLY
          </span>
        </div>

        {/* Code Container */}
        <div className="p-3 overflow-x-auto max-h-[300px]">
          <pre className="font-mono text-xs text-[#F7F3EA] leading-relaxed whitespace-pre font-normal">
            <code>{code}</code>
          </pre>
        </div>

        {/* Action Button Strip */}
        <div className="flex flex-wrap items-center justify-end gap-2 bg-[#202020] p-2 border-t border-[#333]">
          <button
            type="button"
            onClick={handleCopy}
            className="font-mono text-xs font-bold px-3 py-1.5 bg-[#FFFFFF] text-[#141414] border-2 border-[#141414] rounded-full shadow-[2px_2px_0px_#141414] hover:bg-[#F0FDF4] hover:text-[#15803D] active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer"
          >
            {getCopyLabel()}
          </button>
          <button
            type="button"
            onClick={() => onApply(code)}
            className="font-mono text-xs font-bold px-3 py-1.5 bg-[#EDB13E] text-[#141414] border-2 border-[#141414] rounded-full shadow-[2px_2px_0px_#141414] hover:bg-[#F4B400] active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer"
          >
            APPLY TO EDITOR ↵
          </button>
        </div>
      </div>
    </div>
  );
}
