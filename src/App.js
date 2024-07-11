import { NextUIProvider } from "@nextui-org/react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Layout from "./views/Layout/Layout.js";
import Home from "./views/Home/Home.js";
import NotFound from "./views/NotFound/NotFound.js";

import Productos from "./views/Productos/Productos.js";
import Carrito from "./views/Carrito/Carrito.js";
import MiCuenta from "./views/MiCuenta/MiCuenta.js";

import Administrar from "./views/Administrar/Administrar.js";
import Pedidos from "./views/Pedidos/Pedidos.js";

import Test from "./views/Plantilla/Test.js";

function App() {
  const routes = [
    {
      path: 'inicio',
      content: <Home />,
    },

    {
      path: 'productos',
      content: <Productos />,
    },
    {
      path: 'carrito',
      content: <Carrito />,
    },
    {
      path: 'micuenta',
      content: <MiCuenta />,
    },
    
    {
      path: 'administrar',
      content: <Administrar />,
    },
    {
      path: 'pedidos',
      content: <Pedidos />,
    },

    {
      path: 'test',
      content: <Test />,
    },
  ]

  return (
    <NextUIProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />} >
            <Route index element={<Home />} />

            {routes.map(route =>
              <Route key={route.path} path={'/' + route.path} element={route.content} />
            )}

            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Router>
    </NextUIProvider>
  );
}

export default App;
