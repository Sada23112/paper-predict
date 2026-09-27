"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { UserProfile, GradeLevel } from "@/types";

interface AuthContextType {
  user: UserProfile | null;
  isLoading: boolean;
  login: (email: string, name?: string) => void;
  signup: (name: string, email: string, grade?: GradeLevel, school?: string) => void;
  quickDemoLogin: () => void;
  logout: () => void;
  updateUserData: (updates: Partial<UserProfile>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Restore session from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem("paperpredict_auth_user");
      if (stored) {
        setUser(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Failed to load user session", e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Helper to gather existing guest data
  const getExistingGuestData = () => {
    let claimedFree: string | null = null;
    let paid: string[] = [];
    try {
      claimedFree = localStorage.getItem("paperpredict_free_subject_id");
      const savedPaid = localStorage.getItem("paperpredict_paid_subjects");
      if (savedPaid) paid = JSON.parse(savedPaid);
    } catch {}
    return { claimedFree, paid };
  };

  const login = (email: string, name?: string) => {
    const { claimedFree, paid } = getExistingGuestData();
    const newUser: UserProfile = {
      id: `usr_${Date.now()}`,
      name: name || email.split("@")[0],
      email,
      claimedFreeSubjectId: claimedFree,
      paidUnlockedSubjects: paid,
      preparedQuestions: {},
      createdAt: new Date().toISOString(),
    };
    setUser(newUser);
    try {
      localStorage.setItem("paperpredict_auth_user", JSON.stringify(newUser));
    } catch {}
  };

  const signup = (name: string, email: string, grade?: GradeLevel, school?: string) => {
    const { claimedFree, paid } = getExistingGuestData();
    const newUser: UserProfile = {
      id: `usr_${Date.now()}`,
      name,
      email,
      grade,
      school,
      claimedFreeSubjectId: claimedFree,
      paidUnlockedSubjects: paid,
      preparedQuestions: {},
      createdAt: new Date().toISOString(),
    };
    setUser(newUser);
    try {
      localStorage.setItem("paperpredict_auth_user", JSON.stringify(newUser));
    } catch {}
  };

  const quickDemoLogin = () => {
    const { claimedFree, paid } = getExistingGuestData();
    const demoUser: UserProfile = {
      id: `demo_${Date.now()}`,
      name: "Aman Sharma",
      email: "aman.cbse2026@gmail.com",
      grade: "class-10",
      school: "KV IIT Guwahati",
      claimedFreeSubjectId: claimedFree || "class-10-science",
      paidUnlockedSubjects: paid,
      preparedQuestions: {},
      createdAt: new Date().toISOString(),
    };
    setUser(demoUser);
    try {
      localStorage.setItem("paperpredict_auth_user", JSON.stringify(demoUser));
    } catch {}
  };

  const logout = () => {
    setUser(null);
    try {
      localStorage.removeItem("paperpredict_auth_user");
    } catch {}
  };

  const updateUserData = (updates: Partial<UserProfile>) => {
    setUser((prev) => {
      if (!prev) return null;
      const updated = { ...prev, ...updates };
      try {
        localStorage.setItem("paperpredict_auth_user", JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        signup,
        quickDemoLogin,
        logout,
        updateUserData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
