"use client";

import React, { useState } from "react";
import { Check, Copy, Flame, Lock, QrCode, ShieldCheck, Sparkles, X, Smartphone } from "lucide-react";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccessUnlock: (tier: "single" | "all") => void;
  subjectName: string;
  freeClaimedSubjectName?: string;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  onSuccessUnlock,
  subjectName,
  freeClaimedSubjectName,
}) => {
  const [tier, setTier] = useState<"single" | "all">("single");
  const [utrNumber, setUtrNumber] = useState("");
  const [copied, setCopied] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  if (!isOpen) return null;

  const price = tier === "single" ? 49 : 149;
  const upiId = "paperpredict@upi";

  const handleCopyUpi = () => {
    navigator.clipboard.writeText(upiId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleVerify = () => {
    if (!utrNumber || utrNumber.trim().length < 6) {
      setErrorMsg("Please enter a valid 12-digit UPI UTR / Ref Number from your payment receipt.");
      return;
    }
    setErrorMsg("");
    setIsVerifying(true);

    setTimeout(() => {
      setIsVerifying(false);
      onSuccessUnlock(tier);
      onClose();
    }, 1200);
  };

  const handleInstantDemoUnlock = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      onSuccessUnlock(tier);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-zinc-950/80 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-lg rounded-2xl border border-zinc-200 bg-white p-6 shadow-2xl dark:border-zinc-800 dark:bg-zinc-900 sm:p-7">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-lg p-1.5 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-600 dark:hover:bg-zinc-800"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Header */}
        <div className="text-center">
          <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-orange-500 to-rose-500 text-white shadow-md shadow-orange-500/20">
            <Sparkles className="h-6 w-6" />
          </div>

          {freeClaimedSubjectName && (
            <div className="mb-1.5 inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-0.5 text-[11px] font-bold text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
              <span>Free 1-Subject Trial Used on {freeClaimedSubjectName}</span>
            </div>
          )}

          <h3 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white">
            Unlock Full 2026 Examination Predictions
          </h3>
          <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
            Instant UPI micro-payment • Zero recurring subscription • Lifetime exam access
          </p>
        </div>

        {/* Plan Tiers */}
        <div className="mt-5 grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => setTier("single")}
            className={`rounded-xl border p-3 text-left transition-all ${
              tier === "single"
                ? "border-orange-500 bg-orange-50/60 ring-2 ring-orange-500/30 dark:bg-orange-950/30"
                : "border-zinc-200 hover:border-zinc-300 dark:border-zinc-800"
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-zinc-900 dark:text-white">Single Subject</span>
              <span className="text-base font-extrabold text-orange-600">₹49</span>
            </div>
            <p className="mt-1 text-[11px] text-zinc-500 leading-tight">
              {subjectName} Full Paper + Model Marking Scheme
            </p>
          </button>

          <button
            type="button"
            onClick={() => setTier("all")}
            className={`rounded-xl border p-3 text-left relative transition-all ${
              tier === "all"
                ? "border-orange-500 bg-orange-50/60 ring-2 ring-orange-500/30 dark:bg-orange-950/30"
                : "border-zinc-200 hover:border-zinc-300 dark:border-zinc-800"
            }`}
          >
            <span className="absolute -top-2 right-2 rounded-full bg-rose-600 px-1.5 py-0.2 text-[9px] font-bold text-white uppercase tracking-wider">
              Save 40%
            </span>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-zinc-900 dark:text-white">All-Subject Pass</span>
              <span className="text-base font-extrabold text-orange-600">₹149</span>
            </div>
            <p className="mt-1 text-[11px] text-zinc-500 leading-tight">
              All 5 Subjects for CBSE Class Board Exam
            </p>
          </button>
        </div>

        {/* UPI Payment Box */}
        <div className="mt-5 rounded-2xl bg-zinc-50 p-4 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700/60">
          <div className="flex items-center justify-between text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-3">
            <span className="flex items-center gap-1.5">
              <Smartphone className="h-4 w-4 text-orange-500" />
              <span>Scan & Pay via any UPI App</span>
            </span>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-100 dark:bg-emerald-950/60 px-2 py-0.5 rounded">
              GPay / PhonePe / Paytm
            </span>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            {/* Mock QR Code Graphic */}
            <div className="flex flex-col items-center justify-center rounded-xl bg-white p-3 shadow-inner dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shrink-0">
              <div className="flex h-28 w-28 items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
                <QrCode className="h-20 w-20 text-zinc-900 dark:text-white" />
              </div>
              <span className="mt-1 text-[10px] font-bold text-zinc-500">Amount: ₹{price}</span>
            </div>

            {/* UPI ID Copy & Instructions */}
            <div className="space-y-2 text-xs flex-1 w-full">
              <div>
                <span className="text-[11px] text-zinc-400">Or Pay to UPI VPA ID:</span>
                <div className="mt-0.5 flex items-center justify-between rounded-lg border border-zinc-200 bg-white px-2.5 py-1.5 dark:border-zinc-700 dark:bg-zinc-900">
                  <span className="font-mono font-bold text-zinc-900 dark:text-white text-xs">
                    {upiId}
                  </span>
                  <button
                    onClick={handleCopyUpi}
                    className="flex items-center gap-1 text-[11px] font-semibold text-orange-600 hover:text-orange-700"
                  >
                    {copied ? <Check className="h-3 w-3 text-emerald-500" /> : <Copy className="h-3 w-3" />}
                    <span>{copied ? "Copied" : "Copy"}</span>
                  </button>
                </div>
              </div>

              {/* UTR Input */}
              <div>
                <label className="text-[11px] font-semibold text-zinc-600 dark:text-zinc-300 block mb-1">
                  Enter 12-Digit UPI Ref / UTR No:
                </label>
                <input
                  type="text"
                  placeholder="e.g. 427819034567"
                  value={utrNumber}
                  onChange={(e) => setUtrNumber(e.target.value)}
                  className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-1.5 text-xs text-zinc-900 focus:border-orange-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-900 dark:text-white"
                />
              </div>

              {errorMsg && <p className="text-[10px] text-rose-500">{errorMsg}</p>}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-5 space-y-2.5">
          <button
            type="button"
            disabled={isVerifying}
            onClick={handleVerify}
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-orange-600 py-3 px-4 text-xs sm:text-sm font-bold text-white shadow-md hover:bg-orange-700 transition disabled:opacity-50"
          >
            <ShieldCheck className="h-4 w-4" />
            <span>{isVerifying ? "Verifying Transaction..." : `Confirm Payment & Unlock (₹${price})`}</span>
          </button>

          {/* Developer / Demo Instant Unlock Button */}
          <button
            type="button"
            onClick={handleInstantDemoUnlock}
            className="w-full text-center text-[11px] text-zinc-500 hover:text-orange-600 dark:hover:text-orange-400 py-1 transition flex items-center justify-center gap-1"
          >
            <span>⚡ Click here for Instant Demo Unlock (For testing UI)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
