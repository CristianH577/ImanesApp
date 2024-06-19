
import { useState } from 'react';

import { Button } from "@nextui-org/react";
import { motion } from "framer-motion"

import { BsChevronBarRight, BsChevronBarLeft } from "react-icons/bs";



function MenuMovilListItems({ items, submenus, icons, navigate, location }) {

    const [submenu, setSubmenu] = useState(null)

    const variants = {
        container: {
            hidden: {
                opacity: 0,
                scale: 0,
            },
            visible: {
                opacity: 1,
                scale: 1,
            }
        },
        main: {
            hidden: {
                opacity: 0,
            },
            visible: {
                opacity: 1,
                x: submenu ? '-100%' : 0,
                transition: {
                    delayChildren: .2,
                    staggerChildren: .1
                }
            },
        },
        main_li: {
            hidden: {
                opacity: 0,
                y: 20
            },
            visible: {
                opacity: 1,
                y: 0,
                x: submenu ? '-100%' : 0,
            },
        },
        sub: {
            hidden: {
                opacity: 0,
                x: 0,
            },
            visible: {
                opacity: 1,
                x: submenu ? '-100%' : 0,
                transition: {
                    delayChildren: .2,
                    staggerChildren: .1
                }
            },
        },
        sub_li: {
            hidden: {
                x: '100%',
                opacity: 0
            },
            visible: {
                x: 0,
                opacity: 1
            }
        }
    }

    return (
        <motion.div
            className='w-fit flex'
            variants={variants.container}
        >
            <motion.ul
                variants={variants.main}
                initial="hidden"
                animate="visible"
                className='w-screen'
            >
                {items.map(item =>
                    <motion.li
                        key={item}
                        className='capitalize text-lg cursor-pointer border-b border-divider hover:bg-content2 flex justify-between items-center '
                        variants={variants.main_li}
                        onClick={() => navigate("/" + item)}
                        style={{
                            fontWeight: location.pathname.includes(item) ? 'bold' : ''
                        }}
                    >
                        <div className='p-2 ps-4 flex gap-2 items-center'>
                            {icons[item] && icons[item]}
                            <p >{item}</p>
                        </div>

                        {submenus[item] && (
                            <Button
                                isIconOnly
                                radius='none'
                                className='w-1/5 bg-transparent hover:text-danger border-s border-divider'
                                onClick={() => setSubmenu(item)}
                            >
                                <BsChevronBarRight size={25} />
                            </Button>
                        )}
                    </motion.li>
                )}
            </motion.ul>

            {/* submenu */}
            <motion.ul
                variants={variants.sub}
                initial="hidden"
                animate="visible"
                className='w-screen'
            >
                <motion.li
                    variants={variants.sub_li}
                    className='p-2 ps-4 text-lg cursor-pointer border-b border-divider hover:bg-content2 flex justify-between items-center '
                    onClick={() => setSubmenu(false)}
                >
                    <BsChevronBarLeft size={25} />
                </motion.li>
                {submenu && submenus[submenu].map(sub =>
                    <motion.li
                        key={sub}
                        variants={variants.sub_li}
                        className='capitalize text-lg cursor-pointer border-b border-divider hover:bg-content2 flex justify-between items-center '
                        onClick={() => navigate(`/${submenu}/${sub}`)}
                        style={{
                            fontWeight: location.pathname.includes(sub) ? 'bold' : ''
                        }}
                    >
                        <div className='p-2 ps-4 flex gap-2 items-center'>
                            {icons[sub] ? icons[sub] : ''}
                            <p >{sub}</p>
                        </div>
                    </motion.li>
                )}
            </motion.ul>
        </motion.div>
    );
}

export default MenuMovilListItems;
