import React from 'react'
import TableBtn from '../../Buttons/TableBtn'
import {uniqueId,map} from 'lodash'

export const PackmanTableRow = ({
                                    data,
                                    currentPage,
                                    countPage,
                                    Edit,
                                    Delete
                                }) => {
    return (
        <>
            {map(data,(packman, index) => (
                <tr className='tr' key={uniqueId('card')}>
                    <td className='text-left td'>
                        {currentPage * countPage + 1 + index}
                    </td>
                    <td className='text-left td'>{packman.name}</td>
                    <td className='py-[0.375rem] td border-r-0'>
                        <div className='flex items-center justify-center gap-[0.625rem]'>
                            <TableBtn
                                type={'edit'}
                                bgcolor={'bg-warning-500'}
                                onClick={() => Edit(packman)}
                            />
                            <TableBtn
                                type={'delete'}
                                bgcolor={'bg-error-500'}
                                onClick={() => Delete(packman)}
                            />
                        </div>
                    </td>
                </tr>
            ))}
        </>
    )
}
