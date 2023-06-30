import React from 'react'
import PaymentSelect from '../Payment/PaymentSelect/PaymentSelect.js'

export const DiscountInput = ({value, onChange, option, onSelect}) => {
    return (
        <div className='flex justify-between w-full items-center mb-[1rem]'>
            <div className='text-black-700 text-[0.875rem]'>Chegirma :</div>
            <PaymentSelect onChange={onChange} onSelect={onSelect} value={value} option={option} />
        </div>
    )
}
