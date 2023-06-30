import { uniqueId, map } from 'lodash'
import React from 'react'
import TableBtn from '../../Buttons/TableBtn'

export const IncomeTableRow = ({ data, currentPage, countPage, currency, Print }) => {
    return (
        <>
            {map(data, (income, index) => (
                <tr className='tr' key={uniqueId('income')}>
                    <td className='text-left td'>
                        {currentPage * countPage + 1 + index}
                    </td>
                    <td className='text-right td'>
                        {new Date(income.createdAt).toLocaleDateString()}
                    </td>
                    <td className='text-left td'>{income.saleconnector.id}</td>
                    <td className='text-right td font-bold text-error-500'>
                        {(currency === 'USD'
                            ? income.totalincomingprice
                            : income.totalincomingpriceuzs
                        ).toLocaleString('ru-RU')}{' '}
                        <span>{currency}</span>
                    </td>
                    <td className='text-right td font-bold text-primary-800'>
                        {(currency === 'USD'
                            ? income.totalprice
                            : income.totalpriceuzs
                        ).toLocaleString('ru-RU')}{' '}
                        <span>{currency}</span>
                    </td>
                    <td className='text-right td py-[0.625rem] font-bold text-warning-500'>
                        {(currency === 'USD'
                            ? income.discount
                            : income.discountuzs
                        ).toLocaleString('ru-RU')}{' '}
                        <span>{currency}</span>
                    </td>
                    <td className='text-right td font-bold text-success-500'>
                        {(currency === 'USD'
                            ? income.profit
                            : income.profituzs
                        ).toLocaleString('ru-RU')}{' '}
                        <span>{currency}</span>
                    </td>
                    <td className='text-right border-r-0 td font-bold text-success-500'>
                        <div className='flex items-center justify-center gap-[0.625rem]'>
                            <TableBtn
                                type={'print'}
                                bgcolor={'bg-primary-800'}
                                onClick={() => Print(income.dailyconnector)}
                            />
                        </div>
                    </td>
                </tr>
            ))}
        </>
    )
}
