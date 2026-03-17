import { useEffect, useMemo, useState } from 'react';
import { fetchJson } from '../../lib/api';

export default function SessionsPage() {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function loadSessions() {
      const response = await fetchJson('/api/sessions');
      if (!mounted) return;
      setSessions(response?.data ?? []);
      setLoading(false);
    }

    loadSessions();
    return () => {
      mounted = false;
    };
  }, []);

  const sortedSessions = useMemo(
    () => [...(sessions ?? [])].sort((a, b) => new Date(b.date) - new Date(a.date)),
    [sessions],
  );

  if (loading) return <p>Loading sessions...</p>;

  return (
    <section>
      <h2 className="mb-4 text-2xl font-semibold">Sessions</h2>
      <ul className="space-y-3">
        {sortedSessions.map((session) => (
          <li key={session.id} className="rounded-lg border border-slate-700 p-4">
            <p className="font-medium">{session.title}</p>
            <p className="text-sm text-slate-500 dark:text-slate-400">{session.date}</p>
            <p className="mt-1 text-sm">Status: {session.status}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
