import { connectToDatabase } from "@/dbconnect/dbConnect"
import { Category } from "@/models/Category"

export async function POST(req) {
    try {
        const { name } = await req.json();
        await connectToDatabase();
        const categoryDoc = await Category.create({ name });
        return Response.json(categoryDoc)
      } catch (error) {
        console.error("Error in POST:", error);
        return new Response(JSON.stringify({ error: error }), { status: 500 });

      }
}

export async function PUT(req) {
  try {
    const { name , _id } = await req.json();
    await connectToDatabase();
    const res = await Category.updateOne({_id},{name})
    return Response.json(res)
  } catch (error) {
    console.error("Error in PUT updating category:", error);
    return new Response(JSON.stringify({ error: error }), { status: 500 });

  }
}

export async function GET() {
    try {
      await connectToDatabase();
      const categories = await Category.find();
      return Response.json(categories)
    } catch (error) {
      console.error("Error in GET:", error);
      return new Response(JSON.stringify({ error: error }), { status: 500 });
      
    }
  }

  export async function DELETE(req) {
    try {
      const {_id} = await req.json()
      await connectToDatabase();
      const deletedCategory = await Category.deleteOne({_id});
      return Response.json(deletedCategory)
    } catch (error) {
      console.error("Error in GET:", error);
      return new Response(JSON.stringify({ error: error }), { status: 500 });
      
    }
  }