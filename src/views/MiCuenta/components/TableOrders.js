
import { useMemo, useState } from 'react';

import { motion } from "framer-motion";

import ErrorBoundary from '../../../components/ErrorBoundary';
import TableCustom from '../../../components/TableCustom';
import PaginationCustom from '../../../components/PaginationCustom';


function TableOrders({ rows, selectedRow, onSelectedRow }) {

    const cols = ['fecha', 'articulos', 'total', 'estado', 'actualizacion']

    const makeRow = row => {
        return <motion.tr
            variants={{
                initial: { y: 20, opacity: 0 },
                animate: {
                    y: 0,
                    opacity: 1
                }
            }}
            onClick={() => onSelectedRow && onSelectedRow(row.id_pedido, row.articulos)}
        >
        </motion.tr>
    }
    const makeCellContent = (row, col) => {
        const val = row[col] || null

        switch (col) {
            case 'articulos':
                return Object.keys(row.articulos).length
            case 'total':
                return "-"
            case 'estado':
                return row.estados.at(-1)[0]
            case 'actualizacion':
                return row.estados.at(-1)[1] || "-"
            case 'fecha':
                return row.fecha_pedido
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
                        x: '100%',
                        opacity: 0
                    },
                    animate: {
                        x: 0,
                        opacity: 1,
                        transition: {
                            delayChildren: .1,
                            staggerChildren: .2
                        }
                    },
                }}
                initial="initial"
                animate="animate"
            >
                <TableCustom
                    ariaLabel="Lista de pedidos"
                    className="max-w-[700px] scrollbar-hide"
                    selectionMode="single"
                    columns={cols}
                    rows={listPages}
                    rowColumnId={'id_pedido'}
                    makeRow={makeRow}
                    makeCellContent={makeCellContent}
                    classNames={{
                        thead: "shadow-md",
                        // selec
                    }}
                    selectedRows={selectedRow}
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

export default TableOrders;
