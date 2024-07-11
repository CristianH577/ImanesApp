import { useState } from 'react';

import { Outlet } from "react-router-dom";

import { Skeleton } from "@nextui-org/react";

import Menu from './components/Menu/Menu.js';
import Footer from './components/Footer.js';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function Layout() {
  const [dark, setDark] = useState(true)
  const [cart, setCart] = useState({})
  const [user, setUser] = useState(false)


  return (
    <div
      className={
        'flex flex-col min-h-screen text-foreground bg-background overflow-hidden select-none '
        + (dark ? 'dark' : 'light')
      }
    >
      <Menu dark={dark} setDark={setDark} cart={cart} setUser={setUser} user={user} />

      {document.readyState === 'complete'
        ? <Outlet
          context={{
            dark: dark,
            cart: cart,
            setCart: setCart,
            user: user,
          }}
        />
        : <Skeleton className='w-full h-96 m-auto'>Cargando...</Skeleton>
      }

      <Footer dark={dark} />

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={dark ? 'dark' : 'light'}
      />
    </div>
  );
}

export default Layout;
