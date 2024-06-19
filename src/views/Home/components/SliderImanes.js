import { Image } from "@nextui-org/react";

import imanes from '../../../assets/imgs/Home/portada.webp'

function SliderImanes() {

    return (
        <div
            className="h-full bg-gradient-to-t from-primary dark:to-primary-200 to-primary-600 "
            style={{
                background: `radial-gradient(circle , var(--tw-gradient-stops))`
            }}
        >
            <div className='h-full w-full max-w-[900px] mx-auto flex flex-col items-center justify-evenly py-4 px-2'   >
                <h1 className='text-3xl xs:text-6xl font-bold text-white text-center uppercase '>
                    imanes de neodimio
                </h1>

                <div
                    className='grid grid-cols-1 md:grid-cols-2 items-center text-center  sm:justify-evenly md:flex-row'
                    style={{
                        textShadow: '1px 1px 2px black'
                    }}
                >
                    <div className="flex items-center justify-center relative">
                        <div className="w-[30%] h-[90%] bg-custom-red-dark rounded-lg -skew-x-6 -skew-y-12 absolute shadow-lg"></div>
                        <Image src={imanes} removeWrapper className='object-contain max-h-[320px]' />
                    </div>

                    <p className='text-lg xs:text-2xl text-white p-2 '><b className='text-[#FF0000]'>IMÁN ARGENTINA</b> es una empresa dedicada a la fabricación y comercialización de imanes de neodimio. Contamos con la mayor variedad de formas y medidas.</p>
                </div>
            </div>
        </div>
    );
}

export default SliderImanes;
