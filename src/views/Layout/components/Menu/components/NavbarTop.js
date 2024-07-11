


import { Button, Badge, Divider } from "@nextui-org/react";
import { motion } from "framer-motion"

import { MdOutlineShoppingCart } from "react-icons/md";
import { FaUserSecret, FaUserTie } from "react-icons/fa6";

import { SVGLogoIman, SVGLogoTexto } from '../../../../../assets/svgs.js'



function NavbarTop({ cart, navigate, openMenuMovil, submenu, location, openLog, isLogged }) {
    const compra_length = Object.keys(cart).length

    return (
        <div id='nav-top' className='h-[128px] xs:h-[64px] sm:h-[96px] lg:h-[128px] flex justify-center items-end xs:items-center relative w-full z-50 bg-content1 ' >
            {/* logo */}
            <motion.span
                className='h-1/2 xs:h-full flex justify-center items-center  cursor-pointer gap-1 py-3 sm:py-4 lg:py-6'
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

            {/* carrito */}
            <motion.div
                variants={{
                    initial: { opacity: 0, x: '-100%', },
                    animate: { opacity: 1, x: -10 },
                    whileHover: { opacity: 1, x: -1, }
                }}
                initial='initial'
                animate={compra_length ? 'animate' : ''}
                whileHover='whileHover'
                className=' fixed left-0 z-50 max-xs:top-3'
            >
                <Badge
                    content={compra_length}
                    color="success"
                    placement="top-right"
                    className='border-none text-foreground font-bold'
                >
                    <Button
                        color={location.pathname.includes('carrito') ? 'danger' : 'primary'}
                        className={'min-w-4 rounded-s-none shadow-md bg-gradient-to-l dark:bg-gradient-to-r ' + (location.pathname.includes('carrito') ? 'from-danger to-danger-300 dark:from-danger-500' : 'from-primary to-primary-300 dark:from-primary-500')}
                        onPress={() => {
                            window.scrollTo(0, 0)
                            navigate('/carrito')
                        }}
                    >
                        <MdOutlineShoppingCart size={28} />
                    </Button>
                </Badge>
            </motion.div>

            {/* logueo */}
            <motion.div
                variants={{
                    initial: { opacity: 0, x: '100%', },
                    animate: { opacity: 1, x: 10 },
                    whileHover: { opacity: 1, x: 1, }
                }}
                initial={isLogged ? 'animate' : 'initial'}
                animate={isLogged ? 'initial' : 'animate'}
                whileHover='whileHover'
                className=' absolute right-0 z-50 max-xs:top-3'
            >
                <Button
                    color='secondary'
                    className={'min-w-4 rounded-e-none shadow-md bg-gradient-to-l dark:bg-gradient-to-r from-secondary-300 to-secondary-500'}
                    onClick={openLog}
                >
                    <FaUserSecret size={28} />
                </Button>
            </motion.div>

            {/* cuenta */}
            <motion.div
                variants={{
                    hidden: { opacity: 0, x: '100%' },
                    initial: { opacity: 0, x: '100%', },
                    animate: { opacity: 1, x: 10 },
                    whileHover: { opacity: 1, x: 1, }
                }}
                initial={isLogged ? 'initial' : 'hidden'}
                animate={isLogged ? 'animate' : 'hidden'}
                whileHover='whileHover'
                className=' absolute right-0 z-50 max-xs:top-3'
            >
                <Button
                    color={location.pathname.includes('micuenta') ? 'danger' : 'secondary'}
                    className={'min-w-4 rounded-e-none shadow-md bg-gradient-to-r dark:bg-gradient-to-l from-secondary-500 to-secondary-300 ' + (location.pathname.includes('micuenta') ? ' from-danger to-danger-300 dark:from-danger-500 dark:to-danger-300' : '')}
                    onClick={() => navigate("/micuenta")}
                >
                    <FaUserTie size={28} />
                </Button>
            </motion.div>

            <Divider className='w-[60%] absolute bottom-0' />
        </div>
    );
}

export default NavbarTop;
