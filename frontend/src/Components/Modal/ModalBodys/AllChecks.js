import React, { useEffect, useRef, useState } from 'react'
import PrintBtn from '../../Buttons/PrintBtn'
import { useReactToPrint } from 'react-to-print'
import { SaleCheckAll } from '../../SaleCheck/SaleCheckAll.js'
import SmallLoader from '../../Spinner/SmallLoader.js'
import { filter } from 'lodash'
import { SmallCheck } from './SmallCheck'
import { IoPrint } from 'react-icons/io5'
function AllCheck({ product }) {
    const [loadContent, setLoadContent] = useState(false)
    const [selled, setSelled] = useState([])
    const [returned, setReturned] = useState([])
    const [selledDiscounts, setSelledDiscounts] = useState([])
    const [returnedDiscounts, setReturnedDiscounts] = useState([])
    const [selledPayments, setSelledPayments] = useState([])
    const [returnedPayments, setReturnedPayments] = useState([])
    const [userInfo, setUserInfo] = useState({})
    const saleCheckRef = useRef(null)
    const saleSmallCheckRef = useRef(null)
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

    const reactToPrintContent2 = React.useCallback(() => {
        return saleSmallCheckRef.current
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [saleSmallCheckRef.current])

    const print = useReactToPrint({
        content: reactToPrintContent,
        documentTitle: 'All Checks',
        onBeforeGetContent: handleOnBeforeGetContent,
        removeAfterPrint: true,
    })

    const print2 = useReactToPrint({
        content: reactToPrintContent2,
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
    useEffect(() => {
        setSelled(filter(product?.products, (item) => item.pieces > 0))
        setReturned(filter(product?.products, (item) => item.pieces < 0))
        setSelledDiscounts(
            filter(product?.discounts, (item) => item.discount > 0)
        )
        setReturnedDiscounts(
            filter(product?.discounts, (item) => item.discount < 0)
        )
        setSelledPayments(filter(product?.payments, (item) => item.payment > 0))
        setReturnedPayments(
            filter(product?.payments, (item) => item.payment < 0)
        )
        setUserInfo(product?.user)
    }, [product])

    return (
        <section className='w-[27cm] mt-4 mx-auto'>
            {loadContent && (
                <div className='fixed backdrop-blur-[2px] left-0 right-0 bg-white-700 flex flex-col items-center justify-center w-full h-full'>
                    <SmallLoader />
                </div>
            )}
            <SaleCheckAll
                ref={saleCheckRef}
                returned={returned}
                selled={selled}
                selledDiscounts={selledDiscounts}
                returnedDiscounts={returnedDiscounts}
                selledPayments={selledPayments}
                returnedPayments={returnedPayments}
                product={product}
                userInfo={userInfo}
            />
            <div className='hidden'>
                <SmallCheck
                    ref={saleSmallCheckRef}
                    returned={returned}
                    selled={selled}
                    selledDiscounts={selledDiscounts}
                    returnedDiscounts={returnedDiscounts}
                    selledPayments={selledPayments}
                    returnedPayments={returnedPayments}
                    product={product}
                    userInfo={userInfo}
                />
            </div>
            <div className='flex justify-between items-center mt-6'>
                <div>
                    <button

                        className={`group print-btn-style ml-auto min-w-max ${loadContent ? 'pointer-events-none' : 'pointer-events-auto'
                            }`}
                        onClick={print2}
                        disabled={loadContent}
                    >
                        <span className='print-text-style'>Xprinter</span>
                        <span className='print-icon-style'>
                            <IoPrint
                                size={'1.125rem'}
                                className='text-primary-800 text-lg transition-all ease-in-out duration-200 group-hover:text-primary-900'
                            />
                        </span>
                    </button>
                </div>
                <div>
                    <PrintBtn onClick={print} isDisabled={loadContent} />
                </div>
            </div>
        </section>
    )
}

export default AllCheck
