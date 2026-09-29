import React from "react";

export default function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center flex-1 p-8 text-center min-h-[350px]">
      <div className="w-16 h-16 border-2 border-dashed border-[#141414] rounded-2xl flex items-center justify-center bg-white mb-4 shadow-[3px_3px_0px_#141414]">
        <span className="font-mono text-2xl font-bold text-gray-400">{"{}"}</span>
      </div>
      <h3 className="font-mono text-base font-bold text-[#141414] uppercase tracking-wide mb-2">
        Awaiting Code Submission
      </h3>
      <p className="font-sans text-xs text-gray-600 max-w-xs leading-relaxed">
        Paste your code on the left, then click{" "}
        <strong className="font-semibold text-[#141414]">"ROAST MY CODE"</strong>{" "}
        or press <kbd className="font-mono bg-gray-200 px-1 py-0.5 rounded border border-[#141414]">Ctrl+Enter</kbd> (⌘+Enter on Mac).
      </p>
    </div>
  );
}
