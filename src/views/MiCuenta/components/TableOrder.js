
import { useMemo, useState } from 'react';

import { motion } from "framer-motion";

import ErrorBoundary from '../../../components/ErrorBoundary';
import TableCustom from '../../../components/TableCustom';
import PaginationCustom from '../../../components/PaginationCustom';

import unknown from '../../../assets/imgs/products/unknown.svg'
import { Image } from '@nextui-org/react';


function TableOrder({ rows }) {
    const cols = ['img', 'categoria', 'nombre', 'forma', 'denominacion', 'cantidad', 'precio', 'subtotal']

    const contextImgs = require.context('../../../assets/imgs/products', true)

    const makeHeaderCell = col => {
        if (['img'].includes(col)) {
            return ''
        }
        return col
    }
    const makeRow = () => {
        return <motion.tr
            variants={{
                initial: { y: 20, opacity: 0 },
                animate: {
                    y: 0,
                    opacity: 1
                }
            }}
        >
        </motion.tr>
    }
    const makeCellContent = (row, col) => {
        const val = row[col] || null

        switch (col) {
            case 'denominacion':
                return val ? 'N' + row[col] : ''
            case 'precio':
            case 'subtotal':
                return '-'
            case 'img':
                var src = null
                try {
                    src = contextImgs(`./${row.categoria}/${row.id}/1.webp`)
                } catch (error) {
                    src = unknown
                }
                return <Image
                    src={src}
                    classNames={{
                        wrapper: 'min-w-10'
                    }}
                />
            default:
                return val
        }
    }

    // navigation
    const [page, setPage] = useState(1)
    const pages_size = 10
    const total_pages = Math.ceil(rows?.length / pages_size)

    const listPages = useMemo(() => {
        const start = (page - 1) * pages_size
        const end = start + pages_size

        return rows?.slice(start, end)
        // eslint-disable-next-line
    }, [page, rows])

    return (
        <ErrorBoundary>
            <motion.div
                className="max-w-full"
                variants={{
                    initial: {
                        x: '-100%',
                        scale: 0,
                        display: 'none',
                    },
                    animate: {
                        x: 0,
                        scale: 1,
                        display: 'block',
                        transition: {
                            delayChildren: .1,
                            staggerChildren: .2
                        }
                    },
                }}
                initial="initial"
                animate={rows.length ? "animate" : ""}
            >
                <TableCustom
                    ariaLabel="Lista de articulos dels pedido"
                    className="max-w-[700px] scrollbar-hide"
                    selectionMode="single"
                    columns={cols}
                    rows={listPages}
                    makeHeaderCell={makeHeaderCell}
                    makeRow={makeRow}
                    makeCellContent={makeCellContent}
                    classNames={{
                        thead: "shadow-md"
                    }}
                />

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
            </motion.div>
        </ErrorBoundary>
    );
}

export default TableOrder;
