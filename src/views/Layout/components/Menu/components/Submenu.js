
import { motion } from "framer-motion"

function Submenu({ items, navigate, location, main, icons }) {
    return (
        <motion.ul
            variants={{
                hidden: {
                    opacity: 1,
                    y: '-100%',
                },
                visible: {
                    opacity: 1,
                    y: '-10%',
                    transition: {
                        delayChildren: .1,
                        staggerChildren: .1
                    }
                },
            }}
            initial="hidden"
            animate="visible"
            className='bg-content1 dark:bg-content2 shadow-lg flex flex-wrap justify-center pt-5 dark:pt-4'
        >
            {items.map(item =>
                <motion.li
                    key={item}
                    className='px-4 py-2 capitalize text-md cursor-pointer hover:dark:bg-content3 hover:bg-content2 h-full min-h-[48px] flex items-center data-[active=true]:font-bold dark:data-[active=true]:text-warning data-[active=true]:text-custom-red-dark'
                    data-active={location.search.includes(item)}
                    variants={{
                        hidden: { y: 20, opacity: 0 },
                        visible: {
                            y: 0,
                            opacity: 1
                        }
                    }}
                    onClick={() => {
                        navigate(`/productos?categoria=${main}&forma=${item}`)
                    }}
                >
                    <div className=' flex gap-2 items-center'>
                        {icons[item] && icons[item]}
                        <p >{item}</p>
                    </div>
                </motion.li>
            )}
        </motion.ul>
    );
}

export default Submenu;
