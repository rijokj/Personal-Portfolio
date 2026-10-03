import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { profile } from "@/data/portfolio";
import { ScrollProgress } from "@/components/navigation/ScrollProgress";
import { IslandNav } from "@/components/navigation/IslandNav";
import { Nebulae } from "@/components/atmospheric/Nebulae";
import { NoiseVignette } from "@/components/atmospheric/NoiseVignette";
import { DotGrid } from "@/components/atmospheric/DotGrid";
import { DaybreakHorizon } from "@/components/atmospheric/DaybreakHorizon";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: `${profile.name} - ${profile.title}`,
  description: profile.subtitle,
  keywords: [
    profile.name,
    profile.title,
    "Frontend Specialist",
    "Next.js Developer",
    "React Developer",
    "TypeScript",
    "Tailwind CSS",
    "Microfrontends",
    "Web Accessibility",
  ],
  authors: [{ name: profile.name, url: `mailto:${profile.email}` }],
  openGraph: {
    title: `${profile.name} - ${profile.title}`,
    description: profile.subtitle,
    type: "profile",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} - ${profile.title}`,
    description: profile.subtitle,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: profile.title,
    description: profile.bio,
    email: `mailto:${profile.email}`,
    sameAs: [profile.linkedin, profile.github, profile.instagram],
  };

  return (
    <html lang="en" data-theme="galaxy" className={`${manrope.variable} overflow-x-hidden`} suppressHydrationWarning>
      <head>
        {/* Anti-FOUC Theme Synchronizer */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("theme");if(t==="galaxy"||t==="daybreak"){document.documentElement.dataset.theme=t;}else{document.documentElement.dataset.theme="galaxy";}}catch(e){}})()`,
          }}
        />
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans antialiased selection:bg-[var(--color-brand)]/20 selection:text-[var(--color-fg)] overflow-x-hidden">
        {/* Scroll Progress Bar */}
        <ScrollProgress />

        {/* Atmospheric Layers — Galaxy + Daybreak shared */}
        <Nebulae />
        <NoiseVignette />
        <DotGrid />
        {/* Daybreak: warm sunset horizon fixed at viewport bottom */}
        <DaybreakHorizon />

        {/* Floating Island Navigation Header */}
        <IslandNav />

        {/* Main Page Flow */}
        <div className="relative z-10 flex min-h-screen flex-col overflow-x-hidden">
          {children}
        </div>
      </body>
    </html>
  );
}
