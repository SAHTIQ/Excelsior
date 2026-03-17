import ThemeToggle from '../../components/ui/ThemeToggle';

export default function SettingsPage() {
  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-semibold">Settings</h2>
      <article className="rounded-lg border border-slate-700 p-4">
        <h3 className="font-medium">Profile</h3>
        <p className="text-sm text-slate-500 dark:text-slate-400">Name: Alex Carter</p>
        <p className="text-sm text-slate-500 dark:text-slate-400">Email: alex@excelsior.dev</p>
      </article>
      <article className="rounded-lg border border-slate-700 p-4">
        <h3 className="mb-2 font-medium">Theme</h3>
        <ThemeToggle />
      </article>
      <button
        type="button"
        className="rounded-md bg-red-600 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-400"
        aria-label="Logout"
      >
        Logout
      </button>
    </section>
  );
}
