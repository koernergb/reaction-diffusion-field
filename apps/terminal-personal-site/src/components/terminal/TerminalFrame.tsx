"use client";

import { useEffect, useMemo, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { PromptLine } from "./PromptLine";
import { BIO_TEXT } from "@/utils/commands";

type TerminalFrameProps = {
	className?: string;
};

const BG = "#0B0F10";
const FG = "#E6F1FF";
const MUTED = "#6B7D86";

export function TerminalFrame({ className = "" }: TerminalFrameProps) {
	const prefersReducedMotion = useReducedMotion();
	const [lines, setLines] = useState<string[]>([]);
	const [hasTypedWhoami, setHasTypedWhoami] = useState(false);

	const initialCommand = useMemo(() => {
		if (typeof window === "undefined") return "";
		const key = "terminal_seen_whoami";
		const seen = window.sessionStorage.getItem(key);
		if (seen) return "";
		return "whoami";
	}, []);

	useEffect(() => {
		if (typeof window === "undefined") return;
		const key = "terminal_seen_whoami";
		const seen = window.sessionStorage.getItem(key);
		if (!seen) {
			if (!prefersReducedMotion) {
				// Will mark after typing finishes; see onInitialOutput below
			} else {
				window.sessionStorage.setItem(key, "1");
				// Immediately render bio without animation on reduced motion
				setLines((prev) => [...prev, BIO_TEXT]);
			}
		}
	}, [prefersReducedMotion]);

	function appendLine(text: string) {
		setLines((prev) => [...prev, text]);
	}

	function handleInitialOutput(text: string) {
		if (!text) return;
		appendLine(text);
		setHasTypedWhoami(true);
		if (typeof window !== "undefined") {
			window.sessionStorage.setItem("terminal_seen_whoami", "1");
		}
	}

	return (
		<div
			className={`rounded-lg border border-[${MUTED}] bg-[${BG}] text-[${FG}] p-4 md:p-6 font-mono ${className}`}
			role="region"
			aria-label="Terminal"
		>
			<div className="min-h-[200px]">
				<div className="sr-only" aria-live="polite">
					{lines.join("\n")}
				</div>
				<div className="space-y-3">
					{lines.map((line, idx) => (
						<div key={idx} className="text-sm md:text-base text-[#E6F1FF]">
							{line}
						</div>
					))}
				</div>
			</div>
			<div className="mt-4">
				<PromptLine
					initialCommand={initialCommand}
					onOutput={(text, ariaLabel) => {
						if (!text) return;
						if (!hasTypedWhoami && initialCommand === "whoami") {
							handleInitialOutput(text);
							return;
						}
						appendLine(text);
					}}
				/>
			</div>
		</div>
	);
}

export default TerminalFrame;


