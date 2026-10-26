"use client";

import { useRouter } from "next/navigation";
import { useForm } from "@/lib/form-store";
import { useApp } from "@/lib/app-context";
import { t } from "@/lib/i18n";
import { INDIAN_STATES } from "@/lib/states";
import type {
  AgeGroup,
  Category,
  Gender,
  IncomeRange,
  Location,
  Occupation,
} from "@/lib/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import {
  MapPin,
  Home as HomeIcon,
  User,
  Briefcase,
  IndianRupee,
  Users,
  CreditCard,
  Accessibility,
  Building2,
  Search,
  Sparkles,
} from "lucide-react";

const ageGroups: { value: AgeGroup; labelEn: string; labelHi: string }[] = [
  { value: "child", labelEn: "Child (0-12)", labelHi: "बालक (0-12)" },
  { value: "student", labelEn: "Student (6-18)", labelHi: "छात्र (6-18)" },
  { value: "youth", labelEn: "Youth (18-35)", labelHi: "युवा (18-35)" },
  { value: "adult", labelEn: "Adult (36-60)", labelHi: "वयस्क (36-60)" },
  { value: "senior", labelEn: "Senior (60+)", labelHi: "वरिष्ठ (60+)" },
];

const genders: { value: Gender; labelEn: string; labelHi: string }[] = [
  { value: "male", labelEn: "Male", labelHi: "पुरुष" },
  { value: "female", labelEn: "Female", labelHi: "महिला" },
  { value: "other", labelEn: "Other", labelHi: "अन्य" },
  { value: "na", labelEn: "Prefer not to say", labelHi: "नहीं बताना चाहते" },
];

const occupations: { value: Occupation; labelEn: string; labelHi: string }[] = [
  { value: "student", labelEn: "Student", labelHi: "छात्र" },
  { value: "farmer", labelEn: "Farmer", labelHi: "किसान" },
  { value: "unemployed", labelEn: "Unemployed", labelHi: "बेरोजगार" },
  { value: "self-employed", labelEn: "Self-Employed", labelHi: "स्वरोजगार" },
  { value: "labour", labelEn: "Labour", labelHi: "मजदूर" },
  { value: "salaried", labelEn: "Salaried", labelHi: "वेतनभोगी" },
  { value: "homemaker", labelEn: "Homemaker", labelHi: "गृहिणी" },
  { value: "retired", labelEn: "Retired", labelHi: "सेवानिवृत्त" },
];

const categories: { value: Category; labelEn: string; labelHi: string }[] = [
  { value: "sc", labelEn: "SC", labelHi: "एससी" },
  { value: "st", labelEn: "ST", labelHi: "एसटी" },
  { value: "obc", labelEn: "OBC", labelHi: "ओबीसी" },
  { value: "general", labelEn: "General", labelHi: "सामान्य" },
  { value: "ews", labelEn: "EWS", labelHi: "ईडब्ल्यूएस" },
  { value: "minority", labelEn: "Minority", labelHi: "अल्पसंख्यक" },
];

const incomeRanges: { value: IncomeRange; labelEn: string; labelHi: string; index: number }[] = [
  { value: "<1L", labelEn: "Below ₹1 Lakh", labelHi: "₹1 लाख से कम", index: 0 },
  { value: "1-2.5L", labelEn: "₹1 - 2.5 Lakh", labelHi: "₹1 - 2.5 लाख", index: 1 },
  { value: "2.5-5L", labelEn: "₹2.5 - 5 Lakh", labelHi: "₹2.5 - 5 लाख", index: 2 },
  { value: "5-8L", labelEn: "₹5 - 8 Lakh", labelHi: "₹5 - 8 लाख", index: 3 },
  { value: ">8L", labelEn: "Above ₹8 Lakh", labelHi: "₹8 लाख से अधिक", index: 4 },
];

function YesNoToggle({
  value,
  onChange,
  lang,
}: {
  value: boolean;
  onChange: (v: boolean) => void;
  lang: "en" | "hi";
}) {
  return (
    <div className="grid grid-cols-2 gap-2">
      <button
        type="button"
        onClick={() => onChange(true)}
        className={cn(
          "rounded-lg border px-4 py-2.5 text-sm font-medium transition-all",
          value
            ? "border-india-green bg-india-green/10 text-india-green"
            : "border-border bg-background text-muted-foreground hover:bg-muted"
        )}
      >
        {lang === "en" ? "Yes" : "हाँ"}
      </button>
      <button
        type="button"
        onClick={() => onChange(false)}
        className={cn(
          "rounded-lg border px-4 py-2.5 text-sm font-medium transition-all",
          !value
            ? "border-destructive bg-destructive/10 text-destructive"
            : "border-border bg-background text-muted-foreground hover:bg-muted"
        )}
      >
        {lang === "en" ? "No" : "नहीं"}
      </button>
    </div>
  );
}

function FieldLabel({
  icon: Icon,
  children,
}: {
  icon: React.ElementType;
  children: React.ReactNode;
}) {
  return (
    <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-foreground">
      <Icon className="h-4 w-4 text-saffron" />
      {children}
    </label>
  );
}

export function SchemeForm() {
  const { profile, setProfile } = useForm();
  const { language } = useApp();
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/results");
  };

  const currentIncomeIndex = incomeRanges.find(
    (i) => i.value === profile.incomeRange
  )?.index ?? 1;

  return (
    <Card className="border-border/60 shadow-lg">
      <CardHeader className="border-b border-border/60 bg-gradient-to-br from-saffron/5 to-india-green/5">
        <CardTitle className="flex items-center gap-2 text-xl text-navy">
          <Sparkles className="h-5 w-5 text-saffron" />
          {t("formHeading", language)}
        </CardTitle>
        <CardDescription>{t("formSubheading", language)}</CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <FieldLabel icon={MapPin}>{t("state", language)}</FieldLabel>
              <Select
                value={profile.state}
                onValueChange={(v) => setProfile({ state: v })}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select state" />
                </SelectTrigger>
                <SelectContent className="max-h-72">
                  {INDIAN_STATES.map((s) => (
                    <SelectItem key={s} value={s}>
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <FieldLabel icon={HomeIcon}>{t("location", language)}</FieldLabel>
              <div className="grid grid-cols-2 gap-2">
                {(["rural", "urban"] as Location[]).map((loc) => (
                  <button
                    key={loc}
                    type="button"
                    onClick={() => setProfile({ location: loc })}
                    className={cn(
                      "rounded-lg border px-4 py-2.5 text-sm font-medium transition-all",
                      profile.location === loc
                        ? "border-saffron bg-saffron/10 text-saffron"
                        : "border-border bg-background text-muted-foreground hover:bg-muted"
                    )}
                  >
                    {t(loc, language)}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <FieldLabel icon={User}>{t("ageGroup", language)}</FieldLabel>
              <Select
                value={profile.ageGroup}
                onValueChange={(v) => setProfile({ ageGroup: v as AgeGroup })}
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {ageGroups.map((g) => (
                    <SelectItem key={g.value} value={g.value}>
                      {language === "en" ? g.labelEn : g.labelHi}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <FieldLabel icon={User}>{t("gender", language)}</FieldLabel>
              <Select
                value={profile.gender}
                onValueChange={(v) => setProfile({ gender: v as Gender })}
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {genders.map((g) => (
                    <SelectItem key={g.value} value={g.value}>
                      {language === "en" ? g.labelEn : g.labelHi}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <FieldLabel icon={Briefcase}>{t("occupation", language)}</FieldLabel>
              <Select
                value={profile.occupation}
                onValueChange={(v) =>
                  setProfile({ occupation: v as Occupation })
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {occupations.map((o) => (
                    <SelectItem key={o.value} value={o.value}>
                      {language === "en" ? o.labelEn : o.labelHi}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <FieldLabel icon={Users}>{t("category", language)}</FieldLabel>
              <Select
                value={profile.category}
                onValueChange={(v) => setProfile({ category: v as Category })}
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((c) => (
                    <SelectItem key={c.value} value={c.value}>
                      {language === "en" ? c.labelEn : c.labelHi}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <FieldLabel icon={IndianRupee}>{t("incomeRange", language)}</FieldLabel>
            <div className="rounded-lg border border-border bg-muted/30 p-4">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-xs text-muted-foreground">
                  {language === "en" ? "Below ₹1L" : "₹1L से कम"}
                </span>
                <span className="rounded-full bg-saffron/10 px-3 py-1 text-sm font-bold text-saffron">
                  {language === "en"
                    ? incomeRanges[currentIncomeIndex].labelEn
                    : incomeRanges[currentIncomeIndex].labelHi}
                </span>
                <span className="text-xs text-muted-foreground">
                  {language === "en" ? "Above ₹8L" : "₹8L से अधिक"}
                </span>
              </div>
              <Slider
                value={[currentIncomeIndex]}
                min={0}
                max={4}
                step={1}
                onValueChange={(v) =>
                  setProfile({ incomeRange: incomeRanges[v[0]].value })
                }
              />
              <div className="mt-2 flex justify-between px-1">
                {incomeRanges.map((_, i) => (
                  <span key={i} className="text-[10px] text-muted-foreground">
                    {i + 1}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div>
            <FieldLabel icon={Users}>{t("familySize", language)}</FieldLabel>
            <div className="flex items-center gap-4">
              <Slider
                value={[profile.familySize]}
                min={1}
                max={12}
                step={1}
                onValueChange={(v) => setProfile({ familySize: v[0] })}
                className="flex-1"
              />
              <span className="flex h-10 min-w-10 items-center justify-center rounded-lg bg-saffron/10 px-3 text-base font-bold text-saffron">
                {profile.familySize}
              </span>
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-3">
            <div>
              <FieldLabel icon={CreditCard}>{t("hasBplCard", language)}</FieldLabel>
              <YesNoToggle
                value={profile.hasBplCard}
                onChange={(v) => setProfile({ hasBplCard: v })}
                lang={language}
              />
            </div>
            <div>
              <FieldLabel icon={Accessibility}>
                {t("hasDisability", language)}
              </FieldLabel>
              <YesNoToggle
                value={profile.hasDisability}
                onChange={(v) => setProfile({ hasDisability: v })}
                lang={language}
              />
            </div>
            <div>
              <FieldLabel icon={Building2}>
                {t("ownsPuccaHouse", language)}
              </FieldLabel>
              <YesNoToggle
                value={profile.ownsPuccaHouse}
                onChange={(v) => setProfile({ ownsPuccaHouse: v })}
                lang={language}
              />
            </div>
          </div>

          <Button
            type="submit"
            size="lg"
            className="w-full bg-gradient-to-r from-saffron to-saffron-light text-base font-bold shadow-md transition-transform hover:scale-[1.01]"
          >
            <Search className="mr-2 h-5 w-5" />
            {t("findSchemes", language)}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
