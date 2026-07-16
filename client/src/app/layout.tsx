import type { Metadata } from 'next';
import { Inter, Cinzel } from 'next/font/google';
import Header from '@/components/layout/Header';
import ConditionalLayout from '@/components/layout/ConditionalLayout';
import Script from 'next/script';
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
      <head>
        <Script
          id="theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("theme");if(t){document.documentElement.setAttribute("data-theme",t)}else{document.documentElement.setAttribute("data-theme","dark")}}catch(e){}})()`,
          }}
        />
      </head>
      <body suppressHydrationWarning>
        <div className="page-wrapper">
          <Header />
          <ConditionalLayout>
            <main className="page-main">{children}</main>
          </ConditionalLayout>
        </div>
      </body>
    </html>
  );
}
