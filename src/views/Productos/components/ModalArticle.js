import './ModalArticle.css'
import { useEffect, useRef, useState } from "react";

import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Skeleton, } from "@nextui-org/react";
import { Image } from "@nextui-org/react";

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Navigation, Mousewheel, FreeMode, Thumbs } from 'swiper/modules';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/free-mode';
import 'swiper/css/thumbs';

import ButtonAddToCart from './ButtonAddToCart';

import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

import unknown from '../../../assets/imgs/products/unknown.svg'


function ModalArticle({ item, index, setIndex, dark, fieldsData }) {

    const contextImgs = require.context('../../../assets/imgs/products', true)
    const [imgs, setImgs] = useState([])
    const [thumbsSwiper, setThumbsSwiper] = useState(null)
    const mainSwiperRef = useRef(null)

    // var imgs = []
    // if (item?.categoria && item?.id) {
    //     for (let i = 1; i < 10; i++) {
    //         var img = null
    //         try {
    //             img = contextImgs(`./${item.categoria}/${item.id}/${i}.webp`)
    //         } catch (error) {
    //             break
    //         }
    //         if (img) imgs.push(img)
    //     }
    //     if (!imgs.length) imgs.push(unknown)
    // }

    const stock = item.hasOwnProperty('stock') ? item.stock : true

    useEffect(() => {
        setThumbsSwiper(null)

        setImgs([])
        const imgs_new = []
        if (item?.categoria && item?.id) {
            for (let i = 1; i < 10; i++) {
                var img = null
                try {
                    img = contextImgs(`./${item.categoria}/${item.id}/${i}.webp`)
                } catch (error) {
                    break
                }
                if (img) imgs_new.push(img)
            }
            if (!imgs_new.length) imgs_new.push(unknown)
        }
        setTimeout(() => {
            setImgs(imgs_new)
        }, 300);
        // eslint-disable-next-line
    }, [index])

    return (
        <Modal
            isOpen={item}
            onOpenChange={() => setIndex(false)}
            className={(dark ? 'dark text-foreground' : '')}
            classNames={{
                wrapper: "xs:p-2 "
            }}
        >
            <ModalContent className="max-sm:h-full xs:!my-auto max-xs:max-w-none max-xs:mx-0 max-xs:mb-0 max-xs:rounded-none overflow-y-auto sm:w-full">
                {(onClose) => (
                    <>
                        <div className={'flex gap-2 justify-center w-full pt-2 ' + (item ? '' : 'hidden')}>
                            <Button
                                isIconOnly
                                variant='bordered'
                                size='sm'
                                className='text-xl'
                                onPress={() => {
                                    setIndex(index - 1)
                                }}>
                                <FaChevronLeft />
                            </Button>
                            <Button
                                isIconOnly
                                variant='bordered'
                                size='sm'
                                className='text-xl'
                                onPress={() => {
                                    setIndex(index + 1)
                                }}
                            >
                                <FaChevronRight />
                            </Button>
                        </div>

                        <ModalHeader className="text-3xl pt-2">
                            <Skeleton isLoaded={imgs.length > 0}>
                                {item?.nombre}
                            </Skeleton>
                        </ModalHeader>

                        {!imgs.length
                            ? < ModalBody className="max-xs:px-0">

                                <Skeleton className='w-full h-full xs:h-[400px]' />

                                <Skeleton className=' h-16 w-full ' />

                            </ModalBody>
                            : < ModalBody className="max-xs:px-0">

                                <Swiper
                                    ref={mainSwiperRef}
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
                                        className="w-full h-[50px] max-xs:!px-2"
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

                                <div className="px-1 xs:px-2 sm:px-0">
                                    <ul className='capitalize '>
                                        {['forma', 'material', 'denominacion', 'altura', 'largo', 'ancho', 'diametro', 'radio_int', 'radio_ext', 'curva'].map(e =>
                                            item[e] && <li key={e} className='grid grid-cols-2 xs:grid-cols-3 odd:bg-content3 px-2 py-1 rounded-sm'>
                                                <b className='break-all'>{fieldsData[e]?.label}</b>
                                                <p className='xs:col-span-2 ps-1'>{item[e]}{fieldsData[e]?.measure}</p>
                                            </li>
                                        )}
                                    </ul>


                                    {item?.detail &&
                                        <div className='border-y border-divider py-4 mt-4 px-1'>
                                            <p className=''><b>Detalles: </b>
                                                {item.detail}
                                            </p>
                                        </div>
                                    }
                                </div>
                            </ModalBody>
                        }

                        <ModalFooter className='pe-12'>
                            <Button isIconOnly variant="ghost" onPress={onClose}>
                                X
                            </Button>

                            <Skeleton isLoaded={imgs.length > 0} className='rounded-lg'>
                                <ButtonAddToCart disabled={!stock} id={item.id} />
                            </Skeleton>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal >
    );
}

export default ModalArticle;
