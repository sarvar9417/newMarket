import React from 'react'
import TableBtn from '../../Buttons/TableBtn'
import TableInput from '../../Inputs/TableInput'
import {map} from 'lodash'

export const IncomingsTableRow = ({
    editedIncoming,
    currency,
    saveEditIncoming,
    changeHandler,
    Delete,
    Edit,
    currentPage,
    countPage,
    data,
    onKeyUp,
}) => {
    const current = (usd, uzs) => (currency === 'USD' ? usd : uzs || 0)

    return (
        <>
            {map(data, (incoming, index) => (
                <tr className='tr' key={incoming._id}>
                    <td className='text-left td'>
                        {currentPage * countPage + 1 + index}
                    </td>
                    <td className='td text-left'>{incoming.supplier.name}</td>
                    <td className='td text-right'>
                        {incoming.product.productdata.code}
                    </td>
                    <td className='td text-left'>
                        {incoming.product.productdata.name}
                    </td>
                    <td className='td text-right font-bold'>
                        {(editedIncoming._id === incoming._id && (
                            <TableInput
                                value={editedIncoming.pieces}
                                onChange={(e) => changeHandler(e, 'pieces')}
                                onKeyUp={onKeyUp}
                            />
                        )) || (
                            <span>
                                {incoming?.pieces?.toLocaleString('ru-RU')}{' '}
                                <span className='text-warning-500 font-medium'>
                                    {incoming?.unit?.name}
                                </span>
                            </span>
                        )}
                    </td>
                    <td className='td text-right font-bold'>
                        {(editedIncoming._id === incoming._id && (
                            <TableInput
                                value={current(
                                    editedIncoming.unitprice,
                                    editedIncoming.unitpriceuzs
                                )}
                                onChange={(e) => changeHandler(e, 'unitprice')}
                                type={'number'}
                                onKeyUp={onKeyUp}
                            />
                        )) || (
                            <span>
                                {current(
                                    incoming.unitprice,
                                    incoming.unitpriceuzs
                                ).toLocaleString('ru-RU')}{' '}
                                <span className='text-primary-800 font-medium'>
                                    {currency}
                                </span>
                            </span>
                        )}
                    </td>
                    <td className='td text-right font-bold'>
                        {editedIncoming._id === incoming._id
                            ? current(
                                  editedIncoming.totalprice,
                                  editedIncoming.totalpriceuzs
                              ).toLocaleString('ru-RU')
                            : current(
                                  incoming.totalprice,
                                  incoming.totalpriceuzs
                              ).toLocaleString('ru-RU')}{' '}
                        <span className='text-success-500 font-medium'>
                            {currency}
                        </span>
                    </td>
                    <td className='td text-right font-bold'>
                        {(editedIncoming._id === incoming._id && (
                            <TableInput
                                value={current(
                                    editedIncoming.sellingprice,
                                    editedIncoming.sellingpriceuzs
                                )}
                                onChange={(e) =>
                                    changeHandler(e, 'sellingprice')
                                }
                                type={'number'}
                                onKeyUp={onKeyUp}
                            />
                        )) || (
                            <span>
                                {current(
                                    incoming.sellingprice,
                                    incoming.sellingpriceuzs
                                ).toLocaleString('ru-RU')}{' '}
                                <span className='text-primary-800 font-medium'>
                                    {currency}
                                </span>
                            </span>
                        )}
                    </td>
                    <td className='td border-r-0 py-[6px]'>
                        <div className='flex justify-center items-center gap-[0.625rem]'>
                            {editedIncoming._id === incoming._id ? (
                                <>
                                    <TableBtn
                                        type={'save'}
                                        bgcolor={'bg-success-500'}
                                        onClick={() =>
                                            saveEditIncoming(incoming)
                                        }
                                    />
                                </>
                            ) : (
                                <>
                                    <TableBtn
                                        type={'edit'}
                                        bgcolor={'bg-warning-500'}
                                        onClick={() => Edit(incoming)}
                                    />
                                </>
                            )}
                            <TableBtn
                                type={'delete'}
                                bgcolor={'bg-error-500'}
                                onClick={() => Delete(incoming)}
                            />
                        </div>
                    </td>
                </tr>
            ))}
        </>
    )
}
