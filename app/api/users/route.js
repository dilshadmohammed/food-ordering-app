import { connectToDatabase } from "@/dbconnect/dbConnect"
import { User } from "@/models/User";
export async function GET(){
    try {
        await connectToDatabase();
        const users = await User.find()
        //need a lookup pipeline for isAdmin
        return Response.json(users);
    } catch (e) {
        return Response.error({ message: "failed to fetch users" });
    }
}