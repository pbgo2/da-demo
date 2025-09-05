const mongoose = require('mongoose');

const enrollmentSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
  progress: { 
    type: Number, 
    default: () => Math.floor(Math.random() * 101)   // 0–100
  },
  grade: { 
    type: Number, 
    default: () => Math.floor(Math.random() * 101)   // 0–100
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Enrollment', enrollmentSchema);
