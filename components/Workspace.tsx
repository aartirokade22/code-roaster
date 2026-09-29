"use client";

import React, { useCallback, useEffect, useState } from "react";
import { DEFAULTS, SAMPLE } from "@/config/app.config";
import { requestRoast } from "@/lib/api";
import { LanguageId, ReportState, RoastLevel, RoastResult } from "@/types/roast";
import CodeEditor from "./CodeEditor";
import ErrorMessageInput from "./ErrorMessageInput";
import RoastControls from "./RoastControls";
import RoastReport from "./RoastReport";
import StatusBar from "./StatusBar";
import TopBar from "./TopBar";

export default function Workspace() {
  const [roastLevel, setRoastLevel] = useState<RoastLevel>(
    DEFAULTS.roastLevel as RoastLevel
  );
  const [language, setLanguage] = useState<LanguageId>(
    DEFAULTS.language as LanguageId
  );
  const [code, setCode] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [errorDrawerOpen, setErrorDrawerOpen] = useState<boolean>(false);

  const [reportState, setReportState] = useState<ReportState>("empty");
  const [roastResult, setRoastResult] = useState<RoastResult | null>(null);
  const [roastedCode, setRoastedCode] = useState<string>("");
  const [apiError, setApiError] = useState<string | null>(null);

  const isRoasting = reportState === "loading";

  // Execute Roast Request
  const handleRoast = useCallback(async () => {
    if (isRoasting) return;

    if (!code.trim()) {
      setApiError("No code provided. I can't roast the void.");
      setReportState("error");
      return;
    }

    setReportState("loading");
    setApiError(null);
    setRoastResult(null);

    try {
      const result = await requestRoast({
        language,
        code,
        roastLevel,
        errorMessage: errorMessage.trim() || undefined,
      });

      setRoastResult(result);
      setRoastedCode(code);
      setReportState("results");
    } catch (err: any) {
      setApiError(
        err?.message || "An unexpected error occurred during code analysis."
      );
      setReportState("error");
    }
  }, [code, errorMessage, isRoasting, language, roastLevel]);

  // Load sample bug
  const handleLoadSample = useCallback(() => {
    setLanguage(SAMPLE.language as LanguageId);
    setCode(SAMPLE.code);
  }, []);

  // Apply fix code to editor
  const handleApplyFix = useCallback((fixedCode: string) => {
    setCode(fixedCode);
  }, []);

  // Ctrl/Cmd + Enter Shortcut Handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
        e.preventDefault();
        handleRoast();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleRoast]);

  // Compute active error line (only if current code matches roasted code snapshot)
  const errorLine =
    reportState === "results" && code === roastedCode && roastResult?.issues?.[0]
      ? roastResult.issues[0].line
      : undefined;

  return (
    <div className="max-w-[1380px] w-full bg-[#F8F4EC] border-3 border-[#141414] rounded-[24px] shadow-[6px_6px_0px_#141414] flex flex-col overflow-hidden min-h-[88vh]">
      {/* Header TopBar & embedded Controls */}
      <TopBar>
        <RoastControls
          roastLevel={roastLevel}
          onRoastLevelChange={setRoastLevel}
          language={language}
          onLanguageChange={setLanguage}
          onRoast={handleRoast}
          isRoasting={isRoasting}
          errorDrawerOpen={errorDrawerOpen}
          onToggleErrorDrawer={() => setErrorDrawerOpen((prev) => !prev)}
        />
      </TopBar>

      {/* Optional Error Traceback Input Drawer */}
      {errorDrawerOpen && (
        <ErrorMessageInput
          value={errorMessage}
          onChange={setErrorMessage}
          onClose={() => setErrorDrawerOpen(false)}
        />
      )}

      {/* Main Split Grid Workstation (Editor & Roast Report) */}
      <div className="flex-1 flex flex-col lg:flex-row gap-4 p-4 lg:p-5 overflow-hidden">
        {/* Left Column: Code Editor (~54-55% width on desktop) */}
        <div className="w-full lg:w-[54%] flex flex-col h-[480px] lg:h-auto">
          <CodeEditor
            code={code}
            onChange={setCode}
            language={language}
            errorLine={errorLine}
            onLoadSample={handleLoadSample}
          />
        </div>

        {/* Right Column: Roast Audit Report (~46-45% width on desktop) */}
        <div className="w-full lg:w-[46%] flex flex-col h-[480px] lg:h-auto">
          <RoastReport
            state={reportState}
            roastLevel={roastLevel}
            language={language}
            result={roastResult}
            errorMsg={apiError}
            onRetry={handleRoast}
            onApplyFix={handleApplyFix}
          />
        </div>
      </div>

      {/* Bottom Status Bar */}
      <StatusBar isRoasting={isRoasting} />
    </div>
  );
}
