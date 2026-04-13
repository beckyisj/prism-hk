"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useLanguage } from "@/lib/LanguageContext";
import { t, isZh } from "@/lib/i18n";

type NavLink = {
  href: string;
  key: string;
  label?: { en: string; zh: string; zhHans: string };
  children?: { href: string; label: { en: string; zh: string; zhHans: string } }[];
};

const navLinks: NavLink[] = [
  { href: "/", key: "home" },
  { href: "/directory", key: "directory" },
  {
    href: "/health",
    key: "health",
    children: [
      { href: "/health", label: { en: "Healthcare & Support", zh: "醫療及支援", zhHans: "医疗及支援" } },
      { href: "/emergency", label: { en: "Emergency Services", zh: "緊急支援", zhHans: "紧急支援" } },
    ],
  },
  { href: "/events", key: "events" },
  {
    href: "/learn",
    key: "more",
    label: { en: "More", zh: "更多", zhHans: "更多" },
    children: [
      { href: "/learn", label: { en: "About PRISM", zh: "關於 PRISM", zhHans: "关于 PRISM" } },
      { href: "/learn/resources", label: { en: "Educational Resources", zh: "教育資源", zhHans: "教育资源" } },
      { href: "/get-involved", label: { en: "Get Involved", zh: "參與", zhHans: "参与" } },
      { href: "/support", label: { en: "Support Us", zh: "支持我們", zhHans: "支持我们" } },
      { href: "/contact", label: { en: "Contact Us", zh: "聯絡我們", zhHans: "联络我们" } },
    ],
  },
];

export default function Nav() {
  const { language } = useLanguage();
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpandedKey, setMobileExpandedKey] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/directory?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
    }
  }

  return (
    <>
    {/* Beta banner */}
    <div className="fixed top-0 left-0 right-0 z-[51] bg-gradient-to-r from-[#7B68EE] to-[#F5C55A] text-white text-center py-1.5 text-xs font-medium" style={{ textShadow: "0 1px 2px rgba(0,0,0,0.1)" }}>
      {isZh(language) ? "🚀 我們正在測試中！歡迎提供反饋。" : "🚀 We're in beta! Your feedback helps us improve."}
    </div>
    <nav className="fixed top-7 left-0 right-0 z-50 bg-white border-b border-[#E8E6F0]">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center gap-4">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0 flex items-center gap-2.5">
          <Image src="/prism-logo.png" alt="PRISM" width={36} height={36} className="w-9 h-9" />
          <span
            className="text-2xl bg-gradient-to-r from-[#5EEDB8] via-[#F5C55A] to-[#EC4899] bg-clip-text text-transparent leading-none hidden sm:inline"
            style={{ fontFamily: "'This Appeal', sans-serif", letterSpacing: "0.25em" }}
          >
            PRISM
          </span>
        </Link>

        {/* Persistent search bar */}
        <form onSubmit={handleSearch} className="hidden md:flex items-center flex-1 max-w-[280px]">
          <div className="relative w-full">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B6890]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              ref={searchRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={isZh(language) ? "搜索空間、服務..." : "Search spaces, services..."}
              className="w-full pl-9 pr-3 py-2 text-sm rounded-full border border-[#E8E6F0] bg-[#FAFAFE] focus:outline-none focus:border-[#7B68EE] focus:ring-2 focus:ring-[#7B68EE]/20 transition-[border-color,box-shadow]"
            />
          </div>
        </form>

        {/* Desktop nav links — pushed to the right */}
        <div className="hidden md:flex items-center gap-1 ml-auto">
          {navLinks.map((link) => {
            const isActive = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);

            if (link.children) {
              return (
                <div key={link.href} className="relative group">
                  <Link
                    href={link.href}
                    className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive ? "text-[#7B68EE]" : "text-[#1E1B3A] hover:text-[#7B68EE]"
                    }`}
                  >
                    {t(link.key as any, language)}
                    <svg className="w-3.5 h-3.5 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </Link>
                  <div className={`absolute top-full pt-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-[opacity,visibility] duration-150 ${link.key === "more" ? "right-0" : "left-0"}`}>
                    <div className="bg-white rounded-lg shadow-lg border border-[#E8E6F0] py-1 min-w-[200px] whitespace-nowrap">
                      {link.children.map((child) => {
                        const childActive = pathname === child.href;
                        return (
                          <Link
                            key={child.href}
                            href={child.href}
                            className={`block px-4 py-2.5 text-sm font-medium transition-colors ${
                              childActive ? "text-[#7B68EE] bg-[#7B68EE]/10" : "text-[#1E1B3A] hover:text-[#7B68EE] hover:bg-[#7B68EE]/5"
                            }`}
                          >
                            {language === "zh-Hans" ? child.label.zhHans : language === "zh" ? child.label.zh : child.label.en}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive ? "text-[#7B68EE]" : "text-[#1E1B3A] hover:text-[#7B68EE]"
                }`}
              >
                {t(link.key as any, language)}
              </Link>
            );
          })}
        </div>

        {/* Mobile: search + hamburger */}
        <div className="flex items-center gap-2 md:hidden ml-auto">
          <button
            onClick={() => searchRef.current?.focus()}
            className="p-2 text-[#6B6890] hover:text-[#7B68EE] transition-colors"
            aria-label="Search"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
          <button
            className="flex flex-col gap-1.5 p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <span className={`block w-5 h-0.5 bg-[#1E1B3A] transition-transform ${mobileOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block w-5 h-0.5 bg-[#1E1B3A] transition-opacity ${mobileOpen ? "opacity-0" : ""}`} />
            <span className={`block w-5 h-0.5 bg-[#1E1B3A] transition-transform ${mobileOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-b border-[#E8E6F0] px-4 pb-4">
          {/* Mobile search */}
          <form onSubmit={handleSearch} className="mb-3">
            <div className="relative">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B6890]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={isZh(language) ? "搜索空間、服務..." : "Search spaces, services..."}
                className="w-full pl-9 pr-3 py-2 text-sm rounded-full border border-[#E8E6F0] bg-[#FAFAFE] focus:outline-none focus:border-[#7B68EE]"
              />
            </div>
          </form>
          {navLinks.map((link) => {
            const isActive = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
            if (link.children) {
              const isExpanded = mobileExpandedKey === link.key;
              return (
                <div key={link.href}>
                  <button
                    onClick={() => setMobileExpandedKey(isExpanded ? null : link.key)}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      isActive ? "text-[#7B68EE] bg-[#7B68EE]/10" : "text-[#1E1B3A] hover:text-[#7B68EE] hover:bg-[#7B68EE]/5"
                    }`}
                  >
                    {t(link.key as any, language)}
                    <svg className={`w-4 h-4 transition-transform ${isExpanded ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {isExpanded && (
                    <div className="pl-4">
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={() => setMobileOpen(false)}
                          className={`block px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                            pathname === child.href ? "text-[#7B68EE] bg-[#7B68EE]/10" : "text-[#4A4668] hover:text-[#7B68EE] hover:bg-[#7B68EE]/5"
                          }`}
                        >
                          {language === "zh-Hans" ? child.label.zhHans : language === "zh" ? child.label.zh : child.label.en}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            }
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`block px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive ? "text-[#7B68EE] bg-[#7B68EE]/10" : "text-[#1E1B3A] hover:text-[#7B68EE] hover:bg-[#7B68EE]/5"
                }`}
              >
                {t(link.key as any, language)}
              </Link>
            );
          })}
        </div>
      )}
    </nav>
    </>
  );
}
