import { User } from "@/models/User";
import { connectToDatabase, closeDatabaseConnection } from "@/dbconnect/dbConnect";

export async function POST(req) {
  const body = await req.json();

  return connectToDatabase()
    .then(() => User.create(body))
    .then(createdUser => new Response(JSON.stringify(createdUser), { status: 200, headers: { 'Content-Type': 'application/json' } }))
    .catch(error =>  new Response(JSON.stringify({
        error: error.errors?.password?.message || 'Internal Server Error',
      }), { status: 500, headers: { 'Content-Type': 'application/json' } }))
    .finally(closeDatabaseConnection);
}
