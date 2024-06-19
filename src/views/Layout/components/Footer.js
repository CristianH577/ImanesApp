

import { Card, Divider, Image } from '@nextui-org/react';

import { RiBankLine } from "react-icons/ri";
import { HiOutlineBanknotes } from "react-icons/hi2";
import { CiCreditCard2 } from "react-icons/ci";
import { IoMdCard } from "react-icons/io";
import { IoWalletOutline } from "react-icons/io5";

import { BsBoxSeam } from "react-icons/bs";
import { FaMotorcycle } from "react-icons/fa";
import { MdOutlineHomeWork } from "react-icons/md";


import { SVGCorreoArgentino, SVGLogoIman, SVGLogoTexto } from '../../../assets/svgs.js'
import qr_wp from '../../../assets/imgs/layout/qr-wp.webp'


function Footer() {

    const icons_size = 36
    const formas_pago = [
        {
            title: 'transferencia',
            icon: <RiBankLine size={icons_size} />
        },
        {
            title: 'efectivo',
            icon: <HiOutlineBanknotes size={icons_size} />
        },
        {
            title: 'debito',
            icon: <IoMdCard size={icons_size} />
        },
        {
            title: 'credito',
            icon: <CiCreditCard2 className='stroke-1' size={icons_size} />
        },
        {
            title: 'billetera virtual',
            icon: <IoWalletOutline size={icons_size} />
        },
    ]

    const formas_envio = [
        {
            title: 'retiro en persona',
            icon: <MdOutlineHomeWork size={icons_size} />
        },
        {
            title: 'correo argentino',
            icon: <SVGCorreoArgentino size={icons_size} />
        },
        {
            title: 'encomienda',
            icon: <BsBoxSeam size={32} />
        },
        {
            title: 'servimoto',
            icon: <FaMotorcycle size={40} />
        },
    ]

    return (
        <footer className='mt-auto bg-content1 shadow-inner flex flex-col justify-center relative '>
            {/* <div className='flex flex-col justify-center items-center lg:flex-row'> */}
            {/* <div className='flex flex-col items-center justify-center gap-2 mb-3 w-full'> */}
            <span className="flex justify-center gap-1 h-[96px] mt-10 mb-10">
                <SVGLogoIman className='h-full w-auto' />
                <SVGLogoTexto className='h-full w-auto text-justify' />
            </span>


            <div className='text-center space-y-4 pt-4 pb-6 bg-content2 w-full '>
                <h2 className='text-3xl font-semibold'>Formas de Pago</h2>

                <div className='flex flex-wrap justify-center gap-10 '>
                    {formas_pago.map(forma =>
                        <div key={forma.title} className='flex items-center flex-col gap-1 capitalize text-xl hover:scale-125 transition-all '>
                            {forma.icon}
                            <p>{forma.title}</p>
                        </div>
                    )}
                </div>
            </div>


            <div className='text-center space-y-4 my-4 pb-4  w-full '>
                <h2 className='text-3xl font-semibold'>Envio</h2>

                <div className='flex flex-wrap justify-center gap-10 '>
                    {formas_envio.map(forma =>
                        <div key={forma.title} className='flex items-center justify-between flex-col gap-1 capitalize text-xl hover:scale-125 transition-all '>
                            {forma.icon}
                            <p>{forma.title}</p>
                        </div>
                    )}
                </div>
            </div>

            <div className='w-full bg-content2 flex flex-col items-center pt-6 gap-2'>

                <Card
                    isPressable
                    className='w-fit self-center shadow-none hover:scale-90 lg:absolute lg:right-[1%] top-[3%]  max-lg:mb-4'
                    data-href='https://api.whatsapp.com/send?phone=543813156907&text=Hola.%20Quiero%20contactarme%20por%20los%20servicios%20de%20programacion.'
                >
                    <Image
                        src={qr_wp}
                        className='h-[150px] lg:h-[130px]'
                        classNames={{ wrapper: 'bg-content3 border-3 border-divider dark:border-background ' }}
                    />
                </Card>

                <Divider className='w-[50%]' />
                <div className='flex  sm:justify-evenly max-sm:flex-col gap-1 py-1 text-center '>
                    <p className='w-[220px] sm:text-end sm:pe-2'>Tel. +xx (xxx) xxx-xxxxxx</p>
                    <p className='w-[220px] sm:border-s border-divider sm:text-start sm:ps-2'>Ciudad, Provincia, Pais</p>
                </div>
                <Divider className='w-[50%]' />

                <div className='flex gap-1 pb-2 text-neutral-500 self-center mt-4'>
                    <p>2024</p>
                    <p>©VerdeAve Inc.</p>
                </div>
            </div>
        </footer >
    );
}

export default Footer;
