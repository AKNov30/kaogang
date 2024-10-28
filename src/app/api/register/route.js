// src/app/api/register/route.js
import db from '@/lib/db';
import bcrypt from 'bcryptjs';

export async function POST(req) {
  const { username, password, role } = await req.json();

  if (!username || !password || !role) {
    return new Response(JSON.stringify({ error: 'Username, password, and role are required' }), { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const [user] = await db.query(
      `INSERT INTO users (username, password, user_role, account_status, created_at) 
       VALUES (?, ?, ?, 'active', NOW())`, 
      [username, hashedPassword, role]
    );
    return new Response(JSON.stringify({ message: 'User registered successfully' }), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Error registering user' }), { status: 500 });
  }
}