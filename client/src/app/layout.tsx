import type { Metadata } from 'next';
import { Inter, Cinzel } from 'next/font/google';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const cinzel = Cinzel({
  subsets: ['latin'],
  variable: '--font-cinzel',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Historical Atlas — Explore World War History',
    template: '%s — Historical Atlas',
  },
  description:
    'Explore the battles, wars, campaigns, and commanders that shaped world history. An interactive atlas of military history from ancient times to the modern era.',
  keywords: [
    'history',
    'battles',
    'wars',
    'military history',
    'historical atlas',
    'world war',
    'commanders',
    'kingdoms',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${cinzel.variable}`} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <div className="page-wrapper">
          <Header />
          <Breadcrumbs />
          <main className="page-main">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
