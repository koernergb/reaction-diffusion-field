import "../src/styles/globals.css";
import type { Metadata } from "next";
import React from "react";
import { ThemeClient } from "@/components/layout/ThemeClient";
import dynamic from "next/dynamic";
import { BackdropErrorBoundary } from "@/components/BackdropErrorBoundary";

const AnimatedBackdrop = dynamic(
  () => import("@/components/AnimatedBackdrop"),
  { ssr: false }
);

const BackdropControls = dynamic(
  () => import("@/components/BackdropControls"),
  { ssr: false }
);

export const metadata: Metadata = {
	title: "Koerner — Backdrop",
	description: "Reaction-diffusion backdrop playground",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" className="dark">
			<body className="bg-transparent">
				<ThemeClient />
				<div className="body-bg"></div>
				<main className="relative min-h-screen overflow-hidden">
					<div className="fixed inset-0 z-0">
						<BackdropErrorBoundary>
							<AnimatedBackdrop />
						</BackdropErrorBoundary>
					</div>

					<div className="relative z-10">{children}</div>

					<div className="fixed right-4 bottom-4 z-50">
						<BackdropControls />
					</div>
				</main>
			</body>
		</html>
	);
}
