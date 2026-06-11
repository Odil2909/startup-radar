import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';

const links = [
  { href: '/', label: 'Home' },
  { href: '/opportunities', label: 'Opportunities' },
  { href: '/trending', label: 'Trending' },
  { href: '/startups', label: 'Startups' },
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/ai', label: 'AI' },
  { href: '/gaming', label: 'Gaming' },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-background/95 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-4 lg:px-8">
        <Link href="/" className="inline-flex items-center gap-3 text-lg font-semibold text-white">
          <Sparkles className="h-6 w-6 text-primary" />
          Opportunity Radar
        </Link>

        <nav className="hidden items-center gap-4 lg:flex">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="text-sm text-muted transition hover:text-white">
              {link.label}
            </Link>
          ))}
        </nav>

        <Link href="/opportunities" className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-500">
          Explore <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </header>
  );
}
