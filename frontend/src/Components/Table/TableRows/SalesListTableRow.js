import React from 'react'
import TableBtn from '../../Buttons/TableBtn'
import { uniqueId, map } from 'lodash'
import { useLocation, useNavigate } from 'react-router-dom'

export const SalesListTableRow = ({
    data,
    currentPage,
    countPage,
    currency,
    Print,
    sellers,
    addPlus,
    editComment
}) => {

    const location = useLocation()

    const result = (prev, usd, uzs) => {
        return currency === 'USD' ? prev + usd : prev + uzs
    }
    const reduceEl = (arr, usd, uzs) => {
        return arr.reduce((prev, item) => {
            return result(prev, item[usd], item[uzs])
        }, 0)
    }

    const navigate = useNavigate()
    const linkToSale = (saleconnector, returnProducts) => {
        navigate(`${sellers ? '/' : '/sotuv/sotish'}`, {
            replace: true,
            state: { saleconnector, returnProducts },
        })
    }

    if (location.pathname.includes('/kassa/sale')) {
        return (
            <>
                {map(data, (saleconnector, index) => (
                    <tr className='tr' key={uniqueId('sales')}>
                        <td className='text-left td'>
                            {currentPage * countPage + 1 + index}
                        </td>
                        <td className='td '>
                            <div className='flex justify-between'>
                                <span>
                                    {new Date(
                                        saleconnector.updatedAt
                                    ).toLocaleDateString()}
                                </span>
                                <span>
                                    {new Date(
                                        saleconnector.updatedAt
                                    ).toLocaleTimeString()}{' '}
                                </span>
                            </div>
                        </td>
                        <td className='text-left td'>{saleconnector.id}</td>
                        <td className='text-left td'>
                            {saleconnector?.client?.name ? (
                                <div className='flex justify-between items-center'>
                                    <span> {saleconnector?.client?.name}</span>
                                    <TableBtn
                                        type={'edit'}
                                        bgcolor={'bg-success-500'}
                                        onClick={() => addPlus(saleconnector._id)}
                                    />
                                </div>
                            ) : (
                                <div className='flex justify-center items-center'>
                                    <TableBtn
                                        type={'add'}
                                        bgcolor={'bg-success-500'}
                                        onClick={() => addPlus(saleconnector._id)}
                                    />
                                </div>
                            )}
                        </td>
                        <td className='text-success-500 text-right td'>
                            {reduceEl(
                                saleconnector.products,
                                'totalprice',
                                'totalpriceuzs'
                            ).toLocaleString('ru-Ru')}{' '}
                            {currency}
                        </td>
                        <td className='text-warning-500 text-right td'>
                            {(
                                reduceEl(
                                    saleconnector.payments,
                                    'cash',
                                    'cashuzs'
                                ) +
                                reduceEl(
                                    saleconnector.payments,
                                    'card',
                                    'carduzs'
                                ) +
                                reduceEl(
                                    saleconnector.payments,
                                    'transfer',
                                    'transferuzs'
                                )
                            ).toLocaleString('ru-Ru')}{' '}
                            {currency}
                        </td>
                        <td className='text-error-500 text-right td'>
                            {(
                                reduceEl(
                                    saleconnector.products,
                                    'totalprice',
                                    'totalpriceuzs'
                                ) -
                                reduceEl(
                                    saleconnector.payments,
                                    'payment',
                                    'paymentuzs'
                                ) -
                                reduceEl(
                                    saleconnector.discounts,
                                    'discount',
                                    'discountuzs'
                                )
                            ).toLocaleString('ru-Ru')}{' '}
                            {currency}
                        </td>
                        <td className='text-left td  '>
                            {saleconnector.dailyconnectors[saleconnector.dailyconnectors.length - 1].comment ? (
                                <div className='flex justify-between items-center'>
                                    <span>{saleconnector.dailyconnectors[saleconnector.dailyconnectors.length - 1].comment}</span>
                                    <TableBtn
                                        type={'edit'}
                                        bgcolor={'bg-success-500'}
                                        onClick={() => editComment(saleconnector.dailyconnectors[saleconnector.dailyconnectors.length - 1], saleconnector.dailyconnectors[saleconnector.dailyconnectors.length - 1].comment)}
                                    />
                                </div>
                            ) : (
                                <div className='flex justify-center items-center'>
                                    <TableBtn
                                        type={'add'}
                                        bgcolor={'bg-success-500'}
                                        onClick={() => editComment(saleconnector.dailyconnectors[saleconnector.dailyconnectors.length - 1], saleconnector.dailyconnectors[saleconnector.dailyconnectors.length - 1].comment)}
                                    />
                                </div>
                            )}

                        </td>

                        <td className='py-[0.375rem] td border-r-0'>
                            <div className='flex items-center justify-center gap-[0.625rem]'>
                                <TableBtn
                                    type={'print'}
                                    bgcolor={'bg-primary-800'}
                                    onClick={() => Print(saleconnector)}
                                />
                                {!location.pathname.includes('/kassa/sale') && <>
                                    <TableBtn
                                        type={'add'}
                                        bgcolor={'bg-success-500'}
                                        onClick={() => linkToSale(saleconnector)}
                                    />
                                    <TableBtn
                                        type={'return'}
                                        bgcolor={'bg-error-500'}
                                        onClick={() =>
                                            linkToSale(
                                                saleconnector.saleconnector,
                                                true
                                            )
                                        }
                                    />
                                </>}
                            </div>
                        </td>
                    </tr>
                ))}
            </>
        )
    }
    return (
        <>
            {map(data, (saleconnector, index) => (
                <tr className='tr' key={uniqueId('sales')}>
                    <td className='text-left td'>
                        {currentPage * countPage + 1 + index}
                    </td>
                    <td className='td '>
                        <div className='flex justify-between'>
                            <span>
                                {new Date(
                                    saleconnector.updatedAt
                                ).toLocaleDateString()}
                            </span>
                            <span>
                                {new Date(
                                    saleconnector.updatedAt
                                ).toLocaleTimeString()}{' '}
                            </span>
                        </div>
                    </td>
                    <td className='text-left td'>{saleconnector.id}</td>
                    <td className='text-left td'>
                        {saleconnector?.client?.name ? (
                            <div className='flex justify-between items-center'>
                                <span> {saleconnector?.client?.name}</span>
                                <TableBtn
                                    type={'edit'}
                                    bgcolor={'bg-success-500'}
                                    onClick={() => addPlus(saleconnector._id)}
                                />
                            </div>
                        ) : (
                            <div className='flex justify-center items-center'>
                                <TableBtn
                                    type={'add'}
                                    bgcolor={'bg-success-500'}
                                    onClick={() => addPlus(saleconnector._id)}
                                />
                            </div>
                        )}
                    </td>
                    <td className='text-success-500 text-right td'>
                        {reduceEl(
                            saleconnector.products,
                            'totalprice',
                            'totalpriceuzs'
                        ).toLocaleString('ru-Ru')}{' '}
                        {currency}
                    </td>
                    <td className='text-warning-500 text-right td'>
                        {reduceEl(
                            saleconnector.discounts,
                            'discount',
                            'discountuzs'
                        ).toLocaleString('ru-Ru')}{' '}
                        {currency}
                    </td>
                    <td className='text-error-500 text-right td'>
                        {(
                            reduceEl(
                                saleconnector.products,
                                'totalprice',
                                'totalpriceuzs'
                            ) -
                            reduceEl(
                                saleconnector.payments,
                                'payment',
                                'paymentuzs'
                            ) -
                            reduceEl(
                                saleconnector.discounts,
                                'discount',
                                'discountuzs'
                            )
                        ).toLocaleString('ru-Ru')}{' '}
                        {currency}
                    </td>
                    <td className='text-left td  '>
                        {saleconnector.dailyconnectors[saleconnector.dailyconnectors.length - 1].comment ? (
                            <div className='flex justify-between items-center'>
                                <span>{saleconnector.dailyconnectors[saleconnector.dailyconnectors.length - 1].comment}</span>
                                <TableBtn
                                    type={'edit'}
                                    bgcolor={'bg-success-500'}
                                    onClick={() => editComment(saleconnector.dailyconnectors[saleconnector.dailyconnectors.length - 1], saleconnector.dailyconnectors[saleconnector.dailyconnectors.length - 1].comment)}
                                />
                            </div>
                        ) : (
                            <div className='flex justify-center items-center'>
                                <TableBtn
                                    type={'add'}
                                    bgcolor={'bg-success-500'}
                                    onClick={() => editComment(saleconnector.dailyconnectors[saleconnector.dailyconnectors.length - 1], saleconnector.dailyconnectors[saleconnector.dailyconnectors.length - 1].comment)}
                                />
                            </div>
                        )}

                    </td>

                    <td className='py-[0.375rem] td border-r-0'>
                        <div className='flex items-center justify-center gap-[0.625rem]'>
                            <TableBtn
                                type={'print'}
                                bgcolor={'bg-primary-800'}
                                onClick={() => Print(saleconnector)}
                            />
                            {!location.pathname.includes('/kassa/sale') && <>
                                <TableBtn
                                    type={'add'}
                                    bgcolor={'bg-success-500'}
                                    onClick={() => linkToSale(saleconnector)}
                                />
                                <TableBtn
                                    type={'return'}
                                    bgcolor={'bg-error-500'}
                                    onClick={() =>
                                        linkToSale(
                                            saleconnector.saleconnector,
                                            true
                                        )
                                    }
                                />
                            </>}
                        </div>
                    </td>
                </tr>
            ))}
        </>
    )
}
