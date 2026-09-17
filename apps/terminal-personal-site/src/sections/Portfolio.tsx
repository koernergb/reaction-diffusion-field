"use client";
import React from "react";
import { DistortedSection } from "@/components/DistortedSection";
import { useMouseParallax } from "@/hooks/useMouseParallax";

const subsections = ["Agents", "Perception", "Inference"] as const;

export default function PortfolioSection() {
  const parallaxStyle = useMouseParallax();

  return (
    <section id="portfolio" className="mx-auto max-w-5xl px-4 sm:px-6 py-12 sm:py-20 text-emerald-100">
      <div style={parallaxStyle}>
        <DistortedSection>
          <h2 className="mb-8 text-xl sm:text-2xl font-semibold text-emerald-200">Portfolio</h2>
        </DistortedSection>

        <div className="space-y-10">
          {subsections.map((title) => (
            <div key={title} id={`portfolio-${title.toLowerCase()}`}>
              <DistortedSection>
                <h3 className="mb-4 text-lg sm:text-xl font-medium text-emerald-200/90">
                  {title}
                </h3>
              </DistortedSection>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
