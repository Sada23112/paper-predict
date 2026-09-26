"use client";

import React from "react";
import { Sparkles, Share2, Flame, GraduationCap, ShieldCheck, Gift } from "lucide-react";

interface HeaderProps {
  onShareWhatsApp: () => void;
  onOpenPricing: () => void;
  freeClaimed: boolean;
}

export const Header: React.FC<HeaderProps> = ({ onShareWhatsApp, onOpenPricing, freeClaimed }) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-zinc-200/80 bg-white/90 backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-950/90">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        {/* Brand Logo & Tagline */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-amber-500 via-orange-500 to-rose-600 shadow-md shadow-orange-500/20 text-white">
            <GraduationCap className="h-6 w-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white">
                Paper<span className="text-orange-600 dark:text-orange-500">Predict</span>
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-orange-100 px-2 py-0.5 text-xs font-semibold text-orange-700 dark:bg-orange-950/60 dark:text-orange-400">
                <Sparkles className="h-3 w-3" /> AI 2026
              </span>
            </div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 hidden sm:block">
              Historical PYQ Pattern & Probability Engine
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="hidden md:flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-2.5 py-1 rounded-full border border-emerald-200/60 dark:border-emerald-800/40">
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>92% Topic Repeat Accuracy</span>
          </div>

          <button
            onClick={onShareWhatsApp}
            className="flex items-center gap-1.5 rounded-lg border border-emerald-600/30 bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-700 transition-colors hover:bg-emerald-100 dark:bg-emerald-950/40 dark:text-emerald-300 dark:hover:bg-emerald-900/40"
          >
            <Share2 className="h-3.5 w-3.5 text-emerald-600" />
            <span className="hidden sm:inline">Share on WhatsApp</span>
            <span className="sm:hidden">Share</span>
          </button>

          <button
            onClick={onOpenPricing}
            className={`flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 text-xs font-semibold shadow-sm transition-all ${
              !freeClaimed
                ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:brightness-110 shadow-emerald-500/20"
                : "bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200"
            }`}
          >
            {!freeClaimed ? (
              <>
                <Gift className="h-3.5 w-3.5 text-emerald-200" />
                <span>1 Free Subject Ready</span>
              </>
            ) : (
              <>
                <Flame className="h-3.5 w-3.5 text-orange-400 fill-orange-400" />
                <span>Pass ₹49</span>
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
