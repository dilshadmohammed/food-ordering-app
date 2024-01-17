import { storage } from "@/dbconnect/firebase"
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import uniqid from 'uniqid'
import {connectToDatabase} from '@/dbconnect/dbConnect'
import { getServerSession } from 'next-auth'
import {authOptions} from '@/libs/AuthOptions'
import { User } from '@/models/User'

export async function POST(req) {
    const data = await req.formData()
    const file = data.get('file')
    const userName = data.get('username')?.split(' ')[0]
    if(file && userName) {
        const ext = file.name.split('.').slice(-1)[0]
        const fileName = uniqid(userName,'profile-pic')
        const storageRef = ref(storage, 'gs://food-ordering-app-410606.appspot.com/profilepics/' + fileName +'.'+ ext);
        await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(storageRef);
        const session = await getServerSession(authOptions)
        const email = session.user.email
        const oldImage = session.user?.image
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
            await User.updateOne({ email: email }, { $set: { image: downloadURL } })
            return Response.json({ success: true, imageurl: downloadURL })
        }catch (err) {
            console.error('Error during image upload/update:', err);
            await deleteObject(downloadURL)
            return Response.error({ message: 'Failed to upload/update image.' });
        }
        
    }
    return Response.error({ message: 'Failed to upload/update image.' })
}