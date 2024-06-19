import { useEffect, useRef, useState } from "react"


function PaginationCustom({ total, className, classNames, page, onClick, siblings, next, prev, elipsis_sup, elipsis_sup_hover, elipsis_inf, elipsis_inf_hover, first, last, color, breakpoints, showJumps, showElipsis }) {
    // styles
    const li_class = "select-none flex flex-wrap items-center justify-center text-default-foreground shadow-md bg-default-100 active:bg-default-300 min-w-9 w-9 h-9 text-small rounded-medium hover:bg-default-300 transition-all "
    const control_class = "data-[disabled=true]:text-default-300 data-[disabled=true]:pointer-events-none "

    // vars
    const default_configs = {
        siblings: siblings === undefined ? 3 : siblings,
        showJumps: showJumps === undefined ? false : showJumps,
        showElipsis: showElipsis === undefined ? false : showElipsis,
    }
    // const default_breakpoints = {
    //     240: {
    //         showElipsis: true
    //     },
    //     320: {
    //         showJumps: true
    //     },
    //     400: {
    //         siblings: 1
    //     },
    //     500: {
    //         siblings: 2
    //     },
    //     600: {
    //         siblings: 3
    //     },
    //     700: {
    //         siblings: 4
    //     },
    //     800: {
    //         siblings: 5
    //     },
    // }
    const [configs, setConfigs] = useState(default_configs)
    const prevBtn = useRef(null)
    const sibling = configs.siblings
    const lim_inf = page - sibling < 1
        ? 1
        : page + sibling > total
            ? total - (sibling * 2)
            : page - sibling
    const lim_sup = page + sibling > total
        ? total
        : page - sibling < 1
            ? 1 + (sibling * 2)
            : page + sibling


    useEffect(() => {
        if (breakpoints) {
            const updateConfigs = () => {
                const screen = window.innerWidth
                const new_config = { ...default_configs }

                Object.entries(breakpoints).forEach(([breakpoint, value]) => {
                    if (breakpoint <= screen) {
                        Object.assign(new_config, value);
                    }
                })

                setConfigs(new_config)
            };

            updateConfigs()
            window.addEventListener('resize', updateConfigs);

            return () => {
                window.removeEventListener('resize', updateConfigs);
            }
        }
        // eslint-disable-next-line 
    }, []);


    return (
        <nav
            data-slot='wrapper'
            role="navigation"
            aria-label="pagination navigation"
            className={" p-2 my-4 w-full " + classNames?.wrapper + " " + className}
        >
            <ul
                data-slot="list"
                className={"flex flex-wrap gap-1 justify-center " + classNames?.list}
            >
                <li
                    ref={prevBtn}
                    data-slot="prev"
                    role="button"
                    aria-label="previous page button"
                    data-disabled={page <= 1}
                    className={li_class + control_class + classNames?.prev}
                    onClick={() => {
                        onClick(page - 1)
                    }}
                >
                    {prev ? prev : '<'}
                </li>
                <li
                    data-slot="first"
                    role="button"
                    aria-label="first page button"
                    data-disabled={page <= 1}
                    data-hidden={configs.showJumps ? lim_inf <= 1 : true}
                    className={li_class + control_class + classNames?.first + " data-[hidden=true]:hidden "}
                    onClick={() => {
                        onClick(1)
                    }}
                >
                    {first ? first : '<<'}
                </li>
                <li
                    data-slot="elipsis_inf"
                    role="button"
                    aria-label="elipsis inferior button"
                    data-hidden={configs.showElipsis ? lim_inf <= 1 : true}
                    className={li_class + control_class + classNames?.elipsis_inf + " data-[hidden=true]:hidden group "}
                    onClick={() => {
                        var to = page - sibling * 2
                        if (to < 1) to = 1
                        if (sibling === 0) to = page - 1
                        onClick(to)
                    }}
                >
                    <span className="group-hover:hidden">
                        {elipsis_inf || '...'}
                    </span>
                    <span className="hidden group-hover:block">
                        {elipsis_inf_hover ||
                            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 256 256" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                <path d="M230,184a6,6,0,0,1-12,0A90,90,0,0,0,64.36,120.36L38.55,146H88a6,6,0,0,1,0,12H24a6,6,0,0,1-6-6V88a6,6,0,0,1,12,0v49.58l25.89-25.72A102,102,0,0,1,230,184Z"></path>
                            </svg>
                        }
                    </span>
                </li>

                {[...Array(total)].map((_, i) => {
                    const num = i + 1
                    return <li
                        key={num}
                        data-slot="item"
                        role="button"
                        aria-label={"pagination item " + num}
                        data-active={page === num}
                        data-hidden={num < lim_inf || num > lim_sup}
                        className={li_class + classNames?.item + " max-[230px]:data-[active=false]:hidden data-[active=false]:data-[hidden=true]:hidden data-[active=true]:bg-" + (color ? color : 'primary')}
                        onClick={() => {
                            onClick && onClick(num)
                        }}
                    >
                        {i + 1}
                    </li>
                })}

                <li
                    data-slot="elipsis_sup"
                    role="button"
                    aria-label="elipsis superior button"
                    data-hidden={configs.showElipsis ? lim_sup === total : true}
                    className={li_class + control_class + classNames?.elipsis_sup + " data-[hidden=true]:hidden group"}
                    onClick={() => {
                        var to = page + sibling * 2
                        if (to > total) to = total
                        if (sibling === 0) to = page + 1
                        onClick(to)
                    }}
                >
                    <span className="group-hover:hidden">
                        {elipsis_sup || '...'}
                    </span>
                    <span className="hidden group-hover:block">
                        {elipsis_sup_hover ||
                            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 256 256" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                <path d="M238,88v64a6,6,0,0,1-6,6H168a6,6,0,0,1,0-12h49.45l-25.8-25.63A90,90,0,0,0,38,184a6,6,0,0,1-12,0,102,102,0,0,1,174.12-72.12L226,137.58V88a6,6,0,0,1,12,0Z"></path>
                            </svg>
                        }
                    </span>
                </li>
                <li
                    data-slot="last"
                    role="button"
                    aria-label="last page button"
                    data-disabled={page >= total}
                    data-hidden={configs.showJumps ? lim_sup >= total : true}
                    className={li_class + control_class + classNames?.last + " data-[hidden=true]:hidden "}
                    onClick={() => {
                        onClick(total)
                    }}
                >
                    {last ? last : '>>'}
                </li>
                <li
                    data-slot="next"
                    role="button"
                    aria-label="next page button"
                    data-disabled={page >= total}
                    className={li_class + control_class + classNames?.next}
                    onClick={() => {
                        onClick(page + 1)
                    }}
                >
                    {next ? next : '>'}
                </li>
            </ul>
        </nav >
    );
}

export default PaginationCustom;
