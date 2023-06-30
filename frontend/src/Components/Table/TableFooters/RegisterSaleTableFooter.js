import React from 'react'
import { reduce } from 'lodash'

export const RegisterSaleTableFooter = ({ saleproducts, currency }) => {

    const totalprice = reduce(
        saleproducts,
        (summ, product) => summ + product.totalprice,
        0
    )

    const totalpriceuzs = reduce(
        saleproducts,
        (summ, product) => summ + product.totalpriceuzs,
        0
    )
    return (
        <tr>
            <th colSpan={5} className='text-right py-2'>
                Jami:
            </th>
            <th colSpan={2}>
                {currency === 'UZS'
                    ? totalpriceuzs.toLocaleString('ru-RU')
                    : totalprice.toLocaleString('ru-RU')}{' '}
                {currency}
            </th>
        </tr>
    )
}
