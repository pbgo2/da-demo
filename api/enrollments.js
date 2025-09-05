import { connectDB } from './_db';
import Enrollment from '../models/Enrollment';

export default async function handler(req, res) {
  await connectDB();

  if (req.method === 'GET') {
    const enrollments = await Enrollment.find()
      .populate('studentId')
      .populate('courseId');
    return res.status(200).json(enrollments);
  }

  if (req.method === 'POST') {
    try {
      const enrollment = new Enrollment(req.body);
      await enrollment.save();
      return res.status(201).json(enrollment);
    } catch (err) {
      return res.status(500).json({ error: 'Failed to create enrollment' });
    }
  }

  res.status(405).json({ error: 'Method not allowed' });
}
