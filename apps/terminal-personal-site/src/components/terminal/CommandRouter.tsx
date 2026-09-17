"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useUiStore, applyThemeClass } from "@/lib/uiStore";
import { HELP_TEXT, LS_TEXT, isSupportedSection, BIO_TEXT, getSectionId } from "@/utils/commands";

export type CommandResult = {
	output: string;
	ariaLabel?: string;
};

export function useCommandRouter() {
	const router = useRouter();
	const { 
		theme, 
		toggleTheme, 
		glitchActive, 
		setGlitchActive,
		showBackdrop,
		setShowBackdrop,
		sonificationEnabled,
		setSonificationEnabled,
		turing,
		setTuringConfig
	} = useUiStore();

	useEffect(() => {
		applyThemeClass(theme);
	}, [theme]);

	function run(commandRaw: string): CommandResult {
		const command = commandRaw.trim();
		if (command.length === 0) return { output: "" };

		const [verb, ...rest] = command.split(/\s+/);
		if (verb === "help") {
			return { output: HELP_TEXT, ariaLabel: "Help: list of available commands" };
		}
		if (verb === "ls") {
			return { output: LS_TEXT, ariaLabel: "List of sections" };
		}
		if (verb === "whoami") {
			return { output: BIO_TEXT, ariaLabel: "Short bio" };
		}
		if (verb === "open") {
			const target = rest[0]?.toLowerCase();
			if (target && isSupportedSection(target)) {
				const sectionId = getSectionId(target);
				if (sectionId === "cv") {
					router.push("/cv");
				} else if (sectionId === "work") {
					router.push("/work");
				} else if (sectionId === "blog") {
					router.push("/blog");
				} else if (sectionId === "about") {
					router.push("/about");
				} else {
					router.push(`/${target}`);
				}
				return { output: `opening ${target}…` };
			}
			return { output: "Unknown section. Try: open industry|portfolio|research|about|cv" };
		}
		if (verb === "theme") {
			const action = rest[0]?.toLowerCase();
			if (action === "toggle") {
				toggleTheme();
				return { output: `theme: ${theme === "dark" ? "light" : "dark"}` };
			}
			return { output: "Usage: theme toggle" };
		}
		if (verb === "glitch") {
			const action = rest[0]?.toLowerCase();
			if (action === "pause") {
				setGlitchActive(false);
				return { output: "visuals paused" };
			}
			if (action === "play") {
				setGlitchActive(true);
				return { output: "visuals playing" };
			}
			return { output: "Usage: glitch pause|play" };
		}
		if (verb === "animation") {
			const action = rest[0]?.toLowerCase();
			if (action === "on") {
				setShowBackdrop(true);
				return { output: "animation: on" };
			}
			if (action === "off") {
				setShowBackdrop(false);
				return { output: "animation: off" };
			}
			if (action === "status") {
				const soundStatus = sonificationEnabled ? "on" : "off";
				const colorStatus = turing.enableColor ? "on" : "off";
				const animStatus = showBackdrop ? "on" : "off";
				return { 
					output: `animation: ${animStatus}\nanimation_sound: ${soundStatus}\nanimation_color: ${colorStatus}`,
					ariaLabel: "Animation status"
				};
			}
			return { output: "Usage: animation on|off|status" };
		}
		if (verb === "animation_sound") {
			const action = rest[0]?.toLowerCase();
			if (action === "on") {
				setSonificationEnabled(true);
				return { output: "animation_sound: on" };
			}
			if (action === "off") {
				setSonificationEnabled(false);
				return { output: "animation_sound: off" };
			}
			return { output: "Usage: animation_sound on|off" };
		}
		if (verb === "animation_color") {
			const action = rest[0]?.toLowerCase();
			if (action === "on") {
				setTuringConfig({ enableColor: true });
				return { output: "animation_color: on" };
			}
			if (action === "off") {
				setTuringConfig({ enableColor: false });
				return { output: "animation_color: off" };
			}
			return { output: "Usage: animation_color on|off" };
		}

		return {
			output: `Unknown command: ${command}. Type 'help' to see options`,
			ariaLabel: "Unknown command",
		};
	}

	return { run };
}


