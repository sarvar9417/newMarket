import {uniqueId,map} from 'lodash'
import React from 'react'

export const DiscountTableRow = ({data, currentPage, countPage, currency}) => {
    return (
        <>
            {map(data,(discount, index) => (
                <tr className='tr' key={uniqueId('discount')}>
                    <td className='text-left td'>
                        {currentPage * countPage + 1 + index}
                    </td>
                    <td className='text-right td'>
                        {new Date(discount.createdAt).toLocaleDateString()}
                    </td>
                    <td className='text-left td'>
                        {discount.saleconnector.id}
                    </td>
                    <td className='text-left td'>
                        {discount.client && discount.client.name}
                    </td>
                    <td className='text-right td font-medium'>
                        {currency === 'UZS'
                            ? (
                                Math.round(discount.totalpriceuzs * 1) / 1
                            ).toLocaleString('ru-RU')
                            : (
                                Math.round(discount.totalprice * 1000) / 1000
                            ).toLocaleString('ru-RU')}{' '}
                        <span className='text-warning-500'>{currency}</span>
                    </td>
                    <td className='text-right td py-[0.625rem] font-medium'>
                        {currency === 'UZS'
                            ? (
                                Math.round(discount.discountuzs * 1) / 1
                            ).toLocaleString('ru-RU')
                            : (
                                Math.round(discount.discount * 1000) / 1000
                            ).toLocaleString('ru-RU')}{' '}
                        <span className='text-success-500'>{currency}</span>
                    </td>
                    <td className='text-right td border-r-0 py-[0.625rem] font-medium'>
                        {discount?.procient?.toLocaleString()}{' '}
                        <span className='text-primary-500'>%</span>
                    </td>
                </tr>
            ))}
        </>
    )
}
