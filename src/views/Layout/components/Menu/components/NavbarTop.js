


import { Button, Badge } from "@nextui-org/react";
import { motion } from "framer-motion"

import { MdOutlineShoppingCart } from "react-icons/md";

import { SVGLogoIman, SVGLogoTexto } from '../../../../../assets/svgs.js'



function NavbarTop({ cart, navigate, openMenuMovil, submenu }) {

    const compra_length = Object.keys(cart).length

    return (
        <div id='nav-top' className='h-[64px] sm:h-[96px] lg:h-[128px] flex justify-center items-center relative w-full' >
            <motion.span
                className='h-full flex justify-center items-center  cursor-pointer gap-1 py-3 sm:py-4 lg:py-6'
                whileHover={{
                    scale: 1.1,
                }}
                onClick={() => navigate('/')}
            >
                <motion.div
                    animate={{ rotate: (openMenuMovil || submenu) ? 135 : 0 }}
                    className='h-full'
                >
                    <SVGLogoIman
                        className='h-full w-auto'
                    />
                </motion.div>
                <SVGLogoTexto
                    className='h-full w-auto'
                />
            </motion.span>

            <motion.div
                variants={{
                    initial: { opacity: 0, x: '100%', },
                    animate: { opacity: 1, x: 10 },
                    whileHover: { opacity: 1, x: 0, }
                }}
                initial='initial'
                animate={compra_length ? 'animate' : ''}
                whileHover='whileHover'
                className=' fixed right-0 z-50'
            >
                <Badge
                    content={compra_length}
                    color="success"
                    placement="top-left"
                    className='border-none text-foreground font-bold'
                >
                    <Button
                        color="primary"
                        className='min-w-4 rounded-e-none shadow-md bg-gradient-to-l from-primary to-primary-300 dark:bg-gradient-to-r dark:from-primary-500'
                        onPress={() => navigate('/carrito')}
                    >
                        <MdOutlineShoppingCart size={28} />
                    </Button>
                </Badge>
            </motion.div>
        </div>
    );
}

export default NavbarTop;
