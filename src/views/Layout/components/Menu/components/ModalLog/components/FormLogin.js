
import { useState } from "react";
import { postFAPI } from "../../../../../../../libs/fastapi";

import { Button, Input, Link } from "@nextui-org/react";

import { Formik, } from 'formik';
import * as Yup from 'yup';

import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";


function FormLogin({ logIn, setDisabledActions }) {
    const [showPassword, setShowPassword] = useState(false)
    const [serverErrors, setServerErrors] = useState({})

    const inputs = [
        {
            name: "username",
            label: "Usuario",
        },
        {
            name: "password",
            label: "Contraseña",
            type: "password",
        },
    ]

    const validationSchema = Yup.object({
        username: Yup.string()
            .min(3, 'Debe tener al menos 3 caracteres')
            .max(20, 'Debe tener un maximo de 20 caracteres')
            .required('Introduzca su usuario'),
        password: Yup.string()
            .min(3, 'Debe tener al menos 3 caracteres')
            .max(50, 'Debe tener un maximo de 50 caracteres')
            .required('Introduzca su contraseña'),
    })

    const onResend = async setSubmitting => {
        setDisabledActions(true)
        setSubmitting(true)

        setTimeout(() => {
            const new_servererrors = { ...serverErrors }
            delete new_servererrors.email
            new_servererrors.resended = "Email de confirmacion reenviado."
            setServerErrors(new_servererrors)

            setDisabledActions(false)
            setSubmitting(false)
        }, 500);
    }

    const onSubmit = async (values, { setSubmitting }) => {
        setDisabledActions(true)
        setServerErrors({})

        const r = await postFAPI('/login', values)
        if (r.bool) {
            const new_servererrors = {}
            switch (r.value) {
                case "email not confirm":
                    new_servererrors.email = "Confirme su email para ingresar"
                    break;
                case "no user":
                    new_servererrors.username = "Usuario no encontrado"
                    break;
                case "wrong password":
                    new_servererrors.password = "Contraseña incorrecta"
                    break;

                default:
                    if (Object.prototype.toString.call(r.value) === '[object Object]') logIn(r.value)
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
            initialValues={{ username: '', password: '' }}
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
                setSubmitting,
            }) => (
                <form className="flex flex-col gap-4 items-center" onSubmit={handleSubmit} >
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
                            className="max-w-[250px] "
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

                    {serverErrors?.email && (
                        <p className="text-center text-small text-danger dark:text-warning max-w-[235px]">
                            {serverErrors.email}.{" "}
                            <Link size="sm" className="cursor-pointer" onPress={() => onResend(setSubmitting)}>
                                Reenviar email.
                            </Link>
                        </p>
                    )}
                    {serverErrors?.resended && (
                        <p className="text-center text-small text-success max-w-[235px]">
                            {serverErrors.resended}.{" "}
                        </p>
                    )}

                    <Button type="submit" color="primary" className="shadow-md" isLoading={isSubmitting}>
                        Ingresar
                    </Button>
                </form>
            )}
        </Formik>
    );
}

export default FormLogin;
