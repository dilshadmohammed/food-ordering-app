import Image from 'next/image'
import React from 'react'

function Loading() {
  return (
    <div className="fixed inset-0 flex items-center w-auto h-full justify-center bg-black/80 backdrop-filter backdrop-blur-lg z-10">
        <Image src={'/food-loading.webp'} width={100} height={100} priority={true} style={{ width: 'auto', height: '16%' }} alt='loading'/>
    </div>
  )
}

export default Loading