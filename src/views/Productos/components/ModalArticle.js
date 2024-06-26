import './ModalArticle.css'
import { useEffect, useState } from "react";

import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, } from "@nextui-org/react";
import { Image } from "@nextui-org/react";

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Navigation, Mousewheel, FreeMode, Thumbs } from 'swiper/modules';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/free-mode';
import 'swiper/css/thumbs';

import unknown from '../../../assets/imgs/products/unknown.svg'
import ButtonAddToCart from './ButtonAddToCart';


function ModalArticle({ item, setItem, dark, fieldsData }) {

    const contextImgs = require.context('../../../assets/imgs/products', true)
    const [thumbsSwiper, setThumbsSwiper] = useState(null)

    const imgs = []
    if (item?.categoria && item?.id) {
        for (let i = 1; i < 10; i++) {
            var img = null
            try {
                img = contextImgs(`./${item.categoria}/${item.id}/${i}.webp`)
            } catch (error) {
                break
            }
            if (img) imgs.push(img)
        }
        if (!imgs.length) imgs.push(unknown)
    }

    const stock = item.hasOwnProperty('stock') ? item.stock : true

    useEffect(() => {
        setThumbsSwiper(null)
    }, [item])

    return (
        <Modal
            isOpen={item}
            onOpenChange={() => setItem(false)}
            className={(dark ? 'dark text-foreground' : '')}
            classNames={{
                wrapper: "xs:p-2 "
            }}
        >
            <ModalContent className="max-sm:h-full xs:!my-auto max-xs:max-w-none max-xs:mx-0 max-xs:mb-0 max-xs:rounded-none overflow-y-auto">
                {(onClose) => (
                    <>
                        <ModalHeader className="text-3xl">
                            {item?.nombre}
                        </ModalHeader>

                        <ModalBody className="max-xs:px-0">
                            <Swiper
                                modules={[Navigation, Mousewheel, FreeMode, Thumbs]}
                                thumbs={{ swiper: thumbsSwiper }}
                                grabCursor
                                spaceBetween={10}
                                slidesPerView={1}
                                loop={imgs.length > 1}
                                navigation
                                mousewheel={imgs.length > 1}
                                className='w-full xs:h-[400px] shadow-md xs:rounded-lg border border-divider bg-content3'
                                style={{
                                    '--swiper-navigation-color': 'red',
                                    '--swiper-pagination-color': 'red',
                                }}
                            >
                                {imgs.map((img, i) =>
                                    <SwiperSlide key={i} className='!h-auto w-full !flex justify-center'>
                                        <Image
                                            src={img}
                                            className="object-contain w-full rounded-none"
                                            removeWrapper
                                        />
                                    </SwiperSlide>
                                )}
                            </Swiper>

                            {imgs.length > 1 &&
                                <Swiper
                                    onSwiper={setThumbsSwiper}
                                    modules={[FreeMode, Thumbs, Mousewheel]}
                                    loop={imgs.length > 3}
                                    mousewheel
                                    grabCursor
                                    spaceBetween={10}
                                    slidesPerView={1}
                                    breakpoints={{
                                        150: {
                                            slidesPerView: 2,
                                        },
                                        220: {
                                            slidesPerView: 3,
                                        },
                                        280: {
                                            slidesPerView: 4,
                                        },
                                        350: {
                                            slidesPerView: 5,
                                        },
                                        420: {
                                            slidesPerView: 6,
                                        }
                                    }}
                                    freeMode={true}
                                    watchSlidesProgress={true}
                                    className="w-full h-[50px]"
                                >
                                    {imgs.map((img, i) =>
                                        <SwiperSlide key={i} className='!flex justify-center  border border-divider rounded-lg opacity-50 hover:border-primary hover:border-2 cursor-pointer overflow-hidden shadow-md'>
                                            <Image
                                                src={img}
                                                className="object-contain w-full h-full rounded-none"
                                                classNames={{
                                                    wrapper: "rounded-none "
                                                }}
                                            />
                                        </SwiperSlide>
                                    )}
                                </Swiper>
                            }

                            <div className="max-sm:px-4 ">
                                <ul className='capitalize '>
                                    {['forma', 'material', 'denominacion', 'altura', 'largo', 'ancho', 'diametro', 'radio_int', 'radio_ext', 'curva'].map(e =>
                                        item[e] && <li key={e} className='grid grid-cols-3 odd:bg-content3 px-2 py-1 rounded-sm'>
                                            <b>{fieldsData[e]?.label}</b>
                                            <p className='col-span-2'>{item[e]}{fieldsData[e]?.measure}</p>
                                        </li>
                                    )}
                                </ul>


                                {item?.detail &&
                                    <div className='border-y border-divider py-4 mt-4'>
                                        <p className=''><b>Detalles: </b>
                                            {item.detail}
                                        </p>
                                    </div>
                                }
                            </div>

                        </ModalBody>

                        <ModalFooter className='pe-12'>
                            <Button isIconOnly variant="ghost" onPress={onClose}>
                                X
                            </Button>

                            <ButtonAddToCart disabled={!stock} id={item.id} />
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
}

export default ModalArticle;
