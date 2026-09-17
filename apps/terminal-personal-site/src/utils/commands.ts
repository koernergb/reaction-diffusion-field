export type SupportedSection = "work" | "blog" | "about" | "cv" | "portfolio" | "research" | "industry";

export const HELP_TEXT = `Available commands:\n- help\n- ls\n- open industry|portfolio|research|about|cv\n- theme toggle\n- glitch pause|play\n- animation on|off|status\n- animation_sound on|off\n- animation_color on|off`;

export const LS_TEXT = `sections:\n- industry\n- portfolio\n- research\n- about\n- cv`;

export const BIO_TEXT = "Koerner Gray-Buchta — ai research engineer exploring intelligent systems, creative computation, and what emerges between them";

// Map user-facing section names to internal section IDs
const sectionNameToId: Record<string, SupportedSection> = {
	"industry": "work",
	"portfolio": "portfolio",
	"research": "blog",
	"about": "about",
	"cv": "cv",
	// Also support old/internal names for backwards compatibility
	"work": "work",
	"blog": "blog"
};

export function isSupportedSection(value: string): value is SupportedSection {
	return value in sectionNameToId || value === "work" || value === "blog" || value === "about" || value === "cv" || value === "portfolio";
}

export function getSectionId(sectionName: string): SupportedSection | null {
	const normalized = sectionName.toLowerCase();
	return sectionNameToId[normalized] || (isSupportedSection(normalized) ? normalized as SupportedSection : null);
}
