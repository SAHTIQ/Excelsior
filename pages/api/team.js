import { users } from '../../lib/dataStore';

export default function handler(req, res) {
  if (req.method === 'GET') {
    return res.status(200).json({ success: true, data: users });
  }

  if (req.method === 'POST') {
    const payload = req.body || {};
    const record = {
      id: `u${Date.now()}`,
      name: payload.name || 'Unknown',
      email: payload.email || '',
      role: payload.role || 'member',
    };
    users.push(record);
    return res.status(201).json({ success: true, data: users });
  }

  return res.status(405).json({ success: false, data: [] });
}
