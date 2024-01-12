import {connectToDatabase,closeDatabaseConnection} from '@/dbconnect/dbConnect'
import { getServerSession } from 'next-auth'
import {authOptions} from '@/app/api/auth/[...nextauth]/route'
import { User } from '@/models/User'
export async function PUT(req) {
    return connectToDatabase().then(async ()=> {
        const data = await req.json()
        const session = await getServerSession(authOptions)
        const email = session.user.email
        if('name' in data) {
           await User.updateOne({ email: email }, { $set: { name: data.name } })
        }
        if('image' in data)
        {
            
        }

        return Response.json(true)
    }).finally(() => closeDatabaseConnection())
}