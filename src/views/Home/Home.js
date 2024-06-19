

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { Image } from '@nextui-org/react';

import { motion } from 'framer-motion';

import SliderImanes from './components/SliderImanes';
import SliderNeocube from './components/SliderNeocube';
import SliderSet from './components/SliderSet';

import card1 from '../../assets/imgs/Home/card1.webp';
import card2 from '../../assets/imgs/Home/card2.webp';
import vs_neodimio from '../../assets/imgs/Home/vs-neodimio.webp';
import vs_ferrita from '../../assets/imgs/Home/vs-ferrita.webp';
import example from '../../assets/imgs/Home/example_pull.webp';

import { AiOutlineAudio } from "react-icons/ai";
import { SVGChainHang, SVGDiente, SVGFishing, SVGFishingB, SVGSignToLeft, SVGWave } from '../../assets/svgs';
import { FaRegCircle } from "react-icons/fa";



function Home() {

  const slider_items = [
    {
      id: 'imanes',
      slide: <SliderImanes />
    },
    {
      id: 'neocube',
      slide: <SliderNeocube />
    },
    {
      id: 'set',
      slide: <SliderSet />
    },
  ]

  const usos = [
    {
      title: 'Sujeción',
      text: 'Sirve para sujetar, colgar o unir cualquier objeto en vez de estar atornillado o adhesivado con cola.',
      icon: <div className='px-8 space-y-8 flex flex-col items-center'>
        <motion.div
          style={{
            transformOrigin: '50% 0%',
          }}
          animate={{ rotate: [30, -30] }}
          transition={{ duration: 2, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
        >
          <SVGChainHang size={100} className='' />
        </motion.div>

        <motion.div
          animate={{ y: [0, -20] }}
          transition={{ duration: 1, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
        >
          <FaRegCircle size={30} />
        </motion.div>
      </div>
    },
    {
      title: 'Piezas electrónicas',
      text: 'Por ejemplo, los micrófonos. Estos súper imanes se alojan dentro del mecanismo de estos pequeños altavoces y hacen girar la bobina gracias al campo magnético generado por el imán. Al girar, la corriente eléctrica crea el sonido y se amplifica.',
      icon: <div className='flex flex-col justify-center pt-6'>
        <div className='flex flex-col items-center relative '>
          {[...Array(4)].map((_, i) =>
            <motion.div
              key={i}
              className='absolute bottom-0'
              initial={{ opacity: 0 }}
              animate={{
                scale: [1, 1.5, 2, 1.5, 1],
                y: [0, -15, -30, -15, 0],
                opacity: [1, 1, 1, 0, 0]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: 'loop',
                ease: 'easeOut',
                delay: i
              }}
            >
              <SVGWave size={20} />
            </motion.div>
          )}
        </div>

        <AiOutlineAudio size={50} />
      </div>
    },
    {
      title: 'Prótesis dentales',
      text: 'Gracias a ser los imanes más fuertes del mundo, mantienen los dientes en su sitio y mantienen la fijación de la estructura dental o prótesis aplicada.',
      icon: <div className='flex '>
        <SVGDiente size={40} />
        <motion.div
          animate={{
            y: [0, -30, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: 'loop',
          }}
        >
          <SVGDiente size={40} />
        </motion.div>
        <SVGDiente size={40} />
      </div>
    },
    {
      title: 'Pesca magnética',
      text: 'Normalmente, se ata se ata el imán de neodimio a un hilo y se hunde en el agua para encontrar cualquier tesoro metálico alojado en el fondo del mar.',
      icon: <div className="relative ">
        <motion.div
          className=" "
          style={{
            transformOrigin: '0% 100%',
          }}
          initial={{ x: -20 }}
          animate={{ rotate: 45 }}
          transition={{ duration: 3, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
        >
          <SVGFishing size={100} />
        </motion.div>
        <motion.div
          className="absolute top-0 "
          style={{
            transformOrigin: '95% 0%',
          }}
          initial={{ x: -20 }}
          animate={{
            rotate: -40,
            x: '20%',
            y: '100%'
          }}
          transition={{ duration: 3, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
        >
          <SVGFishingB size={100} />
        </motion.div>
      </div>
    },
  ]


  return (
    <main className='flex flex-col items-center' >

      <motion.div
        initial={{ opacity: 0, x: '100%' }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: .3 }}
        className='w-full '
      >
        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={0}
          slidesPerView={1}
          loop={true}
          navigation={true}
          autoplay={{
            enabled: true,
            delay: 3000,
            //   disableOnInteraction: false,
          }}
          grabCursor
          className='w-full h-[600px] md:h-[400px] shadow-lg  '
        >
          {slider_items.map(slide =>
            <SwiperSlide key={slide.id} className='!h-auto '>
              {slide.slide}
            </SwiperSlide>
          )}
        </Swiper>
      </motion.div>


      <section className='w-full mt-12 gap-12 flex flex-col items-center '>

        <article className='flex flex-col items-center justify-center overflow-hidden md:flex-row w-full max-w-[400px] md:max-w-[850px] ps-4 pe-2 sm:ps-8 sm:pe-4'  >
          <Image
            src={card1}
            className='w-full max-w-[400px] md:max-w-[300px]'
            classNames={{
              wrapper: "shadow-md w-full max-w-[400px] md:max-w-[300px]"
            }}
          />

          <motion.div
            className={'hidden md:block'}
            initial={{ opacity: 0, x: '-100%' }}
            whileInView={{ opacity: 1, x: -20 }}
            viewport={{ once: true }}
          >
            <div
              className='rounded-lg py-2 ps-12 pe-4 h-[200px] shadow-md  flex flex-col gap-4 justify-center bg-gradient-to-tr dark:bg-gradient-to-bl from-secondary-600 to-secondary-400 text-white -skew-x-6'
            >
              <h1 className='text-6xl font-semibold'>Que son?</h1>
              <p>
                El imán de neodimio (también conocido como NdFeB, NIB o Neomagnet) es el tipo de imán de tierras raras más utilizado. Es un imán permanente hecho de una aleación de neodimio, hierro y boro para formar el Nd<sub>2</sub>Fe<sub>14</sub>B estructura cristalina tetragonal.
              </p>
            </div>
          </motion.div>

          <motion.div
            className={'md:hidden flex justify-center'}
            initial={{ opacity: 0, y: '-100%' }}
            whileInView={{ opacity: 1, y: -18 }}
            transition={{ duration: .5 }}
            viewport={{ once: true }}
          >
            <div
              className='space-y-4 rounded-lg px-4 pt-8 pb-6 xs:w-[90%] shadow-md bg-gradient-to-t from-secondary-600 to-secondary-400 dark:bg-gradient-to-b text-white'
            >
              <h1 className='text-6xl font-semibold'>Que son?</h1>
              <p >
                El imán de neodimio (también conocido como NdFeB, NIB o Neomagnet) es el tipo de imán de tierras raras más utilizado. Es un imán permanente hecho de una aleación de neodimio, hierro y boro para formar el Nd<sub>2</sub>Fe<sub>14</sub>B estructura cristalina tetragonal.
              </p>
            </div>
          </motion.div>
        </article>


        <article className='max-w-[400px] sm:max-w-[800px]'>
          <div className='rounded-lg bg-gradient-to-t from-rose-700 to-rose-500 flex flex-col sm:flex-row sm:mx-4 shadow-md'>
            <motion.div className='bg-white max-sm:rounded-b-full overflow-hidden  sm:min-w-[350px] sm:ps-4 sm:rounded-e-full flex items-center rounded-lg '
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <Image
                src={card2}
                className='w-full max-[400px]:rounded-none '
                removeWrapper
              />
            </motion.div>

            <div className={'text-white space-y-4 xs:space-y-8 p-4 max-md:text-center '} >
              <h1 className='text-xl xs:text-3xl font-semibold  '>
                Que ventajas tiene?
              </h1>

              <p className='' >
                Lo mejor que tienen estos imanes es que su magnetismo es 1.000 veces superior a su propio peso, por lo que tienen una gran resistencia y aguante (por eso te permite sujetar muchos folios a la vez, o imantar piezas en una pizarra gruesa de vidrio).

                Además, es muy difícil de desmagnetizar, cualidad que le suma resistencia y fiabilidad en es uso.

                En cuanto a las desventajas, debe trabajarse a menos de 80 grados (lo cual es más determinante en un uso industrial) y es fácilmente corrosivo. Por lo que normalmente no lo encontrarás en estado puro, sino envuelto o bañado en otro material.
              </p>
            </div>
          </div>
        </article>


        <article className='w-full  bg-primary-50 py-10 flex flex-col items-center px-4 '>
          <h1 className='text-7xl font-bold text-center max-[450px]:break-all'>Usos y aplicaciones</h1>

          <motion.div
            className={'grid sm:grid-cols-2 gap-8 max-w-[850px] mt-12'}

            variants={{
              initial: { opacity: 0 },
              whileInView: {
                opacity: 1,
                transition: {
                  delayChildren: .2,
                  staggerChildren: .3
                }
              },
            }}
            initial='initial'
            whileInView='whileInView'
            viewport={{ once: true }}
          >
            {usos.map(uso =>
              <motion.div
                key={uso.title}
                className='text-center flex flex-col items-center gap-4  '
                variants={{
                  initial: { opacity: 0, scale: 0 },
                  whileInView: {
                    opacity: 1,
                    scale: 1,
                  },
                }}
              >
                <div className='bg-content1 rounded-full text-7xl shadow-md border-3 border-divider w-[170px] h-[170px] flex items-center justify-center overflow-hidden'>
                  {uso.icon}
                </div>
                <b>{uso.title}</b>
                <p>{uso.text}</p>
              </motion.div>
            )}
          </motion.div>

        </article>

        <article className='w-full  xs:px-8 sm:px-20 space-y-8 '>
          <h1 className='text-7xl font-bold max-xs:break-all text-center'>Neodimio vs Ferrita</h1>

          <div className='flex flex-col items-center gap-8 sm:pt-8 sm:pb-16 relative sm:text-black '>
            <div
              className='absolute h-full w-12 top-0 rounded-lg hidden sm:block shadow-md'
              style={{
                background: 'linear-gradient(135deg, #8B5A2B 0%, #A0522D 25%, #8B5A2B 50%, #A0522D 75%, #8B5A2B 100%)'
              }}
            />

            <motion.div
              className=' relative max-sm:ms-[19%] w-full max-w-[755px] '
              initial={{ x: '90%', opacity: 0 }}
              whileInView={{ x: '-9.5%', opacity: 1 }}
              viewport={{ once: true }}
            >
              <SVGSignToLeft className='w-full h-full absolute hidden sm:block from-warning-400 to-warning overflow-visible' />

              <div className='flex gap-8 max-sm:flex-col items-center justify-center sm:ms-[15%] sm:py-4 sm:pe-5 ' >
                <Image src={vs_ferrita} removeWrapper className='max-w-[200px]' />

                <div className='relative z-10 space-y-2'>
                  <h2 className='text-3xl font-bold max-xs:ps-2'>Iman de Ferrita</h2>

                  <ol className='list-disc max-xs:ps-8'>
                    <li>Material resistente, difícil de desmontar y de gran capacidad magnética</li>
                    <li>Recomendado su uso en superficies exteriores</li>
                    <li>Soportan temperaturas de hasta 250ºC</li>
                    <li>Resistente a la corrosión</li>
                    <li>Precio económico</li>
                  </ol>
                </div>
              </div>
            </motion.div>


            <motion.div
              className=' relative max-sm:me-[19%] w-full max-w-[755px] '
              initial={{ x: '-90%', opacity: 0 }}
              whileInView={{ x: '9.5%', opacity: 1 }}
              viewport={{ once: true }}
            >
              <SVGSignToLeft className='w-full h-full absolute hidden sm:block from-content3 to-content4 rotate-180 overflow-visible' />

              <div className='flex gap-8 max-sm:flex-col-reverse items-center justify-center sm:me-[15%] sm:py-4 sm:ps-12 ' >
                <div className='relative z-10 space-y-2'>
                  <h2 className='text-3xl font-bold max-xs:ps-2'>Iman de Neodimio</h2>

                  <ol className='list-disc max-xs:ps-8'>
                    <li>Mayor adhesión magnética, unas 10 veces más que uno de ferrita</li>
                    <li>Ideales para usar en grandes áreas o superficies interiores, gracias a su fuerza estética</li>
                    <li>Pierden su fuerza magnética a mas de 80ºC</li>
                    <li>No resistente a la corrosión</li>
                    <li>Precio elevado</li>
                  </ol>
                </div>

                <Image src={vs_neodimio} removeWrapper className='max-w-[200px]' />
              </div>
            </motion.div>
          </div>

        </article>


        <article className='w-full bg-primary-50 py-10 px-4 gap-8 items-center justify-center flex max-sm:flex-col-reverse'>
          <motion.div
            className={'w-full sm:w-1/2 sm:max-w-[400px] '}
            initial={{ opacity: 0, scale: 0, y: '50%' }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Image
              src={example}
              className='bg-default dark:bg-default-500 p-4 shadow-medium'
              removeWrapper
            />
          </motion.div>

          <div className='space-y-4 max-w-[600px] sm:w-1/2 lg:w-auto'>
            <h1 className='text-5xl font-bold  max-xs:break-all'>Fuerza en perspectiva</h1>

            <div>
              <p>La orientación de la superficie metálica a la que se adhieren los imanes influye en su capacidad.</p>
              <p>La fuerza de tracción indicada para cada imán se basa en levantar o unir contra acero de 10 mm de espesor en posición horizontal. Los imanes sobre una superficie vertical (de acero de 10 mm de espesor) generalmente pueden contener alrededor del 30% de la fuerza de tracción indicada debido a los efectos de la gravedad y la falta de tracción entre la superficie de acero y la superficie lisa o brillante del imán.</p>
              <p>Cualquier espacio creado por un material (como el papel) entre el imán y la superficie metálica a la que está adherido magnéticamente también disminuirá ligeramente la fuerza de sujeción del imán.
              </p>
            </div>
          </div>

        </article>
      </section>

    </main>
  );
}

export default Home;
