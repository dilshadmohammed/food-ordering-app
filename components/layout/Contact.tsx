import React from 'react'
import SectionHeaders from './SectionHeaders'

function Contact() {
    return (
        <section className='text-center my-8'>
            <SectionHeaders
                subHeader={'Don\'t hesitate'}
                mainHeader={'Contact Us'}
            />
            <div className="mt-8">
                <a className='text-4xl underline text-gray-500' href="tel:+918714381226">+91 8714381225</a>
            </div>
        </section>
    )
}

export default Contact