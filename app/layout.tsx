import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: "Founder's Runway",
  description: 'Simple startup runway calculator built with Next.js and Tailwind CSS.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
