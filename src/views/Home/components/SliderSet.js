
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button, Image } from "@nextui-org/react";

import img from '../../../assets/imgs/Home/set.webp'


function SliderSet() {
    const navigate = useNavigate()
    const [center, setCenter] = useState('50% 75%')

    useEffect(() => {
        const updateGradientCenter = () => {
            const element = document.querySelector('#set-img');
            const container = document.querySelector('#set-container');
            const containerWidth = container.offsetWidth;
            const containerHeight = container.offsetHeight;
            const element2Width = element.offsetWidth;
            const element2Height = element.offsetHeight;

            const centerX = (element.offsetLeft + element2Width / 2) / containerWidth * 100;
            const centerY = (element.offsetTop + element2Height / 2) / containerHeight * 100;

            setCenter(`${centerX}% ${centerY}%`)
        };

        updateGradientCenter();
        window.addEventListener('resize', updateGradientCenter);

        return () => {
            window.removeEventListener('resize', updateGradientCenter);
        };
    }, []);

    return (
        <div
            id='set-container'
            className="h-full from-secondary-400 to-secondary dark:from-secondary dark:to-secondary-200"
            style={{
                background: `radial-gradient(circle at ${center}, var(--tw-gradient-stops))`
            }}
        >
            <div
                className=' flex justify-center items-center max-md:flex-col w-full h-full mx-auto max-w-[900px] '
            >
                <div
                    className='p-4 text-white space-y-2 max-md:text-center md:w-1/2 flex flex-col items-center md:items-start justify-center   '
                    style={{
                        textShadow: '1px 1px 2px black'
                    }}
                >
                    <h1 className='text-3xl xs:text-5xl lg:text-6xl font-bold uppercase break-all min-[270px]:break-keep'>
                        set de construcción
                    </h1>

                    <p className='text-lg xs:text-2xl '>
                        Juego de varas y esferas que se combinan entre si para crear formas y estructuras.
                    </p>

                    <Button
                        color="warning"
                        variant="shadow"
                        className="font-bold mt-4"
                        onPress={() => navigate('/productos#set')}
                    >
                        Ver mas
                    </Button>
                </div>

                <Image id='set-img' src={img} removeWrapper className='object-contain xs:h-1/2 sm:h-2/3 md:h-auto md:w-1/2 ' />

            </div>
        </div>
    );
}

export default SliderSet;
