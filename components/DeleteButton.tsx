'use client'

import { useState } from "react";

interface DeleteButtonProps {
    className:string;
    label:string;
    onDelete:Function;
}

function DeleteButton({className='',label,onDelete}:DeleteButtonProps) {
    const [showConfirm,setShowConfirm] = useState(false)

    if(showConfirm){
        return (
            <div className="fixed bg-black/80 inset-0 flex items-center h-full justify-center">
            <div className="bg-white p-4 rounded-lg">
                <div>Are you sure you want to delete?</div>
                <div className="flex gap-2 mt-1">
                    <button type="button" onClick={() => setShowConfirm(false)}>Cancel</button>
                    <button className="bg-primary text-white" type="button" onClick={()=>{
                        setShowConfirm(false)
                        onDelete()
                    }}>Yes</button>
                </div>
            </div>
        </div>
        )
    }
  return (
    <button className={className}  type="button" onClick={() => setShowConfirm(true)}>
        {label}
    </button>
  )
}

export default DeleteButton