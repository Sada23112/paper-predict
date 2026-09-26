"use client";

import React, { useEffect, useState } from "react";
import { CheckCircle2, Loader2, Sparkles, BrainCircuit, Globe, UploadCloud } from "lucide-react";
import { SourceMode } from "@/types";

interface AnalysisProgressProps {
  onComplete: () => void;
  subjectName: string;
  sourceMode: SourceMode;
}

export const AnalysisProgress: React.FC<AnalysisProgressProps> = ({
  onComplete,
  subjectName,
  sourceMode,
}) => {
  const archiveSteps = [
    "Querying official CBSE & Kendriya Vidyalaya past exam web archives...",
    "Scanning 6 years of All-India & Delhi question papers + official marking schemes...",
    "Mapping questions against official curriculum & marks distribution...",
    "Detecting alternating-year rotation cycles & staple concepts...",
    "Assembling 2026 Predicted Model Paper & marking hints...",
  ];

  const uploadSteps = [
    "Reading uploaded student question papers (OCR & Figure Parsing)...",
    "Securely indexing questions into PaperPredict Community Knowledge Base...",
    "Cross-referencing uploaded questions against historical exam patterns...",
    "Computing statistical recurrence & probability scores for 2026...",
    "Generating custom Predicted Model Paper & marking hints...",
  ];

  const steps = sourceMode === "ai-archive" ? archiveSteps : uploadSteps;
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < steps.length - 1) {
          return prev + 1;
        } else {
          clearInterval(timer);
          setTimeout(() => {
            onComplete();
          }, 800);
          return prev;
        }
      });
    }, 900);

    return () => clearInterval(timer);
  }, [steps.length, onComplete]);

  const progressPercent = Math.min(100, Math.round(((currentStep + 1) / steps.length) * 100));

  return (
    <div className="w-full rounded-2xl border border-orange-200 bg-orange-50/50 p-6 text-center shadow-sm dark:border-orange-900/40 dark:bg-orange-950/20 sm:p-10">
      <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-500 text-white shadow-lg shadow-orange-500/30 animate-pulse">
        {sourceMode === "ai-archive" ? (
          <Globe className="h-7 w-7" />
        ) : (
          <UploadCloud className="h-7 w-7" />
        )}
      </div>

      <h3 className="text-lg font-bold text-zinc-900 dark:text-white">
        {sourceMode === "ai-archive"
          ? `Searching Archives & Predicting for ${subjectName}`
          : `Processing Uploaded Papers & Indexing for ${subjectName}`}
      </h3>
      <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
        {sourceMode === "ai-archive"
          ? "Cross-referencing 190+ questions against 6 historical exam cycles"
          : "Analyzing custom question paper frequency and contributing to archive"}
      </p>

      {/* Progress Bar */}
      <div className="mx-auto mt-6 max-w-md">
        <div className="flex justify-between text-xs font-semibold text-orange-700 dark:text-orange-400 mb-1.5">
          <span>{sourceMode === "ai-archive" ? "Web & Archive Scan" : "Document & Community Ingestion"}</span>
          <span>{progressPercent}%</span>
        </div>
        <div className="h-2.5 w-full overflow-hidden rounded-full bg-orange-100 dark:bg-orange-900/40">
          <div
            className="h-full bg-gradient-to-r from-orange-500 to-rose-500 transition-all duration-500 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Steps List */}
      <div className="mx-auto mt-8 max-w-md space-y-2.5 text-left">
        {steps.map((step, idx) => {
          const isDone = idx < currentStep;
          const isCurrent = idx === currentStep;

          return (
            <div
              key={idx}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-xs transition-all ${
                isCurrent
                  ? "bg-white text-zinc-900 font-semibold shadow-sm dark:bg-zinc-800 dark:text-white ring-1 ring-orange-300 dark:ring-orange-800"
                  : isDone
                  ? "text-zinc-600 dark:text-zinc-400"
                  : "text-zinc-400 opacity-60 dark:text-zinc-600"
              }`}
            >
              {isDone ? (
                <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" />
              ) : isCurrent ? (
                <Loader2 className="h-4 w-4 shrink-0 animate-spin text-orange-500" />
              ) : (
                <div className="h-4 w-4 shrink-0 rounded-full border border-zinc-300 dark:border-zinc-700" />
              )}
              <span>{step}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
