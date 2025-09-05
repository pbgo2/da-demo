import { connectDB } from './_db';
import Student from '../models/Student';
import Course from '../models/Course';
import Enrollment from '../models/Enrollment';

export default async function handler(req, res) {
  await connectDB();

  if (req.method === 'GET') {
    const students = await Student.find();
    const courses = await Course.find();
    const enrollments = await Enrollment.find()
      .populate('studentId')
      .populate('courseId');

    return res.status(200).json({ students, courses, enrollments });
  }

  res.status(405).json({ error: 'Method not allowed' });
}
