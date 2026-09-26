"use client";

import React, { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { ExamSelector } from "@/components/ExamSelector";
import { AnalysisProgress } from "@/components/AnalysisProgress";
import { AnalysisResults } from "@/components/AnalysisResults";
import { PrintablePaper } from "@/components/PrintablePaper";
import { PaymentModal } from "@/components/PaymentModal";
import { CBSE_DATASETS } from "@/data/cbseData";
import { GradeLevel, SourceMode } from "@/types";
import {
  Flame,
  CheckCircle2,
  TrendingUp,
  Award,
  Sparkles,
  HelpCircle,
  Share2,
  Gift,
} from "lucide-react";

export default function Home() {
  const [selectedGrade, setSelectedGrade] = useState<GradeLevel>("class-10");
  const [selectedSubject, setSelectedSubject] = useState<string>("class-10-science");
  const [sourceMode, setSourceMode] = useState<SourceMode>("ai-archive");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [hasAnalyzed, setHasAnalyzed] = useState(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [isPrintOpen, setIsPrintOpen] = useState(false);

  // 1-Time Free Subject & Paid Unlocks
  const [claimedFreeSubjectId, setClaimedFreeSubjectId] = useState<string | null>(null);
  const [paidUnlockedSubjects, setPaidUnlockedSubjects] = useState<string[]>([]);
  const [showClaimToast, setShowClaimToast] = useState(false);

  // Load from localStorage on client mount
  useEffect(() => {
    try {
      const savedFree = localStorage.getItem("paperpredict_free_subject_id");
      if (savedFree) setClaimedFreeSubjectId(savedFree);

      const savedPaid = localStorage.getItem("paperpredict_paid_subjects");
      if (savedPaid) setPaidUnlockedSubjects(JSON.parse(savedPaid));
    } catch {
      // LocalStorage fallback for private browsing
    }
  }, []);

  const currentDataset = CBSE_DATASETS[selectedSubject] || CBSE_DATASETS["class-10-science"];

  // Subject is unlocked if:
  // 1. It is the user's 1-time claimed free subject
  // 2. OR user paid for this single subject
  // 3. OR user has the "all-subjects" board pass
  const isCurrentSubjectFreeClaimed = claimedFreeSubjectId === selectedSubject;
  const isCurrentSubjectUnlocked =
    isCurrentSubjectFreeClaimed ||
    paidUnlockedSubjects.includes(selectedSubject) ||
    paidUnlockedSubjects.includes("all-subjects");

  const claimedSubjectName = claimedFreeSubjectId
    ? CBSE_DATASETS[claimedFreeSubjectId]?.subject.name || claimedFreeSubjectId
    : undefined;

  const handleStartAnalysis = () => {
    setIsAnalyzing(true);
    setHasAnalyzed(false);
  };

  const handleAnalysisComplete = () => {
    setIsAnalyzing(false);
    setHasAnalyzed(true);

    // If student has NOT claimed their 1 free subject yet, automatically grant this subject for free!
    if (!claimedFreeSubjectId) {
      setClaimedFreeSubjectId(selectedSubject);
      try {
        localStorage.setItem("paperpredict_free_subject_id", selectedSubject);
      } catch {
        // Safe fallback
      }
      setShowClaimToast(true);
      setTimeout(() => setShowClaimToast(false), 6000);
    }
  };

  const handlePaymentSuccess = (tier: "single" | "all") => {
    let updatedPaid: string[];
    if (tier === "all") {
      updatedPaid = Array.from(new Set([...paidUnlockedSubjects, "all-subjects"]));
    } else {
      updatedPaid = Array.from(new Set([...paidUnlockedSubjects, selectedSubject]));
    }
    setPaidUnlockedSubjects(updatedPaid);
    try {
      localStorage.setItem("paperpredict_paid_subjects", JSON.stringify(updatedPaid));
    } catch {
      // Safe fallback
    }
  };

  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(
      `🔥 Bhai! Check this AI tool that predicts CBSE 2026 board exam questions with probability percentages based on the last 5 years' papers:\n\n👉 https://paperpredict.in\n\nIt gives 1 complete subject 100% FREE as a sample with full marking schemes!`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-zinc-50 font-sans text-zinc-900 antialiased dark:bg-zinc-950 dark:text-zinc-50">
      {/* Navigation Header */}
      <Header
        onShareWhatsApp={handleShareWhatsApp}
        onOpenPricing={() => setIsPaymentOpen(true)}
        freeClaimed={Boolean(claimedFreeSubjectId)}
      />

      {/* Main Container */}
      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-12">
        {/* Hero Section */}
        <section className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-100/70 px-3.5 py-1 text-xs font-bold text-orange-800 dark:border-orange-900/50 dark:bg-orange-950/50 dark:text-orange-300">
            <Flame className="h-3.5 w-3.5 fill-orange-500 text-orange-500" />
            <span>CBSE 2026 Examination Prediction Engine</span>
          </div>

          <h1 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-5xl text-zinc-900 dark:text-white">
            Predict Your 2026 Exam Questions with{" "}
            <span className="bg-gradient-to-r from-orange-600 via-amber-600 to-rose-600 bg-clip-text text-transparent">
              Statistical Pattern Probability
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-sm sm:text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
            Stop memorizing 500 pages blindly. Our AI engine processes 6 years of CBSE All-India
            and Delhi question papers to uncover alternating-year cycles, recurring derivations, and
            high-probability 5-markers.
          </p>

          {/* Social Proof Strip */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs font-medium text-zinc-500 dark:text-zinc-400">
            <span className="flex items-center gap-1">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
              Over 190+ PYQs per subject analyzed
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <TrendingUp className="h-3.5 w-3.5 text-orange-500" />
              92% Historical topic recurrence
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Award className="h-3.5 w-3.5 text-amber-500" />
              Official CBSE marking scheme format
            </span>
          </div>

          {/* 1-Time Free Subject Launch Banner */}
          {!claimedFreeSubjectId ? (
            <div className="mt-8 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-emerald-500/10 border border-emerald-300 dark:border-emerald-800/80 p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-left shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-600 text-white shrink-0 shadow-md shadow-emerald-600/20">
                  <Gift className="h-6 w-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-emerald-950 dark:text-emerald-100">
                      Student Launch Offer: Your 1st Subject Prediction is 100% FREE!
                    </span>
                    <span className="rounded-full bg-emerald-200/80 px-2 py-0.5 text-[10px] font-extrabold text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-200 uppercase">
                      Sample Pass
                    </span>
                  </div>
                  <p className="text-xs text-emerald-800/90 dark:text-emerald-300/80 mt-0.5">
                    Select your main subject below and run the analysis. You get the full predicted paper, all questions, and official marking hints with zero payment required.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="mt-8 rounded-2xl bg-zinc-100 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700/60 p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                <span>
                  Free 1-Subject Trial claimed on <strong>{claimedSubjectName}</strong> (All questions unlocked).
                </span>
              </div>
              <button
                onClick={() => setIsPaymentOpen(true)}
                className="text-orange-600 dark:text-orange-400 font-bold hover:underline shrink-0"
              >
                Unlock Other Subjects (₹49) →
              </button>
            </div>
          )}
        </section>

        {/* Interactive Workspace */}
        <section className="mt-10 space-y-8">
          <ExamSelector
            selectedGrade={selectedGrade}
            selectedSubject={selectedSubject}
            sourceMode={sourceMode}
            onGradeChange={(grade) => {
              setSelectedGrade(grade);
              setHasAnalyzed(false);
            }}
            onSubjectChange={(subj) => {
              setSelectedSubject(subj);
              setHasAnalyzed(false);
            }}
            onSourceModeChange={(mode) => {
              setSourceMode(mode);
              setHasAnalyzed(false);
            }}
            onStartAnalysis={handleStartAnalysis}
            isAnalyzing={isAnalyzing}
          />

          {/* Scanning Progress */}
          {isAnalyzing && (
            <AnalysisProgress
              subjectName={currentDataset.subject.name}
              sourceMode={sourceMode}
              onComplete={handleAnalysisComplete}
            />
          )}

          {/* Analysis Results Display */}
          {hasAnalyzed && !isAnalyzing && (
            <AnalysisResults
              data={currentDataset}
              isUnlocked={isCurrentSubjectUnlocked}
              isFreeClaimedForThis={isCurrentSubjectFreeClaimed}
              claimedFreeSubjectName={claimedSubjectName}
              onUnlockClick={() => setIsPaymentOpen(true)}
              onOpenPrintView={() => setIsPrintOpen(true)}
            />
          )}
        </section>

        {/* Viral Classmate Referral Banner */}
        <section className="mt-16 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-700 p-6 text-white shadow-xl sm:p-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <span className="rounded-full bg-emerald-800/80 px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider text-emerald-200">
                Help Your Study Group
              </span>
              <h3 className="mt-2 text-xl font-bold sm:text-2xl">
                Sharing with your class group?
              </h3>
              <p className="mt-1 max-w-lg text-xs sm:text-sm text-emerald-100">
                Send the predicted question list to your school or coaching WhatsApp group.
                Study high-probability topics together to score 90%+ in CBSE 2026.
              </p>
            </div>
            <button
              onClick={handleShareWhatsApp}
              className="flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-xs sm:text-sm font-bold text-emerald-900 shadow-md transition hover:bg-emerald-50 active:scale-95 shrink-0"
            >
              <Share2 className="h-4 w-4 text-emerald-700" />
              <span>Forward on WhatsApp</span>
            </button>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mt-16 space-y-6">
          <div className="text-center">
            <h3 className="text-xl font-bold text-zinc-900 dark:text-white">
              Frequently Asked Questions
            </h3>
            <p className="text-xs text-zinc-500">
              Everything you need to know about the AI prediction algorithm
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
              <h4 className="flex items-center gap-2 font-bold text-sm text-zinc-900 dark:text-white">
                <HelpCircle className="h-4 w-4 text-orange-500" />
                How does the AI predict questions?
              </h4>
              <p className="mt-2 text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                CBSE question papers follow clear structural cycles. Questions on key concepts rotate
                on a 2-year cycle (e.g. asked in 2021 and 2023, skipped in 2024, highly probable for 2026).
                Our algorithm maps all past 6 years against syllabus unit weightage to calculate probability percentages.
              </p>
            </div>

            <div className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
              <h4 className="flex items-center gap-2 font-bold text-sm text-zinc-900 dark:text-white">
                <HelpCircle className="h-4 w-4 text-orange-500" />
                Can I print the paper on an A4 sheet?
              </h4>
              <p className="mt-2 text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Yes! Click the &quot;Print / PDF View&quot; button at any time. It formats the predicted
                paper with an authentic CBSE header, section headers, instructions, and marks breakdown, ready
                for saving as PDF or printing for mock tests.
              </p>
            </div>

            <div className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
              <h4 className="flex items-center gap-2 font-bold text-sm text-zinc-900 dark:text-white">
                <HelpCircle className="h-4 w-4 text-orange-500" />
                Does it cover the 50% Competency Pattern?
              </h4>
              <p className="mt-2 text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Yes, our predicted papers strictly reflect the latest CBSE directive requiring 50%
                competency-based, case-study, and analytical questions (Section E), as well as Assertion-Reasoning
                in Section A.
              </p>
            </div>

            <div className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
              <h4 className="flex items-center gap-2 font-bold text-sm text-zinc-900 dark:text-white">
                <HelpCircle className="h-4 w-4 text-orange-500" />
                How does payment unlock work?
              </h4>
              <p className="mt-2 text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                You can pay ₹49 via any standard UPI app (GPay, PhonePe, Paytm). Enter your 12-digit
                transaction UTR number to immediately unlock all 39 questions, step-by-step marking schemes,
                and answer keys.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-20 border-t border-zinc-200 py-8 text-center text-xs text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
        <p>© 2026 PaperPredict AI. Designed for CBSE Class 10 & 12 Board Aspirants.</p>
        <p className="mt-1 text-[11px] text-zinc-400">
          Disclaimer: This is an analytical tool based on historical patterns and marking schemes. Study all prescribed NCERT chapters.
        </p>
      </footer>

      {/* Payment / UPI Modal */}
      <PaymentModal
        isOpen={isPaymentOpen}
        onClose={() => setIsPaymentOpen(false)}
        onSuccessUnlock={handlePaymentSuccess}
        subjectName={currentDataset.subject.name}
        freeClaimedSubjectName={claimedSubjectName}
      />

      {/* Printable Exam Paper Modal */}
      {isPrintOpen && (
        <PrintablePaper
          data={currentDataset}
          onClose={() => setIsPrintOpen(false)}
        />
      )}

      {/* Free Sample Claimed Notification Toast */}
      {showClaimToast && (
        <div className="fixed bottom-6 right-6 z-50 max-w-sm rounded-2xl bg-emerald-700 p-4 text-white shadow-2xl flex items-center gap-3 border border-emerald-500 animate-in slide-in-from-bottom duration-300">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-emerald-700 font-bold">
            <Gift className="h-5 w-5" />
          </div>
          <div>
            <div className="font-bold text-xs sm:text-sm">🎉 100% Free Sample Unlocked!</div>
            <div className="text-[11px] sm:text-xs text-emerald-100 mt-0.5">
              <strong>{currentDataset.subject.name}</strong> is your free sample subject. All 39 questions, derivations & marking schemes are unlocked!
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
