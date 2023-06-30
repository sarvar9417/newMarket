import React from 'react'
import TableBtn from '../../Buttons/TableBtn'
import {uniqueId, map} from 'lodash'
import {roundUsd, roundUzs} from '../../../App/globalFunctions'

export const SellerTableRow = ({
    data,
    currentPage,
    countPage,
    Edit,
    linkToSellerReports,
    currency,
}) => {
    return (
        <>
            {map(data, (seller, index) => (
                <tr className='tr' key={uniqueId('filial')}>
                    <td className='text-left td'>
                        {currentPage * countPage + index + 1}
                    </td>
                    <td className='text-right td'>{seller.firstname}</td>
                    <td className='text-left td'>{seller.lastname}</td>
                    <td className='text-right td'>{seller.phone}</td>
                    <td className='text-right td'>{seller?.sales || 0}</td>
                    <td className='text-right td'>
                        {currency === 'USD'
                            ? seller?.totalsales?.toLocaleString('ru-RU')
                            : seller?.totalsalesuzs?.toLocaleString(
                                  'ru-RU'
                              )}{' '}
                        {currency}
                    </td>
                    <td className='text-right td'>
                        {currency === 'USD'
                            ? roundUsd(seller?.profit).toLocaleString('ru-RU')
                            : roundUzs(seller?.profituzs).toLocaleString(
                                  'ru-RU'
                              )}{' '}
                        {currency}
                    </td>
                    <td className='border-r-0 td py-[0.375rem]'>
                        <div className='flex items-center justify-center gap-[0.625rem]'>
                            <TableBtn
                                type={'edit'}
                                bgcolor={'bg-warning-500'}
                                onClick={() => Edit(seller)}
                            />
                            <TableBtn
                                type={'info'}
                                bgcolor={'bg-primary-800'}
                                onClick={() => linkToSellerReports(seller._id)}
                            />
                        </div>
                    </td>
                </tr>
            ))}
        </>
    )
}
