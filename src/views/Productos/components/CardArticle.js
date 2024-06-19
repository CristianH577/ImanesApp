

import { Divider } from '@nextui-org/react';
import { Card, CardBody, Image, CardHeader } from "@nextui-org/react";

import { motion } from 'framer-motion';

import ButtonAddToCart from './ButtonAddToCart';

import unknown from '../../../assets/imgs/products/unknown.svg'


function CardArticle({ item, showInfo, fieldsData }) {
    const contextImgs = require.context('../../../assets/imgs/products', true)

    var src = null
    try {
        src = contextImgs(`./${item.categoria}/${item.id}/1.webp`)
    } catch (error) {
        src = unknown
    }

    const stock = item.hasOwnProperty('stock') ? item.stock : true


    return (
        <div className='bg-content1 xs:rounded-lg shadow-lg hover:shadow-custom-gray-3  flex flex-col items-center h-full mx-auto'>
            <Card
                shadow='none'
                className='xs:max-w-[200px] justify-between max-xs:rounded-none h-full cursor-pointer'
                isPressable
                onPress={showInfo}
            >
                <CardHeader className='p-0' >
                    <Image
                        alt={`imagen de ${item.nombre}`}
                        src={src}
                        className="w-full xs:w-[200px] xs:h-[200px] bg-content2 max-xs:rounded-none shadow-lg max-xs:px-0 xs:p-0 object-contain p-2"
                        classNames={{
                            wrapper: 'w-full !max-w-none shadow-md'
                        }}
                    />
                </CardHeader>

                <motion.div
                    initial={{ opacity: 0, y: '-100%' }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: .5 }}
                    className='w-full h-full flex flex-col items-center'
                >
                    <CardBody className="h-full w-full">
                        <h2 className="text-lg font-semibold capitalize">
                            {item.nombre}
                        </h2>

                        {item?.categoria === 'imanes' && (
                            <div className='flex flex-col justify-between h-full'>
                                <ul className='text-small text-default-500 capitalize'>
                                    {['forma', 'material', 'denominacion', 'altura', 'largo', 'ancho', 'diametro', 'curva'].map(e =>
                                        item[e] && <li key={e}>{fieldsData[e]?.label}: {item[e]}{fieldsData[e]?.measure} </li>
                                    )}
                                </ul>
                            </div>
                        )}

                    </CardBody>

                    {/* <Divider className='mb-2 w-2/3 ' />

                    <CardFooter className="flex flex-wrap gap-2 max-xs:px-0 justify-center overflow-visible pt-1 ">
                        <ButtonAddToCart disabled={!stock} id={item.id} />
                    </CardFooter> */}
                </motion.div>
            </Card>
            <Divider className='w-2/3' />
            <div className="flex flex-wrap gap-2 max-xs:px-0 justify-center overflow-visible p-2">
                <ButtonAddToCart disabled={!stock} id={item.id} />
            </div>
        </div>
    );
}

export default CardArticle;
