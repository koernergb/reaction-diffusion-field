"use client";

import { ReactNode, useEffect } from "react";
import { useUiStore, applyThemeClass } from "@/lib/uiStore";
import TerminalHero from "../terminal/TerminalHero";
import AboutSection from "@/sections/About";
import CVSection from "@/sections/CV";
import ProjectsSection from "@/sections/Projects";
import PortfolioSection from "@/sections/Portfolio";
import BlogSection from "@/sections/Blog";

type TerminalLayoutProps = {
	children: ReactNode;
};

export default function TerminalLayout({ children }: TerminalLayoutProps) {
	const { theme } = useUiStore();

	useEffect(() => {
		applyThemeClass(theme);
	}, [theme]);

	return (
		<main 
		className="min-h-screen text-emerald-100 relative z-10 border-0 outline-0"
		>
          {/* Spacer to push terminal down - 80vh so top 20% of terminal is visible, smaller on mobile */}
          <div className="h-[60vh] sm:h-[80vh] w-full border-0 outline-0" style={{ borderLeft: 'none', borderRight: 'none', borderTop: 'none', borderBottom: 'none', outline: 'none' }} />
			<TerminalHero />
			{/* Long-scroll sections */}
			<AboutSection />
			<CVSection />
			<ProjectsSection />
			<PortfolioSection />
			<BlogSection />
			{/* Keep children area if other pages reuse this layout */}
			<section className="mx-auto max-w-5xl px-4 sm:px-6 py-8 sm:py-12">{children}</section>
		</main>
	);
}


