import React, { forwardRef } from 'react'
import { uniqueId, map } from 'lodash'
import { useSelector } from 'react-redux'

export const SaleCheckAll = forwardRef((props, ref) => {
    const {
        selled,
        returned,
        selledDiscounts,
        returnedDiscounts,
        selledPayments,
        returnedPayments,
        product,
        userInfo,
    } = props

    const { market } = useSelector((state) => state.login)
    const { currencyType } = useSelector((state) => state.currency)
    const calculateAllSum = (data) => {
        return data
            ? data.reduce((acc, pr) => {
                return (
                    acc +
                    pr[
                    currencyType === 'USD'
                        ? 'totalprice'
                        : 'totalpriceuzs'
                    ]
                )
            }, 0)
            : 0
    }
    const calculateAllFilialSum = (data) => {
        if (currencyType === 'USD') {
            return data.reduce((prev, el) => prev + ((el.fromFilial || 0) * el.unitprice), 0)
        } else {
            return data.reduce((prev, el) => prev + ((el.fromFilial || 0) * el.unitpriceuzs), 0)
        }
    }
    const calculateAllDiscounts = (data) => {
        return data
            ? data.reduce((acc, pr) => {
                return (
                    acc +
                    pr[currencyType === 'USD' ? 'discount' : 'discountuzs']
                )
            }, 0)
            : 0
    }
    const calculateAllPayments = (data) => {
        return data
            ? data.reduce((acc, pr) => {
                return (
                    acc +
                    pr[currencyType === 'USD' ? 'payment' : 'paymentuzs']
                )
            }, 0)
            : 0
    }

    return (
        <div ref={ref} className={'bg-white-900 p-4 rounded-md'}>
            <div className='flex pb-2 justify-between border-b-[0.8px] border-black-700'>
                <ul className='w-[35%]'>
                    <li className='check-ul-li'>
                        Do'kon:
                        <span className='check-ul-li-span font-bold'>{market.name}</span>
                    </li>
                    <li className='check-ul-li'>
                        Telefon:
                        <span className='check-ul-li-span font-bold'>
                            {market.phone1}
                        </span>
                    </li>
                    <li className='check-ul-li'>
                        Manzil:
                        <span className='check-ul-li-span font-bold' >
                            {market?.address}
                        </span>
                    </li>
                    <li className='check-ul-li'>
                        Sana:
                        <span className='check-ul-li-span'>
                            {new Date(product?.createdAt).toLocaleDateString()}{' '}
                            <span className='ml-3 font-bold'>
                                {new Date(
                                    product?.createdAt
                                ).toLocaleTimeString()}
                            </span>
                        </span>
                    </li>
                    <li className='check-ul-li font-bold'>
                        Mijoz:{' '}
                        <span className='check-ul-li-span font-bold'>
                            {product?.client?.name ||
                                product?.packman?.name ||
                                ''}
                        </span>
                    </li>
                </ul>
                <div className='check-ul-li flex-col'>
                    <div className={'grow text-center'}>
                        <h2 className='check-text-style mb-5'>
                            Sotuv: <span className={'ml-2 font-bold'}>{product?.id}</span>
                        </h2>
                    </div>
                    <div className='check-ul-li justify-end'>
                        <p>
                            Sotuvchi:{' '}
                            <span className='check-ul-li-span font-bold'>
                                {userInfo?.firstname} {userInfo?.lastname}
                            </span>
                        </p>
                    </div>
                </div>
            </div>
            {selled?.length > 0 && (
                <div className='mt-5'>
                    <h3 className='text-[1.3rem] text-black-900 mb-5 font-bold'>
                        Sotilganlar :
                    </h3>
                    <table className='border-collapse border border-slate-400 w-full'>
                        <thead>
                            <tr>
                                <td className='check-table-rtr'>№</td>
                                <td className='check-table-rtr'>Sana</td>
                                <td className='check-table-rtr'>Kodi</td>
                                <td className='check-table-rtr'>Maxsulot</td>
                                <td className='check-table-rtr'>Soni</td>
                                {selled.some(el => el.fromFilial > 0) && <td style={{ backgroundColor: "grey" }} className='check-table-rtr'>Ombordan</td>}
                                <td className='check-table-rtr'>Narxi(dona)</td>
                                <td className='check-table-rtr'>Jami</td>
                                <td className='check-table-rtr'>Sotuvchi</td>
                            </tr>
                        </thead>
                        <tbody>
                            {map(selled, (item, index) => {
                                return (
                                    <tr key={uniqueId('selled-row')}>
                                        <td className='p-1 border text-center text-[0.875rem] font-bold'>
                                            {index + 1}
                                        </td>
                                        <td className='check-table-body'>
                                            {new Date(
                                                item?.createdAt
                                            ).toLocaleDateString()}
                                        </td>
                                        <td className='check-table-body text-center'>
                                            {item?.product?.productdata?.code}
                                        </td>
                                        <td className='check-table-body text-start'>
                                            {item?.product?.productdata?.name}
                                        </td>
                                        <td className='check-table-body'>
                                            {item?.pieces}
                                        </td>
                                        {selled.some(el => el.fromFilial > 0) && <td style={{ backgroundColor: item?.fromFilial ? "grey" : 'white' }} className='check-table-body'>
                                            {item?.fromFilial}
                                        </td>}
                                        <td className='check-table-body'>
                                            {currencyType === 'USD'
                                                ? item?.unitprice.toLocaleString(
                                                    'ru-Ru'
                                                )
                                                : item?.unitpriceuzs.toLocaleString(
                                                    'ru-Ru'
                                                )}{' '}
                                            {currencyType}
                                        </td>
                                        <td className='check-table-body'>
                                            {currencyType === 'USD'
                                                ? item?.totalprice.toLocaleString(
                                                    'ru-Ru'
                                                )
                                                : item?.totalpriceuzs.toLocaleString(
                                                    'ru-Ru'
                                                )}{' '}
                                            {currencyType}
                                        </td>
                                        <td className='check-table-body'>
                                            {item?.user
                                                ? item.user.firstname +
                                                ' ' +
                                                item.user.lastname[0]
                                                : ''}
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            )}
            <div className='border-t-[0.8px] border-black-700 w-full mt-4 mb-4 text-end'>
                <h3 className='text-black-900 text-[1.1rem] text-black-700 font-bold pt-4'>
                    Sotilganlar jami :{' '}
                    <span className='text-black-900 font-bold'>
                        {calculateAllSum(selled).toLocaleString('ru-Ru')}{' '}
                        {currencyType}
                    </span>
                </h3>
                {selled.some(el => el.fromFilial > 0) && <h3 className='text-black-900 text-[14px] text-black-700 font-bold pt-4'>
                    Ombordagi jami :{' '}
                    <span className=' text-black-900 font-bold'>
                        {calculateAllFilialSum(selled).toLocaleString('ru-Ru')}{' '}
                        {currencyType}
                    </span>
                </h3>}
            </div>
            {returned?.length > 0 && (
                <>
                    <div className='mt-5'>
                        <h3 className='text-[1.3rem] text-black-700 mb-5 font-bold'>
                            Qaytarilganlar :
                        </h3>
                        <table className='border-collapse border border-slate-400 w-full'>
                            <thead>
                                <tr>
                                    <td className='check-table-rtr'>№</td>
                                    <td className='check-table-rtr'>Sana</td>
                                    <td className='check-table-rtr'>Kodi</td>
                                    <td className='check-table-rtr'>
                                        Maxsulot
                                    </td>
                                    <td className='check-table-rtr'>Soni</td>
                                    <td className='check-table-rtr'>
                                        Narxi(dona)
                                    </td>
                                    <td className='check-table-rtr'>Jami</td>
                                </tr>
                            </thead>
                            <tbody>
                                {map(returned, (item, index) => {
                                    return (
                                        <tr key={uniqueId('selled-row')}>
                                            <td className='p-1 border text-center text-[0.875rem] font-bold'>
                                                {index + 1}
                                            </td>
                                            <td className='check-table-body'>
                                                {new Date(
                                                    item?.createdAt
                                                ).toLocaleDateString()}
                                            </td>
                                            <td className='check-table-body'>
                                                {
                                                    item?.product?.productdata
                                                        ?.code
                                                }
                                            </td>
                                            <td className='check-table-body'>
                                                {
                                                    item?.product?.productdata
                                                        ?.name
                                                }
                                            </td>
                                            <td className='check-table-body'>
                                                {item?.pieces}
                                            </td>
                                            <td className='check-table-body'>
                                                {currencyType === 'USD'
                                                    ? item?.unitprice.toLocaleString(
                                                        'ru-Ru'
                                                    )
                                                    : item?.unitpriceuzs.toLocaleString(
                                                        'ru-Ru'
                                                    )}{' '}
                                                {currencyType}
                                            </td>
                                            <td className='check-table-body'>
                                                {currencyType === 'USD'
                                                    ? item?.totalprice.toLocaleString(
                                                        'ru-Ru'
                                                    )
                                                    : item?.totalpriceuzs.toLocaleString(
                                                        'ru-Ru'
                                                    )}{' '}
                                                {currencyType}
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                    <div className='border-t-[0.8px] border-black-700 w-full mt-4 mb-4 text-end'>
                        <h3 className='text-black-900 text-[1.1rem] text-black-700 font-bold pt-4'>
                            Qaytarilganlar jami :{' '}
                            <span className='text-black-900 font-bold'>
                                {calculateAllSum(returned).toLocaleString(
                                    'ru-Ru'
                                )}{' '}
                                {currencyType}
                            </span>
                        </h3>
                    </div>
                </>
            )}
            <div className='border-t-[0.8px] border-black-700 w-full my-[1.5rem]'></div>
            <ul>
                <li className='text-black-900 check-ul-li-foot border-t-0'>
                    {' '}
                    Jami:{' '}
                    <span className='text-black-900 font-bold'>
                        {(
                            calculateAllSum(selled) + calculateAllSum(returned)
                        ).toLocaleString('ru-Ru')}{' '}
                        {currencyType}
                    </span>
                </li>
                <li className='text-black-900 check-ul-li-foot'>
                    {' '}
                    Chegirma:{' '}
                    <span className='text-black-900 font-bold'>
                        {(
                            calculateAllDiscounts(selledDiscounts) +
                            calculateAllDiscounts(returnedDiscounts)
                        ).toLocaleString('ru-Ru')}{' '}
                        {currencyType}
                    </span>
                </li>
                <li className='text-black-900 check-ul-li-foot'>
                    {' '}
                    To'langan:{' '}
                    <span className='text-black-900 font-bold'>
                        {(
                            calculateAllPayments(selledPayments) +
                            calculateAllPayments(returnedPayments)
                        ).toLocaleString('ru-Ru')}{' '}
                        {currencyType}
                    </span>
                </li>
                <li className='text-black-900 check-ul-li-foot'>
                    {' '}
                    Qarz:{' '}
                    <span className=' text-black-900 font-bold'>
                        {(
                            calculateAllSum(selled) +
                            calculateAllSum(returned) -
                            (calculateAllPayments(selledPayments) +
                                calculateAllPayments(returnedPayments)) -
                            (calculateAllDiscounts(selledDiscounts) +
                                calculateAllDiscounts(returnedDiscounts))
                        ).toLocaleString('ru-Ru')}{' '}
                        {currencyType}
                    </span>
                </li>
            </ul>
        </div>
    )
})
