

import { useOutletContext } from "react-router-dom";

import { Button, Tooltip } from "@nextui-org/react";

import { MdAddShoppingCart, MdOutlineShoppingCart, MdOutlineRemoveShoppingCart } from 'react-icons/md';


function ButtonAddToCart({ disabled, id }) {
    const context = useOutletContext()

    const inCart = context.cart.hasOwnProperty(id)

    return (
        <Tooltip
            content={inCart ? 'Ya agregado' : disabled ? 'No hay stock' : 'Agregar a carrito'}
            showArrow
            color={inCart ? 'success' : disabled ? 'danger' : 'secondary'}
        >
            <Button
                isIconOnly
                variant="ghost"
                color={inCart ? 'success' : disabled ? '' : 'secondary'}
                disabled={!disabled}
                className={" shadow-md " + (disabled ? 'text-default dark:border-default cursor-default' : 'cursor-pointer')}
                onPress={() => {
                    if (!disabled) {
                        const compra_new = { ...context.cart }
                        if (context.cart.hasOwnProperty(id)) {
                            delete compra_new[id]
                        } else {
                            compra_new[id] = 1
                        }
                        context.setCart(compra_new)
                    }
                }}
            >

                {inCart
                    ? <MdOutlineShoppingCart size={25} />
                    : disabled
                        ? <MdOutlineRemoveShoppingCart size={25} />
                        : <MdAddShoppingCart size={25} />}
            </Button>
        </Tooltip>
    );
}

export default ButtonAddToCart;
