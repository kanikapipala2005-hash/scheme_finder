"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import type { UserProfile } from "./types";

const defaultProfile: UserProfile = {
  state: "Madhya Pradesh",
  location: "rural",
  ageGroup: "youth",
  gender: "male",
  occupation: "student",
  incomeRange: "1-2.5L",
  category: "general",
  familySize: 4,
  hasBplCard: false,
  hasDisability: false,
  ownsPuccaHouse: false,
};

interface FormState {
  profile: UserProfile;
  setProfile: (p: Partial<UserProfile>) => void;
  reset: () => void;
}

const FormContext = createContext<FormState | undefined>(undefined);

const PROFILE_KEY = "schemesaathi-profile";

export function FormProvider({ children }: { children: ReactNode }) {
  const [profile, setProfileState] = useState<UserProfile>(defaultProfile);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(PROFILE_KEY);
    if (saved) {
      try {
        setProfileState({ ...defaultProfile, ...JSON.parse(saved) });
      } catch {
        /* ignore */
      }
    }
    setHydrated(true);
  }, []);

  const setProfile = (p: Partial<UserProfile>) => {
    setProfileState((prev) => {
      const next = { ...prev, ...p };
      if (hydrated) localStorage.setItem(PROFILE_KEY, JSON.stringify(next));
      return next;
    });
  };

  const reset = () => {
    setProfileState(defaultProfile);
    localStorage.setItem(PROFILE_KEY, JSON.stringify(defaultProfile));
  };

  return (
    <FormContext.Provider value={{ profile, setProfile, reset }}>
      {children}
    </FormContext.Provider>
  );
}

export function useForm() {
  const ctx = useContext(FormContext);
  if (!ctx) throw new Error("useForm must be used within FormProvider");
  return ctx;
}
