export const users = [
  { id: 'u1', name: 'Alex Carter', role: 'admin', email: 'alex@excelsior.dev' },
  { id: 'u2', name: 'Jordan Lee', role: 'member', email: 'jordan@excelsior.dev' },
  { id: 'u3', name: 'Sam Patel', role: 'member', email: 'sam@excelsior.dev' },
];

export const sessions = [
  { id: 's1', title: 'Strength Session', date: '2026-03-10', status: 'Complete' },
  { id: 's2', title: 'Recovery Session', date: '2026-03-14', status: 'Scheduled' },
];

export const tasks = [
  { id: 't1', title: 'Warm-up routine', description: '10-min warm-up before drills', session_id: 's1', created_at: new Date().toISOString() },
  { id: 't2', title: 'Hydration check', description: 'Track water intake', session_id: 's2', created_at: new Date().toISOString() },
];

export const taskProgress = [
  { id: 'p1', task_id: 't1', user_id: 'u2', completed: true, updated_at: new Date().toISOString() },
  { id: 'p2', task_id: 't1', user_id: 'u3', completed: false, updated_at: new Date().toISOString() },
  { id: 'p3', task_id: 't2', user_id: 'u2', completed: false, updated_at: new Date().toISOString() },
];
