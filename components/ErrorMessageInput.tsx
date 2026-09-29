import React from "react";
import { LIMITS } from "@/config/app.config";

interface ErrorMessageInputProps {
  value: string;
  onChange: (value: string) => void;
  onClose: () => void;
}

export default function ErrorMessageInput({
  value,
  onChange,
  onClose,
}: ErrorMessageInputProps) {
  return (
    <div className="w-full bg-[#EFF2FB] border-b-2 border-[#141414] p-3 animate-fadeIn">
      <div className="flex items-center justify-between mb-1.5">
        <label
          htmlFor="error-traceback"
          className="font-mono text-xs font-bold text-[#141414] uppercase tracking-wider flex items-center gap-1.5"
        >
          <span className="w-2 h-2 rounded-full bg-[#D9503F]" />
          Attach Terminal Traceback / Compiler Error (Optional)
        </label>
        <button
          type="button"
          onClick={onClose}
          className="font-mono text-xs font-bold text-gray-600 hover:text-[#141414] px-2 py-0.5 rounded border border-gray-400 hover:border-[#141414] transition-colors cursor-pointer"
        >
          Dismiss ✕
        </button>
      </div>

      <textarea
        id="error-traceback"
        rows={2}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        maxLength={LIMITS.maxErrorMessageLength}
        placeholder="Paste TypeError, NullPointerException, or build error output here... e.g. TypeError: unsupported operand type(s) for +=: 'int' and 'list'"
        className="w-full font-mono text-xs p-2 bg-white text-[#141414] border-2 border-[#141414] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4C80F0] placeholder-gray-400"
      />
      <div className="flex justify-end text-[10px] font-mono text-gray-500 mt-1">
        {value.length.toLocaleString()} / {LIMITS.maxErrorMessageLength.toLocaleString()} chars
      </div>
    </div>
  );
}
