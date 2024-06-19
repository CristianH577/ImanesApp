import { useEffect, useMemo, useState } from 'react';
import { useOutletContext, useLocation } from "react-router-dom";

import { Spinner, useDisclosure } from '@nextui-org/react';

import { motion } from 'framer-motion';

import ErrorBoundary from '../../components/ErrorBoundary.js';
import PaginationCustom from '../../components/PaginationCustom.js';

import SearchBar from './components/SearchBar.js'
import FiltersModal from './components/FiltersModal.js';
import CardArticle from './components/CardArticle.js';
import ModalArticle from './components/ModalArticle.js';

// import data_default from '../../assets/files/lista_imanes.json';
import database from '../../assets/files/lista_imanes.json';


function Productos() {
    const context = useOutletContext()
    const location = useLocation()

    const data_default = {
        ...database,
        articles: [
            ...database.articles,
            // ...Array(50).fill(database.articles[0]),
            // ...Array(40).fill(database.articles[1]),
        ]
    }
    const [data, setData] = useState(data_default)
    const [articleDataModal, setArticleDataModal] = useState(false)
    const { isOpen, onOpen, onOpenChange } = useDisclosure() // modal article


    // filters
    const filters_default = {
        text: [],
        select: [
            {
                id: 'results',
                label: 'Resultados',
                values: ['10', '15', '20', '25'].map(val => ({
                    id: val,
                    value: val,
                    label: val,
                })),
            },
        ],
        check: [],
        number: []
    }
    const [filters, setFilters] = useState(filters_default)
    const filters_values_default = {
        results: ['10'],
        orderUp: true,
    }
    const [filtersValues, setFiltersValues] = useState(filters_values_default)
    const getFiltersFromArticles = () => {
        const fields_set = new Set();
        data?.articles.forEach(obj => {
            Object.keys(obj).forEach(clave => {
                fields_set.add(clave);
            });
        });
        const fileds = Array.from(fields_set);

        const new_filters = { ...filters_default }
        fileds.forEach(field => {
            try {
                const field_data = database.fields_data[field]
                const filter = {
                    id: field,
                    label: field_data?.label,
                }
                switch (field_data.kind) {
                    case 'select':
                        const values = []
                        Object.entries(field_data?.values).forEach(([key, val]) => {
                            values.push({
                                id: key,
                                value: key,
                                label: val,
                            })
                        })
                        filter.values = values
                        break;
                    case 'number':
                        filter.measure = field_data?.measure
                        break;

                    default:
                        break;
                }
                // if (field_data.kind === 'select') {
                //     const values = []
                //     Object.entries(field_data?.values).forEach(([key, val]) => {
                //         values.push({
                //             id: key,
                //             value: key,
                //             label: val,
                //         })
                //     })
                //     filter.values = values
                // }
                new_filters[field_data?.kind].push(filter)
            } catch (error) {

            }
        })
        setFilters(new_filters)
    }
    const handleLocationSearch = () => {
        const search_params = new URLSearchParams(location.search)
        const filters_values_new = { ...filters_values_default }
        for (let [key, value] of search_params.entries()) {
            if (key === 'forma') value = value.slice(0, -1)
            if (database.fields_data[key]?.values[value]) filters_values_new[key] = [value]
        }
        filters_values_new.enabled = true
        setFiltersValues(filters_values_new)
    }
    const handleFilters = e => {
        const filters_values_new = { ...filtersValues }
        filters_values_new.enabled = false
        const [name, subname] = e.target?.name.split('_')

        var kind = database.fields_data[name]?.kind
        if (name === 'results') kind = 'select'
        if (name === 'search') kind = 'text'

        var value = null
        switch (kind) {
            case 'text':
                value = e.target?.value
                if (!value) {
                    try {
                        delete filters_values_new[name]
                    } catch (error) {

                    }
                } else {
                    filters_values_new[name] = value
                }
                break;
            case 'select':
                value = e.target?.value
                if (!value) {
                    if (name !== 'results') {
                        try {
                            delete filters_values_new[name]
                        } catch (error) {

                        }
                    }
                } else {
                    filters_values_new[name] = [value]
                }
                break;
            case 'check':
                value = e.target?.checked
                if (!value) {
                    try {
                        delete filters_values_new[name]
                    } catch (error) {

                    }
                } else {
                    filters_values_new[name] = value
                }
                break;
            case 'number':
                value = e.target?.value
                if (!value) {
                    try {
                        delete filters_values_new[name][subname]
                    } catch (error) {

                    }
                    try {
                        if (Object.keys(filters_values_new[name]).length === 0) delete filters_values_new[name]
                    } catch (error) {

                    }
                } else {
                    if (value > 0) {
                        if (!filtersValues.hasOwnProperty(name)) filters_values_new[name] = {}
                        filters_values_new[name][subname] = parseFloat(value)
                    }
                }
                break;

            default:
                break;
        }

        setFiltersValues(filters_values_new)
    }

    const handleReset = () => {
        handleLocationSearch()
    }
    const handleSearch = async () => {
        var articles_new = []
        if (data_default?.articles?.length) {
            articles_new = data_default?.articles.filter(art => {
                var bool = true

                if (filtersValues?.search) {
                    if (!Object.values(art).toString().toLowerCase().includes(filtersValues.search)) return false
                }

                Object.entries(filtersValues).forEach(([field, value]) => {
                    if (!bool) return false

                    const kind = database.fields_data[field]?.kind
                    switch (kind) {
                        case 'select':
                            bool = value.includes(art[field])
                            break;
                        case 'check':
                            if (value) bool = art[field]
                            break;
                        case 'number':
                            if (filtersValues[field]?.min) {
                                bool = art[field] >= filtersValues[field].min
                            }
                            if (filtersValues[field]?.max) {
                                bool = art[field] <= filtersValues[field].max
                            }
                            break;

                        default:
                            break;
                    }

                })

                if (bool) return art
                return false
            })
        }

        setData({
            ...data,
            articles: articles_new,
        })
    }

    // navigation
    const total_pages = Math.ceil(data?.articles?.length / parseInt(filtersValues?.results[0]))
    const [page, setPage] = useState(1)

    const listPages = useMemo(() => {
        const start = (page - 1) * parseInt(filtersValues?.results[0])
        const end = start + parseInt(filtersValues?.results[0])

        return data?.articles?.slice(start, end)
        // eslint-disable-next-line
    }, [page, data])

    const handleSort = () => {
        setFiltersValues({ ...filtersValues, orderUp: !filtersValues?.orderUp })
        setData({ ...data, loading: true })

        var array_sorted = []
        if (data?.articles?.length) {
            array_sorted = [...data?.articles].sort((a, b) => {
                let first = a.id
                let second = b.id
                let cmp = (parseInt(first) || first) < (parseInt(second) || second) ? -1 : 1

                if (filtersValues?.orderUp) {
                    cmp *= -1
                }

                return cmp
            })
        }

        setTimeout(() => {
            setData({
                ...data,
                articles: array_sorted,
                loading: false
            })
        }, 100);
    }



    useEffect(() => {
        setPage(1)
        getFiltersFromArticles()
        // eslint-disable-next-line
    }, [data])
    useEffect(() => {
        window.scroll(0, 0)
    }, [page])
    // eslint-disable-next-line
    useEffect(handleLocationSearch, [location])
    useEffect(() => {
        if (filtersValues?.enabled) handleSearch()
        // eslint-disable-next-line
    }, [filtersValues])
    useEffect(() => {
        const hash = location.hash.replace('#', '')
        if (hash) {
            var id = null
            switch (hash) {
                case 'neocube':
                    id = 8
                    break;
                case 'set':
                    id = 9
                    break;

                default:
                    break;
            }
            if (id) {
                const article = database.articles.find(art => art.id === id)
                setArticleDataModal(article)
            }
        }
        // eslint-disable-next-line
    }, [])


    return (
        <main className='flex flex-col items-center py-8 xs:px-4 sm:px-8 '>

            {/* buscador */}
            <ErrorBoundary >
                <motion.div
                    initial={{ opacity: 0, x: '-100%' }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: .3 }}
                    className='w-full flex flex-col items-center'
                >
                    <SearchBar
                        onOpen={onOpen}
                        handleSort={handleSort}
                        handleReset={handleReset}
                        total={data?.articles?.length || 0}
                        handleFilters={handleFilters}
                        filtersValues={filtersValues}
                        handleSearch={handleSearch}
                    />
                </motion.div>
            </ErrorBoundary>

            <p className='text-small text-default-400 p-2'>Presione en el articulo para ver mas informacion e imagenes</p>

            {/* articulos */}
            <ErrorBoundary >
                <section className='mt-4 flex flex-col items-center w-full max-w-[1500px]'>
                    {
                        data?.loading
                            ? <Spinner />
                            : !listPages.length
                                ? <div className='text-muted text-4xl text-center w-full'>Sin resultados</div>
                                : <div className='gap-8 md:px-2 grid grid-cols-1 min-[460px]:grid-cols-2 min-[715px]:grid-cols-3 min-[960px]:grid-cols-4 min-[1150px]:grid-cols-5'>
                                    {listPages?.map((art, i) =>
                                        art?.nombre &&
                                        <ErrorBoundary key={i} >
                                            <motion.div
                                                initial={{ opacity: 0, scale: 0 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ duration: .3 }}
                                            >
                                                <CardArticle
                                                    item={art}
                                                    showInfo={() => setArticleDataModal(art)}
                                                    fieldsData={database.fields_data}
                                                />
                                            </motion.div>
                                        </ErrorBoundary>
                                    )}
                                </div>
                    }

                    {total_pages > 1 &&
                        < PaginationCustom
                            page={page}
                            onClick={page => setPage(page)}
                            total={total_pages}
                            color={'danger'}
                            className={'mt-8'}
                            siblings={0}
                            breakpoints={{
                                240: {
                                    showElipsis: true
                                },
                                320: {
                                    showJumps: true
                                },
                                400: {
                                    siblings: 1
                                },
                                500: {
                                    siblings: 2
                                },
                                600: {
                                    siblings: 3
                                },
                                700: {
                                    siblings: 4
                                },
                                800: {
                                    siblings: 5
                                },
                            }}
                        />
                    }
                </section>
            </ErrorBoundary>

            {/* filters */}
            <ErrorBoundary >
                <FiltersModal
                    isOpen={isOpen}
                    onOpenChange={onOpenChange}
                    dark={context.dark}
                    filters={filters}
                    filtersValues={filtersValues}
                    handleFilters={handleFilters}
                    handleReset={handleReset}
                    handleApply={() => {
                        onOpenChange()
                        handleSearch()
                    }}
                />
            </ErrorBoundary>

            {/* article */}
            <ErrorBoundary >
                <ModalArticle
                    item={articleDataModal}
                    setItem={setArticleDataModal}
                    dark={context.dark}
                    fieldsData={database.fields_data}
                />
            </ErrorBoundary>
        </main >
    );
}

export default Productos;