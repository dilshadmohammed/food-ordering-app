import { connectToDatabase } from "@/dbconnect/dbConnect"
import { MenuItem } from '@/models/MenuItem'
import { storage } from "@/dbconnect/firebase"
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import uniqid from 'uniqid'


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

export async function PUT(req,{params}) {
  const id = params.id
  const formData = await req.formData()
    const data = {
        name : formData.get('itemName'),
        description : formData.get('description'),
        basePrice : Number(formData.get('basePrice')),
        sizes:JSON.parse(formData.get('sizes')),
        extraIngredientsPrices:JSON.parse(formData.get('extraIngridientsPrices'))
    }
    const oldImage = formData.get('imageUrl')
    const image = formData.get('image')
    let downloadURL;
    if(image) {
        const ext = image.name.split('.').slice(-1)[0]
        const fileName = uniqid(data.name)
        const storageRef = ref(storage, 'gs://food-ordering-app-410606.appspot.com/menu-items/' + fileName +'.'+ ext);
        await uploadBytes(storageRef, image);
        downloadURL = await getDownloadURL(storageRef);       
    }
    if(oldImage)
        {
            const oldImageref = ref(storage,oldImage)
            try{
                await deleteObject(oldImageref)
            }catch(e){
                console.log("old image doesn't exist")
            }
            
        }
    try{
        await connectToDatabase()
        if(downloadURL)
            data.image = downloadURL
        return Response.json(await MenuItem.updateOne({_id:id},{$set:data}))
    }
  catch(e){
    return Response.error({message:"failed to fetch the item"})
  }
}

