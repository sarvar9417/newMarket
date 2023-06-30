import React from 'react'
import TableInput from '../../Inputs/TableInput.js'
import {ExitBtn} from '../../Buttons/ExitBtn.js'

function PaymentInput({mix, value, onChange, label, onClose, keyInput, placeholder, type}) {
    return (
        <li className='custom-payment-ul-li'>
            <span className='custom-payment-text-style'>{label} :</span>
            <div className='flex items-center w-[11.75rem] gap-[0.625rem]'>
                <TableInput
                    placeholder={placeholder || `misol: 100 000 000`}
                    type={type ||'number'}
                    value={value}
                    onChange={(e) => {
                        onChange(e.target.value, keyInput)
                    }} />
                {mix && <ExitBtn onClick={() => onClose(keyInput)} />}
            </div>
        </li>
    )
}

export default PaymentInput
