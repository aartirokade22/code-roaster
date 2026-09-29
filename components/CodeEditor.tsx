"use client";

import React, { useRef, useState } from "react";
import { LANGUAGES, LIMITS } from "@/config/app.config";

interface CodeEditorProps {
  code: string;
  onChange: (code: string) => void;
  language: string;
  errorLine?: number;
  onLoadSample: () => void;
}

export default function CodeEditor({
  code,
  onChange,
  language,
  errorLine,
  onLoadSample,
}: CodeEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const gutterRef = useRef<HTMLDivElement>(null);

  const [cursorPos, setCursorPos] = useState({ line: 1, col: 1 });

  const lines = code.split("\n");
  const lineCount = Math.max(lines.length, 12);
  const lineNumbers = Array.from({ length: lineCount }, (_, i) => i + 1);

  const langObj = LANGUAGES.find((l) => l.id === language);
  const languageLabel = langObj ? langObj.label : language;

  // Handle Tab key insertion (4 spaces)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const target = e.currentTarget;
      const start = target.selectionStart;
      const end = target.selectionEnd;

      const indent = "    ";
      const newCode = code.substring(0, start) + indent + code.substring(end);
      onChange(newCode);

      // Set cursor position after tab insertion
      setTimeout(() => {
        target.selectionStart = target.selectionEnd = start + indent.length;
        updateCursorPosition(target);
      }, 0);
    }
  };

  // Sync scroll between textarea and gutter
  const handleScroll = (e: React.UIEvent<HTMLTextAreaElement>) => {
    if (gutterRef.current) {
      gutterRef.current.scrollTop = e.currentTarget.scrollTop;
    }
  };

  // Track line and column cursor position
  const updateCursorPosition = (target: HTMLTextAreaElement) => {
    const selStart = target.selectionStart;
    const textBefore = code.substring(0, selStart);
    const linesBefore = textBefore.split("\n");
    const currentLine = linesBefore.length;
    const currentCol = linesBefore[linesBefore.length - 1].length + 1;
    setCursorPos({ line: currentLine, col: currentCol });
  };

  const handleSelect = (e: React.SyntheticEvent<HTMLTextAreaElement>) => {
    updateCursorPosition(e.currentTarget);
  };

  const handleClear = () => {
    onChange("");
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  return (
    <div className="flex flex-col h-full w-full bg-[#171717] border-2 border-[#141414] rounded-2xl overflow-hidden shadow-[4px_4px_0px_#141414]">
      {/* Chrome Toolbar Header */}
      <div className="flex items-center justify-between bg-[#242424] px-3 py-2 border-b-2 border-[#141414] select-none">
        <div className="flex items-center gap-2">
          {/* macOS / retro window dots */}
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#D9503F] border border-[#141414]" />
            <span className="w-3 h-3 rounded-full bg-[#F4B400] border border-[#141414]" />
            <span className="w-3 h-3 rounded-full bg-[#4FA35A] border border-[#141414]" />
          </div>
          <span className="font-mono text-xs font-bold text-gray-400 uppercase tracking-widest ml-2 hidden sm:inline">
            INPUT // SRC
          </span>
        </div>

        <div className="font-mono text-xs font-bold text-white tracking-wider">
          YOUR CODE
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onLoadSample}
            className="font-mono text-xs font-bold text-[#EDB13E] hover:underline cursor-pointer"
          >
            SAMPLE BUG
          </button>
          <span className="text-gray-600">|</span>
          <button
            type="button"
            onClick={handleClear}
            className="font-mono text-xs font-bold text-gray-400 hover:text-white cursor-pointer"
          >
            CLEAR
          </button>
        </div>
      </div>

      {/* Main Code Editing Canvas Area */}
      <div className="relative flex flex-1 overflow-hidden min-h-[320px]">
        {/* Line Numbers Gutter */}
        <div
          ref={gutterRef}
          className="w-12 bg-[#1C1C1C] border-r border-[#333] text-gray-500 font-mono text-xs text-right select-none py-3 pr-2 overflow-hidden"
        >
          {lineNumbers.map((num) => {
            const isError = errorLine === num;
            return (
              <div
                key={num}
                className={`h-5 leading-5 ${
                  isError
                    ? "text-[#D9503F] font-bold bg-[#D9503F]/20 rounded px-1"
                    : ""
                }`}
              >
                {String(num).padStart(2, "0")}
              </div>
            );
          })}
        </div>

        {/* Code Textarea */}
        <textarea
          ref={textareaRef}
          value={code}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          onScroll={handleScroll}
          onSelect={handleSelect}
          onClick={(e) => updateCursorPosition(e.currentTarget)}
          maxLength={LIMITS.maxCodeLength}
          spellCheck={false}
          autoCapitalize="off"
          autoComplete="off"
          autoCorrect="off"
          placeholder="// Paste your code snippet here to be roasted..."
          className="flex-1 bg-[#171717] text-[#F7F3EA] font-mono text-xs p-3 leading-5 resize-none focus:outline-none overflow-y-auto whitespace-pre font-normal"
          style={{ tabSize: 4 }}
        />
      </div>

      {/* Editor Status Footer Bar */}
      <div className="flex items-center justify-between bg-[#202020] px-3 py-1.5 border-t border-[#333] font-mono text-[11px] text-gray-400 select-none">
        <div>
          Ln {cursorPos.line}, Col {cursorPos.col} ·{" "}
          <span className="text-[#EDB13E] font-bold">{languageLabel}</span>
        </div>
        <div className="flex items-center gap-3">
          <span>UTF-8 · Tab Size: 4</span>
          <span className="hidden sm:inline text-gray-500">
            {code.length.toLocaleString()} / {LIMITS.maxCodeLength.toLocaleString()} chars
          </span>
        </div>
      </div>
    </div>
  );
}
