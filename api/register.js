import { connectDB } from '../_db';
import User from '../../models/User';

export default async function handler(req, res) {
  await connectDB();

  if (req.method === 'POST') {
    try {
      const user = new User(req.body);
      await user.save();
      return res.status(201).json(user);
    } catch (err) {
      return res.status(500).json({ error: 'Failed to register user' });
    }
  }

  res.status(405).json({ error: 'Method not allowed' });
}
