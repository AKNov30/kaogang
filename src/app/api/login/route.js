// src/app/api/login/route.js
import db from '@/lib/db';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function POST(req) {
  const { username, password } = await req.json();

  const [rows] = await db.query('SELECT * FROM users WHERE username = ?', [username]);

  if (!rows.length) {
    return new Response(JSON.stringify({ error: 'Invalid username or password' }), { status: 401 });
  }

  const user = rows[0];
  const isPasswordMatch = await bcrypt.compare(password, user.password);

  if (!isPasswordMatch) {
    return new Response(JSON.stringify({ error: 'Invalid username or password' }), { status: 401 });
  }

  // สร้าง JWT token พร้อมข้อมูล role, username, และกำหนดอายุการใช้งานเป็น 1 ชั่วโมง
  const token = jwt.sign(
    {
      userId: user.user_id,
      username: user.username,
      role: user.user_role
    },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }  // กำหนดอายุการใช้งาน token เป็น 1 ชั่วโมง
  );

  return new Response(JSON.stringify({ token }), { status: 200 });
}