"use client";

import { useEffect, useRef } from "react";
import {
  registerGSAP,
  gsap,
  ScrollTrigger,
  isReducedMotion,
} from "@/lib/gsap";

/**
 * Analytics Workspace — scroll-driven storytelling.
 *
 * Structure:
 *   section#analytics.analytics-section  ← trigger (outer)
 *     div.analytics-pin                  ← pin target (inner, GSAP manages)
 *       div.analytics-inner              ← main content
 *       div.insight-text                 ← final overlay
 *
 * Timeline phases (desktop, normalized 0→1):
 *   0.00–0.20  SQL reveal + hold (readable 15% of timeline)
 *   0.20–0.40  SQL hold — stable readable state
 *   0.40–0.55  Table enters, SQL recedes
 *   0.55–0.65  Table hold — stable readable state
 *   0.65–0.80  Chart enters, table recedes
 *   0.80–0.88  Chart hold — stable readable state
 *   0.88–0.95  Content exits → Insight enters
 *   0.95–1.00  Insight hold
 */
export function AnalyticsWorkspace() {
  const triggerRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerGSAP();
    const trigger = triggerRef.current;
    const pinEl = pinRef.current;
    if (!trigger || !pinEl) return;

    const ctx = gsap.context(() => {
      if (isReducedMotion()) {
        // Static readable layout — no pin, no animation
        gsap.set(".analytics-inner", { opacity: 1 });
        gsap.set(".sql-reveal", { opacity: 1, x: 0 });
        gsap.set(".data-table", { opacity: 1, y: 0, scale: 1 });
        gsap.set(".data-row", { opacity: 1, x: 0 });
        gsap.set(".analytics-sql-panel", { opacity: 1, scale: 1 });
        gsap.set(".chart-container", { opacity: 1, scale: 1 });
        gsap.set(".chart-bar", { scaleY: 1 });
        gsap.set(".metric-display", { opacity: 1, y: 0 });
        gsap.set(".insight-text", { opacity: 0 }); // hidden — not meaningful without scroll context
        return;
      }

      const mm = gsap.matchMedia();

      // ── Desktop (>=768px): 260vh, scrub 0.5 ──
      mm.add("(min-width: 768px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger,
            start: "top top",
            end: "bottom bottom",
            pin: pinEl,
            scrub: 0.5,
          },
        });

        // Phase 1: SQL reveal + hold (0.00–0.40)
        tl.fromTo(".analytics-inner",
          { opacity: 0 }, { opacity: 1, duration: 0.08 }, 0)
          .fromTo(".sql-reveal",
            { opacity: 0, x: -16 },
            { opacity: 1, x: 0, duration: 0.18, stagger: 0.012 }, 0.02)
          // 0.20–0.40: SQL stable hold (nothing happens = readable)

        // Phase 2: Table enters, SQL recedes (0.40–0.55)
          .fromTo(".data-table",
            { opacity: 0, y: 30, scale: 0.98 },
            { opacity: 1, y: 0, scale: 1, duration: 0.12 }, 0.40)
          .fromTo(".data-row",
            { opacity: 0, x: -16 },
            { opacity: 1, x: 0, duration: 0.08, stagger: 0.01 }, 0.42)
          .to(".analytics-sql-panel",
            { opacity: 0.25, scale: 0.96, duration: 0.12 }, 0.42)
          // 0.55–0.65: Table stable hold

        // Phase 3: Chart enters, table recedes (0.65–0.80)
          .to(".data-table",
            { opacity: 0.15, duration: 0.10 }, 0.65)
          .fromTo(".chart-container",
            { opacity: 0, scale: 0.92 },
            { opacity: 1, scale: 1, duration: 0.12 }, 0.65)
          .fromTo(".chart-bar",
            { scaleY: 0 },
            { scaleY: 1, duration: 0.10, stagger: 0.01, transformOrigin: "bottom" }, 0.67)
          .fromTo(".metric-display",
            { opacity: 0, y: 15 },
            { opacity: 1, y: 0, duration: 0.08 }, 0.70)
          // 0.80–0.88: Chart stable hold

        // Phase 4: Exit → Insight (0.88–0.95)
          .to(".analytics-inner",
            { opacity: 0, duration: 0.08 }, 0.88)
          .fromTo(".insight-text",
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.07 }, 0.90)
          // 0.95–1.00: Insight hold
        ;
      });

      // ── Mobile (<768px): 180vh, scrub 0.3 ──
      mm.add("(max-width: 767px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger,
            start: "top top",
            end: "bottom bottom",
            pin: pinEl,
            scrub: 0.3,
          },
        });

        // Phase 1: SQL (0.00–0.30)
        tl.fromTo(".analytics-inner",
          { opacity: 0 }, { opacity: 1, duration: 0.06 }, 0)
          .fromTo(".sql-reveal",
            { opacity: 0, x: -10 },
            { opacity: 1, x: 0, duration: 0.22, stagger: 0.015 }, 0.02)
          // 0.24–0.30: SQL hold

        // Phase 2: Table replaces SQL (0.30–0.55)
          .to(".analytics-sql-panel",
            { opacity: 0, duration: 0.10 }, 0.30)
          .fromTo(".data-table",
            { opacity: 0, y: 25 },
            { opacity: 1, y: 0, duration: 0.12 }, 0.32)
          .fromTo(".data-row",
            { opacity: 0, x: -10 },
            { opacity: 1, x: 0, duration: 0.08, stagger: 0.008 }, 0.34)
          // 0.44–0.55: Table hold

        // Phase 3: Chart replaces table (0.55–0.78)
          .to(".data-table",
            { opacity: 0, duration: 0.08 }, 0.55)
          .fromTo(".chart-container",
            { opacity: 0, scale: 0.95 },
            { opacity: 1, scale: 1, duration: 0.10 }, 0.57)
          .fromTo(".chart-bar",
            { scaleY: 0 },
            { scaleY: 1, duration: 0.08, stagger: 0.008, transformOrigin: "bottom" }, 0.59)
          .fromTo(".metric-display",
            { opacity: 0, y: 12 },
            { opacity: 1, y: 0, duration: 0.06 }, 0.62)
          // 0.70–0.78: Chart hold

        // Phase 4: Insight (0.78–0.90)
          .to(".analytics-inner",
            { opacity: 0, duration: 0.06 }, 0.78)
          .fromTo(".insight-text",
            { opacity: 0, y: 15 },
            { opacity: 1, y: 0, duration: 0.08 }, 0.80)
        ;
      });

    }, trigger);

    return () => ctx.revert();
  }, []);

  const sqlLines = [
    { text: "-- Revenue by category analysis", type: "comment" },
    { text: "SELECT", keyword: "SELECT" },
    { text: "  category,", keyword: "category" },
    { text: "  SUM(revenue) AS total_rev,", keyword: "SUM(revenue)" },
    { text: "  COUNT(*) AS transactions", keyword: "COUNT(*)" },
    { text: "FROM transactions", keyword: "FROM" },
    { text: "WHERE region = 'APAC'", keyword: "WHERE" },
    { text: "GROUP BY category", keyword: "GROUP BY" },
    { text: "ORDER BY total_rev DESC;", keyword: "ORDER BY" },
  ];

  const tableData = [
    { cat: "Electronics", rev: "$2.4M", txns: "12,847", share: "34%" },
    { cat: "Travel & Leisure", rev: "$1.8M", txns: "8,291", share: "26%" },
    { cat: "Financial Services", rev: "$1.2M", txns: "5,634", share: "17%" },
    { cat: "Retail", rev: "$980K", txns: "4,102", share: "14%" },
    { cat: "Other", rev: "$620K", txns: "2,890", share: "9%" },
  ];

  const chartHeights = [92, 69, 46, 38, 24];
  const chartColors = [
    "var(--color-accent)",
    "#60a5fa",
    "#93c5fd",
    "#a0a0a0",
    "#666",
  ];

  return (
    <section
      id="analytics"
      ref={triggerRef}
      className="relative analytics-section"
    >
      <div
        ref={pinRef}
        className="analytics-pin h-screen w-full overflow-hidden"
      >
        <div className="analytics-inner h-full flex flex-col items-center justify-center px-4 md:px-12">
          <div className="content-wide mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-10 items-center">
            {/* SQL Panel */}
            <div className="lg:col-span-5 analytics-sql-panel">
              <div className="bg-[var(--color-surface-tertiary)] rounded-xl md:rounded-2xl border border-[var(--color-border)] overflow-hidden">
                <div className="flex items-center gap-2 px-3 md:px-4 py-2 md:py-3 border-b border-[var(--color-border)]">
                  <div className="flex gap-1.5">
                    <span className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-[#ff5f57] opacity-60" />
                    <span className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-[#febc2e] opacity-60" />
                    <span className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-[#28c840] opacity-60" />
                  </div>
                  <span className="text-[10px] md:text-[11px] font-mono text-[var(--color-text-tertiary)] ml-2">
                    query.sql
                  </span>
                </div>
                <div className="p-3 md:p-5 space-y-0">
                  {sqlLines.map((line, i) => (
                    <div
                      key={i}
                      className={`sql-reveal sql-line flex items-center gap-2 md:gap-3 ${
                        line.type === "comment" ? "sql-comment" : ""
                      } ${
                        i >= 5 && i <= 7 ? "sql-highlight rounded px-1" : ""
                      }`}
                    >
                      <span className="text-[var(--color-text-tertiary)] opacity-40 w-3 md:w-4 text-right text-[9px] md:text-[10px] select-none">
                        {i + 1}
                      </span>
                      <span className="text-[0.7rem] md:text-[0.8125rem]">
                        {line.keyword ? (
                          <>
                            <span className="sql-keyword">
                              {line.text.split(line.keyword)[0]}
                            </span>
                            <span className="sql-keyword">{line.keyword}</span>
                            <span>
                              {line.text.split(line.keyword).slice(1).join(line.keyword)}
                            </span>
                          </>
                        ) : (
                          line.text
                        )}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Visualization */}
            <div className="lg:col-span-7 space-y-4 md:space-y-5">
              <div className="data-table bg-[var(--color-surface-tertiary)] rounded-xl md:rounded-2xl border border-[var(--color-border)] overflow-hidden">
                <div className="px-3 md:px-4 py-2 md:py-3 border-b border-[var(--color-border)] flex items-center justify-between">
                  <span className="text-[10px] md:text-[11px] font-mono text-[var(--color-text-tertiary)]">
                    Result — 5 rows
                  </span>
                  <span className="text-[9px] md:text-[10px] font-mono text-[var(--color-text-tertiary)] italic opacity-60">
                    Illustrative data
                  </span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-[var(--color-border)]">
                        <th className="data-cell text-left text-[var(--color-text-tertiary)] font-normal">Category</th>
                        <th className="data-cell text-right text-[var(--color-text-tertiary)] font-normal">Revenue</th>
                        <th className="data-cell text-right text-[var(--color-text-tertiary)] font-normal hidden sm:table-cell">Transactions</th>
                        <th className="data-cell text-right text-[var(--color-text-tertiary)] font-normal">Share</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tableData.map((row, i) => (
                        <tr key={i} className="data-row">
                          <td className="data-cell text-[var(--color-text-primary)]">{row.cat}</td>
                          <td className="data-cell text-right text-[var(--color-text-primary)]">{row.rev}</td>
                          <td className="data-cell text-right text-[var(--color-text-tertiary)] hidden sm:table-cell">{row.txns}</td>
                          <td className="data-cell text-right text-[var(--color-text-secondary)]">{row.share}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 md:gap-4">
                <div className="chart-container col-span-2 bg-[var(--color-surface-tertiary)] rounded-xl md:rounded-2xl border border-[var(--color-border)] p-3 md:p-5">
                  <div className="chart-area">
                    {chartHeights.map((h, i) => (
                      <div
                        key={i}
                        className="chart-bar rounded-t-sm"
                        style={{
                          left: `${i * 20 + 4}%`,
                          height: `${h}%`,
                          backgroundColor: chartColors[i],
                        }}
                      />
                    ))}
                  </div>
                  <div className="flex gap-2 mt-2 md:mt-3">
                    {["Elec.", "Travel", "Fin.", "Retail", "Other"].map((l, i) => (
                      <span key={i} className="flex-1 text-center text-[7px] md:text-[9px] font-mono text-[var(--color-text-tertiary)]">
                        {l}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="metric-display bg-[var(--color-surface-tertiary)] rounded-xl md:rounded-2xl border border-[var(--color-border)] p-3 md:p-5 flex flex-col justify-center">
                  <p className="text-[9px] md:text-[11px] font-mono text-[var(--color-text-tertiary)] uppercase tracking-wider">
                    Total Revenue
                  </p>
                  <p className="text-[1.5rem] md:text-[2.25rem] font-bold text-[var(--color-text-primary)] tracking-tight mt-1 md:mt-2">
                    $7.0M
                  </p>
                  <p className="text-[9px] md:text-[11px] font-mono text-[var(--color-accent)] mt-0.5 md:mt-1">
                    +18.3% YoY
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Insight overlay */}
        <div className="insight-text absolute inset-0 flex items-center justify-center px-6 pointer-events-none">
          <p className="text-section-title md:text-headline text-center max-w-[700px] text-[var(--color-text-primary)]">
            Data is only useful
            <br />
            when it changes{" "}
            <span className="text-[var(--color-accent)]">a decision.</span>
          </p>
        </div>
      </div>
    </section>
  );
}
