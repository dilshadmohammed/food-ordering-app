import { connectToDatabase } from "@/dbconnect/dbConnect"
import { MenuItem } from '@/models/MenuItem'
export async function GET(req,{params}) {
  const id = params.id
  try{
    await connectToDatabase()
    const menuItem = await MenuItem.findById(id)
    return Response.json(menuItem)
  }
  catch(e){
    return Response.error({message:"failed to fetch the item"})
  }
}