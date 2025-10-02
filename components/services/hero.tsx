import Image from 'next/image';
import React from 'react'

const Hero: React.FC = () => {
    return (
        <section className='bg-background py-12 px-6'>
            {/* inner wrapper for the hero image */}
            <div className='relative w-full max-w-5xl mx-auto h-[200px] md:h-[300px] overflow-hidden rounded-xl'>
                <Image src="/assets/images/services-hero-cover.avif" alt='Service hero cover' fill className='object-cover' priority />
            </div>
        </section>
    )
 }

export default Hero;