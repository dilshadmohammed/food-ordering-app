import React from 'react'
import Image from 'next/image'

function MenuItem() {
    return (
        <div className="bg-gray-200 rounded-lg p-4 text-center
        group hover:bg-white hover:shadow-md hover:shadow-black/25 
        transition-all">
            <div className="relative w-full h-28">
                <Image  src={'/pizza.png'} layout={'fill'} objectFit={'contain'} alt={'pizza'} />
            </div>
            <h4 className="font-semibold text-xl my-3">
                Pepperoni Pizza
            </h4>
            <p className="text-gray-500 text-sm">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            </p>
            <button className='mt-4 bg-primary text-white rounded-full px-8 py-2'>
                Add to Cart $12
            </button>
        </div>
    )
}

export default MenuItem