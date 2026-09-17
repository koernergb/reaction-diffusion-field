"use client";

import { useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useUiStore } from "@/lib/uiStore";

type GlitchEffectProps = {
	className?: string;
};

export function GlitchEffect({ className = "" }: GlitchEffectProps) {
	const prefersReducedMotion = useReducedMotion();
	const { glitchActive } = useUiStore();

	useEffect(() => {
		// no-op, placeholder for future R3F lazy-load gating
	}, []);

	if (prefersReducedMotion || !glitchActive) {
		return <div className={className} />;
	}

	return (
		<motion.div
			className={className}
			initial={{ opacity: 0.4 }}
			animate={{ opacity: [0.4, 0.5, 0.35, 0.45, 0.4] }}
			transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
		/>
	);
}

export default GlitchEffect;


