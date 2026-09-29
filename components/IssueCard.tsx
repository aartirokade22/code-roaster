import React from "react";
import { RoastIssue, Severity } from "@/types/roast";

interface IssueCardProps {
  index: number;
  issue: RoastIssue;
}

const severityStyleMap: Record<
  Severity,
  { bg: string; border: string; text: string; badgeBg: string }
> = {
  "FATAL BUG": {
    bg: "bg-[#FDF2F2]",
    border: "border-[#D9503F]",
    text: "text-[#D9503F]",
    badgeBg: "bg-[#D9503F] text-white",
  },
  "CODE SMELL": {
    bg: "bg-[#FEFCE8]",
    border: "border-[#EDB13E]",
    text: "text-[#9A3412]",
    badgeBg: "bg-[#EDB13E] text-[#141414]",
  },
  OPTIMIZATION: {
    bg: "bg-[#F0FDF4]",
    border: "border-[#4FA35A]",
    text: "text-[#15803D]",
    badgeBg: "bg-[#4FA35A] text-white",
  },
};

export default function IssueCard({ index, issue }: IssueCardProps) {
  const style = severityStyleMap[issue.severity] || severityStyleMap["CODE SMELL"];
  const formattedIndex = String(index).padStart(2, "0");

  return (
    <div className="bg-white border-2 border-[#141414] rounded-xl p-3 shadow-[3px_3px_0px_#141414] mb-3 transition-transform hover:-translate-y-0.5">
      {/* Top Header Row */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-200 pb-2 mb-2">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs font-bold bg-[#141414] text-white px-2 py-0.5 rounded">
            #{formattedIndex}
          </span>
          <span className="font-mono text-xs font-bold bg-gray-100 text-[#141414] px-2 py-0.5 rounded border border-[#141414]">
            LINE {issue.line}
          </span>
          <span
            className={`font-mono text-[10px] font-bold tracking-wider px-2 py-0.5 rounded uppercase border border-[#141414] ${style.badgeBg}`}
          >
            {issue.severity}
          </span>
        </div>
        <span className="font-sans text-xs font-semibold text-gray-700 truncate max-w-[200px]">
          {issue.title}
        </span>
      </div>

      {/* Code Snippet Block */}
      {issue.codeSnippet && (
        <div className="mb-2 overflow-x-auto rounded bg-[#171717] p-2 border-l-4 border-[#D9503F]">
          <pre className="font-mono text-xs text-[#F7F3EA] leading-relaxed">
            <code>{issue.codeSnippet}</code>
          </pre>
        </div>
      )}

      {/* Diagnosis & Expected */}
      <div className="space-y-1 text-xs font-medium">
        <p className="text-[#D9503F] leading-snug">
          <strong className="font-mono text-sm mr-1">✕ Diagnosis:</strong>{" "}
          {issue.diagnosis}
        </p>
        <p className="text-[#15803D] leading-snug">
          <strong className="font-mono text-sm mr-1">✓ Expected:</strong>{" "}
          {issue.expected}
        </p>
      </div>
    </div>
  );
}
