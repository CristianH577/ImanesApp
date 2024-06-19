
import { useOutletContext } from "react-router-dom";

import { Button, Input, useDisclosure, Image } from "@nextui-org/react";

import { motion } from "framer-motion";

import ModalPresupuesto from "./components/ModalPresupuesto";

import { MdDeleteOutline } from "react-icons/md";
import database from '../../assets/files/lista_imanes.json';
import unknown from '../../assets/imgs/products/unknown.svg'
import TableCustom from "../../components/TableCustom";


function Carrito() {
    const context = useOutletContext()
    const contextImgs = require.context('../../assets/imgs/products', true)

    const { isOpen, onOpen, onOpenChange } = useDisclosure()

    const cols = ['img', 'categoria', 'nombre', 'forma', 'denominacion', 'cantidad', 'actions']

    const deleteFromCart = e => {
        const id = e.target.dataset?.id
        const cart_new = { ...context.cart }
        try {
            delete cart_new[id]
        } catch (error) {

        }
        context.setCart(cart_new)
    }
    const handleQuantity = e => {
        const id = e.target.dataset?.id
        const val = e.target.value
        const cart_new = { ...context.cart }
        cart_new[id] = val
        context.setCart(cart_new)
    }
    const handleQuantityBlur = e => {
        const id = e.target.dataset?.id
        const val = e.target.value
        if (val <= 0) {
            const cart_new = { ...context.cart }
            cart_new[id] = 1
            context.setCart(cart_new)
        }
    }


    const makeHeaderCell = col => {
        if (['actions', 'img'].includes(col)) {
            return ''
        }
        try {
            return database.fields_data[col].label
        } catch (error) {
            return col
        }
    }
    const makeRow = () => {
        return <motion.tr
            variants={{
                initial: { y: 20, opacity: 0 },
                animate: {
                    y: 0,
                    opacity: 1
                }
            }}
        >
        </motion.tr>
    }
    const makeCellContent = (id, col) => {
        const row = database.articles.find(art => art.id === parseInt(id))
        const val = row[col] || null

        switch (col) {
            case 'cantidad':
                return <Input
                    type="number"
                    size="sm"
                    value={context.cart[row.id]}
                    className="min-w-20"
                    classNames={{
                        inputWrapper: 'shadow-small border border-default'
                    }}
                    min='1'
                    endContent='U'
                    data-id={row.id}
                    onChange={handleQuantity}
                    onBlur={handleQuantityBlur}
                />
            case 'denominacion':
                return val ? 'N' + row[col] : ''
            case 'actions':
                return <div>
                    <Button
                        isIconOnly
                        variant="light"
                        color="danger"
                        size="sm"
                        data-id={row.id}
                        onPress={deleteFromCart}
                    >
                        <MdDeleteOutline size={22} />
                    </Button>
                </div>
            case 'img':
                var src = null
                try {
                    src = contextImgs(`./${row.categoria}/${row.id}/1.webp`)
                } catch (error) {
                    src = unknown
                }
                return <Image
                    src={src}
                    classNames={{
                        wrapper: 'min-w-10'
                    }}
                />

            default:
                return val
        }
    }


    const handleSubmit = e => {
        e.preventDefault()
        e.stopPropagation()

        const values = new FormData(e.target)
        const items_msg = ["Hola, me interesa recibir un presupuesto."]

        values.forEach((value, key) => {
            if (value) items_msg.push(key + ": " + value)
        })

        const articles = {}
        Object.entries(context.cart).forEach(([id, qtt]) => {
            const article = database.articles.find(art => art.id === parseInt(id))

            var categoria = article?.categoria
            categoria = categoria.charAt(0).toUpperCase() + categoria.slice(1).toLowerCase()
            if (!articles[categoria]) articles[categoria] = {}

            if (categoria === 'Imanes') {
                var material = article?.material || 'otros'
                material = material.charAt(0).toUpperCase() + material.slice(1).toLowerCase()
                if (!articles[categoria][material]) articles[categoria][material] = {}

                var forma = article?.forma || 'otros'
                forma = forma.charAt(0).toUpperCase() + forma.slice(1).toLowerCase()
                if (!articles[categoria][material][forma]) articles[categoria][material][forma] = {}

                articles[categoria][material][forma][article.nombre] = qtt
            } else {
                articles[categoria][article.nombre] = qtt
            }
        })
        const articles_str = JSON.stringify(articles, null, 2).replace(/(}\n|{|"|},|})/gm, '')
        items_msg.push("Articulos:" + articles_str)

        const msg = items_msg.join("\n")
        const base_url = "https://api.whatsapp.com/send?phone=" //xx xxx xxx xxxx
        const encoded_message = encodeURIComponent(msg)
        // eslint-disable-next-line
        const url = `${base_url}&text=${encoded_message}`
        // console.log(url)
        // window.open(url, '_blank').focus()
    }


    return (
        <main className="py-8 xs:px-4 flex flex-col items-center">

            <motion.div
                className="max-w-full"
                variants={{
                    initial: {
                        x: '100%',
                        opacity: 0
                    },
                    animate: {
                        x: 0,
                        opacity: 1,
                        transition: {
                            delayChildren: .1,
                            staggerChildren: .2
                        }
                    },
                }}
                initial="initial"
                animate="animate"
            >
                <TableCustom
                    ariaLabel="Lista de articulos deseados"
                    className="max-w-[650px] scrollbar-hide"
                    selectionMode="single"
                    columns={cols}
                    makeHeaderCell={makeHeaderCell}
                    rows={Object.keys(context.cart)}
                    makeRow={makeRow}
                    makeCellContent={makeCellContent}
                    classNames={{
                        thead: "shadow-md"
                    }}
                />

                <div className="w-full flex justify-center sm:justify-end my-4">
                    <div>
                        <Button color="secondary" variant='shadow' onPress={onOpen}>
                            Solicitar Presupuesto
                        </Button>
                    </div>
                </div>
            </motion.div>

            <ModalPresupuesto
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                dark={context.dark}
                handleSubmit={handleSubmit}
            />

        </main>
    );
}

export default Carrito;
