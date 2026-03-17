import Link from 'next/link';
import { useRouter } from 'next/router';

const navItems = [
  { href: '/', label: 'Dashboard' },
  { href: '/team', label: 'Team' },
  { href: '/sessions', label: 'Sessions' },
  { href: '/progress', label: 'Progress' },
  { href: '/settings', label: 'Settings' },
];

export default function Sidebar() {
  const router = useRouter();

  return (
    <aside className="w-full max-w-56 shrink-0 border-r border-slate-700 p-4">
      <h2 className="mb-4 text-lg font-semibold">Team Excelsior</h2>
      <nav className="space-y-2" aria-label="Sidebar navigation">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`block rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${router.pathname === item.href ? 'bg-blue-700 text-white' : 'hover:bg-slate-800'}`}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
