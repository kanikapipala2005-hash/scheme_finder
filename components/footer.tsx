"use client";

import Link from "next/link";
import { Landmark, Heart, AlertTriangle } from "lucide-react";
import { useApp } from "@/lib/app-context";
import { t } from "@/lib/i18n";

export function Footer() {
  const { language } = useApp();
  return (
    <footer className="mt-12 border-t border-border bg-navy text-white/90">
      <div className="h-1 w-full tricolor-border" />
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-saffron text-white">
                <Landmark className="h-4 w-4" />
              </div>
              <div className="leading-tight">
                <div className="text-base font-bold">SchemeSaathi</div>
                <div className="text-xs text-saffron-light">
                  {t("tagline", language)}
                </div>
              </div>
            </div>
            <p className="mt-3 text-sm text-white/70">
              {language === "en"
                ? "A citizen-friendly portal to discover government welfare schemes matching your needs."
                : "अपनी आवश्यकताओं से मेल खाने वाली सरकारी कल्याण योजनाओं को खोजने के लिए एक नागरिक-अनुकूल पोर्टल।"}
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-saffron-light">
              {language === "en" ? "Quick Links" : "त्वरित लिंक"}
            </h4>
            <ul className="mt-3 space-y-2 text-sm text-white/70">
              <li><Link href="/" className="hover:text-white">{t("navHome", language)}</Link></li>
              <li><Link href="/schemes" className="hover:text-white">{t("navSchemes", language)}</Link></li>
              <li><Link href="/shortlisted" className="hover:text-white">{t("navShortlist", language)}</Link></li>
              <li><Link href="/learn" className="hover:text-white">{t("navLearn", language)}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-saffron-light">
              {language === "en" ? "Categories" : "श्रेणियाँ"}
            </h4>
            <ul className="mt-3 space-y-2 text-sm text-white/70">
              <li>Education</li>
              <li>Healthcare</li>
              <li>Housing</li>
              <li>Social Welfare</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 flex items-start gap-2 rounded-lg bg-white/5 p-4 text-xs text-white/70">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-300" />
          <p>{t("disclaimer", language)}</p>
        </div>

        <div className="mt-6 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-white/60 sm:flex-row">
          <p>© {new Date().getFullYear()} SchemeSaathi. A citizen welfare initiative.</p>
          <p className="flex items-center gap-1">
            Made with <Heart className="h-3 w-3 fill-saffron text-saffron" /> for Bharat
          </p>
        </div>
      </div>
    </footer>
  );
}
