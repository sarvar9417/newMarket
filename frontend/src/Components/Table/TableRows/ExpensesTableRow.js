import React from 'react'
import TableBtn from '../../Buttons/TableBtn'
import {map} from 'lodash'
export const ExpensesTableRow = ({
    data,
    currentPage,
    countPage,
    currency,
    reports,
    Delete,
}) => {
    const typeofexpense = (type) => {
        switch (type) {
            case 'cash':
                return 'Naqt'
            case 'card':
                return 'Plastik'
            case 'transfer':
                return "O'tkazma"
            default:
                return ''
        }
    }

    return (
        <>
            {map(data,(expense, index) => (
                <tr className='tr' key={expense._id}>
                    <td className='text-left td'>
                        {currentPage * countPage + 1 + index}
                    </td>
                    <td className='text-right td'>
                        {new Date(expense.createdAt).toLocaleDateString()}
                    </td>
                    <td className='text-right td font-medium'>
                        {currency === 'USD' ? expense.sum: expense.sumuzs.toLocaleString('ru-Ru')}{' '}
                        <span>{currency}</span>
                    </td>
                    <td className='text-left td'>{expense.comment}</td>
                    <td className='text-left py-[0.625rem] td'>
                        {typeofexpense(expense.type)}
                    </td>
                    {!reports && (
                        <td className='border-r-0 py-[0.625rem] td'>
                            <div className='flex items-center justify-center'>
                                <TableBtn
                                    type={'delete'}
                                    bgcolor={'bg-error-500'}
                                    onClick={() => Delete(expense)}
                                />
                            </div>
                        </td>
                    )}
                </tr>
            ))}
        </>
    )
}
