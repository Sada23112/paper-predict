"use client";

import React, { useState } from "react";
import { GradeLevel, SourceMode } from "@/types";
import {
  BookOpen,
  UploadCloud,
  CheckCircle2,
  FileText,
  Sparkles,
  Layers,
  Globe,
  Database,
  ShieldAlert,
  Info,
  CheckSquare,
  Square,
  Trash2,
} from "lucide-react";

interface ExamSelectorProps {
  selectedGrade: GradeLevel;
  selectedSubject: string;
  sourceMode: SourceMode;
  onGradeChange: (grade: GradeLevel) => void;
  onSubjectChange: (subjectId: string) => void;
  onSourceModeChange: (mode: SourceMode) => void;
  onStartAnalysis: () => void;
  isAnalyzing: boolean;
}

export const ExamSelector: React.FC<ExamSelectorProps> = ({
  selectedGrade,
  selectedSubject,
  sourceMode,
  onGradeChange,
  onSubjectChange,
  onSourceModeChange,
  onStartAnalysis,
  isAnalyzing,
}) => {
  const [uploadedFiles, setUploadedFiles] = useState<{ name: string; size: string }[]>([]);
  const [disclaimerAccepted, setDisclaimerAccepted] = useState(false);
  const [showError, setShowError] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files).map((f) => ({
        name: f.name,
        size: `${(f.size / (1024 * 1024)).toFixed(2)} MB`,
      }));
      setUploadedFiles((prev) => [...prev, ...newFiles]);
    }
  };

  const handleRemoveFile = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleRunClick = () => {
    if (sourceMode === "user-upload") {
      if (uploadedFiles.length === 0) {
        setShowError(true);
        return;
      }
      if (!disclaimerAccepted) {
        setShowError(true);
        return;
      }
    }
    setShowError(false);
    onStartAnalysis();
  };

  return (
    <div className="w-full rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 sm:p-7">
      {/* Step 1: Grade Level Toggle */}
      <div className="mb-6">
        <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
          Step 1: Choose Your Class (CBSE Board)
        </label>
        <div className="grid grid-cols-2 gap-3 max-w-md">
          <button
            type="button"
            onClick={() => {
              onGradeChange("class-10");
              onSubjectChange("class-10-science");
            }}
            className={`flex items-center justify-center gap-2 rounded-xl border p-3.5 text-sm font-semibold transition-all ${
              selectedGrade === "class-10"
                ? "border-orange-500 bg-orange-50/70 text-orange-900 shadow-sm dark:bg-orange-950/40 dark:text-orange-200 dark:border-orange-600"
                : "border-zinc-200 bg-zinc-50/50 text-zinc-700 hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-800/40 dark:text-zinc-300"
            }`}
          >
            <Layers className="h-4 w-4 text-orange-500" />
            <span>CBSE Class 10</span>
          </button>

          <button
            type="button"
            onClick={() => {
              onGradeChange("class-12");
              onSubjectChange("class-12-physics");
            }}
            className={`flex items-center justify-center gap-2 rounded-xl border p-3.5 text-sm font-semibold transition-all ${
              selectedGrade === "class-12"
                ? "border-orange-500 bg-orange-50/70 text-orange-900 shadow-sm dark:bg-orange-950/40 dark:text-orange-200 dark:border-orange-600"
                : "border-zinc-200 bg-zinc-50/50 text-zinc-700 hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-800/40 dark:text-zinc-300"
            }`}
          >
            <Layers className="h-4 w-4 text-orange-500" />
            <span>CBSE Class 12</span>
          </button>
        </div>
      </div>

      {/* Step 2: Subject Selector */}
      <div className="mb-6">
        <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
          Step 2: Select Subject
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {selectedGrade === "class-10" ? (
            <>
              <button
                type="button"
                onClick={() => onSubjectChange("class-10-science")}
                className={`flex items-start justify-between rounded-xl border p-4 text-left transition-all ${
                  selectedSubject === "class-10-science"
                    ? "border-orange-500 bg-orange-50/50 ring-1 ring-orange-500 dark:bg-orange-950/30"
                    : "border-zinc-200 hover:border-zinc-300 dark:border-zinc-800"
                }`}
              >
                <div>
                  <div className="flex items-center gap-2 font-bold text-zinc-900 dark:text-white">
                    <BookOpen className="h-4 w-4 text-orange-500" />
                    <span>Science (Code 086)</span>
                  </div>
                  <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                    Physics, Chemistry & Biology (80 Marks)
                  </p>
                </div>
                {selectedSubject === "class-10-science" && (
                  <CheckCircle2 className="h-5 w-5 text-orange-600" />
                )}
              </button>

              <button
                type="button"
                onClick={() => onSubjectChange("class-10-math")}
                className={`flex items-start justify-between rounded-xl border p-4 text-left transition-all ${
                  selectedSubject === "class-10-math"
                    ? "border-orange-500 bg-orange-50/50 ring-1 ring-orange-500 dark:bg-orange-950/30"
                    : "border-zinc-200 hover:border-zinc-300 dark:border-zinc-800"
                }`}
              >
                <div>
                  <div className="flex items-center gap-2 font-bold text-zinc-900 dark:text-white">
                    <BookOpen className="h-4 w-4 text-orange-500" />
                    <span>Mathematics (Code 041)</span>
                  </div>
                  <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                    Standard & Basic • Identities & Geometry (80 Marks)
                  </p>
                </div>
                {selectedSubject === "class-10-math" && (
                  <CheckCircle2 className="h-5 w-5 text-orange-600" />
                )}
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={() => onSubjectChange("class-12-physics")}
                className={`flex items-start justify-between rounded-xl border p-4 text-left transition-all ${
                  selectedSubject === "class-12-physics"
                    ? "border-orange-500 bg-orange-50/50 ring-1 ring-orange-500 dark:bg-orange-950/30"
                    : "border-zinc-200 hover:border-zinc-300 dark:border-zinc-800"
                }`}
              >
                <div>
                  <div className="flex items-center gap-2 font-bold text-zinc-900 dark:text-white">
                    <BookOpen className="h-4 w-4 text-orange-500" />
                    <span>Physics Theory (Code 042)</span>
                  </div>
                  <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                    Derivations, Numericals & Ray Optics (70 Marks)
                  </p>
                </div>
                {selectedSubject === "class-12-physics" && (
                  <CheckCircle2 className="h-5 w-5 text-orange-600" />
                )}
              </button>

              <button
                type="button"
                onClick={() => onSubjectChange("class-12-chemistry")}
                className={`flex items-start justify-between rounded-xl border p-4 text-left transition-all ${
                  selectedSubject === "class-12-chemistry"
                    ? "border-orange-500 bg-orange-50/50 ring-1 ring-orange-500 dark:bg-orange-950/30"
                    : "border-zinc-200 hover:border-zinc-300 dark:border-zinc-800"
                }`}
              >
                <div>
                  <div className="flex items-center gap-2 font-bold text-zinc-900 dark:text-white">
                    <BookOpen className="h-4 w-4 text-orange-500" />
                    <span>Chemistry Theory (Code 043)</span>
                  </div>
                  <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                    Organic Conversions & Name Reactions (70 Marks)
                  </p>
                </div>
                {selectedSubject === "class-12-chemistry" && (
                  <CheckCircle2 className="h-5 w-5 text-orange-600" />
                )}
              </button>
            </>
          )}
        </div>
      </div>

      {/* Step 3: Question Paper Sourcing Method (2 Clear Options) */}
      <div className="mb-6 rounded-2xl bg-zinc-50/90 p-5 dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-800">
        <div className="flex items-center justify-between mb-3">
          <label className="block text-xs font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-300">
            Step 3: Question Paper Sourcing Method
          </label>
          <span className="text-[11px] font-semibold text-orange-600 dark:text-orange-400">
            Select how AI accesses question papers
          </span>
        </div>

        {/* 2 Primary Mode Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Option 1: Autonomous AI Web Search & Master Database */}
          <button
            type="button"
            onClick={() => onSourceModeChange("ai-archive")}
            className={`flex flex-col justify-between rounded-xl p-4 text-left border transition-all ${
              sourceMode === "ai-archive"
                ? "border-orange-500 bg-white ring-2 ring-orange-500/20 shadow-md dark:bg-zinc-800 dark:border-orange-500"
                : "border-zinc-200 bg-white/60 hover:border-zinc-300 dark:border-zinc-700/60 dark:bg-zinc-800/30"
            }`}
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-orange-100 px-2.5 py-0.5 text-xs font-bold text-orange-800 dark:bg-orange-950/60 dark:text-orange-300">
                  <Globe className="h-3 w-3" />
                  Option 1: Autonomous Web & Master Archive
                </span>
                {sourceMode === "ai-archive" && (
                  <CheckCircle2 className="h-4 w-4 text-orange-600" />
                )}
              </div>

              <h4 className="mt-2 text-sm font-bold text-zinc-900 dark:text-white">
                AI Fetches Official Papers & Marking Schemes
              </h4>
              <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                The AI autonomously searches official archives and utilizes our curated 6-year database
                (2019-2024 All-India, Delhi, and Foreign sets) with official answer keys.
              </p>
            </div>

            {/* Live Sources Tags */}
            <div className="mt-4 flex flex-wrap gap-1.5 border-t border-zinc-100 pt-3 dark:border-zinc-700/50">
              <span className="rounded bg-zinc-100 px-2 py-0.5 text-[10px] font-semibold text-zinc-600 dark:bg-zinc-700/50 dark:text-zinc-300">
                cbse.gov.in archives
              </span>
              <span className="rounded bg-zinc-100 px-2 py-0.5 text-[10px] font-semibold text-zinc-600 dark:bg-zinc-700/50 dark:text-zinc-300">
                KVS Sangathan Pre-Boards
              </span>
              <span className="rounded bg-emerald-50 text-emerald-700 border border-emerald-200/60 px-2 py-0.5 text-[10px] font-semibold dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800/40">
                ✓ 190+ Verified Questions
              </span>
            </div>
          </button>

          {/* Option 2: Student Upload (Custom School / State Papers) */}
          <button
            type="button"
            onClick={() => onSourceModeChange("user-upload")}
            className={`flex flex-col justify-between rounded-xl p-4 text-left border transition-all ${
              sourceMode === "user-upload"
                ? "border-orange-500 bg-white ring-2 ring-orange-500/20 shadow-md dark:bg-zinc-800 dark:border-orange-500"
                : "border-zinc-200 bg-white/60 hover:border-zinc-300 dark:border-zinc-700/60 dark:bg-zinc-800/30"
            }`}
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-bold text-blue-800 dark:bg-blue-950/60 dark:text-blue-300">
                  <UploadCloud className="h-3 w-3" />
                  Option 2: Student Paper Upload
                </span>
                {sourceMode === "user-upload" && (
                  <CheckCircle2 className="h-4 w-4 text-orange-600" />
                )}
              </div>

              <h4 className="mt-2 text-sm font-bold text-zinc-900 dark:text-white">
                Upload School Pre-Boards or Custom Question Papers
              </h4>
              <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                Have question papers from your school pre-boards, unit tests, or state boards?
                Upload PDFs or photos and our AI will extract questions, calculate probabilities, and identify patterns.
              </p>
            </div>

            <div className="mt-4 flex flex-wrap gap-1.5 border-t border-zinc-100 pt-3 dark:border-zinc-700/50">
              <span className="rounded bg-zinc-100 px-2 py-0.5 text-[10px] font-semibold text-zinc-600 dark:bg-zinc-700/50 dark:text-zinc-300">
                PDF Documents
              </span>
              <span className="rounded bg-zinc-100 px-2 py-0.5 text-[10px] font-semibold text-zinc-600 dark:bg-zinc-700/50 dark:text-zinc-300">
                Phone Photos (JPG/PNG)
              </span>
              <span className="rounded bg-blue-50 text-blue-700 border border-blue-200/60 px-2 py-0.5 text-[10px] font-semibold dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-800/40">
                Custom Pre-Boards
              </span>
            </div>
          </button>
        </div>

        {/* Dynamic Detail for Option 2: Upload Zone & One-Time Disclaimer */}
        {sourceMode === "user-upload" && (
          <div className="mt-5 space-y-4 rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-700 dark:bg-zinc-800/80">
            {/* Upload Drag & Drop Area */}
            <div className="border-2 border-dashed border-zinc-300 rounded-xl p-5 text-center hover:border-orange-400 transition dark:border-zinc-600">
              <input
                type="file"
                multiple
                accept=".pdf,image/*"
                id="file-upload"
                className="hidden"
                onChange={handleFileUpload}
              />
              <label
                htmlFor="file-upload"
                className="cursor-pointer flex flex-col items-center justify-center gap-2"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100 text-orange-600 dark:bg-orange-950 dark:text-orange-400">
                  <UploadCloud className="h-5 w-5" />
                </div>
                <span className="text-xs font-semibold text-zinc-800 dark:text-zinc-200">
                  Click to select Question Paper PDFs or Photos (Max 5 files)
                </span>
                <span className="text-[10px] text-zinc-500">
                  Supported formats: PDF, JPG, PNG from school pre-boards or past examinations
                </span>
              </label>

              {/* Uploaded File List */}
              {uploadedFiles.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2 justify-center">
                  {uploadedFiles.map((f, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-1.5 rounded-lg bg-orange-50 border border-orange-200 px-2.5 py-1 text-xs text-orange-900 dark:bg-orange-950/60 dark:border-orange-800/60 dark:text-orange-300"
                    >
                      <FileText className="h-3.5 w-3.5" />
                      <span className="font-medium truncate max-w-[150px]">{f.name}</span>
                      <span className="text-[10px] text-orange-600 dark:text-orange-400">({f.size})</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveFile(idx)}
                        className="ml-1 text-zinc-400 hover:text-rose-600"
                      >
                        <Trash2 className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* MANDATORY ONE-TIME DISCLAIMER & COMMUNITY CONSENT */}
            <div className="rounded-xl border border-amber-300 bg-amber-50/80 p-4 dark:border-amber-900/60 dark:bg-amber-950/30">
              <div className="flex items-start gap-3">
                <ShieldAlert className="h-5 w-5 shrink-0 text-amber-600 mt-0.5" />
                <div className="text-xs leading-relaxed text-amber-900 dark:text-amber-200">
                  <span className="font-bold block text-sm mb-0.5">
                    Community Exam Archive Disclaimer & Consent
                  </span>
                  <p className="text-xs text-amber-800/90 dark:text-amber-300">
                    To make PaperPredict more accurate for all students, uploaded question papers are
                    retained and indexed into our AI exam training repository.
                    <strong> No student personal data, marks, or identity are ever recorded</strong>—only the academic questions, figures, and marks distribution are stored to enrich historical pattern models.
                  </p>

                  <div className="mt-3 pt-2.5 border-t border-amber-200/80 dark:border-amber-900/50">
                    <label className="flex items-center gap-2 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={disclaimerAccepted}
                        onChange={(e) => setDisclaimerAccepted(e.target.checked)}
                        className="h-4 w-4 rounded border-amber-400 text-orange-600 focus:ring-orange-500 cursor-pointer"
                      />
                      <span className="text-xs font-semibold text-amber-950 dark:text-amber-100">
                        I understand and agree that my uploaded question papers will be contributed to the PaperPredict community archive to improve future predictions.
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Error prompt if file missing or consent unchecked */}
            {showError && (
              <div className="rounded-lg bg-rose-50 border border-rose-200 p-2.5 text-xs text-rose-700 dark:bg-rose-950/40 dark:border-rose-900 dark:text-rose-300">
                {uploadedFiles.length === 0
                  ? "⚠️ Please upload at least one question paper file (PDF or photo) to proceed."
                  : !disclaimerAccepted
                  ? "⚠️ Please accept the community archive consent checkbox to continue."
                  : ""}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Action CTA Button */}
      <button
        type="button"
        disabled={isAnalyzing}
        onClick={handleRunClick}
        className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-orange-600 via-amber-600 to-rose-600 py-4 px-6 text-sm font-bold text-white shadow-lg shadow-orange-500/25 transition-all hover:brightness-110 active:scale-[0.99] disabled:opacity-50"
      >
        <Sparkles className="h-4 w-4" />
        <span>
          {isAnalyzing
            ? "Analyzing Exam Patterns..."
            : sourceMode === "ai-archive"
            ? "⚡ Run AI Pattern Analysis (Using Web & Master Archive)"
            : `⚡ Process ${uploadedFiles.length} Uploaded Papers & Predict`}
        </span>
      </button>
    </div>
  );
};
