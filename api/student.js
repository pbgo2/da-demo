import { connectDB } from './_db';
import Student from '../models/Student';

export default async function handler(req, res) {
  await connectDB();

  if (req.method === 'GET') {
    const students = await Student.find().sort({ createdAt: -1 });
    return res.status(200).json(students);
  }

  if (req.method === 'POST') {
    try {
      const student = new Student(req.body);
      await student.save();
      return res.status(201).json(student);
    } catch (err) {
      return res.status(500).json({ error: 'Failed to create student' });
    }
  }

  res.status(405).json({ error: 'Method not allowed' });
}
