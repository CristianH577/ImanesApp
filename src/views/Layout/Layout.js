import { useState } from 'react';

import { Outlet } from "react-router-dom";

import { Skeleton } from "@nextui-org/react";

import Menu from './components/Menu/Menu.js';
import Footer from './components/Footer.js';


function Layout() {
  const [dark, setDark] = useState(true)
  const [cart, setCart] = useState({})


  return (
    <div
      className={
        'flex flex-col min-h-screen text-foreground bg-background overflow-hidden select-none '
        + (dark ? 'dark' : 'light')
      }
    >
      <Menu dark={dark} setDark={setDark} cart={cart} />

      {document.readyState === 'complete'
        ? <Outlet
          context={{
            dark: dark,
            cart: cart,
            setCart: setCart,
          }}
        />
        : <Skeleton className='w-full h-96 m-auto'>Cargando...</Skeleton>
      }

      <Footer dark={dark} />


    </div>
  );
}

export default Layout;
