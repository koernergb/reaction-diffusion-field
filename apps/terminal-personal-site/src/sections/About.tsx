"use client";
import React from "react";
import { aboutBlurb } from "@/lib/content";
import { useMouseParallax } from "@/hooks/useMouseParallax";
import { DistortedSection } from "@/components/DistortedSection";

export default function AboutSection() {
  const parallaxStyle = useMouseParallax();

  return (
    <section id="about" className="mx-auto max-w-3xl px-4 sm:px-6 py-12 sm:py-20 text-emerald-100">
      <div style={parallaxStyle}>
        <DistortedSection>
          <h2 className="mb-4 text-xl sm:text-2xl font-semibold text-emerald-200">About</h2>
        </DistortedSection>
        <DistortedSection>
          <p className="leading-relaxed text-emerald-100/90">
            {aboutBlurb}
          </p>
        </DistortedSection>
      </div>
    </section>
  );
}
