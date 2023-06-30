import React, {forwardRef, useEffect, useRef, useState} from 'react'
import {useSelector} from 'react-redux'
import {useReactToPrint} from 'react-to-print'
import PrintBtn from '../Buttons/PrintBtn'
import {uniqueId, map} from 'lodash'

export const SavedIncomingsCheck = forwardRef((props, ref) => {
    const {incomings} = props
    const {user, market} = useSelector((state) => state.login)
    const {currencyType} = useSelector((state) => state.currency)
    const [loadContent, setLoadContent] = useState(false)
    const saleCheckRef = useRef(null)

    const onBeforeGetContentResolve = useRef(null)
    const handleOnBeforeGetContent = React.useCallback(() => {
        setLoadContent(true)
        return new Promise((resolve) => {
            onBeforeGetContentResolve.current = resolve

            setTimeout(() => {
                setLoadContent(false)
                resolve()
            }, 2000)
        })
    }, [setLoadContent])
    const reactToPrintContent = React.useCallback(() => {
        return saleCheckRef.current
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [saleCheckRef.current])
    const print = useReactToPrint({
        content: reactToPrintContent,
        documentTitle: 'All Checks',
        onBeforeGetContent: handleOnBeforeGetContent,
        removeAfterPrint: true,
    })
    useEffect(() => {
        if (
            loadContent &&
            typeof onBeforeGetContentResolve.current === 'function'
        ) {
            onBeforeGetContentResolve.current()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [onBeforeGetContentResolve.current, loadContent])
    return (
        <>
            <div ref={saleCheckRef} className={'bg-white-900 p-4 rounded-md'}>
                <div className='flex pb-2 justify-between border-b-[0.8px] border-black-700'>
                    <ul className='w-[35%]'>
                        <li className='check-ul-li'>
                            Do'kon:
                            <span className='check-ul-li-span'>
                                {market.name}
                            </span>
                        </li>
                        <li className='check-ul-li'>
                            Telefon:
                            <span className='check-ul-li-span'>
                                {market.phone1}
                            </span>
                        </li>
                        <li className='check-ul-li'>
                            Manzil:
                            <span className='check-ul-li-span'>
                                {market?.address}
                            </span>
                        </li>
                        <li className='check-ul-li'>
                            Sana:
                            <span className='check-ul-li-span'>
                                {new Date(
                                    incomings?.createdAt
                                ).toLocaleDateString()}
                            </span>
                        </li>
                        <li className='check-ul-li'>
                            Yetkazib beruvchi:{' '}
                            <span className='check-ul-li-span'>
                                {incomings?.supplier?.name}
                            </span>
                        </li>
                    </ul>
                    <div className='check-ul-li flex-col'>
                        <div className='check-ul-li justify-end'>
                            <p>
                                Sotuvchi:{' '}
                                <span className='check-ul-li-span'>
                                    {user.firstname} {user.lastname}
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
                <div className='mt-4'>
                    <table className='border-collapse border border-slate-400 w-full break-inside-auto'>
                        <thead>
                            <tr
                                className={
                                    'break-inside-avoid break-after-auto'
                                }
                            >
                                <td className='check-table-rtr'>№</td>
                                <td className='check-table-rtr'>Kodi</td>
                                <td className='check-table-rtr'>Maxsulot</td>
                                <td className='check-table-rtr'>Soni</td>
                                <td className='check-table-rtr'>
                                    Narxi (dona)
                                </td>
                                <td className='check-table-rtr'>Jami</td>
                            </tr>
                        </thead>
                        <tbody>
                            {map(incomings?.temporaries, (item, index) => {
                                return (
                                    <tr key={uniqueId('saved-table-row')}>
                                        <td className='p-1 border text-center text-[0.875rem] font-bold'>
                                            {index + 1}
                                        </td>
                                        <td className='check-table-body text-center'>
                                            {item?.product?.code}
                                        </td>
                                        <td className='check-table-body text-start'>
                                            {item?.product?.name}
                                        </td>
                                        <td className='check-table-body'>
                                            {item?.pieces} {item?.unit?.name}
                                        </td>
                                        <td className='check-table-body'>
                                            {currencyType === 'USD'
                                                ? item?.unitprice
                                                : item?.unitpriceuzs}{' '}
                                            {currencyType}
                                        </td>
                                        <td className='check-table-body'>
                                            {currencyType === 'USD'
                                                ? item?.totalprice
                                                : item?.totalpriceuzs}{' '}
                                            {currencyType}
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
                <div className='border-t-[0.8px] border-black-700 w-full my-[1rem]'>
                    <h3 className='text-[1.1rem] text-right text-black-700 font-bold pt-4'>
                        Saqlanganlar jami :{' '}
                        <span>
                            {currencyType === 'USD'
                                ? incomings?.temporaries.reduce(
                                      (prev, {totalprice}) => prev + totalprice,
                                      0
                                  )
                                : incomings?.temporaries.reduce(
                                      (prev, {totalpriceuzs}) =>
                                          prev + totalpriceuzs,
                                      0
                                  )}{' '}
                            {currencyType}
                        </span>
                    </h3>
                </div>
            </div>
            <div className='flex justify-center items-center mt-6'>
                <PrintBtn onClick={print} isDisabled={loadContent} />
            </div>
        </>
    )
})
