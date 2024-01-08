import Image from 'next/image'
import React from 'react'
import MenuItem from '../menu/MenuItem'
import SectionHeaders from './SectionHeaders'

function HomeMenu() {
  return (
    <section>
      <div className='absolute left-0 right-0 w-full' >
        <div className='absolute left-0 -top-[70px] -z-10'>
          <Image src={'/sallad1.png'} width={109} height={189} alt={'sallad'} />
        </div>
        <div className='absolute right-0 -top-[100px] -z-10'>
          <Image src={'/sallad2.png'} width={109} height={189} alt={'sallad'} />
        </div>
      </div>
        <div className="text-center mb-4">
            <SectionHeaders subHeader={'Check Out'} mainHeader={'Menu'} />
        </div>
        <div className="grid grid-cols-3 gap-4">
          <MenuItem />
          <MenuItem />
          <MenuItem />
          <MenuItem />
          <MenuItem />
          <MenuItem />
        </div>
    </section>
  )
}

export default HomeMenu