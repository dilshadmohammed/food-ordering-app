import React from 'react'
import SectionHeaders from './SectionHeaders'

function AboutUs() {
  return (
    <section className="text-center my-16">
        <SectionHeaders
          subHeader={'Our Story'}
          mainHeader={'About us'}
        />
        <div className='text-gray-500 max-w-2xl mx-auto mt-4 flex flex-col gap-4'>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus provident commodi, beatae fugit voluptate vitae labore necessitatibus nulla asperiores eum illo corrupti quis ab dolor. Temporibus eaque vitae unde vel!</p>

          < p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa quis illo pariatur, dolorem, eligendi quae distinctio ducimus cum dicta nobis ipsam id eius non minima tempore qui quaerat nam nemo.
        </p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus aperiam eveniet distinctio asperiores, ducimus praesentium rerum </p>
        </div>
      </section>
  )
}

export default AboutUs