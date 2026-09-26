"use client";

import React, { useState } from "react";
import { ExamDataset } from "@/types";
import {
  Flame,
  Lock,
  ChevronDown,
  ChevronUp,
  Printer,
  Sparkles,
  BarChart3,
  FileText,
  AlertCircle,
  HelpCircle,
  Layers,
  ArrowRight,
  Gift,
} from "lucide-react";

interface AnalysisResultsProps {
  data: ExamDataset;
  isUnlocked: boolean;
  isFreeClaimedForThis: boolean;
  claimedFreeSubjectName?: string;
  onUnlockClick: () => void;
  onOpenPrintView: () => void;
}

export const AnalysisResults: React.FC<AnalysisResultsProps> = ({
  data,
  isUnlocked,
  isFreeClaimedForThis,
  claimedFreeSubjectName,
  onUnlockClick,
  onOpenPrintView,
}) => {
  const [activeTab, setActiveTab] = useState<"predictions" | "heatmap" | "fullpaper">("predictions");
  const [expandedSolutions, setExpandedSolutions] = useState<Record<string, boolean>>({});

  const toggleSolution = (id: string) => {
    setExpandedSolutions((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="space-y-6">
      {/* Top Summary Banner */}
      <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 sm:p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-md bg-orange-100 px-2.5 py-0.5 text-xs font-bold text-orange-800 dark:bg-orange-950/60 dark:text-orange-300">
                {data.subject.grade.toUpperCase()}
              </span>
              <span className="text-xs text-zinc-500">Code: {data.subject.code}</span>
              <span className="text-xs text-zinc-500">•</span>
              <span className="text-xs text-zinc-500">{data.yearsAnalyzed.length} Years Scanned (2019-2024)</span>

              {isFreeClaimedForThis && (
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-bold text-emerald-800 dark:bg-emerald-950/70 dark:text-emerald-300">
                  <Gift className="h-3 w-3 text-emerald-600" />
                  100% Free Sample Pass
                </span>
              )}
            </div>
            <h2 className="mt-1 text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
              {data.subject.name} - 2026 Examination Prediction
            </h2>
            <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
              Analyzed {data.totalQuestionsScanned} questions across all All-India and Delhi sets.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={onOpenPrintView}
              className="flex items-center gap-1.5 rounded-xl border border-zinc-200 bg-zinc-50 px-3.5 py-2 text-xs font-semibold text-zinc-700 transition hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700"
            >
              <Printer className="h-4 w-4" />
              <span>Print / PDF View</span>
            </button>

            {!isUnlocked && (
              <button
                onClick={onUnlockClick}
                className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 px-4 py-2 text-xs font-bold text-white shadow-md shadow-orange-500/25 transition hover:brightness-110 active:scale-95"
              >
                <Sparkles className="h-4 w-4" />
                <span>Unlock Full Subject (₹49)</span>
              </button>
            )}
          </div>
        </div>

        {/* Quick Highlights Metrics */}
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="rounded-xl bg-orange-50/60 p-3 dark:bg-orange-950/20 border border-orange-200/50 dark:border-orange-900/30">
            <div className="text-xs font-medium text-orange-800 dark:text-orange-300">Top Hotspot</div>
            <div className="mt-1 text-lg font-extrabold text-orange-900 dark:text-orange-200">
              {data.chapters[0].chapter.split(" ")[0]}
            </div>
            <div className="text-[10px] text-orange-600/80">{data.chapters[0].probability}% Recurrence</div>
          </div>

          <div className="rounded-xl bg-zinc-50 p-3 dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-800">
            <div className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Target Marks</div>
            <div className="mt-1 text-lg font-extrabold text-zinc-900 dark:text-white">
              {data.subject.totalMarks} Marks
            </div>
            <div className="text-[10px] text-zinc-500">Duration: {data.subject.duration}</div>
          </div>

          <div className="rounded-xl bg-emerald-50/60 p-3 dark:bg-emerald-950/20 border border-emerald-200/50 dark:border-emerald-900/30">
            <div className="text-xs font-medium text-emerald-800 dark:text-emerald-300">High Prob Topics</div>
            <div className="mt-1 text-lg font-extrabold text-emerald-900 dark:text-emerald-200">
              {data.chapters.filter((c) => c.probability >= 85).length} Chapters
            </div>
            <div className="text-[10px] text-emerald-600/80">Covers ~55% of paper</div>
          </div>

          <div className="rounded-xl bg-purple-50/60 p-3 dark:bg-purple-950/20 border border-purple-200/50 dark:border-purple-900/30">
            <div className="text-xs font-medium text-purple-800 dark:text-purple-300">Repeat Pattern</div>
            <div className="mt-1 text-lg font-extrabold text-purple-900 dark:text-purple-200">
              2-Year Cycle
            </div>
            <div className="text-[10px] text-purple-600/80">High 2023 rotation</div>
          </div>
        </div>
      </div>

      {/* Tabs Switcher */}
      <div className="flex border-b border-zinc-200 dark:border-zinc-800">
        <button
          onClick={() => setActiveTab("predictions")}
          className={`flex items-center gap-2 border-b-2 px-4 py-3 text-xs sm:text-sm font-bold transition-all ${
            activeTab === "predictions"
              ? "border-orange-500 text-orange-600 dark:text-orange-400"
              : "border-transparent text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300"
          }`}
        >
          <Flame className="h-4 w-4" />
          <span>Top Predicted Questions ({data.topPredictions.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("heatmap")}
          className={`flex items-center gap-2 border-b-2 px-4 py-3 text-xs sm:text-sm font-bold transition-all ${
            activeTab === "heatmap"
              ? "border-orange-500 text-orange-600 dark:text-orange-400"
              : "border-transparent text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300"
          }`}
        >
          <BarChart3 className="h-4 w-4" />
          <span>Chapter Probability Heatmap</span>
        </button>

        <button
          onClick={() => setActiveTab("fullpaper")}
          className={`flex items-center gap-2 border-b-2 px-4 py-3 text-xs sm:text-sm font-bold transition-all ${
            activeTab === "fullpaper"
              ? "border-orange-500 text-orange-600 dark:text-orange-400"
              : "border-transparent text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300"
          }`}
        >
          <FileText className="h-4 w-4" />
          <span>Full Predicted Paper</span>
        </button>
      </div>

      {/* Tab 1: Top Predictions */}
      {activeTab === "predictions" && (
        <div className="space-y-4">
          <div className="rounded-xl bg-amber-50 border border-amber-200/80 p-3.5 text-xs text-amber-900 dark:bg-amber-950/30 dark:border-amber-900/40 dark:text-amber-300 flex items-start gap-2.5">
            <AlertCircle className="h-4 w-4 shrink-0 text-amber-600 mt-0.5" />
            <div>
              <span className="font-semibold">Examiner Pattern Notice:</span> These questions carry the highest mathematical probability of appearing based on the 2019-2024 alternating rotation matrix. Focus on the required diagram labels and derivations first.
            </div>
          </div>

          <div className="space-y-4">
            {data.topPredictions.map((q, idx) => {
              const isLockedForUser = q.isLocked && !isUnlocked;
              const isExpanded = expandedSolutions[q.id];

              if (isLockedForUser) {
                return (
                  <div
                    key={q.id}
                    className="relative overflow-hidden rounded-2xl border border-dashed border-zinc-300 bg-zinc-50/70 p-6 text-center dark:border-zinc-800 dark:bg-zinc-900/40"
                  >
                    <div className="flex flex-col items-center justify-center">
                      <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-orange-100 text-orange-600 dark:bg-orange-950 dark:text-orange-400">
                        <Lock className="h-5 w-5" />
                      </div>
                      <h4 className="text-sm font-bold text-zinc-900 dark:text-white">
                        Question #{idx + 1} is Locked: {q.topic}
                      </h4>
                      <p className="mt-1 max-w-sm text-xs text-zinc-500">
                        Section {q.section} ({q.marks} Marks) • <span className="font-semibold text-orange-600">{q.probability}% Probability</span>.
                      </p>
                      <button
                        onClick={onUnlockClick}
                        className="mt-4 flex items-center gap-1.5 rounded-xl bg-orange-600 px-4 py-2 text-xs font-bold text-white shadow-sm hover:bg-orange-700 transition"
                      >
                        <Sparkles className="h-3.5 w-3.5" />
                        <span>Unlock Full Predictions + Solutions for ₹49</span>
                      </button>
                    </div>
                  </div>
                );
              }

              return (
                <div
                  key={q.id}
                  className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 sm:p-6"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-100 pb-3 dark:border-zinc-800">
                    <div className="flex items-center gap-2">
                      <span className="rounded-md bg-zinc-100 px-2 py-0.5 text-xs font-bold text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
                        Q{idx + 1} • Section {q.section}
                      </span>
                      <span className="rounded-md bg-orange-100 px-2 py-0.5 text-xs font-bold text-orange-800 dark:bg-orange-950/60 dark:text-orange-300">
                        {q.marks} Marks
                      </span>
                      <span className="text-xs font-medium text-zinc-500">Topic: {q.topic}</span>
                    </div>

                    <div className="flex items-center gap-1 rounded-full bg-rose-50 px-2.5 py-1 text-xs font-extrabold text-rose-700 dark:bg-rose-950/40 dark:text-rose-400 border border-rose-200 dark:border-rose-900/50">
                      <Flame className="h-3.5 w-3.5 fill-rose-500 text-rose-500" />
                      <span>{q.probability}% Probability</span>
                    </div>
                  </div>

                  {/* Question Text */}
                  <div className="mt-4 whitespace-pre-line text-sm font-medium leading-relaxed text-zinc-800 dark:text-zinc-200">
                    {q.questionText}
                  </div>

                  {/* OR Question */}
                  {q.orOption && (
                    <div className="mt-3 rounded-xl bg-zinc-50 p-3.5 text-xs dark:bg-zinc-800/40 border border-zinc-100 dark:border-zinc-800">
                      <span className="font-bold text-orange-600 uppercase text-[10px] tracking-wider block mb-1">
                        OR Alternative Predicted Variant:
                      </span>
                      <p className="italic text-zinc-600 dark:text-zinc-300">{q.orOption}</p>
                    </div>
                  )}

                  {/* Cycle Pattern Reason */}
                  <div className="mt-4 flex items-start gap-2 rounded-lg bg-orange-50/50 p-2.5 text-xs text-orange-900 dark:bg-orange-950/30 dark:text-orange-200">
                    <span className="font-bold shrink-0">Historical Cycle:</span>
                    <span>{q.cycleHistory}</span>
                  </div>

                  {/* Solution Accordion */}
                  <div className="mt-4 pt-3 border-t border-zinc-100 dark:border-zinc-800">
                    <button
                      onClick={() => toggleSolution(q.id)}
                      className="flex items-center gap-1.5 text-xs font-semibold text-orange-600 hover:text-orange-700 dark:text-orange-400"
                    >
                      {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                      <span>{isExpanded ? "Hide Marking Scheme Hints" : "View Official Marking Scheme Hints"}</span>
                    </button>

                    {isExpanded && (
                      <div className="mt-3 rounded-xl bg-zinc-50 p-4 dark:bg-zinc-800/60 border border-zinc-200/80 dark:border-zinc-700/60">
                        <div className="text-xs font-bold text-zinc-900 dark:text-white mb-2">
                          What Examiners Look For (Marking Scheme Key):
                        </div>
                        <ul className="space-y-1.5 text-xs text-zinc-700 dark:text-zinc-300 list-disc list-inside">
                          {q.keyMarkingPoints.map((point, pIdx) => (
                            <li key={pIdx}>{point}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab 2: Chapter Probability Heatmap */}
      {activeTab === "heatmap" && (
        <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 sm:p-6 space-y-5">
          <div>
            <h3 className="text-base font-bold text-zinc-900 dark:text-white">
              Syllabus Unit & Chapter Recurrence Heatmap
            </h3>
            <p className="text-xs text-zinc-500">
              Ranked from highest to lowest likelihood based on cumulative past year marks allocation.
            </p>
          </div>

          <div className="space-y-4">
            {data.chapters.map((ch, idx) => (
              <div
                key={idx}
                className="rounded-xl border border-zinc-100 bg-zinc-50/50 p-4 dark:border-zinc-800 dark:bg-zinc-800/40"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-zinc-900 dark:text-white">{ch.chapter}</span>
                      <span
                        className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${
                          ch.status === "critical"
                            ? "bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300"
                            : ch.status === "high"
                            ? "bg-orange-100 text-orange-800 dark:bg-orange-950 dark:text-orange-300"
                            : "bg-zinc-200 text-zinc-800 dark:bg-zinc-700 dark:text-zinc-300"
                        }`}
                      >
                        {ch.status}
                      </span>
                    </div>
                    <span className="text-xs text-zinc-500">{ch.unit}</span>
                  </div>

                  <div className="flex items-center gap-3 sm:text-right">
                    <div>
                      <div className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                        ~{ch.avgMarks} Marks
                      </div>
                      <div className="text-[10px] text-zinc-400">Average Weightage</div>
                    </div>
                    <div className="flex items-center gap-1 font-bold text-sm text-orange-600 dark:text-orange-400">
                      <Flame className="h-4 w-4" />
                      <span>{ch.probability}%</span>
                    </div>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-700">
                  <div
                    className={`h-full rounded-full ${
                      ch.probability >= 90
                        ? "bg-rose-500"
                        : ch.probability >= 80
                        ? "bg-orange-500"
                        : "bg-amber-500"
                    }`}
                    style={{ width: `${ch.probability}%` }}
                  />
                </div>

                {/* Trend Note */}
                <p className="mt-2 text-xs text-zinc-600 dark:text-zinc-400">
                  <span className="font-medium text-zinc-800 dark:text-zinc-200">Historical Trend: </span>
                  {ch.trendReason}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Full Predicted Paper */}
      {activeTab === "fullpaper" && (
        <div className="space-y-6">
          <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <div className="border-b border-zinc-200 pb-4 text-center dark:border-zinc-800">
              <span className="text-xs font-bold tracking-wider text-orange-600 uppercase">
                Official CBSE Blueprint Simulation
              </span>
              <h3 className="mt-1 text-xl font-extrabold text-zinc-900 dark:text-white">
                {data.fullPaper.title}
              </h3>
              <div className="mt-2 flex justify-center gap-4 text-xs font-semibold text-zinc-500">
                <span>Time Allowed: {data.subject.duration}</span>
                <span>•</span>
                <span>Maximum Marks: {data.subject.totalMarks}</span>
              </div>
            </div>

            {/* General Instructions */}
            <div className="mt-4 rounded-xl bg-zinc-50 p-4 text-xs text-zinc-700 dark:bg-zinc-800/50 dark:text-zinc-300">
              <span className="font-bold block mb-1">General Instructions:</span>
              <ul className="list-disc list-inside space-y-1">
                {data.fullPaper.instructions.map((inst, idx) => (
                  <li key={idx}>{inst}</li>
                ))}
              </ul>
            </div>

            {/* Sections */}
            <div className="mt-6 space-y-6">
              {data.fullPaper.sections.map((sec, sIdx) => (
                <div key={sIdx} className="space-y-3">
                  <div className="flex items-center justify-between border-b border-zinc-200 pb-1.5 dark:border-zinc-800">
                    <h4 className="font-bold text-sm text-zinc-900 dark:text-white">{sec.name}</h4>
                    <span className="text-xs text-zinc-500">{sec.description}</span>
                  </div>

                  <div className="space-y-3">
                    {sec.questions.map((q, qIdx) => {
                      const isLockedForUser = q.isLocked && !isUnlocked;

                      if (isLockedForUser) {
                        return (
                          <div
                            key={q.id}
                            className="flex items-center justify-between rounded-xl border border-dashed border-zinc-300 bg-zinc-50/50 p-3.5 dark:border-zinc-800 dark:bg-zinc-800/30"
                          >
                            <div className="flex items-center gap-2 text-xs text-zinc-500">
                              <Lock className="h-4 w-4 text-orange-500" />
                              <span>Question locked: Topic {q.topic} ({q.marks} Marks)</span>
                            </div>
                            <button
                              onClick={onUnlockClick}
                              className="text-xs font-bold text-orange-600 hover:text-orange-700 underline"
                            >
                              Unlock (₹49)
                            </button>
                          </div>
                        );
                      }

                      return (
                        <div
                          key={q.id}
                          className="rounded-xl border border-zinc-100 bg-zinc-50/40 p-4 dark:border-zinc-800/70 dark:bg-zinc-800/20"
                        >
                          <div className="flex items-start justify-between gap-2">
                            <span className="text-xs font-bold text-zinc-400">Q{qIdx + 1}</span>
                            <div className="flex-1 whitespace-pre-line text-xs sm:text-sm font-medium text-zinc-800 dark:text-zinc-200">
                              {q.questionText}
                            </div>
                            <span className="text-xs font-bold text-orange-600 dark:text-orange-400 shrink-0">
                              [{q.marks}M]
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom PDF Download Banner */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-xl bg-orange-50 p-4 dark:bg-orange-950/30 border border-orange-200 dark:border-orange-900/40">
              <div>
                <h5 className="font-bold text-sm text-zinc-900 dark:text-white">
                  Want to print this predicted paper on A4 sheet?
                </h5>
                <p className="text-xs text-zinc-600 dark:text-zinc-400">
                  Export clean, printer-friendly question paper without answers for practice tests.
                </p>
              </div>
              <button
                onClick={onOpenPrintView}
                className="flex items-center gap-2 rounded-xl bg-zinc-900 px-4 py-2.5 text-xs font-bold text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200 shrink-0"
              >
                <Printer className="h-4 w-4" />
                <span>Open Clean Printable A4 Paper</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
