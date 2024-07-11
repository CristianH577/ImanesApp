
import { useEffect, useState } from 'react';

import { useLocation, useNavigate } from "react-router-dom";

import { Navbar, NavbarContent, NavbarItem, NavbarMenuToggle, Button, NavbarMenu } from "@nextui-org/react";

import MenuMovilListItems from './components/MenuMovilListItems.js';
import Submenu from './components/Submenu.js';
import NavbarTop from './components/NavbarTop.js';
import ModalLog from './components/ModalLog/ModalLog.js';

import { PiSunDimFill, PiMoonFill, PiCylinderThin } from "react-icons/pi";
import { IoMagnetOutline, IoHomeOutline } from "react-icons/io5";
import { BsBoxSeam, BsThreeDots } from "react-icons/bs";
import { GiGlassBall } from "react-icons/gi";
import { IoLogoWhatsapp } from "react-icons/io5";
import { MdLogout } from "react-icons/md";

import { SVGLadrillo, SVGCurvo, SVGArandela } from '../../../../assets/svgs.js'



function Menu({ dark, setDark, cart, setUser, user }) {
  const navigate = useNavigate()
  const location = useLocation()
  const [openMenuMovil, setOpenMenuMovil] = useState(false)
  const [submenu, setSubmenu] = useState(false)
  const [openModalLog, setOpenModalLog] = useState(false)

  var menu_items = ['inicio', 'productos', 'imanes', 'otros']
  if (user) {
    if (user?.rango === 1) {
      menu_items = ['inicio', 'productos', 'pedidos', 'administrar']
    } else if ([2, 3].includes(user?.rango)) {
      menu_items = ['inicio', 'productos', 'pedidos']
    }
  }
  const submenus = {
    'imanes': ['redondos', 'cuadrados', 'esferas', 'curvos', 'arandelas']
  }

  const icons = {
    inicio: <IoHomeOutline />,
    productos: <BsBoxSeam />,
    imanes: <IoMagnetOutline className='rotate-180' />,
    otros: <BsThreeDots />,

    redondos: <PiCylinderThin size={25} />,
    cuadrados: <SVGLadrillo size={25} />,
    esferas: <GiGlassBall size={23} />,
    curvos: <SVGCurvo size={30} />,
    arandelas: <SVGArandela size={23} />,
  }


  useEffect(() => {
    setOpenMenuMovil(false)
  }, [location])
  useEffect(() => {
    window.addEventListener("resize", () => {
      setOpenMenuMovil(false)
      setSubmenu(false)
    })
  }, [])
  useEffect(() => {
    var overflow = 'scroll'
    if (openMenuMovil) overflow = 'hidden'
    document.querySelector('html').style = 'overflow-y:' + overflow + ";"
  }, [openMenuMovil])



  return (
    <div className='bg-content1 flex flex-col items-center'>
      <NavbarTop
        cart={cart}
        navigate={navigate}
        location={location}
        submenu={submenu}
        openMenuMovil={openMenuMovil}
        openLog={() => setOpenModalLog(true)}
        isLogged={!!user}
      />

      <Navbar
        id='nav-main'
        isMenuOpen={openMenuMovil}
        className='shadow-lg transition-all bg-content1'
        classNames={{
          wrapper: 'min-[450px]:h-[48px] min-[450px]:ps-0',
          item: 'dark:data-[active=true]:text-warning data-[active=true]:text-custom-red-dark'
        }}
      >
        {/* logo */}
        <NavbarContent>
          <NavbarMenuToggle
            aria-label='abrir/cerrar menu'
            className="min-[450px]:hidden"
            onClick={() => setOpenMenuMovil(!openMenuMovil)}
          />
        </NavbarContent>


        {/* menu */}
        <NavbarContent className="hidden items-center min-[450px]:flex gap-2 sm:gap-4 " justify="center">
          {menu_items.map(item =>
            < NavbarItem
              key={item}
              isActive={location?.search ? location.search.includes(item) : location.pathname.includes(item)}
              className='hover:bg-content3 px-2 cursor-pointer capitalize h-full flex items-center justify-center'
              onClick={() => {
                var to = item
                if (['imanes', 'otros'].includes(item)) {
                  to = 'productos?categoria=' + item
                }
                navigate('/' + to)
                setSubmenu(false)
              }}
              onMouseEnter={() => submenus[item] && setSubmenu(item)}
              onMouseLeave={() => setSubmenu(false)}
            >
              {item}
            </NavbarItem>
          )}
        </NavbarContent>


        {/* configuraciones */}
        <NavbarContent justify="end" className='gap-1'>
          <NavbarItem>
            <Button
              isIconOnly
              variant='light'
              aria-label="Modo oscuro"
              size='sm'
              color='success'
            >
              <IoLogoWhatsapp size={24} />
            </Button>
          </NavbarItem>
          <NavbarItem>
            <Button
              isIconOnly
              variant='light'
              aria-label="Modo oscuro"
              size='sm'
              className='rounded-full'
              onClick={() => setDark(!dark)}
            >
              {dark
                ? <PiMoonFill size={24} className='text-[#eae4d9]' />
                : <PiSunDimFill size={24} className='text-warning' />
              }
            </Button>
          </NavbarItem>
          {user && (
            <NavbarItem>
              <Button
                isIconOnly
                variant='light'
                aria-label="Cerrar sesion"
                size='sm'
                onClick={() => {
                  navigate("/")
                  setUser(false)
                }}
              >
                <MdLogout size={24} />
              </Button>
            </NavbarItem>
          )}
        </NavbarContent>


        {/* menu movil */}
        <NavbarMenu
          className='p-0 shadow-inner overflow-hidden max-w-[450px]'
          style={{
            zIndex: '40',
            top: `calc(var(--navbar-height) + 64px)`
          }}
          motionProps={{
            initial: { opacity: 0, height: 0 },
            animate: { opacity: 1, height: 'auto' },
          }}
        >
          <MenuMovilListItems
            items={menu_items}
            submenus={submenus}
            icons={icons}
            navigate={navigate}
            location={location}
            open={openMenuMovil}
          />
        </NavbarMenu>
      </Navbar>

      {submenu && (
        <div
          className='w-full absolute z-10 '
          style={{
            top: `calc(${document.querySelector('#nav-main').offsetHeight}px + ${document.querySelector('#nav-top').offsetHeight}px*.9)`
          }}
          onMouseEnter={() => setSubmenu(submenu)}
          onMouseLeave={() => setSubmenu(false)}
          onClick={() => setSubmenu(false)}
        >
          <Submenu
            main={submenu}
            items={submenus[submenu]}
            navigate={navigate}
            location={location}
            icons={icons}
          />
        </div >
      )}

      <ModalLog
        isOpen={openModalLog}
        setOpen={setOpenModalLog}
        dark={dark}
        logIn={user => {
          setUser(user)
          setOpenModalLog(false)
        }}
        onRegister={() => {
          setOpenModalLog(false)
        }}
      />
    </div >
  );
}

export default Menu;