import { useEffect, useMemo, useState } from 'react';
import { fetchJson } from '../lib/api';

export default function DashboardPage() {
  const [team, setTeam] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function loadData() {
      setLoading(true);
      const [teamResponse, sessionsResponse] = await Promise.all([
        fetchJson('/api/team'),
        fetchJson('/api/sessions'),
      ]);

      if (!mounted) return;
      setTeam(teamResponse?.data ?? []);
      setSessions(sessionsResponse?.data ?? []);
      setLoading(false);
    }

    loadData();
    return () => {
      mounted = false;
    };
  }, []);

  const activeMembers = useMemo(
    () => (team ?? []).filter((member) => member?.role === 'member').length,
    [team],
  );

  const nextSession = useMemo(() => {
    return [...(sessions ?? [])].sort((a, b) => new Date(a?.date) - new Date(b?.date))[0];
  }, [sessions]);

  if (loading) return <p>Loading dashboard...</p>;

  return (
    <section>
      <h2 className="mb-4 text-2xl font-semibold">Dashboard</h2>
      <div className="grid gap-4 md:grid-cols-2">
        <article className="rounded-lg border border-slate-700 p-4">
          <h3 className="text-lg font-medium">Active Members</h3>
          <p className="text-3xl font-bold">{activeMembers}</p>
        </article>
        <article className="rounded-lg border border-slate-700 p-4">
          <h3 className="text-lg font-medium">Next Session</h3>
          <p>{nextSession ? `${nextSession.title} (${nextSession.date})` : 'No upcoming sessions'}</p>
        </article>
      </div>
    </section>
  );
}
