'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function AdminNavLinks() {
  const pathname = usePathname();

  function linkClass(href: string) {
    const active = href === '/admin' ? pathname === '/admin' : pathname.startsWith(href);
    return `flex items-center gap-3 px-5 py-3 font-sans text-xs tracking-widest transition-colors duration-200 border-l-2 ${
      active
        ? 'text-gc-cream bg-gc-mid-blue/30 border-gc-gold'
        : 'text-gc-dim hover:text-gc-cream hover:bg-gc-mid-blue/20 border-transparent'
    }`;
  }

  return (
    <nav className="flex-1 py-4">
      <Link href="/admin" className={linkClass('/admin')}>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="flex-shrink-0">
          <rect x="1" y="1" width="5" height="5" stroke="currentColor" strokeWidth="1.2"/>
          <rect x="8" y="1" width="5" height="5" stroke="currentColor" strokeWidth="1.2"/>
          <rect x="1" y="8" width="5" height="5" stroke="currentColor" strokeWidth="1.2"/>
          <rect x="8" y="8" width="5" height="5" stroke="currentColor" strokeWidth="1.2"/>
        </svg>
        DASHBOARD
      </Link>
      <Link href="/admin/trainees" className={linkClass('/admin/trainees')}>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="flex-shrink-0">
          <circle cx="7" cy="4" r="2.5" stroke="currentColor" strokeWidth="1.2"/>
          <path d="M1.5 12c0-3.038 2.462-5.5 5.5-5.5s5.5 2.462 5.5 5.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
        </svg>
        TRAINEES
      </Link>
    </nav>
  );
}
