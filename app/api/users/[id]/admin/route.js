import { connectToDatabase } from "@/dbconnect/dbConnect"
import { UserInfo } from "@/models/UserInfo"


export async function PUT(req, { params }) {
    const id = params.id;
    try {
        await connectToDatabase();
        const userInfo = await UserInfo.findByIdAndUpdate(id, { $set: { isAdmin: { $not: "$isAdmin" } } }, { new: true });
        if (!userInfo) {
            return Response.error({message:"User not Found"})
        }
        return Response.json(userInfo)
    } catch (err) {
        console.error(err);
        return Response.error({message:"Failed to update user"})
    }
}
