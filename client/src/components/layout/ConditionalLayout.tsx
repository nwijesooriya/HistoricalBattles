'use client';

import { usePathname } from 'next/navigation';
import Footer from '@/components/layout/Footer';

export default function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith('/admin');

  return (
    <>
      {children}
      {!isAdmin && <Footer />}
    </>
  );
}
