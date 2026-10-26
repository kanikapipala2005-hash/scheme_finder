export type State = string;

export type Location = "rural" | "urban";

export type AgeGroup = "child" | "student" | "youth" | "adult" | "senior";

export type Gender = "male" | "female" | "other" | "na";

export type Occupation =
  | "student"
  | "farmer"
  | "unemployed"
  | "self-employed"
  | "labour"
  | "salaried"
  | "homemaker"
  | "retired";

export type Category = "sc" | "st" | "obc" | "general" | "ews" | "minority";

export type IncomeRange = "<1L" | "1-2.5L" | "2.5-5L" | "5-8L" | ">8L";

export interface UserProfile {
  state: State;
  location: Location;
  ageGroup: AgeGroup;
  gender: Gender;
  occupation: Occupation;
  incomeRange: IncomeRange;
  category: Category;
  familySize: number;
  hasBplCard: boolean;
  hasDisability: boolean;
  ownsPuccaHouse: boolean;
}

export type SchemeCategory =
  | "education"
  | "healthcare"
  | "agriculture"
  | "employment"
  | "housing"
  | "social-welfare";

export interface EligibilityCriteria {
  minAge?: number | null;
  maxAge?: number | null;
  incomeMax?: number | null;
  occupation?: Occupation[] | null;
  category?: Category[] | null;
  gender?: Gender[] | null;
  location?: Location[] | null;
  bplCard?: boolean;
  ownsPuccaHouse?: boolean;
}

export interface Scheme {
  id: string;
  name: string;
  nameHindi: string;
  ministry: string;
  category: SchemeCategory;
  purpose: string;
  intendedBeneficiaries: string[];
  benefits: string;
  eligibilityCriteria: EligibilityCriteria;
  requiredDocuments: string[];
  officialLink: string;
  applicationProcess: string[];
}

export type EligibilityStatus =
  | "potentially-eligible"
  | "more-info-required"
  | "not-met";

export interface EligibilityCheck {
  rule: string;
  passed: boolean | null;
  detail: string;
}

export interface EligibilityResult {
  status: EligibilityStatus;
  score: number;
  checks: EligibilityCheck[];
}
