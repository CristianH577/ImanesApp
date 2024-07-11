
import { useState } from "react";
import { postFAPI } from "../../../../../../../libs/fastapi";
import { toast } from "react-toastify";

import { Button, Input } from "@nextui-org/react";

import { Formik } from 'formik';
import * as Yup from 'yup';

import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";


function FormRegister({ onRegister, setDisabledActions }) {
    const [showPassword, setShowPassword] = useState(false)
    const [serverErrors, setServerErrors] = useState({})

    const inputs = [
        {
            name: "email",
            label: "Email",
            type: "email"
        },
        {
            name: "username",
            label: "Usuario",
            description:"Debe tener entre 3 y 20 caracteres."
        },
        {
            name: "password",
            label: "Contraseña",
            type: "password",
            description:"Debe tener entre 3 y 50 caracteres."
        },
        {
            name: "password_confirm",
            label: "Confirme la contraseña",
            type: "password"
        },
    ]

    const validationSchema = Yup.object({
        email: Yup.string()
            .email('Correo electrónico inválido')
            .required('Introduzca su email'),
        username: Yup.string()
            .min(3, 'Debe tener al menos 3 caracteres')
            .max(20, 'Debe tener un maximo de 20 caracteres')
            .required('Introduzca su usuario'),
        password: Yup.string()
            .min(3, 'Debe tener al menos 3 caracteres')
            .max(50, 'Debe tener un maximo de 50 caracteres')
            .required('Introduzca su contraseña'),
        password_confirm: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Las contraseñas deben coincidir')
            .required('Confirme su contraseña'),
    })

    const onSubmit = async (values, { setSubmitting }) => {
        setDisabledActions(true)
        setServerErrors({})

        const r = await postFAPI('/register', values)
        if (r.bool) {
            const new_servererrors = { ...serverErrors }
            switch (r.value) {
                case "email exist":
                    new_servererrors.email = "El email ya esta registrado"
                    break;
                case "username exist":
                    new_servererrors.username = "El nombre de usuario ya existe"
                    break;
                case "register":
                    toast.success("Usuario registrado.\n\nConfirme su email.")
                    onRegister()
                    break;

                default:
                    break;
            }
            setTimeout(() => {
                setServerErrors(new_servererrors)
            }, 200);
        }
        setSubmitting(false)
        setDisabledActions(false)
    }

    return (
        <Formik
            initialValues={inputs.reduce((acc, curr) => {
                acc[curr.name] = '';
                return acc;
            }, {})}
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
                <form className="flex flex-col gap-4 items-center" onSubmit={handleSubmit}>

                    {inputs.map(input => {
                        const isInvalid = (errors[input.name] && touched[input.name]) || serverErrors[input.name] ? true : false
                        const errorMessage = errors[input.name] || serverErrors[input.name]

                        return <Input
                            key={input.name}
                            type={input?.type
                                ? (input.type === "password" && showPassword)
                                    ? "text"
                                    : input.type
                                : "text"
                            }
                            name={input.name}
                            label={input.label}
                            isRequired
                            description={input?.description}
                            className="max-w-[250px]"
                            classNames={{
                                inputWrapper: 'shadow-md group-data-[invalid=true]:!text-warning',
                                errorMessage: 'dark:text-warning',
                                input: "dark:group-data-[invalid=true]:!text-warning",
                                label: "dark:group-data-[invalid=true]:!text-warning"
                            }}
                            endContent={input.type === "password"
                                ? <div
                                    className="text-default-400 text-2xl cursor-pointer"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword
                                        ? <FaRegEyeSlash />
                                        : <FaRegEye />
                                    }
                                </div>
                                : null
                            }

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
                            value={values[input.name]}
                            isInvalid={isInvalid}
                            errorMessage={errorMessage}
                        />
                    })}

                    <Button type="submit" color="primary" className="shadow-md" isLoading={isSubmitting}>
                        Registrarse
                    </Button>
                </form>
            )}
        </Formik>

    );
}

export default FormRegister;
