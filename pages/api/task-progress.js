import { taskProgress } from '../../lib/dataStore';

export default function handler(req, res) {
  if (req.method === 'GET') {
    return res.status(200).json({ success: true, data: taskProgress });
  }

  if (req.method === 'POST') {
    const payload = req.body || {};
    const index = taskProgress.findIndex(
      (entry) => entry.task_id === payload.task_id && entry.user_id === payload.user_id,
    );

    if (index !== -1) {
      taskProgress[index] = {
        ...taskProgress[index],
        completed: Boolean(payload.completed),
        updated_at: new Date().toISOString(),
      };
    } else {
      taskProgress.push({
        id: `p${Date.now()}`,
        task_id: payload.task_id,
        user_id: payload.user_id,
        completed: Boolean(payload.completed),
        updated_at: new Date().toISOString(),
      });
    }

    return res.status(200).json({ success: true, data: taskProgress });
  }

  return res.status(405).json({ success: false, data: [] });
}
