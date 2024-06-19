

import { Input, Button, ButtonGroup } from '@nextui-org/react';

import { BsSearch, BsRepeat } from "react-icons/bs";


function SearchBar({ onOpen, total, handleSort, handleReset, filtersValues, handleFilters,handleSearch }) {

    return (
        <section className='w-full max-w-[500px]'>
            <div className='flex max-xs:flex-col gap-4 xs:gap-2 xs:items-center'>
                <Input
                    type='search'
                    classNames={{
                        inputWrapper: "max-xs:rounded-none max-xs:border-x-0 shadow-md",
                        clearButton: 'text-danger'
                    }}
                    placeholder='Buscar...'
                    endContent={
                        <span className='cursor-pointer hover:text-warning' onClick={handleSearch}>
                            <BsSearch />
                        </span>
                    }
                    variant="bordered"
                    name='search'
                    value={filtersValues?.search ? filtersValues.search : ''}
                    onChange={handleFilters}
                    onKeyUp={e => {
                        if (e.key === 'Enter') handleSearch()
                    }}
                />

                <ButtonGroup >
                    <Button
                        className='bg-custom-red dark:bg-custom-red-dark text-white shadow-md'
                        onPress={onOpen || null}
                    >
                        Filtros
                    </Button>
                    <Button
                        className='shadow-md'
                        isIconOnly
                        onClick={handleReset}
                    >
                        <BsRepeat />
                    </Button>
                </ButtonGroup>
            </div>

            <div className="flex justify-between items-center px-4 mt-2  flex-wrap text-default-400 text-md">
                <span > {'Total: ' + total}</span>

                <div className='flex items-center '>
                    <Button
                        className='text-md'
                        size='sm'
                        variant='transparent'
                        onClick={handleSort}
                    >
                        Ordenar: <span className='text-xl'>{filtersValues?.orderUp ? '↓' : '↑'}</span>
                    </Button>
                </div>
            </div>
        </section>
    );
}

export default SearchBar;
