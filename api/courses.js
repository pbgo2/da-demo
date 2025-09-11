import { connectDB } from './_db';
import Course from './models/Course';

export default async function handler(req, res) {
  await connectDB();

  if (req.method === 'GET') {
    const courses = await Course.find().sort({ createdAt: -1 });
    return res.status(200).json(courses);
  }

  if (req.method === 'POST') {
    try {
      const course = new Course(req.body);
      await course.save();
      return res.status(201).json(course);
    } catch (err) {
      return res.status(500).json({ error: 'Failed to create course' });
    }
  }

  res.status(405).json({ error: 'Method not allowed' });
}
