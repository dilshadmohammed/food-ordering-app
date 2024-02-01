import { connectToDatabase } from "@/dbconnect/dbConnect"
import { User } from "@/models/User";
export async function GET(){
    try{
        await connectToDatabase()
        return Response.json(await User.find({}, { _id: 1, name: 1, email: 1, image: 1 }))
    }
    catch(e)
    {
        return Response.error({message:"failed to fetch users"})
    }
}