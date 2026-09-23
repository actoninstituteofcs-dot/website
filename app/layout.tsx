import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = { title: "AICS — Acton Institute of Computer Science", description: "Free, live computer science education for students everywhere.", keywords: ["computer science", "coding education", "AICS", "nonprofit"] };
export const viewport = { width: "device-width", initialScale: 1, themeColor: "#080a0f" };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body>{children}</body></html>; }
