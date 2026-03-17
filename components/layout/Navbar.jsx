import ThemeToggle from '../ui/ThemeToggle';

export default function Navbar() {
  return (
    <header className="flex items-center justify-between border-b border-slate-700 px-4 py-3">
      <h1 className="text-xl font-bold">Team Portal</h1>
      <ThemeToggle />
    </header>
  );
}
