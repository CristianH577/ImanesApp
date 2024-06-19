import React from "react";


function TableCustom({ className, classNames, columns, rows, makeCellContent, makeHeaderCell, makeRow, ariaLabel, selectionMode }) {

    return (
        <section
            data-slot="container"
            className={"p-4 bg-content1 rounded-large shadow-small overflow-auto w-full " + (className || classNames?.container || '')}
        >
            <table
                aria-label={ariaLabel || ''}
                className={"min-w-full h-auto table-auto " + (classNames?.table || '')}
            >
                <thead
                    className={"bg-content2 p-4 " + (classNames?.thead || '')}
                >
                    <tr
                        data-slot="thead_row"
                        className={" capitalize " + (classNames?.thead_row || '')}
                    >
                        {columns && columns.map(col => {
                            const key = col?.key || col?.id || col
                            const label = col?.label || col

                            return <th
                                key={key}
                                data-slot="th"
                                className={"px-3 h-10 text-left align-middle bg-default-100 whitespace-nowrap text-foreground-500 text-tiny font-semibold first:rounded-l-lg last:rounded-r-lg capitalize " + (classNames?.th || '')}
                            >
                                {makeHeaderCell ? makeHeaderCell(col) : label}
                            </th>
                        })}
                    </tr>
                </thead>

                <tbody
                    className={" " + (classNames?.tbody || '')}
                >
                    {rows && rows.map((row, i) => {
                        const id = row.key || row.id || i

                        const className = ` ${classNames?.row || ''} ${(selectionMode && selectionMode === 'single') ? 'hover:bg-default-100' : ''}`
                        const data = { 'data-slot': 'row' }

                        var tr = <tr></tr>
                        if (makeRow) tr = makeRow()

                        const existingData = tr.props
                        const existingClassName = tr.props.className || ''
                        const mergedData = { ...existingData, ...data };
                        const mergedClassName = `${existingClassName} ${className}`.trim();

                        tr = React.cloneElement(tr, {
                            key: id,
                            ...mergedData,
                            className: mergedClassName
                        })

                        const cells = columns && columns.map(col => {
                            const id_col = col?.key || col?.id || col
                            return <td
                                key={id + "_" + id_col}
                                data-slot="cell"
                                className={"py-2 px-3 text-small capitalize first:rounded-l-lg last:rounded-r-lg " + (classNames?.td || '')}
                            >
                                {makeCellContent
                                    ? makeCellContent(row, id_col)
                                    : row[id_col]
                                        ? row[id_col]
                                        : null
                                }
                            </td>
                        })

                        return React.cloneElement(tr, {}, cells)

                        // return <tr
                        //     key={id}
                        //     data-slot="row"
                        //     className={" " +
                        //         (classNames?.row || '') + " " +
                        //         (selectionMode
                        //             ? selectionMode === 'single'
                        //                 ? 'hover:bg-default-100'
                        //                 : ''
                        //             : ''
                        //         )
                        //     }
                        // >
                        //     {columns && columns.map(col => {
                        //         const id_col = col?.key || col?.id || col
                        //         return <td
                        //             key={id + "_" + id_col}
                        //             data-slot="cell"
                        //             className={"py-2 px-3 text-small capitalize " + (classNames?.td || '')}
                        //         >
                        //             {makeCellContent
                        //                 ? makeCellContent(row, id_col)
                        //                 : row[id_col]
                        //                     ? row[id_col]
                        //                     : null
                        //             }
                        //         </td>
                        //     })}
                        // </tr>
                    })}
                </tbody>
            </table>
        </section >
    );
}

export default TableCustom;
