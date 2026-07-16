'use client';

import { usePathname } from 'next/navigation';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import Footer from '@/components/layout/Footer';

export default function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith('/admin');

  return (
    <>
      {!isAdmin && <Breadcrumbs />}
      {children}
      {!isAdmin && <Footer />}
    </>
  );
}
