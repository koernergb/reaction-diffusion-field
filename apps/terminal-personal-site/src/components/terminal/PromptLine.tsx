"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useCommandRouter } from "./CommandRouter";
import { useUiStore } from "@/lib/uiStore";

type PromptLineProps = {
	initialCommand?: string;
	onOutput: (text: string, ariaLabel?: string) => void;
};

const USER_COLOR = "text-[#00FFA8]"; // terminal teal
const HOST_COLOR = "text-[#9FB3C8]";
const PATH_COLOR = "text-[#8DE1C4]";
const SYMBOL_COLOR = "text-[#E6F1FF]";

export function PromptLine({ initialCommand = "", onOutput }: PromptLineProps) {
	const { run } = useCommandRouter();
	const prefersReducedMotion = useReducedMotion();
	const [typed, setTyped] = useState("");
	const [input, setInput] = useState("");
	const inputRef = useRef<HTMLInputElement | null>(null);
	const { glitchActive, setGlitchActive } = useUiStore();

	const promptTokens = useMemo(
		() => (
			<div className="flex items-center gap-1 text-sm md:text-base">
				<span className={USER_COLOR}>user</span>
				<span className="text-[#E6F1FF]">@</span>
				<span className={HOST_COLOR}>host</span>
				<span className="text-[#6B7D86]">:</span>
				<span className={PATH_COLOR}>~</span>
				<span className={SYMBOL_COLOR}>$</span>
			</div>
		),
		[]
	);

	useEffect(() => {
		if (!initialCommand) return;
		if (prefersReducedMotion) {
			setTyped(initialCommand);
			const { output, ariaLabel } = run(initialCommand);
			onOutput(output, ariaLabel);
			return;
		}
		let cancelled = false;
		const words = initialCommand.split(" ");
		let wordIndex = 0;
		function typeNextWord() {
			if (cancelled) return;
			if (wordIndex >= words.length) {
				const { output, ariaLabel } = run(initialCommand);
				onOutput(output, ariaLabel);
				return;
			}
			const next = words.slice(0, wordIndex + 1).join(" ");
			setTyped(next);
			wordIndex += 1;
			const delay = 80 + Math.floor(Math.random() * 40);
			setTimeout(typeNextWord, delay);
		}
		setTimeout(typeNextWord, 200);
		return () => {
			cancelled = true;
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [initialCommand]);

	useEffect(() => {
		inputRef.current?.focus();
	}, []);

	useEffect(() => {
		function onKeydown(e: KeyboardEvent) {
			if ((e.key === "p" || e.key === "P") && !e.metaKey && !e.ctrlKey && !e.altKey) {
				e.preventDefault();
				setGlitchActive(!glitchActive);
			}
		}
		window.addEventListener("keydown", onKeydown);
		return () => window.removeEventListener("keydown", onKeydown);
	}, [glitchActive, setGlitchActive]);

	function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		const cmd = input.trim();
		if (!cmd) return;
		const { output, ariaLabel } = run(cmd);
		onOutput(output, ariaLabel);
		setInput("");
	}

	return (
		<div className="w-full">
			<div className="flex items-center gap-2">
				{promptTokens}
				<div className="relative flex-1">
					<form onSubmit={handleSubmit} className="relative">
						<input
							ref={inputRef}
							value={input}
							onChange={(e) => setInput(e.target.value)}
							className="w-full bg-transparent outline-none text-[#E6F1FF] caret-transparent pr-3"
							aria-label="Terminal input"
						/>
						<div className="absolute inset-0 pointer-events-none">
							<span className="text-[#E6F1FF]">{typed}</span>
							{!prefersReducedMotion ? (
								<motion.span
									className="inline-block w-2 h-5 md:h-5 bg-[#E6F1FF] align-middle ml-1"
									animate={{ opacity: [1, 0, 1] }}
									transition={{ duration: 0.9, repeat: Infinity, ease: "easeInOut" }}
								/>
							) : (
								<span className="inline-block w-2 h-5 md:h-5 bg-[#E6F1FF] align-middle ml-1" />
							)}
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}


