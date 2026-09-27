"use client";

import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { GradeLevel } from "@/types";
import {
  X,
  User,
  Mail,
  Lock,
  GraduationCap,
  Sparkles,
  CloudCheck,
  ShieldCheck,
  Check,
} from "lucide-react";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const { login, signup, quickDemoLogin, user } = useAuth();
  const [tab, setTab] = useState<"signin" | "signup">("signin");

  // Form states
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [grade, setGrade] = useState<GradeLevel>("class-10");
  const [school, setSchool] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setErrorMsg("Please enter a valid email address.");
      return;
    }

    if (tab === "signup") {
      if (!name.trim()) {
        setErrorMsg("Please enter your name.");
        return;
      }
      signup(name, email, grade, school);
    } else {
      login(email, name);
    }

    setErrorMsg("");
    onClose();
  };

  const handleDemoClick = () => {
    quickDemoLogin();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-zinc-950/80 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-6 shadow-2xl dark:border-zinc-800 dark:bg-zinc-900 sm:p-7">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-lg p-1.5 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-600 dark:hover:bg-zinc-800"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Header */}
        <div className="text-center">
          <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-orange-500 to-amber-500 text-white shadow-md shadow-orange-500/20">
            <GraduationCap className="h-6 w-6" />
          </div>
          <h3 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white">
            {tab === "signin" ? "Student Account Sign In" : "Create Student Account"}
          </h3>
          <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
            Sync your revision checklist, unlocked papers, and scores across mobile and laptop
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="mt-5 grid grid-cols-2 rounded-xl bg-zinc-100 p-1 dark:bg-zinc-800">
          <button
            type="button"
            onClick={() => {
              setTab("signin");
              setErrorMsg("");
            }}
            className={`rounded-lg py-1.5 text-xs font-bold transition ${
              tab === "signin"
                ? "bg-white text-zinc-900 shadow-sm dark:bg-zinc-700 dark:text-white"
                : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300"
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => {
              setTab("signup");
              setErrorMsg("");
            }}
            className={`rounded-lg py-1.5 text-xs font-bold transition ${
              tab === "signup"
                ? "bg-white text-zinc-900 shadow-sm dark:bg-zinc-700 dark:text-white"
                : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300"
            }`}
          >
            New Student (Sign Up)
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-4 space-y-3">
          {tab === "signup" && (
            <div>
              <label className="block text-[11px] font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                Your Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-2.5 h-4 w-4 text-zinc-400" />
                <input
                  type="text"
                  placeholder="e.g. Rahul Sharma"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-xl border border-zinc-300 bg-white py-2 pl-9 pr-3 text-xs text-zinc-900 focus:border-orange-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-[11px] font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-2.5 h-4 w-4 text-zinc-400" />
              <input
                type="email"
                placeholder="student@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-zinc-300 bg-white py-2 pl-9 pr-3 text-xs text-zinc-900 focus:border-orange-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-2.5 h-4 w-4 text-zinc-400" />
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-zinc-300 bg-white py-2 pl-9 pr-3 text-xs text-zinc-900 focus:border-orange-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
              />
            </div>
          </div>

          {tab === "signup" && (
            <>
              <div>
                <label className="block text-[11px] font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                  Target Exam Class
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setGrade("class-10")}
                    className={`rounded-lg py-1.5 text-xs font-semibold border ${
                      grade === "class-10"
                        ? "border-orange-500 bg-orange-50 text-orange-900 dark:bg-orange-950/60 dark:text-orange-200"
                        : "border-zinc-200 text-zinc-600 dark:border-zinc-700 dark:text-zinc-400"
                    }`}
                  >
                    CBSE Class 10
                  </button>
                  <button
                    type="button"
                    onClick={() => setGrade("class-12")}
                    className={`rounded-lg py-1.5 text-xs font-semibold border ${
                      grade === "class-12"
                        ? "border-orange-500 bg-orange-50 text-orange-900 dark:bg-orange-950/60 dark:text-orange-200"
                        : "border-zinc-200 text-zinc-600 dark:border-zinc-700 dark:text-zinc-400"
                    }`}
                  >
                    CBSE Class 12
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                  School / City (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. DPS Guwahati / KV Khanapara"
                  value={school}
                  onChange={(e) => setSchool(e.target.value)}
                  className="w-full rounded-xl border border-zinc-300 bg-white py-2 px-3 text-xs text-zinc-900 focus:border-orange-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
                />
              </div>
            </>
          )}

          {errorMsg && <p className="text-[11px] text-rose-500">{errorMsg}</p>}

          <button
            type="submit"
            className="w-full mt-2 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 py-2.5 text-xs font-bold text-white shadow-md hover:brightness-110 transition"
          >
            {tab === "signin" ? "Sign In & Sync My Progress" : "Create Account & Enable Cloud Sync"}
          </button>
        </form>

        {/* Instant Demo Login Button */}
        <div className="mt-4 pt-3 border-t border-zinc-100 text-center dark:border-zinc-800">
          <button
            type="button"
            onClick={handleDemoClick}
            className="text-[11px] text-zinc-500 hover:text-orange-600 dark:hover:text-orange-400 transition flex items-center justify-center gap-1.5 mx-auto"
          >
            <Sparkles className="h-3.5 w-3.5 text-orange-500" />
            <span>⚡ 1-Click Student Login (Instant Demo Profile)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
