import { connectDB } from '../_db';
import User from '../models/User';

export default async function handler(req, res) {
  await connectDB();

  if (req.method === 'POST') {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });
    if (!user) return res.status(404).json({ error: 'Invalid credentials' });
    return res.status(200).json(user);
  }

  res.status(405).json({ error: 'Method not allowed' });
}
