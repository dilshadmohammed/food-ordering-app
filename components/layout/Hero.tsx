import Image from 'next/image'
import React from 'react'
import Right from '../icons/Right'

function Hero() {
    return (
        <section className='hero mt-4'>
            <div className='py-12'>
                <h1 className='text-4xl font-semibold'>
                    Everything<br/>
                    is better<br/>
                    with a&nbsp;
                    <span className='text-primary'>
                        Pizza
                    </span>
                </h1>
                <p className='my-6 text-gray-500 text-sm'>
                    Pizza is the missing piece that makes everyday complete,
                    a simple yet delicious joy in life.
                </p>
                <div className='flex gap-4 items-center text-sm'>
                    <button className='bg-primary uppercase text-white flex gap-2 items-center  px-4 py-2 rounded-full justify-center'>
                        Order now
                        <Right />
                    </button>
                    <button className='flex gap-2 border-0 text-gray-600 font-semibold items-center text-base'>
                        Learn more
                        <Right />
                    </button>
                </div>
            </div>
            <div className='relative'>
                <Image src={'/pizza.png'} fill={true} style={{objectFit:"contain"}}  alt={'pizza'} />
            </div>
        </section>
    )
}

export default Hero