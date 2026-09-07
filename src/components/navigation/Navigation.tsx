"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { navItems, profile } from "@/data/profile";

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`);
          }
        });
      },
      { threshold: 0.3, rootMargin: "-80px 0px -50% 0px" }
    );

    document.querySelectorAll("section[id]").forEach((section) => {
      observer.observe(section);
    });

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  const handleNavClick = useCallback((href: string) => {
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
    setMobileOpen(false);
  }, []);

  // Escape key closes mobile menu
  useEffect(() => {
    if (!mobileOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileOpen(false);
        triggerRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [mobileOpen]);

  return (
    <>
      {/* Skip to main content */}
      <a href="#hero" className="skip-link">
        Skip to main content
      </a>

      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled
            ? "nav-blur bg-[#0a0a0a]/80 border-b border-[#222]/50"
            : "bg-transparent"
        )}
      >
        <div className="content-wide mx-auto flex items-center justify-between h-14 px-6 md:px-12">
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="text-[13px] font-mono tracking-wider text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors duration-300"
          >
            {profile.firstName.toLowerCase()}
            <span className="text-[var(--color-accent)]">.</span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.href);
                }}
                className={cn(
                  "text-[13px] font-mono tracking-wide transition-colors duration-300",
                  activeSection === item.href
                    ? "text-[var(--color-text-primary)]"
                    : "text-[var(--color-text-tertiary)] hover:text-[var(--color-text-secondary)]"
                )}
              >
                {item.label}
                {activeSection === item.href && (
                  <span className="block h-[1px] bg-[var(--color-accent)] mt-0.5 transition-all duration-300" />
                )}
              </a>
            ))}
          </div>

          {/* Mobile Menu Button — accessible */}
          <button
            ref={triggerRef}
            className="md:hidden flex flex-col gap-1.5 p-2"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            onClick={() => setMobileOpen((prev) => !prev)}
          >
            <span
              className={cn(
                "w-5 h-[1.5px] bg-[var(--color-text-secondary)] transition-all duration-300",
                mobileOpen && "translate-y-[3.5px] rotate-45"
              )}
            />
            <span
              className={cn(
                "w-3.5 h-[1.5px] bg-[var(--color-text-secondary)] transition-all duration-300",
                mobileOpen && "opacity-0"
              )}
            />
            <span
              className={cn(
                "w-5 h-[1.5px] bg-[var(--color-text-secondary)] transition-all duration-300",
                mobileOpen && "-translate-y-[3.5px] -rotate-45"
              )}
            />
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          ref={mobileMenuRef}
          id="mobile-menu"
          role="menu"
          className={cn(
            "md:hidden nav-blur bg-[#0a0a0a]/95 border-b border-[#222]/50 overflow-hidden transition-all duration-300",
            mobileOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
          )}
        >
          <div className="flex flex-col px-6 py-6 gap-4">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                role="menuitem"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.href);
                }}
                className={cn(
                  "text-sm font-mono tracking-wide transition-colors duration-300",
                  activeSection === item.href
                    ? "text-[var(--color-text-primary)]"
                    : "text-[var(--color-text-tertiary)]"
                )}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </nav>
    </>
  );
}
