
import { useOutletContext, } from 'react-router-dom';

import { Tabs, Tab, } from "@nextui-org/react";
import NotFound from '../NotFound/NotFound';
import FormAddProduct from './components/FormAddProduct';


function Administrar() {
    const context = useOutletContext()

    if (!context?.user || context?.user?.rango !== 1) {
        return (
            <NotFound />
        );
    }
    return (
        <main className='flex flex-col items-center py-2 xs:py-4 sm:py-6'>
            <Tabs
                aria-label="Pestañas de administracion"
                className=''
                classNames={{
                    tabList: "flex-wrap justify-center",
                    tab: "w-auto",
                    panel: "max-w-screen xs:px-4 sm:px-6"
                }}
            >
                <Tab key="addProduct" title="Agregar Producto">
                    <FormAddProduct />
                </Tab>
            </Tabs>
        </main>
    );
}

export default Administrar;
