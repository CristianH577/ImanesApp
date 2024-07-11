
import { useState } from "react";

import { Modal, ModalContent, ModalBody } from "@nextui-org/react";
import { Tabs, Tab, Link, } from "@nextui-org/react";

import FormLogin from "./components/FormLogin";
import FormRegister from "./components/FormRegister";


function ModalLog({ isOpen, setOpen, dark, logIn, onRegister }) {
    const [tabSelected, setTabSelected] = useState("login")
    const [disabledActions, setDisabledActions] = useState(false)

    return (

        <Modal
            isOpen={isOpen}
            onOpenChange={() => {
                setTabSelected("login")
                setOpen(false)
            }}
            placement="center"
            className={'max-xs:mx-0 ' + (dark ? 'dark text-white' : '')}
        >
            <ModalContent className="w-full xs:w-fit xs:min-w-[300px]  my-auto max-xs:h-full xs:!my-auto max-xs:max-w-none max-xs:mx-0 max-xs:mb-0 max-xs:rounded-none overflow-y-auto border-3 border-divider p-2">
                {(onClose) => (
                    <ModalBody className="pt-8 items-center max-xs:px-1 relative ">
                        {disabledActions && <div className="absolute w-full h-full z-[20] bg-"></div>}

                        <Tabs
                            size="lg"
                            aria-label="Pestañas de registro"
                            selectedKey={tabSelected}
                            onSelectionChange={setTabSelected}
                            className="max-xs:w-full"
                            classNames={{
                                tabList: "shadow-md max-xs:flex-col max-xs:w-full",
                            }}
                        >
                            <Tab key="login" title="Iniciar Sesion">
                                <FormLogin
                                    logIn={logIn}
                                    setDisabledActions={setDisabledActions}
                                />

                                <p className="text-center text-small mt-4">
                                    Necesita crear una cuenta?{" "}
                                    <Link size="sm" className="cursor-pointer" onPress={() => setTabSelected("signup")}>
                                        Registrarse
                                    </Link>
                                </p>
                            </Tab>
                            <Tab key="signup" title="Registro">
                                <FormRegister
                                    onRegister={onRegister}
                                    setDisabledActions={setDisabledActions}
                                />

                                <p className="text-center text-small mt-4">
                                    Ya tiene una cuenta?{" "}
                                    <Link size="sm" className="cursor-pointer" onPress={() => setTabSelected("login")}>
                                        Inicie Sesion
                                    </Link>
                                </p>
                            </Tab>
                        </Tabs>
                    </ModalBody>
                )}
            </ModalContent>
        </Modal>
    );
}

export default ModalLog;
