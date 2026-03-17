import { taskProgress, tasks } from '../../lib/dataStore';

export default function handler(req, res) {
  if (req.method === 'GET') {
    return res.status(200).json({ success: true, data: tasks });
  }

  if (req.method === 'POST') {
    const payload = req.body || {};
    const item = {
      id: `t${Date.now()}`,
      title: payload.title || 'Untitled',
      description: payload.description || '',
      session_id: payload.session_id || '',
      created_at: new Date().toISOString(),
    };
    tasks.push(item);
    return res.status(201).json({ success: true, data: tasks });
  }

  if (req.method === 'PUT') {
    const payload = req.body || {};
    const index = tasks.findIndex((task) => task.id === payload.id);
    if (index !== -1) {
      tasks[index] = { ...tasks[index], ...payload };
    }
    return res.status(200).json({ success: true, data: tasks });
  }

  if (req.method === 'DELETE') {
    const { id } = req.query;
    const index = tasks.findIndex((task) => task.id === id);
    if (index !== -1) {
      tasks.splice(index, 1);
      for (let i = taskProgress.length - 1; i >= 0; i -= 1) {
        if (taskProgress[i].task_id === id) taskProgress.splice(i, 1);
      }
    }
    return res.status(200).json({ success: true, data: tasks });
  }

  return res.status(405).json({ success: false, data: [] });
}
