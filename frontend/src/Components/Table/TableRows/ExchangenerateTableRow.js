import React from 'react'
import TableBtn from '../../Buttons/TableBtn'
import {map} from 'lodash'

export const ExchangenerateTableRow = ({
                                           data,
                                           currentPage,
                                           countPage,
                                           Edit,
                                           Delete
                                       }) => {
    return (
        <>
            {map(data,(exchange, index) => (
                <tr className='tr' key={exchange._id}>
                    <td className='text-left td'>
                        {currentPage * countPage + 1 + index}
                    </td>
                    <td className='text-left td'>
                        {new Date(exchange.createdAt).toLocaleDateString()}
                    </td>
                    <td className='text-left td'>
                        1 USD - {exchange.exchangerate.toLocaleString('ru-Ru')} UZS
                    </td>
                    <td className='border-r-0 td py-[0.375rem]'>
                        <div className='flex items-center justify-center gap-[0.625rem]'>
                            <TableBtn
                                type={'edit'}
                                bgcolor={'bg-warning-500'}
                                onClick={() => Edit(exchange)}
                            />
                            <TableBtn
                                type={'delete'}
                                bgcolor={'bg-error-500'}
                                onClick={() => Delete(exchange)}
                            />
                        </div>
                    </td>
                </tr>
            ))}
        </>
    )
}
