import Link from 'next/link';
import { Activity, BarChart3, Flame, ListChecks, Sparkles, TrendingUp } from 'lucide-react';

const sidebarItems = [
  { href: '/dashboard', label: 'Dashboard', icon: BarChart3 },
  { href: '/opportunities', label: 'Opportunities', icon: ListChecks },
  { href: '/trending', label: 'Trending', icon: TrendingUp },
  { href: '/startups', label: 'Startups', icon: Sparkles },
  { href: '/ai', label: 'AI', icon: Activity },
  { href: '/gaming', label: 'Gaming', icon: Flame },
];

export function Sidebar() {
  return (
    <aside className="hidden min-h-screen w-72 flex-shrink-0 border-r border-white/10 bg-surface/90 p-6 lg:block">
      <div className="space-y-6">
        <div>
          <p className="text-sm uppercase tracking-[0.24em] text-muted">Workspace</p>
          <h2 className="mt-3 text-2xl font-semibold text-white">Navigator</h2>
        </div>
        <div className="space-y-2">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link key={item.href} href={item.href} className="flex items-center gap-3 rounded-3xl px-4 py-3 text-sm text-muted transition hover:bg-white/5 hover:text-white">
                <Icon className="h-4 w-4 text-primary" />
                {item.label}
              </Link>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
