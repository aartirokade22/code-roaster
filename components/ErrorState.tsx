import React from "react";

interface ErrorStateProps {
  error: string | null;
  onRetry: () => void;
}

export default function ErrorState({ error, onRetry }: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center flex-1 p-8 text-center min-h-[350px]">
      <div className="w-16 h-16 border-3 border-[#D9503F] rounded-2xl flex items-center justify-center bg-[#FDF2F2] mb-4 shadow-[4px_4px_0px_#141414]">
        <span className="font-mono text-2xl font-black text-[#D9503F]">!</span>
      </div>
      <h3 className="font-mono text-base font-bold text-[#D9503F] uppercase tracking-wide mb-2">
        Analysis Failed
      </h3>
      <p className="font-sans text-xs text-gray-700 max-w-sm mb-4 leading-relaxed bg-white p-3 rounded-lg border border-[#D9503F]">
        {error || "An unknown error occurred during code evaluation."}
      </p>
      <button
        type="button"
        onClick={onRetry}
        className="font-mono text-xs font-bold px-4 py-2 bg-[#EDB13E] text-[#141414] border-2 border-[#141414] rounded-full shadow-[3px_3px_0px_#141414] hover:bg-[#F4B400] active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer"
      >
        RETRY ANALYSIS ↵
      </button>
    </div>
  );
}
