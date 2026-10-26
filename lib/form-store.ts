import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { UserProfile } from "./types";

interface FormState {
  profile: UserProfile;
  setProfile: (p: Partial<UserProfile>) => void;
  reset: () => void;
}

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

export const useFormStore = create<FormState>()(
  persist(
    (set) => ({
      profile: defaultProfile,
      setProfile: (p) =>
        set((state) => ({ profile: { ...state.profile, ...p } })),
      reset: () => set({ profile: defaultProfile }),
    }),
    { name: "schemesaathi-profile" }
  )
);
