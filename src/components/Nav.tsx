"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/lib/LanguageContext";
import { t } from "@/lib/i18n";

const navLinks = [
  { href: "/", key: "home" as const },
  { href: "/directory", key: "directory" as const },
  { href: "/health", key: "health" as const },
  { href: "/events", key: "events" as const },
  { href: "/learn", key: "learn" as const },
  { href: "/get-involved", key: "getInvolved" as const },
  { href: "/support", key: "support" as const },
];

export default function Nav() {
  const { language } = useLanguage();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-[#E8E6F0]">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0">
          <span
            className="text-xl font-bold bg-gradient-to-r from-[#7B68EE] to-[#E879F9] bg-clip-text text-transparent"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            PRISM
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "text-[#7B68EE] bg-[#7B68EE]/10"
                    : "text-[#1E1B3A] hover:text-[#7B68EE] hover:bg-[#7B68EE]/5"
                }`}
              >
                {t(link.key, language)}
              </Link>
            );
          })}
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <span
            className={`block w-5 h-0.5 bg-[#1E1B3A] transition-transform ${
              mobileOpen ? "rotate-45 translate-y-2" : ""
            }`}
          />
          <span
            className={`block w-5 h-0.5 bg-[#1E1B3A] transition-opacity ${
              mobileOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block w-5 h-0.5 bg-[#1E1B3A] transition-transform ${
              mobileOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-b border-[#E8E6F0] px-4 pb-4">
          {navLinks.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`block px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "text-[#7B68EE] bg-[#7B68EE]/10"
                    : "text-[#1E1B3A] hover:text-[#7B68EE] hover:bg-[#7B68EE]/5"
                }`}
              >
                {t(link.key, language)}
              </Link>
            );
          })}
        </div>
      )}
    </nav>
  );
}
