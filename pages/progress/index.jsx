import { useEffect, useMemo, useState } from 'react';
import { fetchJson } from '../../lib/api';

export default function ProgressPage() {
  const [tasks, setTasks] = useState([]);
  const [progressEntries, setProgressEntries] = useState([]);
  const [users, setUsers] = useState([]);
  const [role, setRole] = useState('admin');
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ title: '', description: '', session_id: 's1' });

  const loadData = async () => {
    setLoading(true);
    const [tasksResponse, progressResponse, usersResponse] = await Promise.all([
      fetchJson('/api/tasks'),
      fetchJson('/api/task-progress'),
      fetchJson('/api/team'),
    ]);

    setTasks(tasksResponse?.data ?? []);
    setProgressEntries(progressResponse?.data ?? []);
    setUsers(usersResponse?.data ?? []);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const completionByTask = useMemo(() => {
    const memberUsers = (users ?? []).filter((user) => user.role === 'member');
    return (tasks ?? []).reduce((acc, task) => {
      const relatedEntries = (progressEntries ?? []).filter((entry) => entry.task_id === task.id);
      const completedCount = relatedEntries.filter((entry) => entry.completed).length;
      const percentage = memberUsers.length ? Math.round((completedCount / memberUsers.length) * 100) : 0;
      acc[task.id] = { percentage, relatedEntries };
      return acc;
    }, {});
  }, [progressEntries, tasks, users]);

  const createTask = async (event) => {
    event.preventDefault();
    await fetchJson('/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    setForm({ title: '', description: '', session_id: 's1' });
    loadData();
  };

  const deleteTask = async (id) => {
    await fetchJson(`/api/tasks?id=${id}`, { method: 'DELETE' });
    loadData();
  };

  const toggleCompletion = async (taskId, userId, completed) => {
    await fetchJson('/api/task-progress', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ task_id: taskId, user_id: userId, completed: !completed }),
    });
    loadData();
  };

  if (loading) return <p>Loading progress tracker...</p>;

  return (
    <section>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-2xl font-semibold">Progress Tracker</h2>
        <select
          className="rounded border border-slate-400 bg-transparent p-2"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          aria-label="Select role mode"
        >
          <option value="admin">Admin Mode</option>
          <option value="member">Member Mode</option>
        </select>
      </div>

      {role === 'admin' && (
        <form className="mb-6 grid gap-2 rounded-lg border border-slate-700 p-4 md:grid-cols-4" onSubmit={createTask}>
          <input className="rounded border border-slate-400 bg-transparent p-2" value={form.title} onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))} placeholder="Task title" required aria-label="Task title" />
          <input className="rounded border border-slate-400 bg-transparent p-2" value={form.description} onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))} placeholder="Description" required aria-label="Task description" />
          <input className="rounded border border-slate-400 bg-transparent p-2" value={form.session_id} onChange={(e) => setForm((p) => ({ ...p, session_id: e.target.value }))} placeholder="Session ID" required aria-label="Session id" />
          <button type="submit" className="rounded bg-blue-600 px-3 py-2 text-white" aria-label="Create task">Create Task</button>
        </form>
      )}

      <div className="grid gap-4 lg:grid-cols-2">
        {(tasks ?? []).map((task) => {
          const meta = completionByTask[task.id] || { percentage: 0, relatedEntries: [] };
          return (
            <article key={task.id} className="rounded-lg border border-slate-700 p-4">
              <div className="mb-2 flex items-center justify-between">
                <h3 className="font-semibold">{task.title}</h3>
                {role === 'admin' && (
                  <button onClick={() => deleteTask(task.id)} className="rounded bg-red-600 px-2 py-1 text-xs text-white" aria-label={`Delete ${task.title}`}>
                    Delete
                  </button>
                )}
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400">{task.description}</p>
              <div className="mt-3 h-2 w-full rounded bg-slate-300 dark:bg-slate-700">
                <div className="h-full rounded bg-green-500" style={{ width: `${meta.percentage}%` }} />
              </div>
              <p className="mt-1 text-xs">{meta.percentage}% complete</p>

              <div className="mt-3 space-y-2">
                {(users ?? []).filter((u) => u.role === 'member').map((user) => {
                  const entry = (meta.relatedEntries ?? []).find((item) => item.user_id === user.id);
                  const completed = entry?.completed ?? false;
                  return (
                    <label key={`${task.id}-${user.id}`} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={completed}
                        onChange={() => toggleCompletion(task.id, user.id, completed)}
                        aria-label={`Toggle completion for ${user.name}`}
                      />
                      <span>{user.name}</span>
                    </label>
                  );
                })}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
