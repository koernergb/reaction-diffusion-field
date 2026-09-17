"use client";

import { useEffect } from "react";
import { useUiStore, applyThemeClass } from "@/lib/uiStore";

export function ThemeClient() {
	const { theme, setReducedMotion } = useUiStore();
	
	useEffect(() => {
		applyThemeClass(theme);
	}, [theme]);
	
	useEffect(() => {
		if (typeof window !== "undefined" && "matchMedia" in window) {
			const media = window.matchMedia("(prefers-reduced-motion: reduce)");
			setReducedMotion(!!media.matches);
			const listener = () => setReducedMotion(!!media.matches);
			media.addEventListener?.("change", listener);
			return () => media.removeEventListener?.("change", listener);
		}
	}, [setReducedMotion]);
	
	return null;
}
