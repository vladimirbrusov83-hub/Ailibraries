"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navLinks = [
  { href: "/curriculum", label: "Curriculum" },
  { href: "/resources", label: "Resources" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md backdrop-saturate-150 border-b border-stone-200/75">
      <nav
        className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2.5 font-semibold text-stone-900 hover:text-forest-DEFAULT"
        >
          <span
            className="logo-mark w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm font-bold"
            style={{ backgroundColor: "#0F6E56" }}
            aria-hidden="true"
          >
            AI
          </span>
          <span className="hidden sm:block text-sm leading-tight">
            AI for Academic Libraries
          </span>
          <span className="sm:hidden text-sm leading-tight">
            AI for Libraries
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.slice(0, 2).map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={pathname.startsWith(link.href) ? "page" : undefined}
              className={`nav-link nav-d${i + 1} px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                pathname.startsWith(link.href) ? "text-stone-900" : "text-stone-600"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <a
            href="/professional-development.html"
            className="nav-link nav-d3 px-3 py-2 rounded-lg text-xs font-medium leading-tight text-center text-stone-600 transition-colors"
          >
            Professional<br />Development
          </a>
          {navLinks.slice(2).map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={pathname.startsWith(link.href) ? "page" : undefined}
              className={`nav-link nav-d${i + 4} px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                pathname.startsWith(link.href) ? "text-stone-900" : "text-stone-600"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/level/foundations"
            className="nav-cta nav-d6 ml-2 px-4 py-2 rounded-lg text-sm font-medium text-white"
            style={{ backgroundColor: "#0F6E56" }}
          >
            Start Learning
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 rounded-lg text-stone-600 hover:text-stone-900 hover:bg-stone-100 transition-colors"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label="Toggle navigation menu"
        >
          {open ? (
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div
          id="mobile-menu"
          className="md:hidden border-t border-stone-200 bg-white px-4 py-3 space-y-1"
        >
          {navLinks.slice(0, 2).map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`block px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                pathname.startsWith(link.href)
                  ? "text-stone-900 bg-stone-100"
                  : "text-stone-600 hover:text-stone-900 hover:bg-stone-50"
              }`}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <a
            href="/professional-development.html"
            className="block px-3 py-2.5 rounded-lg text-sm font-medium text-stone-600 hover:text-stone-900 hover:bg-stone-50 transition-colors"
            onClick={() => setOpen(false)}
          >
            Professional Development
          </a>
          {navLinks.slice(2).map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`block px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                pathname.startsWith(link.href)
                  ? "text-stone-900 bg-stone-100"
                  : "text-stone-600 hover:text-stone-900 hover:bg-stone-50"
              }`}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/level/foundations"
            className="block mt-2 px-3 py-2.5 rounded-lg text-sm font-medium text-white text-center"
            style={{ backgroundColor: "#0F6E56" }}
            onClick={() => setOpen(false)}
          >
            Start Learning
          </Link>
        </div>
      )}
    </header>
  );
}
