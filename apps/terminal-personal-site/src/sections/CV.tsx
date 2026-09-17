"use client";
import React from "react";
import { cvLinks } from "@/lib/content";
import { useMouseParallax } from "@/hooks/useMouseParallax";
import { DistortedSection } from "@/components/DistortedSection";

export default function CVSection() {
  const parallaxStyle = useMouseParallax();

  return (
    <section id="cv" className="mx-auto max-w-3xl px-4 sm:px-6 py-12 sm:py-20 text-emerald-100">
      <div style={parallaxStyle}>
        <DistortedSection>
          <h2 className="mb-4 text-xl sm:text-2xl font-semibold text-emerald-200">CV / Résumé</h2>
        </DistortedSection>
      <ul className="space-y-3">
        {cvLinks.map((l) => (
          <DistortedSection key={l.label} className="rounded-xl">
            <li className="flex items-center justify-between rounded-xl border border-emerald-400/15 bg-black/30 px-4 py-3">
              <a className="underline decoration-emerald-400/40 underline-offset-4 hover:text-emerald-200" href={l.href}>{l.label}</a>
              {l.note && <span className="text-sm text-emerald-300/70">{l.note}</span>}
            </li>
          </DistortedSection>
        ))}
      </ul>
      </div>
    </section>
  );
}
