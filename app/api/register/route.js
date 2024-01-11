import { User } from "@/models/User";
import { connectToDatabase, closeDatabaseConnection } from "@/dbconnect/dbConnect";
import bcrypt from 'bcrypt'

export async function POST(req) {
  const body = await req.json();

  return connectToDatabase()
    .then(() =>{
      const pass = body.password
      if(!pass?.length || pass?.length >= 5){
        throw new Error('password must be atleast 5 characters')
      }
      const notHashPassword = pass;
      const salt = bcrypt.genSaltSync(10);
      body.password = bcrypt.hashSync(notHashPassword,salt);
      User.create(body)
    })
    .then(createdUser => new Response(JSON.stringify(createdUser), { status: 200, headers: { 'Content-Type': 'application/json' } }))
    .catch(error =>  new Response(JSON.stringify({
        error: error.errors?.password?.message || 'Internal Server Error',
      }), { status: 500, headers: { 'Content-Type': 'application/json' } }))
    .finally(closeDatabaseConnection);
}
