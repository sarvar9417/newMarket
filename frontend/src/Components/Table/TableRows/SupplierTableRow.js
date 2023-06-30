import React from 'react'
import TableBtn from '../../Buttons/TableBtn'
import {map} from 'lodash'

export const SupplierTableRow = ({
    data,
    currentPage,
    countPage,
    Edit,
    Delete,
    linkToSupplierReport,
}) => {
    return (
        <>
            {map(data, (supplier, index) => (
                <tr key={supplier._id} className='tr'>
                    <td className='td'>
                        {currentPage * countPage + 1 + index}
                    </td>
                    <td className='td text-left'>{supplier.name}</td>
                    <td className='py-[0.375rem] td border-r-0 text-center'>
                        <div className='flex items-center justify-center gap-[0.625rem]'>
                            <TableBtn
                                type={'info'}
                                bgcolor={'bg-primary-800'}
                                onClick={() =>
                                    linkToSupplierReport(supplier._id)
                                }
                            />
                            <TableBtn
                                type={'edit'}
                                bgcolor='bg-warning-500'
                                onClick={() => Edit(supplier)}
                            />
                            <TableBtn
                                type={'delete'}
                                bgcolor='bg-error-500'
                                onClick={() => Delete(supplier)}
                            />
                        </div>
                    </td>
                </tr>
            ))}
        </>
    )
}
