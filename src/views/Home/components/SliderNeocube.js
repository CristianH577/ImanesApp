
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "@nextui-org/react";
import { motion } from 'framer-motion';

// import neocube from '../../../assets/imgs/Home/neocube.webp'
import { SVGNeocube } from "../../../assets/svgs";


function SliderNeocube() {
    const navigate = useNavigate()
    const [center, setCenter] = useState('25% 50%')

    useEffect(() => {
        const updateGradientCenter = () => {
            const element = document?.querySelector('#neo-img')
            const container = document.querySelector('#neo-container')
            const containerWidth = container?.offsetWidth;
            const containerHeight = container?.offsetHeight;
            const element2Width = element?.offsetWidth;
            const element2Height = element?.offsetHeight;

            const centerX = (element?.offsetLeft + element2Width / 2) / containerWidth * 100;
            const centerY = (element?.offsetTop + element2Height / 2) / containerHeight * 100;

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
            id="neo-container"
            className="h-full from-success to-success-600 dark:to-success-200"
            style={{
                background: `radial-gradient(circle at ${center}, var(--tw-gradient-stops))`
            }}
        >
            <div className='flex justify-center w-full max-w-[900px] h-full mx-auto max-md:flex-col'   >
                <motion.div
                    id="neo-img"
                    className="h-1/2 md:h-auto md:w-fit flex justify-center py-3 text-transparent"
                    animate={{
                        // y: [-20, 20],
                        // color: ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff'],
                        transition: { repeat: Infinity, duration: 5, repeatType: 'mirror' }
                    }}
                >
                    <SVGNeocube className='h-full w-fit' />
                </motion.div>
                {/* <Image id="neo-img" src={neocube} removeWrapper className='object-contain h-1/2 md:h-full py-3' /> */}

                <div
                    className='p-4 text-center text-white space-y-2 flex flex-col items-center justify-center break-all min-[270px]:break-keep '
                    style={{
                        textShadow: '1px 1px 2px black'
                    }}
                >
                    <h1 className='text-3xl xs:text-6xl font-bold uppercase '>
                        neocube multicolor
                    </h1>

                    <p className='text-lg xs:text-2xl '>
                        216 imanes esféricos de 5mm en 8 colores diferentes ideales para dejar llevar la imaginación.
                    </p>

                    <Button
                        color="warning"
                        variant="shadow"
                        className="font-bold mt-4"
                        onPress={() => navigate('/productos#neocube')}
                    >
                        Ver más
                    </Button>
                </div>
            </div>
        </div >
    );
}

export default SliderNeocube;
