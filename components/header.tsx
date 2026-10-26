"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, Landmark, Bookmark, BookOpen, Home, Layers, Globe } from "lucide-react";
import { useApp } from "@/lib/app-context";
import { t } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const navItems = [
  { href: "/", labelKey: "navHome", icon: Home },
  { href: "/schemes", labelKey: "navSchemes", icon: Layers },
  { href: "/shortlisted", labelKey: "navShortlist", icon: Bookmark },
  { href: "/learn", labelKey: "navLearn", icon: BookOpen },
] as const;

export function Header() {
  const { language, setLanguage, shortlist } = useApp();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
      <div className="h-1 w-full tricolor-border" />
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-saffron to-saffron-light text-white shadow-md transition-transform group-hover:scale-105">
            <Landmark className="h-5 w-5" />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-lg font-bold tracking-tight text-navy">
              SchemeSaathi
            </span>
            <span className="text-[11px] font-medium text-saffron">
              {t("tagline", language)}
            </span>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  active
                    ? "bg-saffron/10 text-saffron"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <Icon className="h-4 w-4" />
                {t(item.labelKey as never, language)}
                {item.href === "/shortlisted" && shortlist.length > 0 && (
                  <span className="ml-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-saffron px-1.5 text-[10px] font-bold text-white">
                    {shortlist.length}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setLanguage(language === "en" ? "hi" : "en")}
            className="hidden gap-1.5 text-sm font-semibold sm:flex"
          >
            <Globe className="h-4 w-4" />
            {t("langToggle", language)}
          </Button>
          <button
            className="rounded-lg p-2 text-foreground md:hidden"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-border bg-card md:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-3">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                    active
                      ? "bg-saffron/10 text-saffron"
                      : "text-muted-foreground hover:bg-muted"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {t(item.labelKey as never, language)}
                  {item.href === "/shortlisted" && shortlist.length > 0 && (
                    <span className="ml-auto flex h-5 min-w-5 items-center justify-center rounded-full bg-saffron px-1.5 text-[10px] font-bold text-white">
                      {shortlist.length}
                    </span>
                  )}
                </Link>
              );
            })}
            <button
              onClick={() => {
                setLanguage(language === "en" ? "hi" : "en");
                setMobileOpen(false);
              }}
              className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-semibold text-saffron"
            >
              <Globe className="h-4 w-4" />
              {t("langToggle", language)}
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
