
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, Select, SelectItem, Textarea } from "@nextui-org/react";
// import { useState } from "react";

const provinciasArgentinas = [
    "Buenos Aires",
    "Catamarca",
    "Chaco",
    "Chubut",
    "Córdoba",
    "Corrientes",
    "Entre Ríos",
    "Formosa",
    "Jujuy",
    "La Pampa",
    "La Rioja",
    "Mendoza",
    "Misiones",
    "Neuquén",
    "Río Negro",
    "Salta",
    "San Juan",
    "San Luis",
    "Santa Cruz",
    "Santa Fe",
    "Santiago del Estero",
    "Tierra del Fuego, Antártida e Islas del Atlántico Sur",
    "Tucumán"
]


function ModalPresupuesto({ isOpen, dark, onOpenChange, handleSubmit }) {

    // const [formValues, setFormValues] = useState({
    //     contact: ['whatsapp'],
    //     state: false
    // })

    return (
        <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            className={(dark ? 'dark text-foreground' : '')}
        >
            <form onSubmit={handleSubmit}>
                <ModalContent className={"max-xs:h-full xs:!my-auto max-xs:max-w-none max-xs:mx-0 max-xs:mb-0 max-xs:rounded-none overflow-y-auto border-3 border-divider p-2"}>
                    {(onClose) => (
                        <>
                            <ModalHeader className="text-3xl max-xs:px-1">
                                Solicitar Presupuesto
                            </ModalHeader>

                            <ModalBody className="max-xs:px-1">
                                <Input
                                    variant="bordered"
                                    labelPlacement="outside-left"
                                    label='Nombre'
                                    placeholder="-"
                                    name="Nombre"
                                    required
                                    maxLength={50}
                                    isRequired
                                    className="max-xs:flex-col max-xs:items-start "
                                    classNames={{
                                        inputWrapper: "shadow-md ",
                                        mainWrapper: 'max-xs:w-full'
                                    }}
                                />

                                <Select
                                    variant="bordered"
                                    labelPlacement="outside-left"
                                    label='Provincia'
                                    placeholder="Seleccione"
                                    name="Provincia"
                                    className="xs:max-w-64 max-xs:flex-col max-xs:items-start"
                                    classNames={{
                                        popoverContent: dark ? 'dark text-foreground border ' : '',
                                        base: 'items-center',
                                        trigger: 'shadow-md',
                                        value: 'text-foreground'
                                    }}
                                >
                                    {provinciasArgentinas.map(item =>
                                        <SelectItem
                                            key={item}
                                            className="capitalize"
                                        >
                                            {item}
                                        </SelectItem>
                                    )}
                                </Select>

                                {/* <div className="flex gap-2 items-end max-xs:flex-col max-xs:items-start">
                                    <Select
                                        variant="bordered"
                                        labelPlacement="outside"
                                        label='Contacto'
                                        name="contact"
                                        placeholder="Seleccione"
                                        className="xs:max-w-48 "
                                        classNames={{
                                            popoverContent: dark ? 'dark text-foreground border ' : '',
                                            base: 'items-center',
                                            trigger: 'shadow-md',
                                            innerWrapper: 'capitalize',
                                            value: 'text-foreground'
                                        }}
                                        // isRequired
                                        selectedKeys={formValues?.contact}
                                        onSelectionChange={e => {
                                            setFormValues({
                                                ...formValues,
                                                contact: [...new Set(e)]
                                            })
                                        }}
                                    >
                                        {[
                                            // 'email', 'llamada',
                                            'whatsapp'
                                        ].map(item =>
                                            <SelectItem
                                                key={item}
                                                className="capitalize"
                                            >
                                                {item}
                                            </SelectItem>
                                        )}
                                    </Select>

                                    <Input
                                        variant="bordered"
                                        type={formValues?.contact ? formValues.contact[0] === 'email' ? 'email' : 'number' : 'text'}
                                        min={0}
                                        placeholder={formValues?.contact ? formValues.contact[0] === 'email' ? 'email@dominio.com' : '999 999 9999' : '-'}
                                        name="contact_value"
                                        maxLength={80}
                                        // required
                                        // isRequired
                                        classNames={{
                                            inputWrapper: "shadow-md"
                                        }}
                                    />
                                </div> */}

                                <Textarea
                                    variant="bordered"
                                    labelPlacement="outside"
                                    label='Mensaje'
                                    placeholder="Quisiera saber..."
                                    name="Mensaje"
                                    maxLength={1000}
                                    classNames={{
                                        inputWrapper: "shadow-md"
                                    }}
                                />

                                <p className="text-small text-default-400">Enviar el formulario abrira una nueva pestaña con un enlace a WhatsappWeb junto con los datos y lista ingresados para enviarlos en forma de mensaje.</p>
                            </ModalBody>

                            <ModalFooter className=''>
                                <Button isIconOnly variant="ghost" onPress={onClose}>
                                    X
                                </Button>
                                <Button type="submit" color="secondary" variant="shadow">
                                    Enviar
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </form>
        </Modal>
    );
}

export default ModalPresupuesto;
