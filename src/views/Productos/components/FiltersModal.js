

import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";
import { Select, SelectItem, SelectSection, Input } from "@nextui-org/react";
import { Checkbox } from "@nextui-org/react";

import { BsRepeat } from "react-icons/bs";


function FiltersModal({ filtersValues, isOpen, onOpenChange, handleReset, handleFilters, filters, dark, handleApply }) {

    !filtersValues && (filtersValues = {})

    const filters_components = Object.entries(filters).map(([kind, filters_data]) => {
        switch (kind) {
            case 'select':
                return filters_data.map(filter =>
                    <Select
                        key={filter.id}
                        variant='underlined'
                        label={filter.label}
                        size='sm'
                        className={'xs:max-w-[200px] shadow-md ' + (dark ? 'dark' : '')}
                        name={filter.id}
                        data-kind='select'
                        kind='select'
                        selectedKeys={filtersValues[filter.id] || []}
                        onChange={handleFilters}
                        aria-label={"filtro: " + filter.id}
                        classNames={{
                            popoverContent: (dark ? 'dark text-foreground border border-foreground' : ''),
                            innerWrapper: 'capitalize',
                        }}
                    >
                        {filter.id !== 'results' && (
                            <SelectSection
                                showDivider
                                className={!filtersValues.hasOwnProperty(filter.id) ? 'hidden' : ''}
                            >
                                <SelectItem key=''>
                                    Quitar filtro
                                </SelectItem>
                            </SelectSection>
                        )}
                        {filter.values.map(value =>
                            <SelectItem
                                key={value.id}
                                className='capitalize'
                                value={value.value}
                            >
                                {value.label}
                            </SelectItem>
                        )}
                    </Select>
                )
            case 'check':
                return filters_data.map(filter =>
                    <Checkbox
                        key={filter.id}
                        name={filter.id}
                        data-kind='check'
                        classNames={{
                            wrapper: "shadow-md",
                        }}
                        isSelected={filtersValues[filter.id] || false}
                        onChange={handleFilters}
                    >
                        {filter.label}
                    </Checkbox>
                )
            case 'number':
                return filters_data.map(filter =>
                    <div key={filter.id} className='xs:max-w-[200px] '>
                        <p className='text-xs capitalize'>{filter.label}</p>
                        <div className=' flex'>
                            <Input
                                type='number'
                                label='Min'
                                endContent={filter?.measure ? filter.measure : null}
                                size='sm'
                                variant='underlined'
                                className="shadow-md"
                                classNames={{
                                    inputWrapper: 'rounded-e-none',
                                }}
                                name={filter.id + '_min'}
                                data-kind='number'
                                value={filtersValues[filter.id]?.min || ''}
                                min={0}
                                onChange={handleFilters}
                            />
                            <Input
                                type='number'
                                label='Max'
                                endContent={filter?.measure ? filter.measure : null}
                                size='sm'
                                variant='underlined'
                                className="shadow-md"
                                classNames={{
                                    inputWrapper: 'rounded-e-none',
                                }}
                                name={filter.id + '_max'}
                                data-kind='number'
                                value={filtersValues[filter.id]?.max || ''}
                                min={0}
                                onChange={handleFilters}
                            />
                        </div>
                    </div>
                )

            default:
                break;
        }
        return null
    })


    return (
        <Modal
            size="full"
            backdrop="opaque"
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            className={(dark ? 'dark' : '')}
            classNames={{
                wrapper: 'justify-start'
            }}
            motionProps={{
                variants: {
                    initial: {
                        x: '-100%',
                        opacity: 1,
                    },
                    enter: {
                        x: 0,
                        opacity: 1,
                        transition: {
                            duration: 0.3,
                            ease: "easeOut",
                        },
                    },
                    exit: {
                        x: '-100%',
                        opacity: 0,
                        transition: {
                            duration: 0.2,
                            ease: "easeIn",
                        },
                    },
                }
            }}
        >
            <ModalContent className="rounded-none xs:w-fit min-w-40 text-foreground max-sm:h-full sm:!my-auto max-sm:max-w-none max-sm:mx-0 max-sm:mb-0  overflow-y-auto">
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">Filtros</ModalHeader>

                        <ModalBody className='w-full max-xs:px-1 space-y-1'>
                            {filters_components}
                        </ModalBody>

                        <ModalFooter className='flex-wrap'>
                            <Button isIconOnly variant='ghost' className="shadow-md" onPress={onClose}>
                                X
                            </Button>
                            <Button isIconOnly className="shadow-md" onPress={handleReset}>
                                <BsRepeat />
                            </Button>
                            <Button color='danger' className="shadow-md" onPress={handleApply}>
                                Aplicar
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
}

export default FiltersModal;
