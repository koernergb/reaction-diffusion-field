"use client";
import React from "react";
import Link from "next/link";
import { recentPosts } from "@/lib/content";
import { DistortedSection } from "@/components/DistortedSection";
import { useMouseParallax } from "@/hooks/useMouseParallax";
import { useUiStore } from "@/lib/uiStore";

export default function BlogSection() {
  const parallaxStyle = useMouseParallax({ maxTranslateX: 8, maxTranslateY: 5 });
  const setHover = useUiStore((s) => s.setHover);

  const handleCardEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const mx = (centerX / window.innerWidth) * 2 - 1;
    const my = (centerY / window.innerHeight) * 2 - 1;

    setHover([mx, -my]); // Flip Y to match shader convention
  };

  const handleCardLeave = () => {
    setHover(null);
  };

  return (
    <section
      id="blog"
      className="mx-auto max-w-5xl px-4 sm:px-6 py-12 sm:py-20 text-emerald-100"
    >
      <div style={parallaxStyle}>
        <DistortedSection>
          <h2 className="mb-6 text-xl sm:text-2xl font-semibold text-emerald-200">
            Research
          </h2>
        </DistortedSection>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {recentPosts.slice(0, 4).map((p) => (
            <Link
              key={p.title}
              href={p.href ?? "#"}
              className="group block rounded-2xl border border-emerald-400/15 bg-black/30 p-4 hover:border-emerald-300/30 cursor-pointer"
              onMouseEnter={handleCardEnter}
              onMouseLeave={handleCardLeave}
            >
              <div className="mb-1 text-emerald-100 group-hover:text-emerald-200">
                {p.title}
              </div>
              {p.date && (
                <div className="text-xs text-emerald-300/60">{p.date}</div>
              )}
              {p.excerpt && (
                <p className="mt-1 text-sm text-emerald-300/70">{p.excerpt}</p>
              )}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
