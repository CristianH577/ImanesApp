
import { useEffect, useRef, useState } from "react";
import { putFAPI } from "../../../libs/fastapi";

import { Button, Input, Skeleton } from "@nextui-org/react";
import { motion } from 'framer-motion';
import { Formik } from 'formik';


function FormCustom({ id, id_user, isActive, inputs, loading, initialValues, validationSchema, setActive, handleSave }) {
    const formActive = useRef(null)
    const [serverErrors, setServerErrors] = useState({})


    const makeInitialValues = inputs => {
        return inputs.reduce((acc, curr) => {
            acc[curr.name] = ''
            return acc
        }, {})
    }

    const onSubmit = async (values, { setSubmitting }) => {
        setSubmitting(true)
        setServerErrors({})

        const data = { id_user: id_user, id: id, fields: {} }
        Object.keys(values).forEach(key => {
            if (initialValues && initialValues.hasOwnProperty(key)) {
                if (initialValues[key] !== values[key]) {
                    data.fields[key] = values[key]
                }
            } else if (values[key]) {
                data.fields[key] = values[key]
            }
        })

        var url = "updateUserData"
        if (id === "change_password") url = "changePassword"

        const r = await putFAPI('/' + url, JSON.stringify(data))

        if (r.bool) {
            const new_servererrors = {}
            switch (r.value) {
                case "email exist":
                    new_servererrors.email = "El email ya esta registrado"
                    break;
                case "username exist":
                    new_servererrors.username = "El nombre de usuario ya existe"
                    break;
                case "wrong password":
                    new_servererrors.password = "Contraseña incorrecta"
                    break;

                default:
                    setActive(false)
                    handleSave()
                    break;
            }

            setTimeout(() => {
                setServerErrors(new_servererrors)
            }, 200);
        }

        setSubmitting(false)
    }

    useEffect(() => {
        if (formActive.current) {
            try {
                formActive.current.resetForm()
            } catch (error) {

            }
        }
    }, [isActive])

    return (
        loading
            ? <form className='flex flex-col gap-2 sm:ps-4 max-w-[1400px] max-xs:items-center' >
                <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className='gap-4 sm:gap-6 grid xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 justify-center '>
                    {inputs && inputs.map((input, i) =>
                        <Skeleton key={input?.name || i} isLoaded={!loading} className="rounded-lg h-12" />
                    )}
                </motion.div>
            </form >
            : <Formik
                innerRef={formActive}
                initialValues={initialValues || makeInitialValues(inputs)}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
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
                    <form className='flex flex-col gap-2 sm:ps-4 max-w-[1400px] max-xs:items-center' onSubmit={handleSubmit} >
                        <motion.div
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className='gap-2 xs:gap-4 sm:gap-6 grid xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 justify-center '
                        >
                            {inputs && inputs.map((input, i) => {
                                var value = ""
                                try {
                                    value = values[input.name] || ""
                                } catch (error) {
                                }
                                const isInvalid = (errors[input.name] && touched[input.name]) || serverErrors[input.name] ? true : false
                                const errorMessage = errors[input.name] || serverErrors[input.name]

                                return <Input
                                    key={input?.name || i}
                                    type={input?.type || "text"}
                                    name={input?.name}
                                    label={input?.label || ""}
                                    size='sm'
                                    description={isActive && input?.description}
                                    className='max-w-[250px]'
                                    classNames={{
                                        inputWrapper: 'shadow-md group-data-[invalid=true]:!text-warning',
                                        errorMessage: 'dark:text-warning',
                                        input: "dark:group-data-[invalid=true]:!text-warning",
                                        label: "dark:group-data-[invalid=true]:!text-warning"
                                    }}
                                    isRequired={isActive && input?.isRequired}
                                    isReadOnly={!isActive}

                                    value={value}
                                    isInvalid={isInvalid}
                                    errorMessage={errorMessage}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    onFocus={() => {
                                        const new_servererrors = { ...serverErrors }
                                        try {
                                            delete new_servererrors[input.name]
                                        } catch (error) {

                                        }
                                        setServerErrors(new_servererrors)
                                    }}
                                />
                            })}
                        </motion.div>

                        {isActive && (
                            <motion.div
                                className='flex gap-2 max-[200px]:flex-col max-sm:mt-2'
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                            >
                                <Button
                                    color='danger'
                                    size='sm'
                                    className="shadow-md"
                                    onPress={() => setActive(false)}
                                    isLoading={isSubmitting}
                                >
                                    Cancelar
                                </Button>

                                <Button
                                    type="submit"
                                    color='primary'
                                    size='sm'
                                    className="shadow-md"
                                    isLoading={isSubmitting}
                                    isDisabled={JSON.stringify(initialValues) === JSON.stringify(values)}
                                >
                                    Guardar
                                </Button>
                            </motion.div>
                        )}
                    </form >
                )}
            </Formik>
    );
}

export default FormCustom;
