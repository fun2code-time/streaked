import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/navbar';

// Top-level metadata for SEO + social link previews.
export const metadata: Metadata = {
  title: 'Accountabili',
  description: 'Public accountability board for goals and daily progress.'
};

// Root app shell shared by all routes.
export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main className="mx-auto w-full max-w-6xl px-4 py-8">{children}</main>
      </body>
    </html>
  );
}
