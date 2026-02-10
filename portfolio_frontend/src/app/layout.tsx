import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { ToastProvider } from "@/components/Toast";

export const metadata: Metadata = {
  title: "Ocean Professional | AI/ML Engineer Portfolio",
  description:
    "Professional AI/ML engineer portfolio with experience, projects, certifications, testimonials, and contact.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <a className="skip-link focus-ring" href="#home">
          Skip to content
        </a>

        <ToastProvider>
          <div className="app-shell">
            <Navbar />
            {children}
          </div>
        </ToastProvider>
      </body>
    </html>
  );
}
