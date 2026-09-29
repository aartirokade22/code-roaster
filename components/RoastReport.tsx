import React from "react";
import { ReportState, RoastResult } from "@/types/roast";
import EmptyState from "./EmptyState";
import ErrorState from "./ErrorState";
import FixedCode from "./FixedCode";
import IssueCard from "./IssueCard";
import LoadingState from "./LoadingState";
import SectionHeader from "./SectionHeader";

interface RoastReportProps {
  state: ReportState;
  roastLevel: string;
  language: string;
  result: RoastResult | null;
  errorMsg: string | null;
  onRetry: () => void;
  onApplyFix: (code: string) => void;
}

export default function RoastReport({
  state,
  roastLevel,
  language,
  result,
  errorMsg,
  onRetry,
  onApplyFix,
}: RoastReportProps) {
  const isResults = state === "results" && result !== null;

  return (
    <div className="flex flex-col h-full w-full bg-[#F8F4EC] border-2 border-[#141414] rounded-2xl overflow-hidden shadow-[4px_4px_0px_#141414]">
      {/* Header Bar */}
      <div className="flex items-center justify-between bg-[#242424] px-3 py-2 border-b-2 border-[#141414] select-none">
        <span className="font-mono text-xs font-bold text-gray-400 uppercase tracking-widest">
          AUDIT // REPORT
        </span>
        <span className="font-mono text-xs font-bold text-white tracking-wider">
          ROAST REPORT
        </span>
        <span className="w-12" />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto p-4">
        {state === "empty" && <EmptyState />}
        {state === "loading" && <LoadingState />}
        {state === "error" && (
          <ErrorState error={errorMsg} onRetry={onRetry} />
        )}

        {isResults && (
          <div className="space-y-5 animate-fadeIn">
            {/* Section 1: Roast Critique */}
            <div>
              <SectionHeader number={1} title="Roast">
                <span className="font-mono text-xs font-bold text-[#141414] bg-[#EDB13E] px-2 py-0.5 rounded border border-[#141414] uppercase">
                  STYLE: {roastLevel}
                </span>
              </SectionHeader>

              {/* Rubber Stamp Score Badge */}
              <div className="my-3 flex items-center justify-between gap-3 bg-white p-3 rounded-xl border-2 border-[#141414] shadow-[3px_3px_0px_#141414]">
                <div>
                  <div className="font-mono text-[10px] font-bold text-gray-500 uppercase">
                    AUDIT SCORE
                  </div>
                  <div className="font-space-grotesk text-2xl font-black text-[#D9503F]">
                    {result.issues.length === 0 ? "95 / 100" : "58 / 100"}
                  </div>
                </div>
                <div className="transform -rotate-3 bg-[#EDB13E] text-[#141414] font-mono text-xs font-black px-3 py-1.5 rounded border-2 border-[#141414] shadow-[2px_2px_0px_#141414] uppercase text-center">
                  {result.issues.length === 0
                    ? "SUSPICIOUSLY CLEAN"
                    : "ATTENDANCE SHORT, CODE BHI SHORT"}
                </div>
              </div>

              {/* Main Roast Critique Quote */}
              <blockquote className="bg-[#EFF2FB] border-l-4 border-[#141414] p-3 rounded-r-xl border-y border-r border-[#141414] text-xs font-medium text-[#141414] leading-relaxed italic">
                "{result.roast}"
              </blockquote>
            </div>

            {/* Section 2: What's Wrong (Issues Breakdown) */}
            <div>
              <SectionHeader number={2} title="What's Wrong">
                <span className="font-mono text-xs font-bold text-gray-700 bg-gray-200 px-2 py-0.5 rounded border border-[#141414]">
                  {result.issues.length}{" "}
                  {result.issues.length === 1 ? "ISSUE" : "ISSUES"}
                </span>
              </SectionHeader>

              {result.issues.length === 0 ? (
                <div className="bg-[#F0FDF4] border-2 border-[#4FA35A] rounded-xl p-3 text-xs font-bold text-[#15803D] text-center">
                  ✓ No issues found. Suspiciously clean code!
                </div>
              ) : (
                <div className="space-y-2">
                  {result.issues.map((issue, idx) => (
                    <IssueCard key={idx} index={idx + 1} issue={issue} />
                  ))}
                </div>
              )}
            </div>

            {/* Section 3: Fix / Redemption Arc */}
            {result.correctedCode && result.correctedCode.trim().length > 0 && (
              <FixedCode
                sectionNumber={3}
                language={language}
                code={result.correctedCode}
                onApply={onApplyFix}
              />
            )}

            {/* Section 4 or 3: Takeaway Advice */}
            {result.takeaway && result.takeaway.trim().length > 0 && (
              <div>
                <SectionHeader
                  number={
                    result.correctedCode &&
                    result.correctedCode.trim().length > 0
                      ? 4
                      : 3
                  }
                  title="Takeaway"
                />
                <div className="bg-white border-2 border-[#141414] rounded-xl p-3 shadow-[3px_3px_0px_#141414] text-xs font-medium text-[#141414] leading-relaxed">
                  💡 <strong className="font-bold">Final Words:</strong>{" "}
                  {result.takeaway}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
