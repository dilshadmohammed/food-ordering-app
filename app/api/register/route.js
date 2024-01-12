import { User } from "@/models/User";
import { connectToDatabase, closeDatabaseConnection } from "@/dbconnect/dbConnect";
import bcrypt from 'bcrypt'

export async function POST(req) {
  const body = await req.json();

  try {
    await connectToDatabase();
  
    const pass = body.password;
    if (!(pass?.length >= 5)) {
      throw new Error('Password must be at least 5 characters');
    }
  
    const notHashPassword = pass;
    const salt = bcrypt.genSaltSync(10);
    body.password = bcrypt.hashSync(notHashPassword, salt);
  
    const createdUser = await User.create(body);
  
    return new Response(JSON.stringify(createdUser), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (error) {
    return new Response(JSON.stringify({
      error: error.errors?.password?.message || 'Internal Server Error',
    }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  } finally {
    await closeDatabaseConnection();
  }
  
}
