
import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { getFAPI } from '../../libs/fastapi';

import { Button } from '@nextui-org/react';
import { motion } from "framer-motion";
import * as Yup from 'yup';

import ErrorBoundary from '../../components/ErrorBoundary';
import FormCustom from './components/FormCustom';
import TableOrders from './components/TableOrders';
import TableOrder from './components/TableOrder';

import { FaRegEdit, FaRegWindowClose } from "react-icons/fa";

import database from '../../assets/files/lista_imanes.json';


function MiCuenta() {
    const context = useOutletContext()
    const [userData, setUserData] = useState({})
    const [edit, setEdit] = useState(false)
    const [loading, setLoading] = useState(true)
    const [orderSelected, setOrderSelected] = useState(false)
    const [orderRows, setOrderRows] = useState([])

    const sections_class = "p-2 pb-4 sm:p-4 sm:pb-8 space-y-6 border-y border-divider"

    const inputs = {
        cuenta: [
            {
                label: "Usuario",
                name: "username",
                isRequired: true,
                description: "Debe tener entre 3 y 20 caracteres."
            },
            {
                label: "Email",
                name: "email",
                type: "email",
                isRequired: true,
            },
        ],
        password: [
            {
                label: "Contraseña actual",
                name: "password",
                type: "password",
                isRequired: true,
            },
            {
                label: "Nueva contraseña",
                name: "password_new",
                type: "password",
                isRequired: true,
                description: "Debe tener entre 3 y 50 caracteres.",
            },
            {
                label: "Repetir nueva contraseña",
                name: "password_new_confirm",
                type: "password",
                isRequired: true,
            },
        ],
        personales: [
            {
                label: "Nombre",
                name: "nombre",
            },
            {
                label: "Apellido",
                name: "apellido",
            },
            {
                label: "Celular",
                name: "celular",
                type: "number",
            },
            {
                label: "DNI",
                name: "dni",
                type: "number",
            },
        ],
        envio: [
            {
                label: "Provincia",
                name: "provincia",
            },
            {
                label: "Ciudad",
                name: "ciudad",
            },
            {
                label: "Direccion",
                name: "direccion",
            },
            {
                label: "Codigo postal",
                name: "cp",
                type: "number",
            },
            {
                label: "Detalles",
                name: "detalles",
            },
        ],
    }
    const validationSchemas = {
        cuenta: Yup.object({
            email: Yup.string()
                .email('Correo electrónico inválido')
                .required('Introduzca su email'),
            username: Yup.string()
                .min(3, 'Debe tener al menos 3 caracteres')
                .max(20, 'Debe tener un maximo de 20 caracteres')
                .required('Introduzca su usuario'),
        }),
        password: Yup.object({
            password: Yup.string()
                .min(3, 'Debe tener al menos 3 caracteres')
                .max(50, 'Debe tener un maximo de 50 caracteres')
                .required('Introduzca su contraseña'),
            password_new: Yup.string()
                .min(3, 'Debe tener al menos 3 caracteres')
                .max(50, 'Debe tener un maximo de 50 caracteres')
                .required('Introduzca su nueva contraseña'),
            password_new_confirm: Yup.string()
                .oneOf([Yup.ref('password_new'), null], 'Las contraseñas deben coincidir')
                .required('Confirme su nueva contraseña'),
        }),
        personales: Yup.object({
            name: Yup.string()
                .max(50, 'Debe tener un maximo de 50 caracteres'),
            surname: Yup.string()
                .max(50, 'Debe tener un maximo de 50 caracteres'),
            cellphone: Yup.number()
                .max(999999999999999999, 'Debe tener un maximo de 20 caracteres'),
            dni: Yup.number()
                .max(999999999, 'Debe tener un maximo de 10 caracteres'),
        }),
        envio: Yup.object({
            provincia: Yup.string()
                .max(50, 'Debe tener un maximo de 50 caracteres'),
            city: Yup.string()
                .max(100, 'Debe tener un maximo de 100 caracteres'),
            address: Yup.string()
                .max(250, 'Debe tener un maximo de 250 caracteres'),
            cp: Yup.number()
                .max(9999999999, 'Debe tener un maximo de 10 caracteres'),
            details: Yup.string()
                .max(500, 'Debe tener un maximo de 500 caracteres'),
        }),
    }

    const getUserData = async () => {
        setLoading(true)

        const r = await getFAPI(`/getUser?id=${parseInt(context?.user?.id_user)}`)
        // console.log(r)
        if (r.bool) {
            setUserData(r.value)
        }

        setTimeout(() => {
            setLoading(false)
        }, 500);

    }

    const handleSelectedOrder = (id, articulos) => {
        if (orderSelected && orderSelected?.id === id) {
            setOrderSelected(false)
        } else {
            setOrderSelected({ id: id, articulos: articulos })
        }
    }
    const getOrderRows = async () => {
        // setLoading(true)

        const new_order_rows = []
        if (orderSelected?.articulos) {
            Object.keys(orderSelected?.articulos).forEach(id => {
                const row = database.articles.find(art => art.id === parseInt(id))
                row.cantidad = orderSelected?.articulos[id]
                new_order_rows.push(row)
            })
        }
        setOrderRows(new_order_rows)
        // const r = await postFAPI(`/getProductsData`, orderSelected?.articulos)
        // console.log(r)
        // if (r.bool) {
        //     setUserData(r.value)
        // }

        // setTimeout(() => {
        //     setLoading(false)
        // }, 300);
    }


    useEffect(() => {
        getUserData()
        // eslint-disable-next-line
    }, [])
    useEffect(() => {
        getOrderRows()
        // eslint-disable-next-line
    }, [orderSelected])


    return (
        <main className='xs:px-4 py-12'>
            <section className={sections_class}>
                <div className='flex gap-2'>
                    <h1 className='text-3xl'>Cuenta</h1>

                    <Button
                        isIconOnly
                        variant=''
                        className="hover:text-warning"
                        onPress={() => edit === "cuenta" ? setEdit(false) : setEdit("cuenta")}
                    >
                        {edit === "cuenta" ? <FaRegWindowClose size={26} /> : <FaRegEdit size={26} />}
                    </Button>
                </div>

                <ErrorBoundary>
                    <FormCustom
                        id="usuarios"
                        id_user={context?.user?.id_user}
                        isActive={edit === "cuenta"}
                        setActive={setEdit}
                        loading={loading}
                        handleSave={getUserData}
                        inputs={inputs.cuenta}
                        initialValues={userData?.cuenta}
                        validationSchema={validationSchemas.cuenta}
                    />
                </ErrorBoundary>

                <motion.div
                    className='space-y-2 max-xs:flex flex-col max-xs:items-center'
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                >
                    <Button
                        color='secondary'
                        className="shadow-md max-[200px]:w-full"
                        isDisabled={edit === "password"}
                        onPress={() => setEdit("password")}
                    >
                        Cambiar contraseña
                    </Button>

                    {edit === "password" && (
                        <FormCustom
                            id="change_password"
                            id_user={context?.user?.id_user}
                            isActive={edit === "password"}
                            setActive={setEdit}
                            loading={loading}
                            handleSave={getUserData}
                            inputs={inputs.password}
                            validationSchema={validationSchemas.password}
                        />
                    )}
                </motion.div>
            </section>

            <section className={sections_class}>
                <div className='flex gap-2'>
                    <h1 className='text-3xl'>Datos personales</h1>

                    <Button
                        isIconOnly
                        variant=''
                        className="hover:text-warning"
                        onPress={() => edit === "personales" ? setEdit(false) : setEdit("personales")}
                    >
                        {edit === "personales" ? <FaRegWindowClose size={26} /> : <FaRegEdit size={26} />}
                    </Button>
                </div>

                <ErrorBoundary>
                    <FormCustom
                        id="personales"
                        id_user={context?.user?.id_user}
                        isActive={edit === "personales"}
                        setActive={setEdit}
                        loading={loading}
                        handleSave={getUserData}
                        inputs={inputs.personales}
                        initialValues={userData?.personales}
                        validationSchema={validationSchemas.personales}
                    />
                </ErrorBoundary>
            </section>

            <section className={sections_class}>
                <div className='flex gap-2'>
                    <h1 className='text-3xl'>Datos de envio</h1>

                    <Button
                        isIconOnly
                        variant=''
                        className="hover:text-warning"
                        onPress={() => edit === "envio" ? setEdit(false) : setEdit("envio")}
                    >
                        {edit === "envio" ? <FaRegWindowClose size={26} /> : <FaRegEdit size={26} />}
                    </Button>
                </div>

                <ErrorBoundary>
                    <FormCustom
                        id="personales"
                        id_user={context?.user?.id_user}
                        isActive={edit === "envio"}
                        setActive={setEdit}
                        loading={loading}
                        handleSave={getUserData}
                        inputs={inputs.envio}
                        initialValues={userData?.personales}
                        validationSchema={validationSchemas.envio}
                    />
                </ErrorBoundary>

            </section>


            <section className={sections_class}>
                <h1 className='text-3xl'>Mis pedidos</h1>

                <TableOrders
                    rows={userData?.pedidos || []}
                    selectedRow={orderSelected ? [orderSelected?.id] : []}
                    onSelectedRow={handleSelectedOrder}
                />

                <TableOrder
                    rows={orderRows}
                />

                <article>
                    <h1 className='text-xl'>Estados</h1>

                    <ol className='xs:ps-4'>
                        <li>
                            <i>Pendiente: </i>
                            El pedido sera revisado en breve
                        </li>
                        <li>
                            <i>En revsion: </i>
                            El pedido esta siendo evaluado
                        </li>
                        <li>
                            <i>Espera de pago: </i>
                            El pedido sera pedido una vez realizado el pago del mismo
                        </li>
                        <li>
                            <i>En preparacion: </i>
                            El pedido esta siendo preparado
                        </li>
                        <li>
                            <i>Listo: </i>
                            El pedido esta listo de ser retirado
                        </li>
                        <li>
                            <i>Pendiente de envio: </i>
                            El pedido sera despachado en breve
                        </li>
                        <li>
                            <i>Enviado: </i>
                            El pedido esta en manos del correo/transporte
                        </li>
                        <li>
                            <i>Entregado: </i>
                            El pedido fue entregado
                        </li>
                    </ol>
                </article>
            </section>
        </main>
    );
}

export default MiCuenta;
