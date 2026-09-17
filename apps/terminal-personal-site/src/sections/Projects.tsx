"use client";
import React from "react";
import Link from "next/link";
import { recentProjects } from "@/lib/content";
import { DistortedSection } from "@/components/DistortedSection";
import { useMouseParallax } from "@/hooks/useMouseParallax";
import { useUiStore } from "@/lib/uiStore";

export default function ProjectsSection() {
  const parallaxStyle = useMouseParallax();
  const setHover = useUiStore((s) => s.setHover);

  const handleCardEnter = (e: React.MouseEvent<HTMLElement>) => {
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
    <section id="work" className="mx-auto max-w-5xl px-4 sm:px-6 py-12 sm:py-20 text-emerald-100">
      <div style={parallaxStyle}>
        <DistortedSection>
          <h2 className="mb-6 text-xl sm:text-2xl font-semibold text-emerald-200">Industry Work</h2>
        </DistortedSection>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {recentProjects.slice(0,4).map((p) => (
            <Link 
              key={p.title}
              href={p.href ?? "#"} 
              className="group block rounded-2xl border border-emerald-400/15 bg-black/30 p-4 hover:border-emerald-300/30 cursor-pointer"
              onMouseEnter={handleCardEnter}
              onMouseLeave={handleCardLeave}
            >
              <div className="mb-1 text-emerald-100 group-hover:text-emerald-200">{p.title}</div>
              {p.description && <p className="text-sm text-emerald-300/70">{p.description}</p>}
              {p.tags?.length ? (
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {p.tags.map(t => <span key={t} className="rounded bg-emerald-400/10 px-2 py-0.5 text-xs text-emerald-300/80">{t}</span>)}
                </div>
              ) : null}
            </Link>
        ))}
        </div>
      </div>
    </section>
  );
}
