
import { useRef, useState } from "react";

import { postFAPI } from "../../../libs/fastapi";

import { Button, Divider, Image, Input, Textarea } from "@nextui-org/react";

import { motion } from 'framer-motion';
import { Formik } from 'formik';
import * as Yup from 'yup';


function FormAddProduct() {
    const [imgs, setImgs] = useState(false)
    const [imgsPrev, setImgsPrev] = useState(false)
    const [loading, setLoading] = useState(false)
    const formRef = useRef(null)

    const sections = [
        {
            title: "Requeridos",
            inputs: [
                {
                    name: "categoria",
                    isRequired: true,
                },
                {
                    name: "nombre",
                    isRequired: true,
                },
                {
                    name: "precio",
                    type: "number",
                    startContent: "$"
                },
            ],
        },
        {
            title: "Medidas",
            inputs: [
                {
                    name: "altura",
                    type: "number",
                    endContent: "mm",
                },
                {
                    name: "largo",
                    type: "number",
                    endContent: "mm",
                },
                {
                    name: "ancho",
                    type: "number",
                    endContent: "mm",
                },
                {
                    name: "diametro",
                    label: "Diámetro",
                    type: "number",
                    endContent: "mm",
                },
                {
                    name: "diametro_int",
                    label: "Diámetro interior",
                    type: "number",
                    endContent: "mm",
                },
                {
                    name: "radio_int",
                    label: "Radio interior",
                    type: "number",
                    endContent: "mm",
                },
                {
                    name: "radio_ext",
                    label: "Radio exterior",
                    type: "number",
                    endContent: "mm",
                },
                {
                    name: "curva",
                    label: "Curva",
                    type: "number",
                    endContent: "°",
                },
            ],
        },
        {
            title: "Caracteristicas",
            inputs: [
                {
                    name: "forma",
                },
                {
                    name: "material",
                },
                {
                    name: "denominacion",
                    label: "Denominación",
                    type: "number",
                    endContent: "N",
                },
            ],
        },
        {
            title: "Detalles",
            text_areas: [
                {
                    name: "detalles",
                    className: "col-span-2"
                },
            ],
        },
    ]

    const initialValues = { nombre: '', categoria: '' }
    const validationSchema = Yup.object({
        nombre: Yup.string()
            .min(5, 'Debe tener al menos 5 caracteres')
            .max(50, 'Debe tener un maximo de 50 caracteres')
            .required('Introduzca un nombre'),
        categoria: Yup.string()
            .min(5, 'Debe tener al menos 5 caracteres')
            .max(50, 'Debe tener un maximo de 50 caracteres')
            .required('Introduzca una categoria'),
    })

    const handleSubmit = async (values) => {
        setLoading(true)
        console.log(values)
        // const response = await postFAPI('/products/add', e)

        // if (response.bool) {
        //     if (imgs) {
        //         const form_data = new FormData()

        //         form_data.append('id', response.value)

        //         for (let i = 0; i < imgs.length; i++) {
        //             form_data.append("imgs", imgs[i])
        //         }

        //         await postFAPI('/products/addImgs', form_data)
        //     }

        //     handleReset()
        // }
        setLoading(false)
    }

    const handleFiles = (e) => {
        var clean = false
        const new_preview = []

        if (e.target.files.length === 0) {
            clean = true
        } else if (e.target.files.length > 6) {
            alert("Maximo 6 archivos")
            clean = true
        } else {
            for (const file of e.target.files) {
                if (file.type && !file.type.startsWith('image/')) {
                    alert("Solo se permiten imagenes")
                    clean = true
                    break
                }

                const reader = new FileReader()
                reader.onload = function (e) {
                    new_preview.push(e.target.result)
                }
                reader.readAsDataURL(file)
            }
        }

        if (clean) {
            document.querySelector('#input_imgs').value = ''
            setImgsPrev(false)
        } else {
            setImgs(e.target.files)

            setImgsPrev(false)
            setTimeout(() => {
                setImgsPrev(new_preview)
            }, 300)
        }
    }

    const handleReset = () => {
        setImgs(false)
        setImgsPrev(false)
        document.querySelector('#input_imgs').value = ''
        setLoading(false)

        if (formRef?.current) {
            formRef?.current?.resetForm()
        }
    }


    return (
        <Formik
            innerRef={formRef}
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
            }) => (
                <form className="flex flex-col gap-2 sm:ps-4 max-xs:items-center" onSubmit={handleSubmit} onReset={handleReset}>
                    {sections.map(section => {
                        return <>
                            <section key={section?.title} className="space-y-2 pb-2 xs:pb-4">
                                <b>{section?.title}</b>

                                <motion.div
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="gap-2 xs:gap-4 sm:gap-6 grid xs:grid-cols-2 md:grid-cols-3 justify-center"
                                >
                                    {section?.inputs && section.inputs.map((input, i) =>
                                        <Input
                                            key={input?.name || i}
                                            type={input?.type || "text"}
                                            name={input?.name}
                                            label={input?.label || input?.name}
                                            size='sm'
                                            className={'max-w-[250px] ' + input?.className}
                                            classNames={{
                                                inputWrapper: 'shadow-md group-data-[invalid=true]:!text-warning',
                                                errorMessage: 'dark:text-warning',
                                                input: "dark:group-data-[invalid=true]:!text-warning",
                                                label: "dark:group-data-[invalid=true]:!text-warning capitalize"
                                            }}
                                            startContent={input?.startContent}
                                            endContent={input?.endContent}
                                            isRequired={input?.isRequired}

                                            value={values[input.name] || ""}
                                            isInvalid={errors[input.name] && touched[input.name]}
                                            errorMessage={errors[input.name]}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                    )}

                                    {section?.text_areas && section.text_areas.map((input, i) =>

                                        <Textarea
                                            key={input?.name || i}
                                            name={input?.name}
                                            label={input?.label || ''}
                                            className={' ' + input?.className}
                                            maxLength={500}
                                            isRequired={input?.isRequired}
                                            classNames={{
                                                inputWrapper: 'shadow-md ',
                                            }}

                                            isInvalid={errors[input.name] && touched[input.name]}
                                            errorMessage={errors[input.name]}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                    )}
                                </motion.div>
                            </section>
                            <Divider />
                        </>
                    })}


                    <input
                        type="file"
                        name="imgs"
                        id="input_imgs"
                        multiple
                        accept="image/*"
                        className="hover:bg-content3 p-2 rounded-lg cursor-pointer max-w-[100vw] w-fit"
                        onChange={handleFiles}
                    />

                    {imgsPrev && (
                        <div className="flex gap-2 flex-wrap justify-center mb-2">
                            {imgsPrev.map((img, i) =>
                                <Image
                                    key={img}
                                    src={img}
                                    alt={"Vista previa de la imagen " + (i + 1)}
                                    className="w-32 h-32"
                                    shadow="md"
                                />
                            )}
                        </div>
                    )}
                    
                    <Divider />

                    <div className="flex flex-wrap justify-end gap-2 px-2 mt-2">
                        <Button
                            type="reset"
                            className="shadow-md"
                            isLoading={isSubmitting || loading}
                        >
                            Limpiar
                        </Button>
                        <Button
                            type="submit"
                            color="secondary"
                            className="shadow-md"
                            isLoading={isSubmitting || loading}
                        >
                            Agregar
                        </Button>
                    </div>

                </form>
            )}
        </Formik>
    );
}

export default FormAddProduct;
