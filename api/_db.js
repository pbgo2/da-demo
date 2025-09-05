import mongoose from 'mongoose';

const MONGO_URL = process.env.MONGO_URL;
let conn = null;

export async function connectDB() {
  if (conn) return conn;
  conn = await mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log('MongoDB connected');
  return conn;
}
