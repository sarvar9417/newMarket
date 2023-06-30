import React, { forwardRef } from 'react'
import { uniqueId, map } from 'lodash'
import { useSelector } from 'react-redux'

export const SmallCheck2 = forwardRef((props, ref) => {
    const {
        product
    } = props

    const { market } = useSelector((state) => state.login)
    const { currencyType } = useSelector((state) => state.currency)
    const calculateDebt = (total, payment, discount = 0) => {
        return (total - payment - discount).toLocaleString('ru-Ru')
    }

    return (
        <div ref={ref} className={'bg-white-900 p-4 rounded-md w-[7.5cm]'}>
            <div className='flex pb-2 flex-col text-center justify-center border-b-[0.8px] border-black-700'>
                <h2 className='text-[16px] mb-4 font-bold'>{market.name}</h2>
                <div className='flex justify-between items-center py-1 text-[12px] font-bold'>
                    Telefon:
                    <span className='text-[12px] text-black-900 font-bold'>
                        {market.phone1}
                    </span>
                </div>
                <div className='flex justify-between items-center py-1 text-[12px] font-bold'>
                    Manzil:
                    <span className='text-[12px] text-black-900 font-bold' >
                        {market?.address}
                    </span>
                </div>
                <div className='flex justify-between items-center py-1 text-[12px] font-bold'>
                    Sana:
                    <span className='text-[12px] text-black-900 font-bold'>
                        {new Date(product?.createdAt).toLocaleDateString()}
                        {/* <span className='ml-3 font-bold'>
                                {new Date(
                                    product?.createdAt
                                ).toLocaleTimeString()}
                            </span> */}
                    </span>
                </div>
                <div className='flex justify-between items-center py-1 text-[12px] font-bold'>
                    Mijoz:{' '}
                    <span className='text-[12px] text-black-900 font-bold'>
                        {product?.client?.name ||
                            product?.packman?.name ||
                            ''}
                    </span>
                </div>
                <div className={'flex justify-between items-center py-1 text-[12px] font-bold'}>
                    Sotuv{' '}
                    <span className='text-[12px] text-black-900 font-bold'>
                        {product?.id}
                    </span>
                </div>
                <div className={'flex justify-between items-center py-1 text-[12px] font-bold'}>
                    Sotuvchi:{' '}
                    <span className='text-[12px] text-black-900 font-bold'>
                        {product?.saleconnector?.id}
                    </span>
                </div>
            </div>
            {product?.products.length > 0 && (
                <div className='mt-5'>
                    <h3 className='text-[14px] text-black-900 mb-5 font-bold'>
                        Sotilganlar :
                    </h3>
                    <div>
                        {map(product?.products, (item, index) => (
                            <div className=''>
                                <div className='text-left text-[12px] text-black-900 font-bold'>
                                    {index + 1}. {item?.product?.productdata?.name}
                                </div>
                                <div className='text-right text-[12px] text-black-900 font-bold'>
                                    {item?.pieces} * {currencyType === 'USD' ? item?.unitprice.toLocaleString('ru-Ru') : item?.unitpriceuzs.toLocaleString('ru-Ru')} = {currencyType === 'USD' ? item?.totalprice.toLocaleString('ru-Ru') : item?.totalpriceuzs.toLocaleString('ru-Ru')}{' '}{currencyType}
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            )}
            <div className='border-t-[0.8px] border-black-700 w-full mt-4 mb-4 text-left'>
                <h3 style={{ fontWeight: "bolder" }} className='text-black-900 text-[12px] font-bold pt-4'>
                    Jami :{' '}
                    <span style={{ fontWeight: "bolder" }} className='text-black-900 text-[12px] font-bold'>
                        {currencyType === 'USD'
                            ? product?.payment?.totalprice
                            : product?.payment?.totalpriceuzs}{' '}
                        {currencyType}
                    </span>
                </h3>
                <h3 style={{ fontWeight: "bolder" }} className='text-black-900 text-[12px] font-bold pt-4'>
                    {' '}
                    Chegirma:{' '}
                    <span style={{ fontWeight: "bolder" }} className='text-black-900 text-[12px] font-bold'>
                        {product?.hasOwnProperty('discount')
                            ? currencyType === 'USD'
                                ? product?.discount.discount
                                : product?.discount.discountuzs
                            : 0}{' '}
                        {currencyType}
                    </span>
                </h3>
                <h3 style={{ fontWeight: "bolder" }} className='text-black-900 text-[12px] font-bold pt-4'>
                    {' '}
                    To'langan:{' '}
                    <span style={{ fontWeight: "bolder" }} className='text-black-900 text-[12px] font-bold'>
                        {currencyType === 'USD'
                            ? product?.payment?.payment
                            : product?.payment?.paymentuzs}{' '}
                        {currencyType}
                    </span>
                </h3>
                <h3 style={{ fontWeight: "bolder" }} className='text-black-900 text-[12px] font-bold pt-4'>
                    {' '}
                    Qarz:{' '}
                    <span style={{ fontWeight: "bolder" }} className='text-black-900 text-[12px] font-bold'>
                        {currencyType === 'USD'
                            ? calculateDebt(
                                product?.payment?.totalprice,
                                product?.payment?.payment,
                                product?.discount?.discount
                            )
                            : calculateDebt(
                                product?.payment?.totalpriceuzs,
                                product?.payment?.paymentuzs,
                                product?.discount?.discountuzs
                            )}{' '}
                        {currencyType}
                    </span>
                </h3>
            </div>
        </div>
    )
})