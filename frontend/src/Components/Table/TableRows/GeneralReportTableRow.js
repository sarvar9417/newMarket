import React from 'react'
import {uniqueId} from 'lodash'

export const GeneralReportTableRow = ({data, currency}) => {
    return (
        <>
            <tr className='tr' key={uniqueId('sales')}>
                <td className='text-center td py-2'>
                    {data?.salesCount?.toLocaleString()}
                </td>
                <td className='td text-center'>
                    {data?.saleProducts?.toLocaleString()}
                </td>
                <td className='td text-right font-bold'>
                    {currency === 'UZS'
                        ? data?.totalpriceuzs?.toLocaleString()
                        : data?.totalprice?.toLocaleString()}{' '}
                    {currency}
                </td>
            </tr>
        </>
    )
}
