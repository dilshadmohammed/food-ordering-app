import {connectToDatabase,closeDatabaseConnection} from '@/dbconnect/dbConnect'
import { getServerSession } from 'next-auth'
import {authOptions} from '@/app/api/auth/[...nextauth]/route'
import { User} from '@/models/User'
import { UserInfo, userInfo } from '@/models/UserInfo'
export async function PUT(req) {
    return connectToDatabase().then(async ()=> {
        const {name,...data}= await req.json()
        const session = await getServerSession(authOptions)
        const email = session.user.email
         await UserInfo.updateOne({email:email},{$set:data},{ upsert: true })
        return Response.json(true)
    })
    .catch((err)=>{
        return new Response(JSON.stringify({err:err},{status:500}))
    })
}

export async function GET(req){
    try{
        await connectToDatabase();
        const session = await getServerSession(authOptions);
        const email = session.user.email;
        return Response.json(
            await UserInfo.findOne({email})
        )
    }
    catch(err)
    {
        return new Response(JSON.stringify({
            error:'Internal Server Error',
          }), { status: 500, headers: { 'Content-Type': 'application/json' } })
    }

}