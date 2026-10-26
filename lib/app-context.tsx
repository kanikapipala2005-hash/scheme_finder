"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export type Language = "en" | "hi";

interface AppState {
  language: Language;
  setLanguage: (lang: Language) => void;
  shortlist: string[];
  toggleShortlist: (id: string) => void;
  isShortlisted: (id: string) => boolean;
  clearShortlist: () => void;
}

const AppContext = createContext<AppState | undefined>(undefined);

const SHORTLIST_KEY = "schemesaathi-shortlist";

export function AppProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");
  const [shortlist, setShortlist] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(SHORTLIST_KEY);
    if (saved) {
      try {
        setShortlist(JSON.parse(saved));
      } catch {
        setShortlist([]);
      }
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) {
      localStorage.setItem(SHORTLIST_KEY, JSON.stringify(shortlist));
    }
  }, [shortlist, hydrated]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("schemesaathi-lang", lang);
  };

  const toggleShortlist = (id: string) => {
    setShortlist((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const isShortlisted = (id: string) => shortlist.includes(id);

  const clearShortlist = () => setShortlist([]);

  return (
    <AppContext.Provider
      value={{ language, setLanguage, shortlist, toggleShortlist, isShortlisted, clearShortlist }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
