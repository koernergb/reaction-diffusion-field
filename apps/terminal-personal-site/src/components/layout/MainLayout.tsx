import { ReactNode } from "react";

type MainLayoutProps = {
	children: ReactNode;
};

export default function MainLayout({ children }: MainLayoutProps) {
	return <div className="min-h-screen bg-[#0B0F10] text-[#E6F1FF]">{children}</div>;
}


