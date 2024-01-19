import { connectToDatabase } from "@/dbconnect/dbConnect";
import { MenuItem } from '@/models/MenuItem'
import { storage } from "@/dbconnect/firebase"
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import uniqid from 'uniqid'

export async function POST(req) {
    const formData = await req.formData()
    const data = {
        name : formData.get('itemName'),
        description : formData.get('description'),
        basePrice : Number(formData.get('basePrice'))
    }
    const image = formData.get('image')
    let downloadURL;
    if(image) {
        const ext = image.name.split('.').slice(-1)[0]
        const fileName = uniqid(data.name)
        const storageRef = ref(storage, 'gs://food-ordering-app-410606.appspot.com/menu-items/' + fileName +'.'+ ext);
        await uploadBytes(storageRef, image);
        downloadURL = await getDownloadURL(storageRef);       
    }

    try{
        await connectToDatabase()
        if(downloadURL)
            data.image = downloadURL
        return Response.json(await MenuItem.create(data))
    }
    catch(e)
    {
        console.error('Error during saving item', err);
        if(downloadURL)
            await deleteObject(downloadURL)
        return Response.error({ message: 'Failed to save new Item' });
    }

} 

export async function GET() {
    try{
        await connectToDatabase()
        return Response.json(
            await MenuItem.find()
        )
    }
    catch(e) {
        return Response.error({ message: 'Error in fetching items' });
    }
}
