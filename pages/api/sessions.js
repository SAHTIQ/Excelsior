import { sessions } from '../../lib/dataStore';

export default function handler(req, res) {
  if (req.method === 'GET') {
    return res.status(200).json({ success: true, data: sessions });
  }

  return res.status(405).json({ success: false, data: [] });
}
